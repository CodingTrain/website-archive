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

	Seriously.plugin('linear-transfer', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform vec4 slope;',
				'uniform vec4 intercept;',

				'const vec3 half3 = vec3(0.5);',

				'void main(void) {',
				'	vec4 pixel = texture2D(source, vTexCoord);',
				'	gl_FragColor = pixel * slope + intercept;',
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
			slope: {
				type: 'vector',
				dimensions: 4,
				uniform: 'slope',
				defaultValue: [1, 1, 1, 1]
			},
			intercept: {
				type: 'vector',
				uniform: 'intercept',
				dimensions: 4,
				defaultValue: [0, 0, 0, 0]
			}
		},
		title: 'Linear Transfer',
		description: 'For each color channel: [slope] * [value] + [intercept]'
	});
}));
