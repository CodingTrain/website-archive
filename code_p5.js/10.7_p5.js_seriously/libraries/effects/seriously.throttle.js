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

	Seriously.plugin('throttle', function () {
		var lastDrawTime = 0;
		return {
			draw: function (shader, model, uniforms, frameBuffer, draw) {
				if (this.inputs.frameRate && Date.now() - lastDrawTime >= 1000 / this.inputs.frameRate) {
					draw(shader, model, uniforms, frameBuffer);
					lastDrawTime = Date.now();
				}
			},
			requires: function (sourceName, inputs) {
				if (inputs.frameRate && Date.now() - lastDrawTime >= 1000 / inputs.frameRate) {
					return true;
				}

				return false;
			}
		};
	}, {
		inPlace: true,
		commonShader: true,
		title: 'Throttle',
		description: 'Throttle frame rate',
		inputs: {
			source: {
				type: 'image',
				uniform: 'source'
			},
			frameRate: {
				type: 'number',
				uniform: 'opacity',
				defaultValue: 15,
				min: 0
			}
		}
	});
}));
