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

	Seriously.plugin('vignette', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform float amount;',

				'void main(void) {',
				'	vec4 pixel = texture2D(source, vTexCoord);',
				'	vec2 pos = vTexCoord.xy - 0.5;',
				'	float vignette = 1.0 - (dot(pos, pos) * amount);',
				'	gl_FragColor = vec4(pixel.rgb * vignette, pixel.a);',
				'}'
			].join('\n');
			return shaderSource;
		},
		inPlace: false,
		inputs: {
			source: {
				type: 'image',
				uniform: 'source'
			},
			amount: {
				type: 'number',
				uniform: 'amount',
				defaultValue: 1,
				min: 0
			}
		},
		title: 'Vignette',
		description: 'Vignette'
	});
}));
