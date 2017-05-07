/* global define, require */
/*
Blur

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

	var passes = [0.2, 0.3, 0.5, 0.8, 1],
		finalPass = passes.length - 1,
		horizontal = [1, 0],
		vertical = [0, 1],
		identity = new Float32Array([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]);

	Seriously.plugin('blur', function (options) {
		var fbHorizontal,
			fbVertical,
			baseShader,
			loopUniforms = {
				amount: 0,
				blendGamma: 2,
				inputScale: 1,
				resolution: [this.width, this.height],
				transform: identity,
				direction: null
			};

		return {
			initialize: function (parent) {
				var gl;

				parent();

				gl = this.gl;

				if (!gl) {
					return;
				}

				baseShader = this.baseShader;

				fbHorizontal = new Seriously.util.FrameBuffer(gl, this.width, this.height);
				fbVertical = new Seriously.util.FrameBuffer(gl, this.width, this.height);
			},
			commonShader: true,
			shader: function (inputs, shaderSource) {
				var gl = this.gl;

				shaderSource.vertex = [
					'precision mediump float;',

					'attribute vec4 position;',
					'attribute vec2 texCoord;',

					'uniform vec2 resolution;',
					'uniform mat4 transform;',

					'uniform vec2 direction;',
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
					'	vec2 amount = direction * (inputScale * amount * 5.0 / resolution);',

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

					'}',
				].join('\n');

				return shaderSource;
			},
			draw: function (shader, model, uniforms, frameBuffer, parent) {
				var i,
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
					uniforms.source = this.inputs.source.texture;
					parent(baseShader, model, uniforms, frameBuffer);
					return;
				}

				if (amount <= 0.01) {
					//horizontal pass
					uniforms.inputScale = 1;
					uniforms.direction = horizontal;
					uniforms.source = this.inputs.source.texture;
					parent(shader, model, uniforms, fbHorizontal.frameBuffer);

					//vertical pass
					uniforms.direction = vertical;
					uniforms.source = fbHorizontal.texture;
					parent(shader, model, uniforms, frameBuffer);
					return;
				}

				loopUniforms.amount = amount;
				loopUniforms.blendGamma = uniforms.blendGamma;
				loopUniforms.source = this.inputs.source.texture;

				for (i = 0; i < passes.length; i++) {
					pass = Math.min(1, passes[i] / amount);
					width = Math.floor(pass * this.width);
					height = Math.floor(pass * this.height);

					loopUniforms.resolution[0] = width;
					loopUniforms.resolution[1] = height;
					loopUniforms.inputScale = previousPass;
					previousPass = pass;

					opts.width = width;
					opts.height = height;

					//horizontal pass
					loopUniforms.direction = horizontal;
					parent(shader, model, loopUniforms, fbHorizontal.frameBuffer, null, opts);

					//vertical pass
					loopUniforms.inputScale = pass;
					loopUniforms.source = fbHorizontal.texture;
					loopUniforms.direction = vertical;
					parent(shader, model, loopUniforms, i === finalPass ? frameBuffer : fbVertical.frameBuffer, null, opts);

					loopUniforms.source = fbVertical.texture;
				}
			},
			resize: function () {
				loopUniforms.resolution[0] = this.width;
				loopUniforms.resolution[1] = this.height;
				if (fbHorizontal) {
					fbHorizontal.resize(this.width, this.height);
					fbVertical.resize(this.width, this.height);
				}
			},
			destroy: function () {
				if (fbHorizontal) {
					fbHorizontal.destroy();
					fbVertical.destroy();
					fbHorizontal = null;
					fbVertical = null;
				}

				loopUniforms = null;
			}
		};
	},
	{
		inputs: {
			source: {
				type: 'image',
				shaderDirty: false
			},
			amount: {
				type: 'number',
				uniform: 'amount',
				defaultValue: 0.2,
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
		title: 'Gaussian Blur'
	});
}));
