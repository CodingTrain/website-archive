/* global define, require */
/*
Directional Motion Blur

Adapted from v002 by Anton Marini and Tom Butterworth
* Copyright vade - Anton Marini
* Creative Commons, Attribution - Non Commercial - Share Alike 3.0

http://v002.info/plugins/v002-blurs/
*/
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

	var passes = [0.2, 0.3, 0.5, 0.8],
		identity = new Float32Array([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]);

	Seriously.plugin('directionblur', function (options) {
		var fbs,
			baseShader,
			loopUniforms = {
				amount: 0,
				blendGamma: 2,
				angle: 0,
				inputScale: 1,
				resolution: [this.width, this.height],
				transform: identity,
				projection: new Float32Array([
					1, 0, 0, 0,
					0, 1, 0, 0,
					0, 0, 1, 0,
					0, 0, 0, 1
				])
			};

		return {
			initialize: function (parent) {
				var gl;

				parent();

				gl = this.gl;

				if (!gl) {
					return;
				}

				fbs = [
					new Seriously.util.FrameBuffer(gl, this.width, this.height),
					new Seriously.util.FrameBuffer(gl, this.width, this.height)
				];
			},
			commonShader: true,
			shader: function (inputs, shaderSource) {
				var gl = this.gl;

				baseShader = this.baseShader;

				shaderSource.vertex = [
					'precision mediump float;',

					'attribute vec4 position;',
					'attribute vec2 texCoord;',

					'uniform vec2 resolution;',
					'uniform mat4 projection;',
					'uniform mat4 transform;',

					'uniform float angle;',
					'uniform float amount;',
					'uniform float inputScale;',

					'const vec2 zero = vec2(0.0);',

					'varying vec2 vTexCoord;',
					'varying vec4 vTexCoords[4];',

					'void main(void) {',
					// first convert to screen space
					'	vec4 screenPosition = vec4(position.xy * resolution / 2.0, position.z, position.w);',
					'	screenPosition = transform * screenPosition;',

					// convert back to OpenGL coords
					'	gl_Position = screenPosition;',
					'	gl_Position.xy = screenPosition.xy * 2.0 / resolution;',
					'	gl_Position.z = screenPosition.z * 2.0 / (resolution.x / resolution.y);',
					'	vTexCoord = texCoord;',

					'	vec2 one = vec2(1.0) * inputScale;',
					'	if (inputScale < 1.0) {',
					'		one -= 1.0 / resolution;',
					'	}',
					'	vTexCoord = max(zero, min(one, texCoord.st * inputScale));',
					'	vec2 amount = vec2(cos(angle), sin(angle)) * amount * 5.0 / resolution;',

					'	for (int i = 0; i < 4; i++) {',
					'		float s = pow(3.0, float(i));',
					'		vTexCoords[i].xy = max(zero, min(one, vTexCoord + amount * s));',
					'		vTexCoords[i].zw = max(zero, min(one, vTexCoord - amount * s));',
					'	}',
					'}'
				].join('\n');
				shaderSource.fragment = [
					'precision mediump float;\n',

					'uniform sampler2D source;',
					'uniform float angle;',
					'uniform float amount;',
					'uniform float blendGamma;',

					'varying vec2 vTexCoord;',
					'varying vec4 vTexCoords[4];',

					'vec3 exp;',

					'vec4 sample(sampler2D sampler, vec2 coord) {',
					'	vec4 pixel = texture2D(sampler, coord);',
					'	pixel.rgb = pow(pixel.rgb, exp);',
					'	return pixel;',
					'}',

					'void main(void) {',

					'	exp = vec3(blendGamma);',

					'	gl_FragColor = sample(source, vTexCoord) / 9.0;',

					'	for (int i = 0; i < 4; i++) {',
					'		gl_FragColor += sample(source, vTexCoords[i].xy) / 9.0;',
					'		gl_FragColor += sample(source, vTexCoords[i].zw) / 9.0;',
					'	}',

					'	gl_FragColor.rgb = pow(gl_FragColor.rgb, 1.0 / exp);',

					'}'
				].join('\n');

				return shaderSource;
			},
			draw: function (shader, model, uniforms, frameBuffer, parent) {
				var i,
					fb,
					pass,
					amount,
					width,
					height,
					opts = {
						width: 0,
						height: 0,
						blend: false
					},
					previousPass = 1;

				amount = this.inputs.amount;
				if (!amount) {
					parent(baseShader, model, uniforms, frameBuffer);
					return;
				}

				if (amount <= 0.01) {
					parent(shader, model, uniforms, frameBuffer);
					return;
				}

				loopUniforms.amount = amount;
				loopUniforms.angle = this.inputs.angle;
				loopUniforms.projection[0] = this.height / this.width;

				for (i = 0; i < passes.length; i++) {
					pass = Math.min(1, passes[i] / amount);
					width = Math.floor(pass * this.width);
					height = Math.floor(pass * this.height);

					loopUniforms.source = fb ? fb.texture : this.inputs.source.texture;

					fb = fbs[i % 2];
					loopUniforms.inputScale = previousPass;//pass;
					previousPass = pass;
					opts.width = width;
					opts.height = height;

					parent(shader, model, loopUniforms, fb.frameBuffer, null, opts);
				}

				loopUniforms.source = fb.texture;
				loopUniforms.inputScale = previousPass;
				parent(shader, model, loopUniforms, frameBuffer);
			},
			resize: function () {
				loopUniforms.resolution[0] = this.width;
				loopUniforms.resolution[1] = this.height;
				if (fbs) {
					fbs[0].resize(this.width, this.height);
					fbs[1].resize(this.width, this.height);
				}
			},
			destroy: function () {
				if (fbs) {
					fbs[0].destroy();
					fbs[1].destroy();
					fbs = null;
				}

				if (baseShader) {
					baseShader.destroy();
				}

				loopUniforms = null;
			}
		};
	},
	{
		inputs: {
			source: {
				type: 'image',
				uniform: 'source',
				shaderDirty: false
			},
			amount: {
				type: 'number',
				uniform: 'amount',
				defaultValue: 0.4,
				min: 0,
				max: 1
			},
			angle: {
				type: 'number',
				uniform: 'angle',
				defaultValue: 0
			},
			blendGamma: {
				type: 'number',
				uniform: 'blendGamma',
				defaultValue: 2.2,
				min: 0,
				max: 4
			}
		},
		title: 'Directional Motion Blur'
	});
}));
