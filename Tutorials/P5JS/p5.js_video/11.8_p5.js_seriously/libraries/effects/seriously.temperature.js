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

	// algorithm from http://www.tannerhelland.com/4435/convert-temperature-rgb-algorithm-code/

	Seriously.plugin('temperature', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			shaderSource.vertex = [
				'precision mediump float;',

				'attribute vec4 position;',
				'attribute vec2 texCoord;',

				'uniform vec2 resolution;',
				'uniform mat4 transform;',

				'uniform float temperature;',

				'varying vec2 vTexCoord;',
				'varying vec3 tempFactor;',

				'const vec3 luma = vec3(0.2125,0.7154,0.0721);',

				'vec3 temperatureRGB(float t) {',
				'	float temp = t / 100.0;',
				'	vec3 color = vec3(1.0);',
				'	if (temp < 66.0) {',
				'		color.g = 0.3900815787690196 * log(temp) - 0.6318414437886275;',
				'		color.b = 0.543206789110196 * log(temp - 10.0) - 1.19625408914;',
				'	} else {',
				'		color.r = 1.292936186062745 * pow(temp - 60.0, -0.1332047592);',
				'		color.g = 1.129890860895294 * pow(temp - 60.0, -0.0755148492);',
				'	}',
				'	return color;',
				'}',

				'void main(void) {',
				// first convert to screen space
				'	vec4 screenPosition = vec4(position.xy * resolution / 2.0, position.z, position.w);',
				'	screenPosition = transform * screenPosition;',

				// convert back to OpenGL coords
				'	gl_Position.xy = screenPosition.xy * 2.0 / resolution;',
				'	gl_Position.z = screenPosition.z * 2.0 / (resolution.x / resolution.y);',
				'	gl_Position.w = screenPosition.w;',
				'	vTexCoord = texCoord;',
				'	vec3 tempColor = temperatureRGB(temperature);',
				'	tempFactor = dot(tempColor, luma) / tempColor;',
				'}\n'
			].join('\n');

			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',
				'varying vec3 tempFactor;',

				'uniform sampler2D source;',

				'void main(void) {',
				'	vec4 pixel = texture2D(source, vTexCoord);',
				'	gl_FragColor = vec4(pixel.rgb * tempFactor, pixel.a);',
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
			temperature: {
				type: 'number',
				uniform: 'temperature',
				defaultValue: 6500,
				min: 3000,
				max: 25000
			}
		},
		title: 'Color Temperature',
		description: ''
	});
}));
