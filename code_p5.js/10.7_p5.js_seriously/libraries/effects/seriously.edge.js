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

	//	Adapted from http://rastergrid.com/blog/2011/01/frei-chen-edge-detector/
	var sqrt = Math.sqrt,
		i, j,
		flatMatrices = [],
		matrices,
		freiChenMatrixConstants,
		sobelMatrixConstants;

	//initialize shader matrix arrays
	function multiplyArray(factor, a) {
		var i;
		for (i = 0; i < a.length; i++) {
			a[i] *= factor;
		}
		return a;
	}

	matrices = [
		multiplyArray(1.0 / (2.0 * sqrt(2.0)), [ 1.0, sqrt(2.0), 1.0, 0.0, 0.0, 0.0, -1.0, -sqrt(2.0), -1.0 ]),
		multiplyArray(1.0 / (2.0 * sqrt(2.0)), [1.0, 0.0, -1.0, sqrt(2.0), 0.0, -sqrt(2.0), 1.0, 0.0, -1.0]),
		multiplyArray(1.0 / (2.0 * sqrt(2.0)), [0.0, -1.0, sqrt(2.0), 1.0, 0.0, -1.0, -sqrt(2.0), 1.0, 0.0]),
		multiplyArray(1.0 / (2.0 * sqrt(2.0)), [sqrt(2.0), -1.0, 0.0, -1.0, 0.0, 1.0, 0.0, 1.0, -sqrt(2.0)]),
		multiplyArray(1.0 / 2.0, [0.0, 1.0, 0.0, -1.0, 0.0, -1.0, 0.0, 1.0, 0.0]),
		multiplyArray(1.0 / 2.0, [-1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, -1.0]),
		multiplyArray(1.0 / 6.0, [1.0, -2.0, 1.0, -2.0, 4.0, -2.0, 1.0, -2.0, 1.0]),
		multiplyArray(1.0 / 6.0, [-2.0, 1.0, -2.0, 1.0, 4.0, 1.0, -2.0, 1.0, -2.0]),
		multiplyArray(1.0 / 3.0, [1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0])
	];

	for (i = 0; i < matrices.length; i++) {
		for (j = 0; j < matrices[i].length; j++) {
			flatMatrices.push(matrices[i][j]);
		}
	}

	freiChenMatrixConstants = new Float32Array(flatMatrices);

	sobelMatrixConstants = new Float32Array([
		1.0, 2.0, 1.0, 0.0, 0.0, 0.0, -1.0, -2.0, -1.0,
		1.0, 0.0, -1.0, 2.0, 0.0, -2.0, 1.0, 0.0, -1.0
	]);

	Seriously.plugin('edge', {
		initialize: function (initialize) {
			initialize();

			this.uniforms.pixelWidth = 1 / this.width;
			this.uniforms.pixelHeight = 1 / this.height;

			if (this.inputs.mode === 'sobel') {
				this.uniforms.G = sobelMatrixConstants;
			} else {
				this.uniforms.G = freiChenMatrixConstants;
			}
		},
		shader: function (inputs, shaderSource) {
			var defines;

			if (inputs.mode === 'sobel') {
				defines = '#define N_MATRICES 2\n' +
					'#define SOBEL\n';
			} else {
				//frei-chen
				defines = '#define N_MATRICES 9\n';
			}

			shaderSource.fragment = [
				defines,
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform float pixelWidth;',
				'uniform float pixelHeight;',
				'uniform mat3 G[9];',

				'void main(void) {',
				'	mat3 I;',
				'	float dp3, cnv[9];',
				'	vec3 tc;',

				// fetch the 3x3 neighbourhood and use the RGB vector's length as intensity value
				'	float fi = 0.0, fj = 0.0;',
				'	for (int i = 0; i < 3; i++) {',
				'		fj = 0.0;',
				'		for (int j = 0; j < 3; j++) {',
				'			I[i][j] = length( ' +
							'texture2D(source, ' +
								'vTexCoord + vec2((fi - 1.0) * pixelWidth, (fj - 1.0) * pixelHeight)' +
							').rgb );',
				'			fj += 1.0;',
				'		};',
				'		fi += 1.0;',
				'	};',

				// calculate the convolution values for all the masks

				'	for (int i = 0; i < N_MATRICES; i++) {',
				'		dp3 = dot(G[i][0], I[0]) + dot(G[i][1], I[1]) + dot(G[i][2], I[2]);',
				'		cnv[i] = dp3 * dp3;',
				'	};',

				//Sobel
				'#ifdef SOBEL',
				'	tc = vec3(0.5 * sqrt(cnv[0]*cnv[0]+cnv[1]*cnv[1]));',
				'#else',

				//Frei-Chen
				// Line detector
				'	float M = (cnv[4] + cnv[5]) + (cnv[6] + cnv[7]);',
				'	float S = (cnv[0] + cnv[1]) + (cnv[2] + cnv[3]) + (cnv[4] + cnv[5]) + (cnv[6] + cnv[7]) + cnv[8];',
				'	tc = vec3(sqrt(M/S));',
				'#endif',

				'	gl_FragColor = vec4(tc, 1.0);',
				'}'
			].join('\n');

			return shaderSource;
		},
		resize: function () {
			this.uniforms.pixelWidth = 1 / this.width;
			this.uniforms.pixelHeight = 1 / this.height;
		},
		inputs: {
			source: {
				type: 'image',
				uniform: 'source'
			},
			mode: {
				type: 'enum',
				shaderDirty: true,
				defaultValue: 'sobel',
				options: [
					['sobel', 'Sobel'],
					['frei-chen', 'Frei-Chen']
				],
				update: function () {
					if (this.inputs.mode === 'sobel') {
						this.uniforms.G = sobelMatrixConstants;
					} else {
						this.uniforms.G = freiChenMatrixConstants;
					}
				}
			}
		},
		description: 'Edge Detect',
		title: 'Edge Detect'
	});
}));
