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

	Seriously.plugin('exposure', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',

				'uniform float exposure;',

				'void main (void)  {',
				'	vec4 pixel = texture2D(source, vTexCoord);',
				'	gl_FragColor = vec4(pow(2.0, exposure) * pixel.rgb, pixel.a);',
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
			exposure: {
				type: 'number',
				uniform: 'exposure',
				defaultValue: 1,
				min: -8,
				max: 8
			}
		},
		title: 'Exposure',
		categories: ['film'],
		description: 'Exposure control'
	});
}));
