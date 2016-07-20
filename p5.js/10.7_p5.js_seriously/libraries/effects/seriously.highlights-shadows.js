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

	Seriously.plugin('highlights-shadows', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform float shadows;',
				'uniform float highlights;',

				'const vec3 luma = vec3(0.2125, 0.7154, 0.0721);',

				'void main(void) {',
				'	vec4 pixel = texture2D(source, vTexCoord);',
				'	float luminance = dot(pixel.rgb, luma);',
				'	float shadow = clamp((pow(luminance, 1.0 / (shadows + 1.0)) + (-0.76) * pow(luminance, 2.0 / (shadows + 1.0))) - luminance, 0.0, 1.0);',
				'	float highlight = clamp((1.0 - (pow(1.0 - luminance, 1.0 / (2.0 - highlights)) + (-0.8) * pow(1.0 - luminance, 2.0 / (2.0 - highlights)))) - luminance, -1.0, 0.0);',
				'	vec3 rgb = (luminance + shadow + highlight) * (pixel.rgb / vec3(luminance));',
				//'	vec3 rgb = vec3(0.0, 0.0, 0.0) + ((luminance + shadow + highlight) - 0.0) * ((pixel.rgb - vec3(0.0, 0.0, 0.0))/(luminance - 0.0));',
				'	gl_FragColor = vec4(rgb, pixel.a);',
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
			highlights: {
				type: 'number',
				uniform: 'highlights',
				min: 0,
				max: 1,
				defaultValue: 1
			},
			shadows: {
				type: 'number',
				uniform: 'shadows',
				min: 0,
				max: 1,
				defaultValue: 0
			}
		},
		title: 'Highlights/Shadows',
		description: 'Darken highlights, lighten shadows'
	});
}));
