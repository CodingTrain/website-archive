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

	Seriously.plugin('split', function () {
		var baseShader,
			resolutionA = [1, 1],
			resolutionB = [1, 1];

		// custom resize method
		this.resize = function () {
			var width,
				height,
				mode = this.inputs.sizeMode,
				node,
				fn,
				i,
				sourceA = this.inputs.sourceA,
				sourceB = this.inputs.sourceB;

			if (mode === 'a' || mode === 'b') {
				node = mode === 'a' ? sourceA : sourceB;
				if (node) {
					width = node.width;
					height = node.height;
				} else {
					width = 1;
					height = 1;
				}
			} else {
				if (sourceA) {
					if (sourceB) {
						fn = (mode === 'union' ? Math.max : Math.min);
						width = fn(sourceA.width, sourceB.width);
						height = fn(sourceA.height, sourceB.height);
					} else {
						width = sourceA.width;
						height = sourceA.height;
					}
				} else if (sourceB) {
					width = sourceB.width;
					height = sourceB.height;
				} else {
					width = 1;
					height = 1;
				}
			}

			if (this.width !== width || this.height !== height) {
				this.width = width;
				this.height = height;

				this.uniforms.resolution[0] = width;
				this.uniforms.resolution[1] = height;

				if (this.frameBuffer) {
					this.frameBuffer.resize(width, height);
				}

				this.emit('resize');
				this.setDirty();
			}

			if (sourceA) {
				resolutionA[0] = sourceA.width;
				resolutionA[1] = sourceA.height;
			}
			if (sourceB) {
				resolutionB[0] = sourceB.width;
				resolutionB[1] = sourceB.height;
			}

			for (i = 0; i < this.targets.length; i++) {
				this.targets[i].resize();
			}
		};

		return {
			initialize: function (initialize) {
				initialize();
				this.uniforms.resolutionA = resolutionA;
				this.uniforms.resolutionB = resolutionB;
				baseShader = this.baseShader;
			},
			commonShader: true,
			shader: function (inputs, shaderSource) {
				shaderSource.vertex = [
					'precision mediump float;',

					'attribute vec4 position;',
					'attribute vec2 texCoord;',

					'uniform vec2 resolution;',
					'uniform vec2 resolutionA;',
					'uniform vec2 resolutionB;',
					'uniform mat4 projection;',
					//'uniform mat4 transform;',

					'varying vec2 vTexCoord;',
					'varying vec2 vTexCoordA;',
					'varying vec2 vTexCoordB;',

					'uniform float angle;',
					'varying float c;',
					'varying float s;',
					'varying float t;',

					'void main(void) {',
					'   c = cos(angle);',
					'   s = sin(angle);',
					'	t = abs(c + s);',

					// first convert to screen space
					'	vec4 screenPosition = vec4(position.xy * resolution / 2.0, position.z, position.w);',
					//'	screenPosition = transform * screenPosition;',

					// convert back to OpenGL coords
					'	gl_Position.xy = screenPosition.xy * 2.0 / resolution;',
					'	gl_Position.z = screenPosition.z * 2.0 / (resolution.x / resolution.y);',
					'	gl_Position.w = screenPosition.w;',

					'	vec2 adjustedTexCoord = (texCoord - 0.5) * resolution;',
					'	vTexCoordA = adjustedTexCoord / resolutionA + 0.5;',
					'	vTexCoordB = adjustedTexCoord / resolutionB + 0.5;',
					'	vTexCoord = texCoord;',
					'}'
				].join('\n');
				shaderSource.fragment = [
					'precision mediump float;\n',

					'varying vec2 vTexCoord;',
					'varying vec2 vTexCoordA;',
					'varying vec2 vTexCoordB;',

					'varying float c;',
					'varying float s;',
					'varying float t;',

					'uniform sampler2D sourceA;',
					'uniform sampler2D sourceB;',
					'uniform float split;',
					'uniform float angle;',
					'uniform float fuzzy;',
					'uniform float blendGamma;',

					'vec4 textureLookup(sampler2D tex, vec2 texCoord, vec3 exp) {',
					'	if (any(lessThan(texCoord, vec2(0.0))) || any(greaterThan(texCoord, vec2(1.0)))) {',
					'		return vec4(0.0);',
					'	} else {',
					'		vec4 pixel = texture2D(tex, texCoord);',
					'		pixel.rgb = pow(pixel.rgb, exp);',
					'		return pixel;',
					'	}',
					'}',

					'void main(void) {',
					'	vec3 exp = vec3(blendGamma);',
					'	vec4 pixel1 = textureLookup(sourceA, vTexCoordA, exp);',
					'	vec4 pixel2 = textureLookup(sourceB, vTexCoordB, exp);',
					'	float mn = (split - fuzzy * (1.0 - split));',
					'	float mx = (split + fuzzy * split);;',
					'	vec2 coords = vTexCoord - vec2(0.5);',
					'	coords = vec2(coords.x * c - coords.y * s, coords.x * s + coords.y * c);',
					'	float scale = max(abs(c - s), abs(s + c));',
					'	coords /= scale;',
					'	coords += vec2(0.5);',
					'	float x = coords.x;',
					'	gl_FragColor = mix(pixel2, pixel1, smoothstep(mn, mx, x));',
					'	gl_FragColor.rgb = pow(gl_FragColor.rgb, 1.0 / exp);',
					'}'
				].join('\n');

				return shaderSource;
			},
			draw: function (shader, model, uniforms, frameBuffer, parent) {
				if (uniforms.split >= 1) {
					uniforms.source = uniforms.sourceB;
					parent(baseShader, model, uniforms, frameBuffer);
					return;
				}

				if (uniforms.split <= 0) {
					uniforms.source = uniforms.sourceA;
					parent(baseShader, model, uniforms, frameBuffer);
					return;
				}

				parent(shader, model, uniforms, frameBuffer);
			},
			inPlace: false,
			requires: function (sourceName, inputs) {
				if (sourceName === 'sourceA' && inputs.split >= 1) {
					return false;
				}

				if (sourceName === 'sourceB' && inputs.split <= 0) {
					return false;
				}

				return true;
			}
		};
	},
	{
		inputs: {
			sourceA: {
				type: 'image',
				uniform: 'sourceA',
				shaderDirty: false,
				update: function () {
					this.resize();
				}
			},
			sourceB: {
				type: 'image',
				uniform: 'sourceB',
				shaderDirty: false,
				update: function () {
					this.resize();
				}
			},
			sizeMode: {
				type: 'enum',
				defaultValue: 'a',
				options: [
					'a',
					'b',
					'union',
					'intersection'
				],
				update: function () {
					this.resize();
				}
			},
			split: {
				type: 'number',
				uniform: 'split',
				defaultValue: 0.5,
				min: 0,
				max: 1,
				updateSources: true
			},
			angle: {
				type: 'number',
				uniform: 'angle',
				defaultValue: 0
			},
			fuzzy: {
				type: 'number',
				uniform: 'fuzzy',
				defaultValue: 0,
				min: 0,
				max: 1
			},
			blendGamma: {
				type: 'number',
				uniform: 'blendGamma',
				defaultValue: 2.2,
				min: 0,
				max: 4
			}
		},
		description: 'Split screen or wipe',
		title: 'Split'
	});
}));
