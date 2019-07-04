/* global define, require */
(function (root, factory) {
	'use strict';

	if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('seriously'));
	} else if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['seriously'], factory);
	} else {
		if (!root.Seriously) {
			root.Seriously = { plugin: function (name, opt) { this[name] = opt; } };
		}
		factory(root.Seriously);
	}
}(window, function (Seriously) {
	'use strict';

	Seriously.plugin('gradientwipe', function () {
		this.uniforms.resGradient = [1, 1];
		this.uniforms.resSource = [1, 1];

		return {
			shader: function (inputs, shaderSource) {
					shaderSource.vertex = [
					'precision mediump float;',

					'attribute vec4 position;',
					'attribute vec2 texCoord;',

					'uniform vec2 resolution;',
					'uniform vec2 resSource;',
					'uniform vec2 resGradient;',

					'varying vec2 texCoordSource;',
					'varying vec2 texCoordGradient;',

					'const vec2 HALF = vec2(0.5);',

					'void main(void) {',
					//we don't need to do a transform in this shader, since this effect is not "inPlace"
					'	gl_Position = position;',

					'	vec2 adjusted = (texCoord - HALF) * resolution;',

					'	texCoordSource = adjusted / resSource + HALF;',
					'	texCoordGradient = adjusted / resGradient + HALF;',
					'}'
				].join('\n');

				shaderSource.fragment = [
					'precision mediump float;\n',

					'varying vec2 texCoordSource;',
					'varying vec2 texCoordGradient;',

					'uniform sampler2D source;',
					'uniform sampler2D gradient;',

					'uniform float transition;',
					'uniform float smoothness;',
					'uniform bool invert;',

					'const vec3 lumcoeff = vec3(0.2125,0.7154,0.0721);',

					'void main(void) {',
					'	float gradientVal = 1.0 - dot(texture2D(gradient, texCoordGradient).rgb, lumcoeff);',

					'	if (invert) {',
					'		gradientVal = 1.0 - gradientVal;',
					'	}',

					'	float amount = 1.0 - transition;',

					'	float mn = (amount - smoothness * (1.0 - amount));',
					'	float mx = (amount + smoothness * amount);',

					'	if (gradientVal <= mn) {',
					'		gl_FragColor = texture2D(source, texCoordSource);',
					'		return;',
					'	}',

					'	if (gradientVal >= mx) {',
					'		gl_FragColor = vec4(0.0);',
					'		return;',
					'	}',

					'	float alpha = mix(1.0, 0.0, smoothstep(mn, mx, gradientVal));',
					'	vec4 pixel = texture2D(source, texCoordSource);',

					'	gl_FragColor = vec4(pixel.rgb, pixel.a * alpha);',
					'}'
				].join('\n');

				return shaderSource;
			},
			draw: function (shader, model, uniforms, frameBuffer, parent) {
				var gl;

				//*
				if (uniforms.transition <= 0) {
					//uniforms.source = uniforms.sourceB;
					parent(this.baseShader, model, uniforms, frameBuffer);
					return;
				}
				//*/

				//*
				if (uniforms.transition >= 1) {
					gl = this.gl;

					gl.viewport(0, 0, this.width, this.height);
					gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
					gl.clearColor(0.0, 0.0, 0.0, 0.0);
					gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

					return;
				}
				//*/

				parent(shader, model, uniforms, frameBuffer);
			},
			inPlace: false,
			requires: function (sourceName, inputs) {

				if (sourceName === 'source' && inputs.transition >= 1) {
					return false;
				}

				if (sourceName === 'gradient' &&
						(inputs.transition <= 0 || inputs.transition >= 1)) {
					return false;
				}

				return true;
			},
			resize: function () {
				var source = this.inputs.source,
					gradient = this.inputs.gradient;

				if (source) {
					this.uniforms.resSource[0] = source.width;
					this.uniforms.resSource[1] = source.height;
				} else {
					this.uniforms.resSource[0] = 1;
					this.uniforms.resSource[1] = 1;
				}

				if (gradient) {
					this.uniforms.resGradient[0] = gradient.width;
					this.uniforms.resGradient[1] = gradient.height;
				} else {
					this.uniforms.resGradient[0] = 1;
					this.uniforms.resGradient[1] = 1;
				}
			}
		};
	},
	{
		inputs: {
			source: {
				type: 'image',
				uniform: 'source'
			},
			gradient: {
				type: 'image',
				uniform: 'gradient'
			},
			transition: {
				type: 'number',
				uniform: 'transition',
				defaultValue: 0
			},
			invert: {
				type: 'boolean',
				uniform: 'invert',
				defaultValue: false
			},
			smoothness: {
				type: 'number',
				uniform: 'smoothness',
				defaultValue: 0,
				min: 0,
				max: 1
			}
		},
		title: 'Gradient Wipe'
	});
}));
