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

	Seriously.plugin('checkerboard', function () {
		var me = this;

		function resize() {
			me.resize();
		}

		return {
			initialize: function (initialize) {
				initialize();
				resize();
			},
			shader: function (inputs, shaderSource) {
				shaderSource.vertex = [
					'precision mediump float;',

					'attribute vec4 position;',
					'attribute vec2 texCoord;',

					'uniform vec2 resolution;',
					'uniform mat4 transform;',

					'uniform vec2 size;',
					'uniform vec2 anchor;',

					'vec2 pixelCoord;', //based in center
					'varying vec2 vGridCoord;', //based in center

					'void main(void) {',
					// first convert to screen space
					'	vec4 screenPosition = vec4(position.xy * resolution / 2.0, position.z, position.w);',
					'	screenPosition = transform * screenPosition;',

					// convert back to OpenGL coords
					'	gl_Position.xy = screenPosition.xy * 2.0 / resolution;',
					'	gl_Position.z = screenPosition.z * 2.0 / (resolution.x / resolution.y);',
					'	gl_Position.w = screenPosition.w;',

					'	pixelCoord = resolution * (texCoord - 0.5) / 2.0;',
					'	vGridCoord = (pixelCoord - anchor) / size;',
					'}\n'
				].join('\n');
				shaderSource.fragment = [
					'precision mediump float;',

					'varying vec2 vTexCoord;',
					'varying vec2 vPixelCoord;',
					'varying vec2 vGridCoord;',

					'uniform vec2 resolution;',
					'uniform vec2 anchor;',
					'uniform vec2 size;',
					'uniform vec4 color1;',
					'uniform vec4 color2;',


					'void main(void) {',
					'	vec2 modGridCoord = floor(mod(vGridCoord, 2.0));',
					'	if (modGridCoord.x == modGridCoord.y) {',
					'		gl_FragColor = color1;',
					'	} else  {',
					'		gl_FragColor = color2;',
					'	}',
					'}'
				].join('\n');
				return shaderSource;
			},
			inPlace: true,
			inputs: {
				anchor: {
					type: 'vector',
					uniform: 'anchor',
					dimensions: 2,
					defaultValue: [0, 0]
				},
				size: {
					type: 'vector',
					uniform: 'size',
					dimensions: 2,
					defaultValue: [4, 4]
				},
				color1: {
					type: 'color',
					uniform: 'color1',
					defaultValue: [1, 1, 1, 1]
				},
				color2: {
					type: 'color',
					uniform: 'color2',
					defaultValue: [187 / 255, 187 / 255, 187 / 255, 1]
				},
				width: {
					type: 'number',
					min: 0,
					step: 1,
					update: resize,
					defaultValue: 640
				},
				height: {
					type: 'number',
					min: 0,
					step: 1,
					update: resize,
					defaultValue: 360
				}
			},
		};
	}, {
		commonShader: true,
		title: 'Checkerboard',
		categories: ['generator']
	});
}));
