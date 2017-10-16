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

	Seriously.plugin('colorcomplements', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform vec4 guideColor;',
				'uniform float correlation;',
				'uniform float amount;',
				'uniform float concentration;',

				'float hueLerp(float h1, float h2, float v) {',
				'	float d = abs(h1 - h2);',
				'	if (d <= 0.5) {',
				'		return mix(h1, h2, v);',
				'	} else if (h1 < h2) {',
				'		return fract(mix((h1 + 1.0), h2, v));',
				'	} else {',
				'		return fract(mix(h1, (h2 + 1.0), v));',
				'	}',
				'}',

				//conversion functions borrowed from http://lolengine.net/blog/2013/07/27/rgb-to-hsv-in-glsl
				'vec3 rgbToHsv(vec3 c) {',
				'	vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);',
				'	vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);',
				'	vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);',

				'	float d = q.x - min(q.w, q.y);',
				'	float e = 1.0e-10;',
				'	return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);',
				'}',

				'vec3 hsvToRgb(vec3 c) {',
				'	vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);',
				'	vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);',
				'	return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);',
				'}',

				'vec3 hsvComplement(vec3 hsv) {',
				'	vec3 compl = hsv;',
				'	compl.x = mod(compl.x - 0.5, 1.0);',
				'	return compl;',
				'}',

				'void main(void) {',
				'	vec4 pixel = texture2D(source, vTexCoord);',
				'	vec3 hsv = rgbToHsv(pixel.rgb);',
				'	vec3 hsvPole1 = rgbToHsv(guideColor.rgb);',
				'	vec3 hsvPole2 = hsvPole1;',
				'	hsvPole2 = hsvComplement(hsvPole1);',
				'	float dist1 = abs(hsv.x - hsvPole1.x);',
				'	dist1 = dist1 > 0.5 ? 1.0 - dist1 : dist1;',
				'	float dist2 = abs(hsv.x - hsvPole2.x);',
				'	dist2 = dist2 > 0.5 ? 1.0 - dist2 : dist2;',

				'	float descent = smoothstep(0.0, correlation, hsv.y);',
				'	vec3 outputHsv = hsv;',
				'	vec3 pole = dist1 < dist2 ? hsvPole1 : hsvPole2;',
				'	float dist = min(dist1, dist2);',
				'	float c = descent * amount * (1.0 - pow((dist * 2.0), 1.0 / concentration));',
				'	outputHsv.x = hueLerp(hsv.x, pole.x, c);',
				'	outputHsv.y = mix(hsv.y, pole.y, c);',

				'	gl_FragColor = vec4(hsvToRgb(outputHsv), pixel.a);',
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
			amount: {
				type: 'number',
				uniform: 'amount',
				min: 0,
				max: 1,
				defaultValue: 0.8
			},
			concentration: {
				type: 'number',
				uniform: 'concentration',
				min: 0.1,
				max: 4,
				defaultValue: 2
			},
			correlation: {
				type: 'number',
				uniform: 'correlation',
				min: 0,
				max: 1,
				defaultValue: 0.5
			},
			guideColor: {
				type: 'color',
				uniform: 'guideColor',
				defaultValue: [1, 0.5, 0, 1]
			}
		},
		title: 'Color Complements',
		categories: ['color'],
		description: 'http://theabyssgazes.blogspot.com/2010/03/teal-and-orange-hollywood-please-stop.html'
	});
}));
