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

	Seriously.plugin('fader', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform vec4 color;',
				'uniform float amount;',

				'void main(void) {',
				'	gl_FragColor = texture2D(source, vTexCoord);',
				'	gl_FragColor = mix(gl_FragColor, color, amount);',
				'}'
			].join('\n');
			return shaderSource;
		},
		requires: function (sourceName, inputs) {
			return inputs.amount < 1;
		},
		inPlace: true,
		inputs: {
			source: {
				type: 'image',
				uniform: 'source'
			},
			color: {
				type: 'color',
				uniform: 'color',
				defaultValue: [0, 0, 0, 1]
			},
			amount: {
				type: 'number',
				uniform: 'amount',
				defaultValue: 0.5,
				min: 0,
				max: 1
			}
		},
		title: 'Fader',
		description: 'Fade image to a color'
	});
}));
