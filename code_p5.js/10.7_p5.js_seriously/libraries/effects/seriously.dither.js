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
	Adapted from a blog post by Martin Upitis
	http://devlog-martinsh.blogspot.com.es/2011/03/glsl-dithering.html
	*/

	Seriously.plugin('dither', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'#define mod4(a) (a >= 4 ? a - 4 : a)',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform vec2 resolution;',

				'const mat4 dither = mat4(' +
					'1.0, 33.0, 9.0, 41.0,' +
					'49.0, 17.0, 57.0, 25.0,' +
					'13.0, 45.0, 5.0, 37.0,' +
					'61.0, 29.0, 53.0, 21.0' +
				');',

				'float find_closest(int x, int y, float c0) {',
				'	float limit = 0.0;',
				'	int x4 = mod4(x);',
				'	int y4 = mod4(y);',
				//annoying hack since GLSL ES doesn't support variable array index
				'	for (int i = 0; i < 4; i++) {',
				'		if (i == x4) {',
				'			for (int j = 0; j < 4; j++) {',
				'				if (j == y4) {',
				'					limit = dither[i][j];',
				'					break;',
				'				}',
				'			}',
				'		}',
				'	}',
				'	if (x < 4) {',
				'		if (y >= 4) {',
				'			limit += 3.0;',
				'		}',
				'	} else {',
				'		if (y >= 4) {',
				'			limit += 1.0;',
				'		} else {',
				'			limit += 2.0;',
				'		}',
				'	}',
				'	limit /= 65.0;',
				'	return c0 < limit ? 0.0 : 1.0;',
				'}',

				'void main (void)  {',
				'	vec4 pixel = texture2D(source, vTexCoord);',
				'	vec2 coord = vTexCoord * resolution;',
				'	int x = int(mod(coord.x, 8.0));',
				'	int y = int(mod(coord.y, 8.0));',
				'	pixel.r = find_closest(x, y, pixel.r);',
				'	pixel.g = find_closest(x, y, pixel.g);',
				'	pixel.b = find_closest(x, y, pixel.b);',
				'	gl_FragColor = pixel;',
				'}'
			].join('\n');
			return shaderSource;
		},
		inPlace: false,
		inputs: {
			source: {
				type: 'image',
				uniform: 'source'
			}
		},
		title: 'Dither'
	});
}));
