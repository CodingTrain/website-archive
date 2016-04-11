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

	Seriously.plugin('color-select', {
		shader: function(inputs, shaderSource, utilities) {
			shaderSource.vertex = [
				'precision mediump float;',

				'attribute vec4 position;',
				'attribute vec2 texCoord;',

				'uniform vec2 resolution;',
				'uniform mat4 transform;',

				'uniform float hueMin;',
				'uniform float hueMax;',
				'uniform float hueMinFalloff;',
				'uniform float hueMaxFalloff;',
				'uniform float saturationMin;',
				'uniform float saturationMax;',
				'uniform float saturationMinFalloff;',
				'uniform float saturationMaxFalloff;',
				'uniform float lightnessMin;',
				'uniform float lightnessMax;',
				'uniform float lightnessMinFalloff;',
				'uniform float lightnessMaxFalloff;',

				'varying vec2 vTexCoord;',
				'varying vec4 adjustedHueRange;',
				'varying vec4 saturationRange;',
				'varying vec4 lightnessRange;',

				'void main(void) {',
				// first convert to screen space
				'	vec4 screenPosition = vec4(position.xy * resolution / 2.0, position.z, position.w);',
				'	screenPosition = transform * screenPosition;',

				// convert back to OpenGL coords
				'	gl_Position.xy = screenPosition.xy * 2.0 / resolution;',
				'	gl_Position.z = screenPosition.z * 2.0 / (resolution.x / resolution.y);',
				'	gl_Position.w = screenPosition.w;',
				'	vTexCoord = texCoord;',

				'	float hueOffset = hueMin - hueMinFalloff;',
				'	adjustedHueRange = mod(vec4(' +
						'hueOffset, ' +
						'hueMin - hueOffset, ' +
						'hueMax - hueOffset, ' +
						'hueMax + hueMaxFalloff - hueOffset' +
					'), 360.0);',
				'	if (hueMin != hueMax) {',
				'		if (adjustedHueRange.z == 0.0) {',
				'			adjustedHueRange.z = 360.0;',
				'			adjustedHueRange.w += 360.0;',
				'		} else if (adjustedHueRange.w == 0.0) {',
				'			adjustedHueRange.w += 360.0;',
				'		}',
				'	}',
				'	saturationRange = vec4(' +
						'saturationMin - saturationMinFalloff, ' +
						'saturationMin, ' +
						'saturationMax, ' +
						'saturationMax + saturationMaxFalloff ' +
					');',

				'	lightnessRange = vec4(' +
						'lightnessMin - lightnessMinFalloff, ' +
						'lightnessMin, ' +
						'lightnessMax, ' +
						'lightnessMax + lightnessMaxFalloff ' +
					');',
				'}'
			].join('\n');

			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform bool mask;',

				'varying vec4 adjustedHueRange;',
				'varying vec4 saturationRange;',
				'varying vec4 lightnessRange;',

				'vec3 calcHSL(vec3 c) {',
				'	float minColor = min(c.r, min(c.g, c.b));',
				'	float maxColor = max(c.r, max(c.g, c.b));',
				'	float delta = maxColor - minColor;',
				'	vec3 hsl = vec3(0.0, 0.0, (maxColor + minColor) / 2.0);',
				'	if (delta > 0.0) {',
				'		if (hsl.z < 0.5) {',
				'			hsl.y = delta / (maxColor + minColor);',
				'		} else {',
				'			hsl.y = delta / (2.0 - maxColor - minColor);',
				'		}',
				'		if (c.r == maxColor) {',
				'			hsl.x = (c.g - c.b) / delta;',
				'		} else if (c.g == maxColor) {',
				'			hsl.x = 2.0 + (c.b - c.r) / delta;',
				'		} else {',
				'			hsl.x = 4.0 + (c.r - c.g) / delta;',
				'		}',
				'		hsl.x = hsl.x * 360.0 / 6.0;',
				'		if (hsl.x < 0.0) {',
				'			hsl.x += 360.0;',
				'		} else {',
				'			hsl.x = mod(hsl.x, 360.0);',
				'		}',
				'	}',
				'	return hsl;',
				'}',

				'void main(void) {',
				'	vec4 color = texture2D(source, vTexCoord);',
				'	vec3 hsl = calcHSL(color.rgb);',
				'	float adjustedHue = mod(hsl.x - adjustedHueRange.x, 360.0);',

				// calculate hue mask
				'	float maskValue;',
				'	if (adjustedHue < adjustedHueRange.y) {',
				'		maskValue = smoothstep(0.0, adjustedHueRange.y, adjustedHue);',
				'	} else if (adjustedHue < adjustedHueRange.z) {',
				'		maskValue = 1.0;',
				'	} else {',
				'		maskValue = 1.0 - smoothstep(adjustedHueRange.z, adjustedHueRange.w, adjustedHue);',
				'	}',

				// calculate saturation maskValue
				'	if (maskValue > 0.0) {',
				'		if (hsl.y < saturationRange.y) {',
				'			maskValue = min(maskValue, smoothstep(saturationRange.x, saturationRange.y, hsl.y));',
				'		} else {',
				'			maskValue = min(maskValue, 1.0 - smoothstep(saturationRange.z, saturationRange.w, hsl.y));',
				'		}',
				'	}',

				// calculate lightness maskValue
				'	if (maskValue > 0.0) {',
				'		if (hsl.z < lightnessRange.y) {',
				'			maskValue = min(maskValue, smoothstep(lightnessRange.x, lightnessRange.z, hsl.y));',
				'		} else {',
				'			maskValue = min(maskValue, 1.0 - smoothstep(lightnessRange.z, lightnessRange.w, hsl.z));',
				'		}',
				'	}',

				'	if (mask) {',
				'		gl_FragColor = vec4(maskValue, maskValue, maskValue, 1.0);',
				'	} else {',
				'		color.a = min(color.a, maskValue);',
				'		gl_FragColor = color;',
				'	}',
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
			hueMin: {
				type: 'number',
				uniform: 'hueMin',
				defaultValue: 0
			},
			hueMax: {
				type: 'number',
				uniform: 'hueMax',
				defaultValue: 360
			},
			hueMinFalloff: {
				type: 'number',
				uniform: 'hueMinFalloff',
				defaultValue: 0,
				min: 0
			},
			hueMaxFalloff: {
				type: 'number',
				uniform: 'hueMaxFalloff',
				defaultValue: 0,
				min: 0
			},
			saturationMin: {
				type: 'number',
				uniform: 'saturationMin',
				defaultValue: 0,
				min: 0,
				max: 1
			},
			saturationMax: {
				type: 'number',
				uniform: 'saturationMax',
				defaultValue: 1,
				min: 0,
				max: 1
			},
			saturationMinFalloff: {
				type: 'number',
				uniform: 'saturationMinFalloff',
				defaultValue: 0,
				min: 0
			},
			saturationMaxFalloff: {
				type: 'number',
				uniform: 'saturationMaxFalloff',
				defaultValue: 0,
				min: 0
			},
			lightnessMin: {
				type: 'number',
				uniform: 'lightnessMin',
				defaultValue: 0,
				min: 0,
				max: 1
			},
			lightnessMax: {
				type: 'number',
				uniform: 'lightnessMax',
				defaultValue: 1,
				min: 0,
				max: 1
			},
			lightnessMinFalloff: {
				type: 'number',
				uniform: 'lightnessMinFalloff',
				defaultValue: 0,
				min: 0
			},
			lightnessMaxFalloff: {
				type: 'number',
				uniform: 'lightnessMaxFalloff',
				defaultValue: 0,
				min: 0
			},
			mask: {
				type: 'boolean',
				defaultValue: false,
				uniform: 'mask'
			}
		},
		title: 'Color Select',
		description: 'Create a mask by hue, saturation and lightness range.'
	});
}));
