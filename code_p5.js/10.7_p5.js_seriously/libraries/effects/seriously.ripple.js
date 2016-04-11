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

	//http://msdn.microsoft.com/en-us/library/bb313868(v=xnagamestudio.10).aspx
	Seriously.plugin('ripple', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform float wave;',
				'uniform float distortion;',
				'uniform vec2 center;',

				'void main(void) {',
				//todo: can at least move scalar into vertex shader
				'	float scalar = abs(1.0 - abs(distance(vTexCoord, center)));',
				'	float sinOffset = sin(wave / scalar);',
				'	sinOffset = clamp(sinOffset, 0.0, 1.0);',
				'	float sinSign = cos(wave / scalar);',
				'	sinOffset = sinOffset * distortion / 32.0;',
				'	gl_FragColor = texture2D(source, vTexCoord + sinOffset * sinSign);',
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
			wave: {
				type: 'number',
				uniform: 'wave',
				defaultValue: Math.PI / 0.75
			},
			distortion: {
				type: 'number',
				uniform: 'distortion',
				defaultValue: 1
			},
			center: {
				type: 'vector',
				uniform: 'center',
				dimensions: 2,
				defaultValue: [0.5, 0.5]
			}
		},
		title: 'Ripple Distortion',
		description: ''
	});
}));
