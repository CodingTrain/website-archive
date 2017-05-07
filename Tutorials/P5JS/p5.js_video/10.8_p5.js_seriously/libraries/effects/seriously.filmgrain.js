/* global define, require */
/*
Film Grain

Shader:
* Copyright Martins Upitis (martinsh) devlog-martinsh.blogspot.com
* Creative Commons Attribution 3.0 Unported License
http://devlog-martinsh.blogspot.com/2013/05/image-imperfections-and-film-grain-post.html

Modified to preserve alpha

*/
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

	Seriously.plugin('filmgrain', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform vec2 resolution;',
				'uniform float time;',
				'uniform float amount;',
				'uniform bool colored;',

				'float timer;',

				// Perm texture texel-size
				'const float permTexUnit = 1.0/256.0;',

				// Half perm texture texel-size
				'const float permTexUnitHalf = 0.5/256.0;',

				'vec4 rnm(in vec2 tc) {',
				'	float noise = sin(dot(tc + vec2(timer,timer),vec2(12.9898,78.233))) * 43758.5453;',

				'	float noiseR = fract(noise)*2.0-1.0;',
				'	float noiseG = fract(noise*1.2154)*2.0-1.0; ',
				'	float noiseB = fract(noise*1.3453)*2.0-1.0;',
				'	float noiseA = fract(noise*1.3647)*2.0-1.0;',
				'	',
				'	return vec4(noiseR,noiseG,noiseB,noiseA);',
				'}',

				'float fade(in float t) {',
				'	return t*t*t*(t*(t*6.0-15.0)+10.0);',
				'}',

				'float pnoise3D(in vec3 p) {',
					// Integer part, scaled so +1 moves permTexUnit texel
				'	vec3 pi = permTexUnit*floor(p)+permTexUnitHalf;',

				// and offset 1/2 texel to sample texel centers
				// Fractional part for interpolation'
				'	vec3 pf = fract(p);',

				// Noise contributions from (x=0, y=0), z=0 and z=1
				'	float perm00 = rnm(pi.xy).a ;',
				'	vec3 grad000 = rnm(vec2(perm00, pi.z)).rgb * 4.0 - 1.0;',
				'	float n000 = dot(grad000, pf);',
				'	vec3 grad001 = rnm(vec2(perm00, pi.z + permTexUnit)).rgb * 4.0 - 1.0;',
				'	float n001 = dot(grad001, pf - vec3(0.0, 0.0, 1.0));',

				// Noise contributions from (x=0, y=1), z=0 and z=1
				'	float perm01 = rnm(pi.xy + vec2(0.0, permTexUnit)).a ;',
				'	vec3 grad010 = rnm(vec2(perm01, pi.z)).rgb * 4.0 - 1.0;',
				'	float n010 = dot(grad010, pf - vec3(0.0, 1.0, 0.0));',
				'	vec3 grad011 = rnm(vec2(perm01, pi.z + permTexUnit)).rgb * 4.0 - 1.0;',
				'	float n011 = dot(grad011, pf - vec3(0.0, 1.0, 1.0));',

				// Noise contributions from (x=1, y=0), z=0 and z=1
				'	float perm10 = rnm(pi.xy + vec2(permTexUnit, 0.0)).a ;',
				'	vec3 grad100 = rnm(vec2(perm10, pi.z)).rgb * 4.0 - 1.0;',
				'	float n100 = dot(grad100, pf - vec3(1.0, 0.0, 0.0));',
				'	vec3 grad101 = rnm(vec2(perm10, pi.z + permTexUnit)).rgb * 4.0 - 1.0;',
				'	float n101 = dot(grad101, pf - vec3(1.0, 0.0, 1.0));',

				// Noise contributions from (x=1, y=1), z=0 and z=1
				'	float perm11 = rnm(pi.xy + vec2(permTexUnit, permTexUnit)).a ;',
				'	vec3 grad110 = rnm(vec2(perm11, pi.z)).rgb * 4.0 - 1.0;',
				'	float n110 = dot(grad110, pf - vec3(1.0, 1.0, 0.0));',
				'	vec3 grad111 = rnm(vec2(perm11, pi.z + permTexUnit)).rgb * 4.0 - 1.0;',
				'	float n111 = dot(grad111, pf - vec3(1.0, 1.0, 1.0));',

				// Blend contributions along x
				'	vec4 n_x = mix(vec4(n000, n001, n010, n011), vec4(n100, n101, n110, n111), fade(pf.x));',

				// Blend contributions along y
				'	vec2 n_xy = mix(n_x.xy, n_x.zw, fade(pf.y));',

				//Blend contributions along z
				'	float n_xyz = mix(n_xy.x, n_xy.y, fade(pf.z));',

				'	return n_xyz;',
				'}',

				'void main(void) {',
				'	timer = mod(time, 10000.0) / 10000.0;',
				'	vec4 pixel = texture2D(source, vTexCoord);',
				'	vec3 noise = vec3(pnoise3D(vec3(vTexCoord * resolution, timer + 0.0)));',
				'	if (colored) {',
				'		noise.g = pnoise3D(vec3(vTexCoord * resolution, timer + 1.0));',
				'		noise.b = pnoise3D(vec3(vTexCoord * resolution, timer + 2.0));',
				'	}',
				'	gl_FragColor = vec4(pixel.rgb + noise * amount, pixel.a);',
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
			time: {
				type: 'number',
				uniform: 'time',
				mod: 65536
			},
			amount: {
				type: 'number',
				uniform: 'amount',
				min: 0,
				max: 1,
				defaultValue: 0.03
			},
			colored: {
				type: 'boolean',
				uniform: 'colored',
				defaultValue: false
			}
		},
		title: 'Film Grain',
		description: 'Don\'t over-do it.'
	});
}));
