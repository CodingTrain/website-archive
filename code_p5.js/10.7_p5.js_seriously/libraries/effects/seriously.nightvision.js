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

	//based on tutorial: http://www.geeks3d.com/20091009/shader-library-night-vision-post-processing-filter-glsl/
	//todo: make noise better?

	Seriously.plugin('nightvision', {
		commonShader: true,
		shader: function (inputs, shaderSource, utilities) {
			shaderSource.fragment = [
					'precision mediump float;',

					'varying vec2 vTexCoord;',

					'uniform sampler2D source;',
					'uniform float time;',
					'uniform float luminanceThreshold;',
					'uniform float amplification;',
					'uniform vec3 nightVisionColor;',

					utilities.shader.makeNoise,

					'void main(void) {',
					'	vec3 noise = vec3(' +
							'makeNoise(vTexCoord.x, vTexCoord.y, time), ' +
							'makeNoise(vTexCoord.x, vTexCoord.y, time * 200.0 + 1.0), ' +
							'makeNoise(vTexCoord.x, vTexCoord.y, time * 100.0 + 3.0)' +
						');',
					'	vec4 pixel = texture2D(source, vTexCoord + noise.xy * 0.0025);',
					'	float luminance = dot(vec3(0.299, 0.587, 0.114), pixel.rgb);',
					'	pixel.rgb *= step(luminanceThreshold, luminance) * amplification;',
					'	gl_FragColor = vec4( (pixel.rgb + noise * 0.1) * nightVisionColor, pixel.a);',
					'}'
			].join('\n');
			return shaderSource;
		},
		inputs: {
			source: {
				type: 'image',
				uniform: 'source',
				shaderDirty: false
			},
			time: {
				type: 'number',
				uniform: 'time',
				defaultValue: 0,
				mod: 65536
			},
			luminanceThreshold: {
				type: 'number',
				uniform: 'luminanceThreshold',
				defaultValue: 0.1,
				min: 0,
				max: 1
			},
			amplification: {
				type: 'number',
				uniform: 'amplification',
				defaultValue: 1.4,
				min: 0
			},
			color: {
				type: 'color',
				uniform: 'nightVisionColor',
				defaultValue: [0.1, 0.95, 0.2]
			}
		},
		title: 'Night Vision',
		description: ''
	});
}));
