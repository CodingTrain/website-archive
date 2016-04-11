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

	Seriously.plugin('lut', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			/*
			Shader borrowed from Paul Golds @ BBC R&D, with permission
			*/
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform sampler2D lut;',
				'uniform float amount;',

				'void main(void) {',

				'	vec4 textureColor = texture2D(source, vTexCoord);',
				'	textureColor = clamp(textureColor, 0.0, 1.0);',

				'	float blueColor = textureColor.b * 63.0;',

				'	vec2 quad1;',
				'	quad1.y = floor(floor(blueColor) / 8.0);',
				'	quad1.x = floor(blueColor) - (quad1.y * 8.0);',

				'	vec2 quad2;',
				'	quad2.y = floor(ceil(blueColor) / 8.0);',
				'	quad2.x = ceil(blueColor) - (quad2.y * 8.0);',

				'	vec2 texPos1;',
				'	texPos1 = (quad1 * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.rg);',

				'	vec2 texPos2;',
				'	texPos2 = (quad2 * 0.125) + 0.5/512.0 + ((0.125 - 1.0/512.0) * textureColor.rg);',

				'	lowp vec4 newColor1 = texture2D(lut, vec2(texPos1.x, 1.0 - texPos1.y));',
				'	lowp vec4 newColor2 = texture2D(lut, vec2(texPos2.x, 1.0 - texPos2.y));',

				'	vec4 newColor = mix(newColor1, newColor2, fract(blueColor));',

				'	gl_FragColor = mix(textureColor, newColor, amount);',
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
			lut: {
				type: 'image',
				uniform: 'lut'
			},
			amount: {
				type: 'number',
				uniform: 'amount',
				min: 0,
				max: 1,
				defaultValue: 1
			}
		},
		title: 'Color Look-Up Table',
		description: ''
	});
}));
