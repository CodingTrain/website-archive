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
	Shader code:
	* Copyright vade - Anton Marini
	* Creative Commons, Attribution - Non Commercial - Share Alike 3.0

	http://v002.info/?page_id=34

	Modified to keep alpha channel constant
	*/

	Seriously.plugin('bleach-bypass', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',

				'uniform float amount;',

				//constants
				'const vec4 one = vec4(1.0);',
				'const vec4 two = vec4(2.0);',
				'const vec4 lumcoeff = vec4(0.2125,0.7154,0.0721,0.0);',

				'vec4 overlay(vec4 myInput, vec4 previousmix, vec4 amount) {',
				'	float luminance = dot(previousmix,lumcoeff);',
				'	float mixamount = clamp((luminance - 0.45) * 10.0, 0.0, 1.0);',

				'	vec4 branch1 = two * previousmix * myInput;',
				'	vec4 branch2 = one - (two * (one - previousmix) * (one - myInput));',

				'	vec4 result = mix(branch1, branch2, vec4(mixamount) );',

				'	return mix(previousmix, result, amount);',
				'}',

				'void main (void)  {',
				'	vec4 pixel = texture2D(source, vTexCoord);',
				'	vec4 luma = vec4(vec3(dot(pixel,lumcoeff)), pixel.a);',
				'	gl_FragColor = overlay(luma, pixel, vec4(amount));',
				'}'
			].join('\n');
			return shaderSource;
		},
		inPlace: true,
		inputs: {
			source: {
				type: 'image',
				uniform: 'source',
				shaderDirty: false
			},
			amount: {
				type: 'number',
				uniform: 'amount',
				defaultValue: 1,
				min: 0,
				max: 1
			}
		},
		title: 'Bleach Bypass',
		categories: ['film'],
		description: [
			'Bleach Bypass film treatment',
			'http://en.wikipedia.org/wiki/Bleach_bypass',
			'see: "Saving Private Ryan", "Minority Report"'
		].join('\n')
	});
}));
