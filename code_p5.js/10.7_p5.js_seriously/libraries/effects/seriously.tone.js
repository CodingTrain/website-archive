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

	Seriously.plugin('tone', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform vec4 light;',
				'uniform vec4 dark;',
				'uniform float desat;',
				'uniform float toned;',

				'const vec3 lumcoeff = vec3(0.2125,0.7154,0.0721);',

				'void main(void) {',
				'	vec4 sourcePixel = texture2D(source, vTexCoord);',
				'	vec3 sceneColor = light.rgb * sourcePixel.rgb;',
				'	vec3 gray = vec3(dot(lumcoeff, sceneColor));',
				'	vec3 muted = mix(sceneColor, gray, desat);',
				'	vec3 tonedColor = mix(dark.rgb, light.rgb, gray);',
				'	gl_FragColor = vec4(mix(muted, tonedColor, toned), sourcePixel.a);',
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
			light: {
				type: 'color',
				uniform: 'light',
				defaultValue: [1, 0.9, 0.5, 1]
			},
			dark: {
				type: 'color',
				uniform: 'dark',
				defaultValue: [0.2, 0.05, 0, 1]
			},
			toned: {
				type: 'number',
				uniform: 'toned',
				defaultValue: 1,
				minimumRange: 0,
				maximumRange: 1
			},
			desat: {
				type: 'number',
				uniform: 'desat',
				defaultValue: 0.5,
				minimumRange: 0,
				maximumRange: 1
			}
		},
		title: 'Tone',
		description: ''
	});
}));
