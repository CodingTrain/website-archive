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
		experimental chroma key algorithm
		todo: try allowing some color despill on opaque pixels
		todo: add different modes?
	*/

	Seriously.plugin('chroma', {
		shader: function (inputs, shaderSource) {
			shaderSource.vertex = [
				'precision mediump float;',

				'attribute vec4 position;',
				'attribute vec2 texCoord;',

				'uniform vec2 resolution;',
				'uniform mat4 transform;',

				'varying vec2 vTexCoord;',

				'uniform vec4 screen;',
				'uniform float balance;',
				'varying float screenSat;',
				'varying vec3 screenPrimary;',

				'void main(void) {',
				'	float fmin = min(min(screen.r, screen.g), screen.b);', //Min. value of RGB
				'	float fmax = max(max(screen.r, screen.g), screen.b);', //Max. value of RGB
				'	float secondaryComponents;',

				'	screenPrimary = step(fmax, screen.rgb);',
				'	secondaryComponents = dot(1.0 - screenPrimary, screen.rgb);',
				'	screenSat = fmax - mix(secondaryComponents - fmin, secondaryComponents / 2.0, balance);',

				// first convert to screen space
				'	vec4 screenPosition = vec4(position.xy * resolution / 2.0, position.z, position.w);',
				'	screenPosition = transform * screenPosition;',

				// convert back to OpenGL coords
				'	gl_Position = screenPosition;',
				'	gl_Position.xy = screenPosition.xy * 2.0 / resolution;',
				'	gl_Position.z = screenPosition.z * 2.0 / (resolution.x / resolution.y);',
				'	vTexCoord = texCoord;',
				'}'
			].join('\n');
			shaderSource.fragment = [
				this.inputs.mask ? '#define MASK' : '',
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform vec4 screen;',
				'uniform float screenWeight;',
				'uniform float balance;',
				'uniform float clipBlack;',
				'uniform float clipWhite;',
				'uniform bool mask;',

				'varying float screenSat;',
				'varying vec3 screenPrimary;',

				'void main(void) {',
				'	float pixelSat, secondaryComponents;',
				'	vec4 sourcePixel = texture2D(source, vTexCoord);',

				'	float fmin = min(min(sourcePixel.r, sourcePixel.g), sourcePixel.b);', //Min. value of RGB
				'	float fmax = max(max(sourcePixel.r, sourcePixel.g), sourcePixel.b);', //Max. value of RGB
				//	luminance = fmax

				'	vec3 pixelPrimary = step(fmax, sourcePixel.rgb);',

				'	secondaryComponents = dot(1.0 - pixelPrimary, sourcePixel.rgb);',
				'	pixelSat = fmax - mix(secondaryComponents - fmin, secondaryComponents / 2.0, balance);', // Saturation

				// solid pixel if primary color component is not the same as the screen color
				'	float diffPrimary = dot(abs(pixelPrimary - screenPrimary), vec3(1.0));',
				'	float solid = step(1.0, step(pixelSat, 0.1) + step(fmax, 0.1) + diffPrimary);',

				/*
				Semi-transparent pixel if the primary component matches but if saturation is less
				than that of screen color. Otherwise totally transparent
				*/
				'	float alpha = max(0.0, 1.0 - pixelSat / screenSat);',
				'	alpha = smoothstep(clipBlack, clipWhite, alpha);',
				'	vec4 semiTransparentPixel = vec4((sourcePixel.rgb - (1.0 - alpha) * screen.rgb * screenWeight) / max(0.00001, alpha), alpha);',

				'	vec4 pixel = mix(semiTransparentPixel, sourcePixel, solid);',

				/*
				Old branching code
				'	if (pixelSat < 0.1 || fmax < 0.1 || any(notEqual(pixelPrimary, screenPrimary))) {',
				'		pixel = sourcePixel;',

				'	} else if (pixelSat < screenSat) {',
				'		float alpha = max(0.0, 1.0 - pixelSat / screenSat);',
				'		alpha = smoothstep(clipBlack, clipWhite, alpha);',
				'		pixel = vec4((sourcePixel.rgb - (1.0 - alpha) * screen.rgb * screenWeight) / alpha, alpha);',
				'	}',
				//*/


				'#ifdef MASK',
				'	gl_FragColor = vec4(vec3(pixel.a), 1.0);',
				'#else',
				'	gl_FragColor = pixel;',
				'#endif',
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
			screen: {
				type: 'color',
				uniform: 'screen',
				defaultValue: [66 / 255, 195 / 255, 31 / 255, 1]
			},
			weight: {
				type: 'number',
				uniform: 'screenWeight',
				defaultValue: 1,
				min: 0
			},
			balance: {
				type: 'number',
				uniform: 'balance',
				defaultValue: 1,
				min: 0,
				max: 1
			},
			clipBlack: {
				type: 'number',
				uniform: 'clipBlack',
				defaultValue: 0,
				min: 0,
				max: 1
			},
			clipWhite: {
				type: 'number',
				uniform: 'clipWhite',
				defaultValue: 1,
				min: 0,
				max: 1
			},
			mask: {
				type: 'boolean',
				defaultValue: false,
				uniform: 'mask',
				shaderDirty: true
			}
		},
		title: 'Chroma Key',
		description: ''
	});
}));
