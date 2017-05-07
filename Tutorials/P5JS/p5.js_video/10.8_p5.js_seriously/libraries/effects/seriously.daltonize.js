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
		var Seriously = root.Seriously;
		if (!Seriously) {
			Seriously = { plugin: function (name, opt) { this[name] = opt; } };
		}
		factory(Seriously);
	}
}(window, function (Seriously) {
	'use strict';

//todo: add Simulate mode http://mudcu.be/labs/Color/Vision/Javascript/Color.Vision.Simulate.js

/*
* Daltonization algorithm from:
* Digital Video Colourmaps for Checking the Legibility of Displays by Dichromats
* http://vision.psychol.cam.ac.uk/jdmollon/papers/colourmaps.pdf
*
* JavaScript implementation:
* http://mudcu.be/labs/Color/Vision/Javascript/Color.Vision.Daltonize.js
*
* Copyright (c) 2013 David Lewis, British Broadcasting Corporation
* (http://www.bbc.co.uk)
*
* MIT Licence:
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:

* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.

* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
* 
	*/
	Seriously.plugin('daltonize', {
		commonShader: true,
		shader: function (inputs, shaderSource) {
			//Vertex shader
			shaderSource.vertex = [
				'precision mediump float;',

				'attribute vec3 position;',
				'attribute vec2 texCoord;',

				'uniform mat4 transform;',

				'varying vec2 vTexCoord;',

				'void main(void) {',
				'	gl_Position = transform * vec4(position, 1.0);',
				'	vTexCoord = vec2(texCoord.s, texCoord.t);',
				'}'
			].join('\n');
			//Fragment shader
			shaderSource.fragment = [
				'precision mediump float;',

				'varying vec2 vTexCoord;',

				'uniform sampler2D source;',
				'uniform float cbtype;',

				'void main(void) {',
				'	vec4 color = texture2D(source, vTexCoord);',

				//No change, skip the rest
				'	if (cbtype == 0.0) {',
				'		gl_FragColor = color;',
				'		return;',
				'	}',

				// RGB to LMS matrix conversion
				'	const mat3 RGBLMS = mat3( ' +
				'		17.8824, 43.5161, 4.11935,' +
				'		3.45565, 27.1554, 3.86714,' +
				'		0.0299566, 0.184309, 1.46709' +
				'	);',
				'	vec3 LMS = color.rgb * RGBLMS;',

				'	vec3 lms = vec3(0.0,0.0,0.0);',
				//Protanope
				'	if (cbtype < 0.33) {',
				'		lms = vec3(	' +
				'			(2.02344 * LMS.g) + (-2.52581 * LMS.b),' +
				'			LMS.g,' +
				'			LMS.b' +
				'		);',
				'	}',
				//Deuteranope
				'	if (cbtype > 0.33 && cbtype < 0.66) {',
				'		lms = vec3(	' +
				'			LMS.r,' +
				'			(0.494207 * LMS.r) + (1.24827 * LMS.b),' +
				'			LMS.b' +
				'		);',
				'	}',
				//Tritanope
				'	if (cbtype > 0.66) {',
				'		lms = vec3(	' +
				'			LMS.r,' +
				'			LMS.g,' +
				'			(-0.395913 * LMS.r) + (0.801109 * LMS.g)' +
				'		);',
				'	}',

				// LMS to RGB matrix operation
				'	const mat3 LMSRGB = mat3(    ' +
				'		0.0809444479, -0.130504409, 0.116721066,' +
				'		-0.0102485335, 0.0540193266, -0.113614708,' +
				'		-0.000365296938, -0.00412161469, 0.693511405' +
				'	);',

				'	vec3 RGB = lms * LMSRGB;',

				// Colour shift
				// values may go over 1.0 but will get automatically clamped on output	
				'	RGB.rgb = color.rgb - RGB.rgb;',
				'	RGB.g = 0.7*RGB.r + RGB.g;',
				'	RGB.b = 0.7*RGB.r + RGB.b;',
				'	color.rgb = color.rgb + RGB.rgb;',

				//Output
				'	gl_FragColor = color;',

				'}'
			].join('\n');
			return shaderSource;
		},
		inPlace: true,
		inputs: {
			source: {
				type: 'image',
				uniform: 'source'
			},
			type: {
				title: 'Type',
				type: 'enum',
				uniform: 'cbtype',
				defaultValue: '0.2',
				options: [
					['0.0', 'Off'],
					['0.2', 'Protanope'],
					['0.6', 'Deuteranope'],
					['0.8', 'Tritanope']
				]
			}
		},
		title: 'Daltonize',
		description: 'Add contrast to colours to assist CVD (colour-blind) users.'
	});
}));