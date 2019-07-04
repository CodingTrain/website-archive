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

	/* inspired by http://lab.adjazent.com/2009/01/09/more-pixel-bender/ */

	Seriously.plugin('sketch', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.fragment = [
				'precision mediump float;',

				//todo: make adjust adjustable
				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform vec2 resolution;',

				'float res = resolution.x;',
				'float n0 = 97.0 / res;',
				'float n1 = 15.0 / res;',
				'float n2 = 97.0 / res;',
				'float n3 = 9.7 / res;',
				'float total = n2 + ( 4.0 * n0 ) + ( 4.0 * n1 );',

				'const vec3 div3 = vec3(1.0 / 3.0);',

				'void main(void) {',
				'	float offset, temp1, temp2;',
				'	vec4 m, p0, p1, p2, p3, p4, p5, p6, p7, p8;',
				'	offset = n3;',

				'	p0=texture2D(source,vTexCoord);',
				'	p1=texture2D(source,vTexCoord+vec2(-offset,-offset));',
				'	p2=texture2D(source,vTexCoord+vec2( offset,-offset));',
				'	p3=texture2D(source,vTexCoord+vec2( offset, offset));',
				'	p4=texture2D(source,vTexCoord+vec2(-offset, offset));',

				'	offset=n3*2.0;',

				'	p5=texture2D(source,vTexCoord+vec2(-offset,-offset));',
				'	p6=texture2D(source,vTexCoord+vec2( offset,-offset));',
				'	p7=texture2D(source,vTexCoord+vec2( offset, offset));',
				'	p8=texture2D(source,vTexCoord+vec2(-offset, offset));',
				'	m = (p0 * n2 + (p1 + p2 + p3 + p4) * n0 + (p5 + p6 + p7 + p8) * n1) / total;',

					//convert to b/w
				'	temp1 = dot(p0.rgb, div3);',
				'	temp2 = dot(m.rgb, div3);',

					//color dodge blend mode
				'	if (temp2 <= 0.0005) {',
				'		gl_FragColor = vec4( 1.0, 1.0, 1.0, p0.a);',
				'	} else {',
				'		gl_FragColor = vec4( vec3(min(temp1 / temp2, 1.0)), p0.a);',
				'	}',
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
			}
		},
		title: 'Sketch',
		description: 'Pencil/charcoal sketch'
	});
}));
