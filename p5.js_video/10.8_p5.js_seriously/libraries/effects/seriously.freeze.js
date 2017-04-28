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

	Seriously.plugin('freeze', {
		draw: function (shader, model, uniforms, frameBuffer, draw) {
			if (!this.inputs.frozen) {
				draw(shader, model, uniforms, frameBuffer);
			}
		},
		requires: function () {
			return !this.inputs.frozen;
		},
		inPlace: true,
		inputs: {
			source: {
				type: 'image',
				uniform: 'source'
			},
			frozen: {
				type: 'boolean',
				defaultValue: false,
				updateSources: true
			}
		},
		title: 'Freeze',
		description: 'Freeze Frame'
	});
}));
