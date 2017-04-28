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
	Vibrance is similar to saturation, but it has less effect on skin tones
	http://www.iceflowstudios.com/2013/tips/vibrance-vs-saturation-in-photoshop/

	Shader adapted from glfx.js by Evan Wallace
	License: https://github.com/evanw/glfx.js/blob/master/LICENSE
	*/

	Seriously.plugin('vibrance', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform float amount;',

				'void main(void) {',
				'	vec4 color = texture2D(source, vTexCoord);',

				'	float average = (color.r + color.g + color.b) / 3.0;',
				'	float mx = max(color.r, max(color.g, color.b));',
				'	float amt = (mx - average) * (-3.0 * amount);',
				'	color.rgb = mix(color.rgb, vec3(mx), amt);',
				'	gl_FragColor = color;',

				/*
				https://github.com/v002/v002-Color-Controls
				doesn't work so well with values < 0
				'	const vec4 lumacoeff = vec4(0.299,0.587,0.114, 0.);',
				'	vec4 luma = vec4(dot(color, lumacoeff));',
				'	vec4 mask = clamp(color - luma, 0.0, 1.0);',
				'	float lumaMask = 1.0 - dot(lumacoeff, mask);',
				'	gl_FragColor = mix(luma, color, 1.0 + amount * lumaMask);',
				*/
				'}'
			].join('\n');
			return shaderSource;
		},
		inPlace: true,
		inputs: {
			source: {
				type: 'image',
				uniform: 'source'
			},
			amount: {
				type: 'number',
				uniform: 'amount',
				defaultValue: 0,
				min: -1,
				max: 1
			}
		},
		title: 'Vibrance',
		description: 'Non-peaking saturation effect'
	});
}));
