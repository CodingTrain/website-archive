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

	// based on tutorial by to Gregg Tavares
	// http://www.youtube.com/watch?v=rfQ8rKGTVlg&t=24m30s
	// todo: find a way to not invert every single texture

	Seriously.plugin('colorcube', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'uniform sampler2D source;',
				'uniform sampler2D colorCube;',
				'varying vec2 vTexCoord;',

				'vec3 sampleAs3DTexture(sampler2D tex, vec3 coord, float size) {',
				'	float sliceSize = 1.0 / size;', // space of 1 slice
				'	float slicePixelSize = sliceSize / size;', // space of 1 pixel
				'	float sliceInnerSize = slicePixelSize * (size - 1.0);', // space of size pixels
				'	float zSlice0 = min(floor(coord.z * size), size - 1.0);',
				'	float zSlice1 = min(zSlice0 + 1.0, size - 1.0);',
				'	float xOffset = slicePixelSize * 0.5 + coord.x * sliceInnerSize;',
				'	float s0 = xOffset + (zSlice0 * sliceSize);',
				'	float s1 = xOffset + (zSlice1 * sliceSize);',
				'	vec3 slice0Color = texture2D(tex, vec2(s0, 1.0 - coord.y)).rgb;',
				'	vec3 slice1Color = texture2D(tex, vec2(s1, 1.0 - coord.y)).rgb;',
				'	float zOffset = mod(coord.z * size, 1.0);',
				'	return mix(slice0Color, slice1Color, zOffset);',
				'}',

				'void main(void) {',
				'	vec4 originalColor = texture2D(source, vTexCoord);',
				'	vec3 color = sampleAs3DTexture(colorCube, originalColor.rgb, 8.0);',
				'	gl_FragColor = vec4(color, originalColor.a);',
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
			cube: {
				type: 'image',
				uniform: 'colorCube'
			}
		},
		title: 'Color Cube',
		description: ''
	});
}));
