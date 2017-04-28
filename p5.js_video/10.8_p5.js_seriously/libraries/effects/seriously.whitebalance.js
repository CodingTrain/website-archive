/* global define, require */
(function (root, factory) {
	'use strict';

	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['seriously'], factory);
	} else if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('seriously'));
	} else {
		if (!root.Seriously) {
			root.Seriously = { plugin: function (name, opt) { this[name] = opt; } };
		}
		factory(root.Seriously);
	}
}(window, function (Seriously) {
	'use strict';

	/*

	Math references:
	en.wikipedia.org/wiki/Color_balance
	http://scien.stanford.edu/pages/labsite/2010/psych221/projects/2010/JasonSu/adaptation.html
	https://github.com/ikaros-project/ikaros/blob/master/Source/Modules/VisionModules/WhiteBalance/WhiteBalance.cc

	*/

	var identity = new Float32Array([
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	]);

	Seriously.plugin('whitebalance', function () {
		var pyramidShader,
			pyramidBuffers = [],
			width,
			height,
			pyramidSize,
			log2 = Math.log(2),
			me = this,
			//baseShader, //todo: share one with main object
			gl,

			MAX_TEXTURE_SIZE;

		/*
		todo: handle special case where node is square and power of two. save on one pyramid iteration
		*/

		function updateSize(w, h) {
			var size, numLevels, n,
				i;

			if (width === w && height === h) {
				return;
			}

			width = w;
			height = h;

			numLevels = Math.ceil(Math.log(Math.max(h, w)) / log2);
			size = Math.pow(2, numLevels);

			if (size > MAX_TEXTURE_SIZE) {
				numLevels = Math.ceil(Math.log(MAX_TEXTURE_SIZE) / log2);
				size = MAX_TEXTURE_SIZE;
			}

			numLevels++;
			if (pyramidSize === size) {
				return;
			}

			pyramidSize = size;

			while (pyramidBuffers.length > numLevels) {
				(pyramidBuffers.pop()).fb.destroy();
			}

			while (pyramidBuffers.length < numLevels) {
				i = pyramidBuffers.length;
				n = Math.pow(2, i);
				pyramidBuffers.push({
					fb: new Seriously.util.FrameBuffer(me.gl, n, n),//, true),
					opts: {
						width: n,
						height: n
					},
					uniforms: {
						level: pyramidBuffers.length,
						offset: 0.25 / n,
						transform: identity,
						projection: identity,
						resolution: [n, n]
					}
				});

				if (i) {
					pyramidBuffers[i - 1].uniforms.source = pyramidBuffers[i].fb.texture;
				}
			}
		}


		return {
			initialize: function (initialize) {
				gl = this.gl;

				MAX_TEXTURE_SIZE = gl.getParameter(gl.MAX_TEXTURE_SIZE);

				if (this.inputs.auto) {
					updateSize(this.width, this.height);
				}

				initialize();
			},
			shader: function (inputs, shaderSource) {
				var auto = inputs.auto;
				//todo: gl.getExtension('OES_texture_float_linear')

				if (auto && !pyramidShader) {
					pyramidShader = new Seriously.util.ShaderProgram(this.gl, shaderSource.vertex, [
						'precision mediump float;',

						'varying vec2 vTexCoord;',

						'uniform sampler2D source;',
						'uniform float offset;',
						'uniform int level;',

						'void main(void) {',
						//gl.getExtension("OES_texture_float"), gl.getExtension("OES_texture_float_linear")
						//'	vec4 pixel = texture2D(source, vTexCoord);',

						'	vec4 pixel = texture2D(source, vTexCoord - vec2(offset)) +',
						'		texture2D(source, vTexCoord + vec2(offset, -offset)) +',
						'		texture2D(source, vTexCoord + vec2(offset)) +',
						'		texture2D(source, vTexCoord + vec2(-offset, offset));',
						'	pixel /= 4.0;',
						'	gl_FragColor = pixel;',
						'}'
					].join('\n'));
				}

				shaderSource.fragment = [
					auto ? '#define AUTO' : '',
					'precision mediump float;',

					'varying vec2 vTexCoord;',

					'uniform sampler2D source;',
					'#ifdef AUTO',
					'uniform sampler2D whiteSource;',
					'#else',
					'uniform vec4 white;',
					'#endif',

					// matrices from: http://www.brucelindbloom.com/index.html?Eqn_RGB_XYZ_Matrix.html
					/*
					raw RGB just seems to work better so let's use that until we figure Bradford out
					'const mat3 rgbToBradford = mat3(',
					'	0.4360747, 0.2225045, 0.0139322,',
					'	0.3850649, 0.7168786, 0.0971045,',
					'	0.1430804, 0.0606169, 0.7141733',
					');',

					'const mat3 bradfordToRgb = mat3(',
					'	3.1338561, -0.9787684, 0.0719453,',
					'	-1.6168667, 1.9161415, -0.2289914,',
					'	-0.4906146, 0.033454, 1.4052427',
					');',
					*/

					'const vec3 luma = vec3(0.2125, 0.7154, 0.0721);',

					'void main(void) {',
					'	vec4 pixel = texture2D(source, vTexCoord);',
					'#ifdef AUTO',
					'	vec4 white = texture2D(whiteSource, vTexCoord);',
					'#endif',
					/*
					'	vec3 whiteBradford = rgbToBradford * white.rgb;',
					'	vec3 targetBradford = rgbToBradford * vec3(dot(white.rgb, luma));',
					'	vec3 colorBradford = rgbToBradford * pixel.rgb;',
					'	pixel.rgb = clamp(bradfordToRgb * (colorBradford * targetBradford / whiteBradford), 0.0, 1.0);',
					*/
					'	vec3 target = vec3(dot(white.rgb, luma));',
					'	pixel.rgb = pixel.rgb * target / white.rgb;',
					'	gl_FragColor = pixel;',
					'}'
				].join('\n');

				return shaderSource;
			},
			resize: function () {
				if (this.gl && this.inputs.auto) {
					updateSize(this.width, this.height);
				}
			},
			draw: function (shader, model, uniforms, frameBuffer, draw) {
				var i,
					buf;

				if (this.inputs.auto) {
					i = pyramidBuffers.length - 1;
					pyramidBuffers[i].uniforms.source = uniforms.source;
					while (i >= 0) {
						buf = pyramidBuffers[i];
						draw(pyramidShader, model, buf.uniforms, buf.fb.frameBuffer, null, buf.opts);
						i--;
					}

					uniforms.whiteSource = pyramidBuffers[0].fb.texture;
				}

				draw(shader, model, uniforms, frameBuffer);
			},
			destroy: function () {
				while (pyramidBuffers.length) {
					pyramidBuffers.pop().destroy();
				}
			},
			inPlace: false,
			inputs: {
				source: {
					type: 'image',
					uniform: 'source',
					shaderDirty: false
				},
				white: {
					type: 'color',
					uniform: 'white',
					defaultValue: [1, 1, 1]
				},
				auto: {
					type: 'boolean',
					shaderDirty: true,
					defaultValue: true
				}
			}
		};
	},
	{
		title: 'White Balance'
	});
}));
