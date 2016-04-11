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

	Seriously.plugin('crop', function () {
		var me = this;

		// custom resize method
		function resize() {
			var width = 1,
				height = 1,
				source = me.inputs.source,
				target,
				i;

			if (me.source) {
				width = me.source.width;
				height = me.source.height;
			} else if (me.sources && me.sources.source) {
				width = me.sources.source.width;
				height = me.sources.source.height;
			}

			width = width - me.inputs.left - me.inputs.right;
			height = height - me.inputs.top - me.inputs.bottom;

			width = Math.max(1, Math.floor(width));
			height = Math.max(1, Math.floor(height));


			if (me.width !== width || me.height !== height) {
				me.width = width;
				me.height = height;

				me.uniforms.resolution[0] = width;
				me.uniforms.resolution[1] = height;

				if (me.frameBuffer) {
					me.frameBuffer.resize(me.width, me.height);
				}

				me.emit('resize');
				me.setDirty();
			}

			for (i = 0; i < me.targets.length; i++) {
				target = me.targets[i];
				target.resize();
				if (target.setTransformDirty) {
					target.setTransformDirty();
				}
			}
		}

		me.resize = resize;

		return {
			commonShader: true,
			shader: function (inputs, shaderSource) {
				shaderSource.vertex = [
					'precision mediump float;',

					'attribute vec4 position;',
					'attribute vec2 texCoord;',

					'uniform vec2 resolution;',
					'uniform mat4 transform;',

					'uniform float top;',
					'uniform float left;',
					'uniform float bottom;',
					'uniform float right;',

					'varying vec2 vTexCoord;',

					'const vec2 ZERO = vec2(0.0);',
					'const vec2 ONE = vec2(1.0);',

					'void main(void) {',
					// first convert to screen space
					'	vec4 screenPosition = vec4(position.xy * resolution / 2.0, position.z, position.w);',
					'	screenPosition = transform * screenPosition;',

					// convert back to OpenGL coords
					'	gl_Position.xy = screenPosition.xy * 2.0 / resolution;',
					'	gl_Position.z = screenPosition.z * 2.0 / (resolution.x / resolution.y);',
					'	gl_Position.w = screenPosition.w;',

					'	vec2 dim = resolution + vec2(right + left, bottom + top);',
					'	vec2 scale = dim / resolution;',
					'	vec2 offset = vec2(left, bottom) / resolution;',

					'	vTexCoord = max(ZERO, (texCoord + offset) / scale);',
					'}\n'
				].join('\n');
				return shaderSource;
			},
			inputs: {
				source: {
					type: 'image',
					uniform: 'source',
					update: resize
				},
				top: {
					type: 'number',
					uniform: 'top',
					min: 0,
					step: 1,
					update: resize,
					defaultValue: 0
				},
				left: {
					type: 'number',
					uniform: 'left',
					min: 0,
					step: 1,
					update: resize,
					defaultValue: 0
				},
				bottom: {
					type: 'number',
					uniform: 'bottom',
					min: 0,
					step: 1,
					update: resize,
					defaultValue: 0
				},
				right: {
					type: 'number',
					uniform: 'right',
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
		title: 'Crop'
	});
}));
