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

	Seriously.plugin('panorama', function () {
		var me = this;

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
				this.uniforms.resolution[0] = width;
				this.uniforms.resolution[1] = height;
			}

			if (this.width !== width || this.height !== height) {
				this.width = width;
				this.height = height;

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

		return {
			shader: function (inputs, shaderSource) {
				shaderSource.fragment = [
					'precision mediump float;',

					'varying vec2 vTexCoord;',

					'uniform vec2 resolution;',
					'uniform sampler2D source;',

					'uniform float fov;',
					'uniform float yaw;',
					'uniform float pitch;',

					'const float M_PI = 3.141592653589793238462643;',
					'const float M_TWOPI = 6.283185307179586476925286;',

					'mat3 rotationMatrix(vec2 euler) {',
					'	vec2 se = sin(euler);',
					'	vec2 ce = cos(euler);',

					'	return mat3(ce.x, 0, -se.x, 0, 1, 0, se.x, 0, ce.x) * ',
					'			mat3(1, 0, 0, 0, ce.y, -se.y, 0, se.y, ce.y);',
					'}',

					'vec3 toCartesian( vec2 st ) {',
					'	return normalize(vec3(st.x, st.y, 0.5 / tan(0.5 * radians(fov))));',
					'}',

					'vec2 toSpherical(vec3 cartesianCoord) {',
					'	vec2 st = vec2(',
					'		atan(cartesianCoord.x, cartesianCoord.z),',
					'		acos(cartesianCoord.y)',
					'	);',
					'	if(st.x < 0.0)',
					'		st.x += M_TWOPI;',

					'	return st;',
					'}',

					'void main(void) {',
					'	vec2 sphericalCoord = gl_FragCoord.xy / resolution - vec2(0.5);',
					'	sphericalCoord.y *= -resolution.y / resolution.x;',

					'	vec3 cartesianCoord = rotationMatrix(radians(vec2(yaw + 180., -pitch))) * toCartesian(sphericalCoord);',

					'	gl_FragColor = texture2D(source, toSpherical( cartesianCoord )/vec2(M_TWOPI, M_PI));',
					'}'
				].join('\n');
				return shaderSource;
			},
			inPlace: false,
			inputs: {
				source: {
					type: 'image',
					uniform: 'source',
					shaderDirty: false
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
				},
				yaw: {
					type: 'number',
					uniform: 'yaw',
					min: 0,
					max: 360,
					defaultValue: 0
				},
				fov: {
					type: 'number',
					uniform: 'fov',
					min: 0,
					max: 180,
					defaultValue: 80
				},
				pitch: {
					type: 'number',
					uniform: 'pitch',
					min: -90,
					max: 90,
					defaultValue: 0
				}
			}
		};
	}, {
		commonShader: true,
		title: 'Panorama'
	});
}));
