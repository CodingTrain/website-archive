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

	var intRegex = /\d+/;

	Seriously.plugin('select', function (options) {
		var count,
			me = this,
			i,
			inputs;

		function resize() {
			me.resize();
		}

		function update() {
			var i = me.inputs.active,
				source;

			source = me.inputs['source' + i];
			me.texture = source && source.texture;

			resize();
		}

		if (typeof options === 'number' && options >= 2) {
			count = options;
		} else {
			count = options && options.count || 4;
			count = Math.max(2, count);
		}

		inputs = {
			active: {
				type: 'number',
				step: 1,
				min: 0,
				max: count - 1,
				defaultValue: 0,
				update: update,
				updateSources: true
			},
			sizeMode: {
				type: 'enum',
				defaultValue: '0',
				options: [
					'union',
					'intersection',
					'active'
				],
				update: resize
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
			} else if (mode === 'active') {
				i = this.inputs.active;
				source = this.inputs['source' + i];
				width = Math.max(1, source && source.width || 1);
				height = Math.max(1, source && source.height || 1);
			} else {
				width = 1;
				height = 1;
				n = count - 1;
				a = intRegex.exec(this.inputs.sizeMode);
				if (a) {
					n = Math.min(parseInt(a[0], 10), n);
				}

				for (i = 0; i <= n; i++) {
					source = this.inputs['source' + i];
					if (source) {
						width = source.width;
						height = source.height;
						break;
					}
				}
			}

			if (this.width !== width || this.height !== height) {
				this.width = width;
				this.height = height;

				this.emit('resize');
				this.setDirty();
			}

			for (i = 0; i < this.targets.length; i++) {
				this.targets[i].resize();
			}
		};

		return {
			initialize: function () {
				this.initialized = true;
				this.shaderDirty = false;
			},
			requires: function (sourceName) {
				return !!(this.inputs[sourceName] && sourceName === 'source' + this.inputs.active);
			},

			//check the source texture on every draw just in case the source nodes pulls
			//shenanigans with its texture.
			draw: function () {
				var i = me.inputs.active,
					source;

				source = me.inputs['source' + i];
				me.texture = source && source.texture;
			},
			inputs: inputs
		};
	},
	{
		title: 'Select',
		description: 'Select a single source image from a list of source nodes.',
		inPlace: false,
		commonShader: true
	});
}));
