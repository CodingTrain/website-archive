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

	var identity = new Float32Array([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]),
		intRegex = /\d+/;

	Seriously.plugin('layers', function (options) {
		var count,
			me = this,
			topOpts = {
				clear: false
			},
			i,
			inputs;

		function update() {
			me.resize();
		}

		if (typeof options === 'number' && options >= 2) {
			count = options;
		} else {
			count = options && options.count || 4;
			count = Math.max(2, count);
		}

		inputs = {
			sizeMode: {
				type: 'enum',
				defaultValue: '0',
				options: [
					'union',
					'intersection'
				],
				update: function () {
					this.resize();
				}
			}
		};

		for (i = 0; i < count; i++) {
			inputs.sizeMode.options.push(i.toString());
			inputs.sizeMode.options.push('source' + i);

			//source
			inputs['source' + i] = {
				type: 'image',
				update: update
			};

			//opacity
			inputs['opacity' + i] = {
				type: 'number',
				defaultValue: 1,
				min: 0,
				max: 1,
				updateSources: true
			};
		}

		this.uniforms.layerResolution = [1, 1];

		// custom resize method
		this.resize = function () {
			var width,
				height,
				mode = this.inputs.sizeMode,
				i,
				n,
				source,
				a;

			if (mode === 'union') {
				width = 0;
				height = 0;
				for (i = 0; i < count; i++) {
					source = this.inputs['source' + i];
					if (source) {
						width = Math.max(width, source.width);
						height = Math.max(height, source.height);
					}
				}
			} else if (mode === 'intersection') {
				width = Infinity;
				height = Infinity;
				for (i = 0; i < count; i++) {
					source = this.inputs['source' + i];
					if (source) {
						width = Math.min(width, source.width);
						height = Math.min(height, source.height);
					}
				}
			} else {
				width = 1;
				height = 1;
				n = count - 1;
				a = intRegex.exec(this.inputs.sizeMode);
				if (a) {
					n = Math.min(parseInt(a[0], 10), n);
				}

				source = this.inputs['source' + n];
				if (source) {
					width = source.width;
					height = source.height;
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

				for (i = 0; i < this.targets.length; i++) {
					this.targets[i].resize();
				}
			}
		};

		return {
			initialize: function (initialize) {
				var gl = this.gl;
				initialize();

				topOpts.blendEquation = gl.FUNC_ADD;
				topOpts.srcRGB = gl.SRC_ALPHA;
				topOpts.dstRGB = gl.ONE_MINUS_SRC_ALPHA;
				topOpts.srcAlpha = gl.SRC_ALPHA;
				topOpts.dstAlpha = gl.DST_ALPHA;
			},
			commonShader: true,
			shader: function (inputs, shaderSource) {
				shaderSource.vertex = [
					'precision mediump float;',

					'attribute vec4 position;',
					'attribute vec2 texCoord;',

					'uniform vec2 resolution;',
					'uniform vec2 layerResolution;',
					'uniform mat4 transform;',

					'varying vec2 vTexCoord;',

					'void main(void) {',
					// first convert to screen space
					'	vec4 screenPosition = vec4(position.xy * layerResolution / 2.0, position.z, position.w);',
					'	screenPosition = transform * screenPosition;',

					// convert back to OpenGL coords
					'	gl_Position.xy = screenPosition.xy * 2.0 / layerResolution;',
					'	gl_Position.z = screenPosition.z * 2.0 / (layerResolution.x / layerResolution.y);',
					'	gl_Position.xy *= layerResolution / resolution;',
					'	gl_Position.w = screenPosition.w;',
					'	vTexCoord = texCoord;',
					'}\n'
				].join('\n');

				shaderSource.fragment = [
					'precision mediump float;',
					'varying vec2 vTexCoord;',
					'uniform sampler2D source;',
					'uniform float opacity;',
					'void main(void) {',
					'	if (any(lessThan(vTexCoord, vec2(0.0))) || any(greaterThanEqual(vTexCoord, vec2(1.0)))) {',
					'		gl_FragColor = vec4(0.0);',
					'	} else {',
					'		gl_FragColor = texture2D(source, vTexCoord);',
					'		gl_FragColor *= opacity;',
					'	}',
					'}'
				].join('\n');

				return shaderSource;
			},
			requires: function (sourceName, inputs) {
				var a, index = count;

				a = intRegex.exec(this.inputs.sizeMode);
				if (a) {
					index = parseInt(a[0], 10);
				}
				if (index >= count) {
					return false;
				}

				return !!(inputs[sourceName] && inputs['opacity' + index]);
			},
			draw: function (shader, model, uniforms, frameBuffer, draw) {
				var i,
					opacity,
					source,
					gl = this.gl;

				//clear in case we have no layers to draw
				gl.viewport(0, 0, this.width, this.height);
				gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
				gl.clearColor(0.0, 0.0, 0.0, 0.0);
				gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

				for (i = 0; i < count; i++) {
					source = this.inputs['source' + i];
					opacity = this.inputs['opacity' + i];

					//don't draw if layer is disconnected or opacity is 0
					if (source && opacity) {
						uniforms.opacity = opacity;
						uniforms.layerResolution[0] = source.width;
						uniforms.layerResolution[1] = source.height;
						uniforms.source = source;
						uniforms.transform = source.cumulativeMatrix || identity;

						draw(shader, model, uniforms, frameBuffer, null, topOpts);
					}
				}
			},
			inputs: inputs
		};
	},
	{
		inPlace: true,
		description: 'Multiple layers',
		title: 'Layers'
	});
}));
