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
		mat4 = Seriously.util.mat4;

	Seriously.plugin('repeat', function () {
		var drawOpts = {
				clear: false
			},
			transform = new Float32Array(16),
			me = this;

		function resize() {
			me.resize();
		}

		// custom resize method
		this.resize = function () {
			var width = this.width,
				height = this.height,
				source = me.inputs.source,
				i;

			if (this.source) {
				width = this.source.width;
				height = this.source.height;
			} else if (this.sources && this.sources.source) {
				width = this.sources.source.width;
				height = this.sources.source.height;
			} else {
				width = 1;
				height = 1;
			}

			if (me.inputs.width) {
				width = me.inputs.width;
				if (me.inputs.height) {
					height = me.inputs.height;
				} else if (source) {
					//match source aspect ratio
					height = width * source.height / source.width;
				}
			} else if (me.inputs.height) {
				height = me.inputs.height;
				if (source) {
					//match source aspect ratio
					width = height * source.width / source.height;
				}
			}

			width = Math.floor(width);
			height = Math.floor(height);

			if (source) {
				this.uniforms.resolution[0] = source.width;
				this.uniforms.resolution[1] = source.height;
			}

			if (this.width !== width || this.height !== height) {
				this.width = width;
				this.height = height;

				this.uniforms.targetRes[0] = this.width;
				this.uniforms.targetRes[1] = this.height;

				if (this.frameBuffer) {
					this.frameBuffer.resize(this.width, this.height);
				}

				this.emit('resize');
				this.setDirty();
			}

			for (i = 0; i < this.targets.length; i++) {
				this.targets[i].resize();
			}
		};

		this.uniforms.targetRes = [1, 1];

		return {
			initialize: function (initialize) {
				initialize();
				this.uniforms.transform = transform;
			},
			commonShader: true,
			shader: function (inputs, shaderSource) {
				shaderSource.vertex = [
					'precision mediump float;',

					'attribute vec4 position;',
					'attribute vec2 texCoord;',

					'uniform vec2 resolution;',
					'uniform vec2 targetRes;',
					'uniform mat4 transform;',

					'varying vec2 vTexCoord;',

					'void main(void) {',
					// first convert to screen space
					'	vec4 screenPosition = vec4(position.xy * resolution / 2.0, position.z, position.w);',
					'	screenPosition = transform * screenPosition;',

					// convert back to OpenGL coords
					'	gl_Position = screenPosition;',
					'	gl_Position.xy = screenPosition.xy * 2.0 / resolution;',
					'	gl_Position.z = screenPosition.z * 2.0 / (resolution.x / resolution.y);',
					'	gl_Position.xy *= resolution / targetRes;',
					'	vTexCoord = texCoord;',
					'}\n'
				].join('\n');
				return shaderSource;
			},
			draw: function (shader, model, uniforms, frameBuffer, draw) {
				var i,
					source = this.inputs.source,
					transform = this.inputs.transform,
					transformMatrix = transform && transform.cumulativeMatrix,
					repeat = this.inputs.repeat,
					gl = this.gl;

				if (transformMatrix && transform.transformed) {
					mat4.copy(uniforms.transform, source && source.cumulativeMatrix || identity);
				} else {
					repeat = Math.min(repeat, 1);
				}

				// first, clear
				gl.viewport(0, 0, this.width, this.height);
				gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
				gl.clearColor(0.0, 0.0, 0.0, 0.0);
				gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

				for (i = repeat - 1; i >= 0; i--) {
					draw(shader, model, uniforms, frameBuffer, null, drawOpts);
					if (i) {
						mat4.multiply(uniforms.transform, transformMatrix, uniforms.transform);
					}
				}
			},
			inputs: {
				source: {
					type: 'image',
					uniform: 'source',
					update: function () {
						resize();
						this.uniforms.transform = transform;
					}
				},
				transform: {
					type: 'image'
				},
				repeat: {
					type: 'number',
					step: 1,
					min: 0,
					defaultValue: 8
				},
				width: {
					type: 'number',
					min: 0,
					step: 1,
					update: resize,
					defaultValue: 0
				},
				height: {
					type: 'number',
					min: 0,
					step: 1,
					update: resize,
					defaultValue: 0
				}
			}
		};
	},
	{
		inPlace: true,
		description: 'Draw image multiple times, transforming each time',
		title: 'Repeat'
	});
}));
