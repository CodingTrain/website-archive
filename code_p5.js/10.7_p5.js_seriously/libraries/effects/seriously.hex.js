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

	Shader adapted from glfx.js by Evan Wallace
	License: https://github.com/evanw/glfx.js/blob/master/LICENSE
	*/

	Seriously.plugin('hex', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;\n',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform vec2 resolution;',
				'uniform vec2 center;',
				'uniform float size;',

				'void main(void) {',
				'	vec2 aspect = normalize(resolution);',
				'	vec2 tex = (vTexCoord * aspect - center) / size;',
				'	tex.y /= 0.866025404;',
				'	tex.x -= tex.y * 0.5;',
				'	vec2 a;',
				'	if (tex.x + tex.y - floor(tex.x) - floor(tex.y) < 1.0) {',
				'		a = vec2(floor(tex.x), floor(tex.y));',
				'	} else {',
				'		a = vec2(ceil(tex.x), ceil(tex.y));',
				'	}',
				'	vec2 b = vec2(ceil(tex.x), floor(tex.y));',
				'	vec2 c = vec2(floor(tex.x), ceil(tex.y));',
				'	vec3 tex3 = vec3(tex.x, tex.y, 1.0 - tex.x - tex.y);',
				'	vec3 a3 = vec3(a.x, a.y, 1.0 - a.x - a.y);',
				'	vec3 b3 = vec3(b.x, b.y, 1.0 - b.x - b.y);',
				'	vec3 c3 = vec3(c.x, c.y, 1.0 - c.x - c.y);',
				'	float alen =length(tex3 - a3);',
				'	float blen =length(tex3 - b3);',
				'	float clen =length(tex3 - c3);',
				'	vec2 choice;',
				'	if (alen < blen) {',
				'		if (alen < clen) {',
				'			choice = a;',
				'		} else {',
				'			choice = c;',
				'		}',
				'	} else {',
				'		if (blen < clen) {',
				'			choice = b;',
				'		} else {',
				'			choice = c;',
				'		}',
				'	}',
				'	choice.x += choice.y * 0.5;',
				'	choice.y *= 0.866025404;',
				'	choice *= size / aspect;',
				'	gl_FragColor = texture2D(source, choice + center / aspect);',
				'}'
			].join('\n');
			return shaderSource;
		},
		inPlace: false,
		inputs: {
			source: {
				type: 'image',
				uniform: 'source',
				shaderDirty: false
			},
			size: {
				type: 'number',
				uniform: 'size',
				min: 0,
				max: 0.4,
				defaultValue: 0.01
			},
			center: {
				type: 'vector',
				uniform: 'center',
				dimensions: 2,
				defaultValue: [0, 0]
			}
		},
		title: 'Hex',
		description: 'Hexagonal Pixelate'
	});
}));
