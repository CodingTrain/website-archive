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

	Seriously.plugin('color', function () {
		var me = this,
			drawOpts = {
				width: 1,
				height: 1
			},
			colorDirty = true;

		function resize() {
			me.resize();
		}

		/*
		Similar to the EffectNode prototype resize method, but does not resize the FrameBuffer
		*/
		this.resize = function () {
			var width,
				height,
				i,
				target;

			if (this.inputs && this.inputs.width) {
				width = this.inputs.width;
				height = this.inputs.height || width;
			} else if (this.inputs && this.inputs.height) {
				width = height = this.inputs.height;
			} else {
				width = 1;
				height = 1;
			}

			width = Math.floor(width);
			height = Math.floor(height);

			if (this.width !== width || this.height !== height) {
				this.width = width;
				this.height = height;

				this.emit('resize');
				this.setDirty();
			}

			for (i = 0; i < this.targets.length; i++) {
				target = this.targets[i];
				target.resize();
				if (target.setTransformDirty) {
					target.setTransformDirty();
				}
			}
		};

		return {
			initialize: function (initialize) {
				/*
				No reason to use anything bigger than 1x1, since it's a single color.
				This should make look-ups on this texture very fast
				*/
				this.frameBuffer = new Seriously.util.FrameBuffer(this.gl, 1, 1);
				resize();
				colorDirty = true;
			},
			commonShader: true,
			shader: function(inputs, shaderSource) {
				shaderSource.vertex = [
					'precision mediump float;',

					'attribute vec4 position;',

					'void main(void) {',
					'	gl_Position = position;',
					'}\n'
				].join('\n');
				shaderSource.fragment = [
					'precision mediump float;\n',

					'uniform vec4 color;',

					'void main(void) {',
					'	gl_FragColor = color;',
					'}'
				].join('\n');
				return shaderSource;
			},
			draw: function (shader, model, uniforms, frameBuffer, draw) {
				/*
				Node will be dirty if size changes, but we only need to redraw if
				the color changes...not that it matters much, since we're only drawing
				a single pixel.
				*/
				if (colorDirty) {
					draw(shader, model, uniforms, frameBuffer, null, drawOpts);
					colorDirty = false;
				}
			},
			inPlace: true,
			inputs: {
				color: {
					type: 'color',
					uniform: 'color',
					defaultValue: [0, 0, 0, 1],
					update: function () {
						colorDirty = true;
					}
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
		title: 'Color',
		description: 'Generate color',
		categories: ['generator']
	});
}));
