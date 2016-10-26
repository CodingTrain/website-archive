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
	Horn-Schunke Optical Flow
	Based on shader by Andrew Benson
	https://github.com/v002/v002-Optical-Flow/blob/master/v002.GPUHSFlow.frag

	Creative Commons, Attribution – Non Commercial – Share Alike 3.0
	http://v002.info/licenses/
	*/

	Seriously.plugin('opticalflow', function () {
		var previousFrameBuffer,
			baseShader;

		return {
			initialize: function (initialize) {
				previousFrameBuffer = new Seriously.util.FrameBuffer(this.gl, this.width, this.height);
				initialize();
				baseShader = this.baseShader;
			},
			resize: function () {
				previousFrameBuffer.resize(this.width, this.height);
			},
			commonShader: true,
			shader: function (inputs, shaderSource) {
				shaderSource.fragment = [
					'precision mediump float;',

					'varying vec2 vTexCoord;',

					'uniform sampler2D source;',
					'uniform sampler2D previous;',
					'uniform vec2 resolution;',

					'uniform vec2 scale;',
					'uniform float offsetX;',
					'uniform float lambda;',
					// 'const vec4 lumcoeff = vec4(0.299, 0.587, 0.114, 0.0);',

					'void main() {',
					'	vec4 a = texture2D(previous, vTexCoord);',
					'	vec4 b = texture2D(source, vTexCoord);',
					'	vec2 offset = offsetX / resolution;',
					'	vec2 x1 = vec2(offset.x, 0.0);',
					'	vec2 y1 = vec2(0.0, offset.y);',

					//get the difference
					'	vec4 curdif = b - a;',

					//calculate the gradient
					'	vec4 gradx = texture2D(source, vTexCoord + x1) - texture2D(source, vTexCoord - x1);',
					'	gradx += texture2D(previous, vTexCoord + x1) - texture2D(previous, vTexCoord - x1);',

					'	vec4 grady = texture2D(source, vTexCoord + y1) - texture2D(source, vTexCoord - y1);',
					'	grady += texture2D(previous, vTexCoord + y1) - texture2D(previous, vTexCoord - y1);',

					'	vec4 gradmag = sqrt((gradx * gradx) + (grady * grady) + vec4(lambda));',

					'	vec4 vx = curdif * (gradx / gradmag);',
					'	float vxd = vx.r;', //assumes greyscale

					//format output for flowrepos, out(-x,+x,-y,+y)
					'	vec2 xout = vec2(max(vxd, 0.0), abs(min(vxd, 0.0))) * scale.x;',

					'	vec4 vy = curdif * (grady / gradmag);',
					'	float vyd = vy.r;', //assumes greyscale

					//format output for flowrepos, out(-x,+x,-y,+y)
					'	vec2 yout = vec2(max(vyd, 0.0), abs(min(vyd, 0.0))) * scale.y;',

					'	gl_FragColor = clamp(vec4(xout.xy, yout.xy), 0.0, 1.0);',
					'	gl_FragColor.a = 1.0;',
					'}'
				].join('\n');

				return shaderSource;
			},
			draw: function (shader, model, uniforms, frameBuffer, parent) {
				uniforms.previous = previousFrameBuffer.texture;

				parent(shader, model, uniforms, frameBuffer);

				//todo: just swap buffers rather than copy?
				parent(baseShader, model, uniforms, previousFrameBuffer.frameBuffer);
			},
			destroy: function () {
				if (previousFrameBuffer) {
					previousFrameBuffer.destroy();
					previousFrameBuffer = null;
				}
			}
		};
	},
	{
		inPlace: false,
		inputs: {
			source: {
				type: 'image',
				uniform: 'source',
				shaderDirty: false
			},
			lambda: {
				type: 'number',
				uniform: 'lambda',
				min: 0,
				defaultValue: 0,
				description: 'noise limiting'
			},
			scaleResult: {
				type: 'vector',
				dimensions: 2,
				uniform: 'scale',
				defaultValue: [1, 1]
			},
			offset: {
				type: 'number',
				uniform: 'offsetX',
				defaultValue: 1,
				min: 1,
				max: 100,
				description: 'distance between texel samples for gradient calculation'
			}
		},
		description: 'Horn-Schunke Optical Flow',
		title: 'Optical Flow'
	});
}));
