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

	var channelOptions = [
			'Red',
			'Green',
			'Blue',
			'Alpha'
		],
		channelLookup = {
			r: 0,
			g: 1,
			b: 2,
			a: 3,
			x: 0,
			y: 1,
			z: 2,
			w: 3
		};

	Seriously.plugin('channels', function () {
		var sources = [],
			shaders = [],
			matrices = [],
			me = this;

		function validateChannel(value, input, name) {
			var val;
			if (typeof value === 'string') {
				val = value.charAt(0).toLowerCase();
				val = channelLookup[val];
				if (val === undefined) {
					val = -1;
				}
				if (val < 0) {
					val = parseFloat(value);
				}
			} else {
				val = value;
			}

			if (val === 0 || val === 1 || val === 2 || val === 3) {
				return val;
			}

			return me.inputs[name];
		}

		function updateChannels() {
			var inputs = me.inputs,
				i, j,
				source,
				matrix;

			for (i = 0; i < sources.length; i++) {
				source = sources[i];
				matrix = matrices[i];
				if (!matrix) {
					matrix = matrices[i] = [];
					me.uniforms['channels' + i] = matrix;
				}

				for (j = 0; j < 16; j++) {
					matrix[j] = 0;
				}

				matrix[inputs.red] = (inputs.redSource === source) ? 1 : 0;
				matrix[4 + inputs.green] = (inputs.greenSource === source) ? 1 : 0;
				matrix[8 + inputs.blue] = (inputs.blueSource === source) ? 1 : 0;
				matrix[12 + inputs.alpha] = (inputs.alphaSource === source) ? 1 : 0;
			}
		}

		function updateSources() {
			var inputs = me.inputs;

			function validateSource(name) {
				var s, j;
				s = inputs[name];
				if (!s) {
					s = me.sources[name] = inputs[name] = inputs.source;
				}

				j = sources.indexOf(s);
				if (j < 0) {
					j = sources.length;
					sources.push(s);
					me.uniforms['source' + j] = s;
				}
			}
			sources.length = 0;

			validateSource('redSource');
			validateSource('greenSource');
			validateSource('blueSource');
			validateSource('alphaSource');

			me.resize();

			updateChannels();
		}

		// custom resize method
		this.resize = function () {
			var width,
				height,
				mode = this.inputs.sizeMode,
				i,
				resolution,
				source;

			if (!sources.length) {
				width = 1;
				height = 1;
			} else if (sources.length === 1) {
				source = sources[0];
				width = source.width;
				height = source.height;
			} else if (mode === 'union') {
				width = 0;
				height = 0;
				for (i = 0; i < sources.length; i++) {
					source = sources[0];
					width = Math.max(width, source.width);
					height = Math.max(height, source.height);
				}
			} else if (mode === 'intersection') {
				width = Infinity;
				height = Infinity;
				for (i = 0; i < sources.length; i++) {
					source = sources[0];
					width = Math.min(width, source.width);
					height = Math.min(height, source.height);
				}
			} else {
				source = me.inputs[mode + 'Source'];
				if (source) {
					width = source.width;
					height = source.height;
				} else {
					width = 1;
					height = 1;
				}
			}

			for (i = 0; i < sources.length; i++) {
				source = sources[i];
				resolution = me.uniforms['resolution' + i];
				if (resolution) {
					resolution[0] = source.width;
					resolution[1] = source.height;
				} else {
					me.uniforms['resolution' + i] = [source.width, source.height];
				}
			}

			if (this.width !== width || this.height !== height) {
				this.width = width;
				this.height = height;

				this.uniforms.resolution[0] = width;
				this.uniforms.resolution[1] = height;

				if (this.frameBuffer) {
					this.frameBuffer.resize(width, height);
				}

				this.emit('resize');
				this.setDirty();
			}

			for (i = 0; i < this.targets.length; i++) {
				this.targets[i].resize();
			}
		};

		return {
			shader: function () {
				var i,
					frag,
					vert,
					shader,
					uniforms = '',
					samples = '',
					varyings = '',
					position = '';

				/*
				We'll restore this and the draw function below if we ever figure out a way to
				add/& multiple renders without screwing up the brightness
				shaderSource.fragment = [
					'precision mediump float;',

					'varying vec2 vTexCoord;',
					'uniform mat4 channels;',
					'uniform sampler2D source;',
					//'uniform sampler2D previous;',
					'void main(void) {',
					'	vec4 pixel;',
					'	if (any(lessThan(vTexCoord, vec2(0.0))) || any(greaterThanEqual(vTexCoord, vec2(1.0)))) {',
					'		pixel = vec4(0.0);',
					'	} else {',
					'		pixel = texture2D(source, vTexCoord) * channels;',
					//'		if (gl_FragColor.a == 0.0) gl_FragColor.a = 1.0;',
					'	}',
					'	gl_FragColor = pixel;',
					'}'
				].join('\n');

				return shaderSource;
				*/
				if (shaders[sources.length]) {
					return shaders[sources.length];
				}

				for (i = 0; i < sources.length; i++) {
					varyings += 'varying vec2 vTexCoord' + i + ';\n';

					uniforms += 'uniform sampler2D source' + i + ';\n' +
						'uniform mat4 channels' + i + ';\n' +
						'uniform vec2 resolution' + i + ';\n\n';

					position += '    vTexCoord' + i + ' = (position.xy * resolution / resolution' + i + ') * 0.5 + 0.5;\n';

					samples += '    if (all(greaterThanEqual(vTexCoord' + i + ', vec2(0.0))) && all(lessThan(vTexCoord' + i + ', vec2(1.0)))) {\n' +
						'        gl_FragColor += texture2D(source' + i + ', vTexCoord' + i + ') * channels' + i + ';\n    }\n';
				}

				vert = [
					'precision mediump float;',

					'attribute vec4 position;',
					'attribute vec2 texCoord;',

					'uniform vec2 resolution;',
					uniforms,

					varyings,

					'void main(void) {',
					position,
					'	gl_Position = position;',
					'}\n'
				].join('\n');

				frag = [
					'precision mediump float;',

					varyings,
					uniforms,

					'void main(void) {',
					'	gl_FragColor = vec4(0.0);',
					samples,
					'}'
				].join('\n');

				shader = new Seriously.util.ShaderProgram(this.gl,
					vert,
					frag);

				shaders[sources.length] = shader;
				return shader;
			},
			/*
			draw: function (shader, model, uniforms, frameBuffer, draw) {
				var i,
					source;

				options.clear = true;
				for (i = 0; i < sources.length; i++) {
				//for (i = sources.length - 1; i >= 0; i--) {
					uniforms.channels = matrices[i];
					source = sources[i];
					uniforms.source = sources[i];
					//uniforms.resolution[]

					draw(shader, model, uniforms, frameBuffer, null, options);
					options.clear = false;
				}
			},
			*/
			inputs: {
				sizeMode: {
					type: 'enum',
					defaultValue: 'red',
					options: [
						'red',
						'green',
						'blue',
						'alpha',
						'union',
						'intersection'
					],
					update: function () {
						this.resize();
					}
				},
				source: {
					type: 'image',
					update: updateSources,
					shaderDirty: true
				},
				redSource: {
					type: 'image',
					update: updateSources,
					shaderDirty: true
				},
				greenSource: {
					type: 'image',
					update: updateSources,
					shaderDirty: true
				},
				blueSource: {
					type: 'image',
					update: updateSources,
					shaderDirty: true
				},
				alphaSource: {
					type: 'image',
					update: updateSources,
					shaderDirty: true
				},
				red: {
					type: 'enum',
					options: channelOptions,
					validate: validateChannel,
					update: updateChannels,
					defaultValue: 0
				},
				green: {
					type: 'enum',
					options: channelOptions,
					validate: validateChannel,
					update: updateChannels,
					defaultValue: 1
				},
				blue: {
					type: 'enum',
					options: channelOptions,
					validate: validateChannel,
					update: updateChannels,
					defaultValue: 2
				},
				alpha: {
					type: 'enum',
					options: channelOptions,
					validate: validateChannel,
					update: updateChannels,
					defaultValue: 3
				}
			}
		};
	},
	{
		inPlace: false,
		title: 'Channel Mapping'
	});
}));
