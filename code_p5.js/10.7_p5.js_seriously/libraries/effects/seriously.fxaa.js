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
	http://en.wikipedia.org/wiki/Fast_approximate_anti-aliasing

	adapted from:
	http://horde3d.org/wiki/index.php5?title=Shading_Technique_-_FXAA
	*/

	Seriously.plugin('fxaa', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.vertex = [
				'precision mediump float;',

				'attribute vec4 position;',
				'attribute vec2 texCoord;',

				'uniform vec2 resolution;',
				'uniform mat4 transform;',

				'varying vec2 vTexCoord;',
				'varying vec2 vTexCoordNW;',
				'varying vec2 vTexCoordNE;',
				'varying vec2 vTexCoordSW;',
				'varying vec2 vTexCoordSE;',

				'const vec2 diag = vec2(1.0, -1.0);',

				'void main(void) {',
				// first convert to screen space
				'	vec4 screenPosition = vec4(position.xy * resolution / 2.0, position.z, position.w);',
				'	screenPosition = transform * screenPosition;',

				// convert back to OpenGL coords
				'	gl_Position.xy = screenPosition.xy * 2.0 / resolution;',
				'	gl_Position.z = screenPosition.z * 2.0 / (resolution.x / resolution.y);',
				'	gl_Position.w = screenPosition.w;',

				'	vTexCoord = texCoord;',

				'	vec2 invRes = 1.0 / resolution;',
				'	vTexCoordNW = texCoord - invRes;',
				'	vTexCoordNE = texCoord + invRes * diag;',
				'	vTexCoordSW = texCoord - invRes * diag;',
				'	vTexCoordSE = texCoord + invRes;',
				'}\n'
			].join('\n');

			shaderSource.fragment = [
				'precision mediump float;',

				'#define FXAA_REDUCE_MIN (1.0 / 128.0)',
				'#define FXAA_REDUCE_MUL (1.0 / 8.0)',
				'#define FXAA_SPAN_MAX 8.0',

				'varying vec2 vTexCoord;',
				'varying vec2 vTexCoordNW;',
				'varying vec2 vTexCoordNE;',
				'varying vec2 vTexCoordSW;',
				'varying vec2 vTexCoordSE;',

				'uniform vec2 resolution;',
				'uniform sampler2D source;',

				'const vec3 luma = vec3(0.299, 0.587, 0.114);',

				'void main(void) {',
				'	vec4 original = texture2D(source, vTexCoord);',
				'	vec3 rgbNW = texture2D(source, vTexCoordNW).rgb;',
				'	vec3 rgbNE = texture2D(source, vTexCoordNE).rgb;',
				'	vec3 rgbSW = texture2D(source, vTexCoordSW).rgb;',
				'	vec3 rgbSE = texture2D(source, vTexCoordSE).rgb;',

				'	float lumaNW = dot(rgbNW, luma);',
				'	float lumaNE = dot(rgbNE, luma);',
				'	float lumaSW = dot(rgbSW, luma);',
				'	float lumaSE = dot(rgbSE, luma);',
				'	float lumaM = dot(original.rgb, luma);',

				'	float lumaMin = min(lumaM, min(min(lumaNW, lumaNE), min(lumaSW, lumaSE)));',
				'	float lumaMax = max(lumaM, max(max(lumaNW, lumaNE), max(lumaSW, lumaSE)));',

				'	vec2 dir = vec2(' +
					'-((lumaNW + lumaNE) - (lumaSW + lumaSE)), ' +
					'((lumaNW + lumaSW) - (lumaNE + lumaSE))' +
					');',

				'	float dirReduce = max((lumaNW + lumaNE + lumaSW + lumaSE) * 0.25 * FXAA_REDUCE_MUL, FXAA_REDUCE_MIN);',

				'	float rcpDirMin = 1.0 / (min(abs(dir.x), abs(dir.y)) + dirReduce);',

				'	dir = min(vec2(FXAA_SPAN_MAX), max(vec2(-FXAA_SPAN_MAX), dir * rcpDirMin)) / resolution;',

				'	vec3 rgbA = 0.5 * (',
				'		texture2D(source, vTexCoord + dir * (1.0 / 3.0 - 0.5)).rgb +',
				'		texture2D(source, vTexCoord + dir * (2.0 / 3.0 - 0.5)).rgb);',

				'	vec3 rgbB = rgbA * 0.5 + 0.25 * (',
				'		texture2D(source, vTexCoord - dir * 0.5).rgb +',
				'		texture2D(source, vTexCoord + dir * 0.5).rgb);',

				'	float lumaB = dot(rgbB, luma);',
				'	if (lumaB < lumaMin || lumaB > lumaMax) {',
				'		gl_FragColor = vec4(rgbA, original.a);',
				'	} else {',
				'		gl_FragColor = vec4(rgbB, original.a);',
				'	}',
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
			}
		},
		title: 'FXAA',
		description: 'Fast approximate anti-aliasing'
	});
}));
