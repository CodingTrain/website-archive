/* global define, require */
(function (root, factory) {
	'use strict';

	if (typeof exports === 'object') {
		// Node/CommonJS
		factory(require('seriously'));
	} else if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define(['seriously'], factory);
	} else {
		if (!root.Seriously) {
			root.Seriously = { plugin: function (name, opt) { this[name] = opt; } };
		}
		factory(root.Seriously);
	}
}(window, function (Seriously) {
	'use strict';

	var fillModes = {
		wrap: 'pos = mod(pos, 1.0);',
		clamp: 'pos = min(max(pos, 0.0), 1.0);',
		ignore: 'pos = texCoordSource;',
		color: 'gl_FragColor = color;\n\treturn;'
	},
	channelVectors = {
		none: [0, 0, 0, 0],
		red: [1, 0, 0, 0],
		green: [0, 1, 0, 0],
		blue: [0, 0, 1, 0],
		alpha: [0, 0, 0, 1],
		luma: [0.2125, 0.7154, 0.0721, 0],
		lightness: [1 / 3, 1 / 3, 1 / 3, 0]
	};

	Seriously.plugin('displacement', function () {
		this.uniforms.resMap = [1, 1];
		this.uniforms.resSource = [1, 1];
		this.uniforms.xVector = channelVectors.red;
		this.uniforms.yVector = channelVectors.green;

		return {
			shader: function (inputs, shaderSource) {
				var fillMode = fillModes[inputs.fillMode];

					shaderSource.vertex = [
					'precision mediump float;',

					'attribute vec4 position;',
					'attribute vec2 texCoord;',

					'uniform vec2 resolution;',
					'uniform vec2 resSource;',
					'uniform vec2 resMap;',

					'varying vec2 texCoordSource;',
					'varying vec2 texCoordMap;',

					'const vec2 HALF = vec2(0.5);',

					'void main(void) {',
					//we don't need to do a transform in this shader, since this effect is not "inPlace"
					'	gl_Position = position;',

					'	vec2 adjusted = (texCoord - HALF) * resolution;',

					'	texCoordSource = adjusted / resSource + HALF;',
					'	texCoordMap = adjusted / resMap + HALF;',
					'}'
				].join('\n');

				shaderSource.fragment = [
					'precision mediump float;\n',

					'varying vec2 texCoordSource;',
					'varying vec2 texCoordMap;',

					'uniform sampler2D source;',
					'uniform sampler2D map;',

					'uniform float amount;',
					'uniform float offset;',
					'uniform vec2 mapScale;',
					'uniform vec4 color;',
					'uniform vec4 xVector;',
					'uniform vec4 yVector;',

					'void main(void) {',
					'	vec4 mapPixel = texture2D(map, texCoordMap);',
					'	vec2 mapVector = vec2(dot(mapPixel, xVector), dot(mapPixel, yVector));',
					'	vec2 pos = texCoordSource + (mapVector.xy - offset) * mapScale * amount;',

					'	if (pos.x < 0.0 || pos.x > 1.0 || pos.y < 0.0 || pos.y > 1.0) {',
					'		' + fillMode,
					'	}',

					'	gl_FragColor = texture2D(source, pos);',
					'}'
				].join('\n');

				return shaderSource;
			},
			requires: function (sourceName) {
				if (!this.inputs.mapScale && sourceName === 'map') {
					return false;
				}
				return true;
			},
			resize: function () {
				var source = this.inputs.source,
					map = this.inputs.map;

				if (source) {
					this.uniforms.resSource[0] = source.width;
					this.uniforms.resSource[1] = source.height;
				} else {
					this.uniforms.resSource[0] = 1;
					this.uniforms.resSource[1] = 1;
				}

				if (map) {
					this.uniforms.resMap[0] = map.width;
					this.uniforms.resMap[1] = map.height;
				} else {
					this.uniforms.resMap[0] = 1;
					this.uniforms.resMap[1] = 1;
				}
			}
		};
	},
	{
		inputs: {
			source: {
				type: 'image',
				uniform: 'source'
			},
			map: {
				type: 'image',
				uniform: 'map'
			},
			xChannel: {
				type: 'enum',
				defaultValue: 'red',
				options: [
					'red', 'green', 'blue', 'alpha', 'luma', 'lightness', 'none'
				],
				update: function (val) {
					this.uniforms.xVector = channelVectors[val];
				}
			},
			yChannel: {
				type: 'enum',
				defaultValue: 'green',
				options: [
					'red', 'green', 'blue', 'alpha', 'luma', 'lightness', 'none'
				],
				update: function (val) {
					this.uniforms.yVector = channelVectors[val];
				}
			},
			fillMode: {
				type: 'enum',
				shaderDirty: true,
				defaultValue: 'color',
				options: [
					'color', 'wrap', 'clamp', 'ignore'
				]
			},
			color: {
				type: 'color',
				uniform: 'color',
				defaultValue: [0, 0, 0, 0]
			},
			offset: {
				type: 'number',
				uniform: 'offset',
				defaultValue: 0.5
			},
			mapScale: {
				type: 'vector',
				dimensions: 2,
				uniform: 'mapScale',
				defaultValue: [1, 1],
				updateSources: true
			},
			amount: {
				type: 'number',
				uniform: 'amount',
				defaultValue: 1
			}
		},
		title: 'Displacement Map',
		description: ''
	});
}));
