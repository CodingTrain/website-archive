/*jslint devel: true, bitwise: true, browser: true, white: true, nomen: true, plusplus: true, maxerr: 50, indent: 4, todo: true */
/*global Float32Array, Uint8Array, Uint16Array, WebGLTexture, HTMLInputElement, HTMLSelectElement, HTMLElement, WebGLFramebuffer, HTMLCanvasElement, WebGLRenderingContext, define, module, exports */
(function (root, factory) {
	'use strict';
	if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define('seriously', function () {
			var Seriously = factory(root);
			if (!root.Seriously) {
				root.Seriously = Seriously;
			}
			return Seriously;
		});
	} else if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like enviroments that support module.exports,
		// like Node.
		module.exports = factory(root);
	} else if (typeof root.Seriously !== 'function') {
		// Browser globals
		root.Seriously = factory(root);
	}
}(window, function (window) {
	'use strict';

	var document = window.document,
		console = window.console,

	/*
		Global-ish look-up variables
	*/

	testContext,
	colorCtx,
	incompatibility,
	seriousEffects = {},
	seriousTransforms = {},
	seriousSources = {},
	seriousTargets = {},
	timeouts = [],
	allEffectsByHook = {},
	allTransformsByHook = {},
	allSourcesByHook = {
		canvas: [],
		image: [],
		video: []
	},
	allTargetsByHook = {},
	allTargets = window.WeakMap && new WeakMap(),
	identity,
	maxSeriouslyId = 0,
	nop = function () {},
	noVideoTextureSupport,

	/*
		Global reference variables
	*/

	// http://www.w3.org/TR/css3-color/#svg-color
	colorNames = {
		transparent: [0, 0, 0, 0],
		black: [0, 0, 0, 1],
		red: [1, 0, 0, 1],
		green: [0, 128 / 255, 0, 1],
		blue: [0, 0, 1, 1],
		white: [1, 1, 1, 1],
		silver: [192 / 255, 192 / 255, 192 / 255, 1],
		gray: [128 / 255, 128 / 255, 128 / 255, 1],
		maroon: [128 / 255, 0, 0, 1],
		purple: [128 / 255, 0, 128 / 255, 1],
		fuchsia: [1, 0, 1, 1],
		lime: [0, 1, 0, 1],
		olive: [128 / 255, 128 / 255, 0, 1],
		yellow: [1, 1, 0, 1],
		navy: [0, 0, 128 / 255, 1],
		teal: [0, 128 / 255, 128 / 255, 1],
		aqua: [0, 1, 1, 1],
		orange: [1, 165 / 255, 0, 1]
	},

	colorRegex = /^(rgb|hsl)a?\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(,\s*(\d+(\.\d*)?)\s*)?\)/i,
	hexColorRegex = /^#(([0-9a-fA-F]{3,8}))/,

	vectorFields = ['x', 'y', 'z', 'w'],
	colorFields = ['r', 'g', 'b', 'a'],

	outputRenderOptions = {
		srcRGB: 0x0302, //SRC_ALPHA
		dstRGB: 0x0303, //ONE_MINUS_SRC_ALPHA
		srcAlpha: 0x01, //ONE
		dstAlpha: 0x0303 //ONE_MINUS_SRC_ALPHA
	},

	shaderDebugConstants = [
		'MAX_COMBINED_TEXTURE_IMAGE_UNITS',
		'MAX_FRAGMENT_UNIFORM_VECTORS',
		'MAX_TEXTURE_IMAGE_UNITS',
		'MAX_VARYING_VECTORS',
		'MAX_VERTEX_ATTRIBS',
		'MAX_VERTEX_TEXTURE_IMAGE_UNITS',
		'MAX_VERTEX_UNIFORM_VECTORS'
	],

	shaderNameRegex = /^[\t ]*#define[\t ]+SHADER_NAME\s+([^$\n\r]+)/i,

	baseVertexShader,
	baseFragmentShader,

	/*
		utility functions
	*/

	/*
	mat4 matrix functions borrowed from gl-matrix by toji
	https://github.com/toji/gl-matrix
	License: https://github.com/toji/gl-matrix/blob/master/LICENSE.md
	*/
	mat4 = {
		/*
		 * mat4.frustum
		 * Generates a frustum matrix with the given bounds
		 *
		 * Params:
		 * left, right - scalar, left and right bounds of the frustum
		 * bottom, top - scalar, bottom and top bounds of the frustum
		 * near, far - scalar, near and far bounds of the frustum
		 * dest - Optional, mat4 frustum matrix will be written into
		 *
		 * Returns:
		 * dest if specified, a new mat4 otherwise
		 */
		frustum: function (left, right, bottom, top, near, far, dest) {
			if(!dest) { dest = mat4.create(); }
			var rl = (right - left),
				tb = (top - bottom),
				fn = (far - near);
			dest[0] = (near*2) / rl;
			dest[1] = 0;
			dest[2] = 0;
			dest[3] = 0;
			dest[4] = 0;
			dest[5] = (near*2) / tb;
			dest[6] = 0;
			dest[7] = 0;
			dest[8] = (right + left) / rl;
			dest[9] = (top + bottom) / tb;
			dest[10] = -(far + near) / fn;
			dest[11] = -1;
			dest[12] = 0;
			dest[13] = 0;
			dest[14] = -(far*near*2) / fn;
			dest[15] = 0;
			return dest;
		},

		perspective: function (fovy, aspect, near, far, dest) {
			var top = near*Math.tan(fovy*Math.PI / 360.0),
				right = top*aspect;
			return mat4.frustum(-right, right, -top, top, near, far, dest);
		},
		multiply: function (dest, mat, mat2) {
			// Cache the matrix values (makes for huge speed increases!)
			var a00 = mat[0], a01 = mat[1], a02 = mat[2], a03 = mat[3],
				a10 = mat[4], a11 = mat[5], a12 = mat[6], a13 = mat[7],
				a20 = mat[8], a21 = mat[9], a22 = mat[10], a23 = mat[11],
				a30 = mat[12], a31 = mat[13], a32 = mat[14], a33 = mat[15],

			// Cache only the current line of the second matrix
			b0 = mat2[0], b1 = mat2[1], b2 = mat2[2], b3 = mat2[3];
			dest[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
			dest[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
			dest[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
			dest[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

			b0 = mat2[4];
			b1 = mat2[5];
			b2 = mat2[6];
			b3 = mat2[7];
			dest[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
			dest[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
			dest[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
			dest[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

			b0 = mat2[8];
			b1 = mat2[9];
			b2 = mat2[10];
			b3 = mat2[11];
			dest[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
			dest[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
			dest[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
			dest[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

			b0 = mat2[12];
			b1 = mat2[13];
			b2 = mat2[14];
			b3 = mat2[15];
			dest[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
			dest[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
			dest[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
			dest[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

			return dest;
		},
		identity: function (dest) {
			dest[0] = 1;
			dest[1] = 0;
			dest[2] = 0;
			dest[3] = 0;
			dest[4] = 0;
			dest[5] = 1;
			dest[6] = 0;
			dest[7] = 0;
			dest[8] = 0;
			dest[9] = 0;
			dest[10] = 1;
			dest[11] = 0;
			dest[12] = 0;
			dest[13] = 0;
			dest[14] = 0;
			dest[15] = 1;
			return dest;
		},
		copy: function (out, a) {
			out[0] = a[0];
			out[1] = a[1];
			out[2] = a[2];
			out[3] = a[3];
			out[4] = a[4];
			out[5] = a[5];
			out[6] = a[6];
			out[7] = a[7];
			out[8] = a[8];
			out[9] = a[9];
			out[10] = a[10];
			out[11] = a[11];
			out[12] = a[12];
			out[13] = a[13];
			out[14] = a[14];
			out[15] = a[15];
			return out;
		}
	},

	requestAnimationFrame = (function (){
		var lastTime = 0;
		return  window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					var currTime, timeToCall, id;

					function timeoutCallback() {
						callback(currTime + timeToCall);
					}

					currTime = new Date().getTime();
					timeToCall = Math.max(0, 16 - (currTime - lastTime));
					id = window.setTimeout(timeoutCallback, timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
	}()),

	cancelAnimFrame = (function (){
		return  window.cancelAnimationFrame ||
				window.webkitCancelAnimationFrame ||
				window.mozCancelAnimationFrame ||
				window.oCancelAnimationFrame ||
				window.msCancelAnimationFrame ||
				function (id) {
					window.cancelTimeout(id);
				};
	}()),

	reservedEffectProperties = [
		'alias',
		'destroy',
		'effect',
		'id',
		'initialize',
		'inputs',
		'isDestroyed',
		'isReady',
		'matte',
		'off',
		'on',
		'readPixels',
		'render',
		'title',
		'update'
	],

	reservedTransformProperties = [
		'alias',
		'destroy',
		'id',
		'inputs',
		'isDestroyed',
		'isReady',
		'off',
		'on',
		'source',
		'title',
		'update'
	],

	reservedNames = [
		'aliases',
		'defaults',
		'destroy',
		'effect',
		'go',
		'id',
		'incompatible',
		'isDestroyed',
		'isEffect',
		'isNode',
		'isSource',
		'isTarget',
		'isTransform',
		'removeAlias',
		'render',
		'source',
		'stop',
		'target',
		'transform'
	];

	function getElement(input, tags) {
		var element,
			tag;

		if (typeof input === 'string') {
			//element = document.getElementById(input) || document.getElementsByTagName(input)[0];
			element = document.querySelector(input);
		} else if (!input) {
			return false;
		}

		if (input.tagName) {
			element = input;
		}

		if (!element) {
			return input;
		}

		tag = element.tagName.toLowerCase();
		if (tags && tags.indexOf(tag) < 0) {
			return input;
		}

		return element;
	}

	function extend(dest, src) {
		var property,
			descriptor;

		//todo: are we sure this is safe?
		if (dest.prototype && src.prototype && dest.prototype !== src.prototype) {
			extend(dest.prototype, src.prototype);
		}

		for (property in src) {
			if (src.hasOwnProperty(property)) {
				descriptor = Object.getOwnPropertyDescriptor(src, property);

				if (descriptor.get || descriptor.set) {
					Object.defineProperty(dest, property, {
						configurable: true,
						enumerable: true,
						get: descriptor.get,
						set: descriptor.set
					});
				} else {
					dest[property] = src[property];
				}
			}
		}

		return dest;
	}

	function consoleMethod(name) {
		var method;
		if (!console) {
			return nop;
		}

		if (typeof console[name] === 'function') {
			method = console[name];
		} else if (typeof console.log === 'function') {
			method = console.log;
		} else {
			return nop;
		}

		if (method.bind) {
			return method.bind(console);
		}

		return function () {
			method.apply(console, arguments);
		};
	}

	/*
	Like instanceof, but it will work on elements that come from different windows (e.g. iframes)

	We do not use this for constructors defined in this script.
	*/
	function isInstance(obj, proto) {
		if (!proto) {
			proto = 'HTMLElement';
		}

		if (obj instanceof window[proto]) {
			return true;
		}

		if (!obj || typeof obj !== 'object') {
			return false;
		}

		while (obj) {
			obj = Object.getPrototypeOf(obj);
			if (obj && obj.constructor.name === proto) {
				return true;
			}
		}

		return false;
	}

	//http://www.w3.org/TR/css3-color/#hsl-color
	function hslToRgb(h, s, l, a, out) {
		function hueToRgb(m1, m2, h) {
			h = h % 1;
			if (h < 0) {
				h += 1;
			}
			if (h < 1 / 6) {
				return m1 + (m2 - m1) * h * 6;
			}
			if (h < 1 / 2) {
				return m2;
			}
			if (h < 2 / 3) {
				return m1 + (m2 - m1) * (2/3 - h) * 6;
			}
			return m1;
		}

		var m1, m2;
		if (l < 0.5) {
			m2 = l * (s + 1);
		} else {
			m2 = l + s - l * s;
		}
		m1 = l * 2 - m2;

		if (!out) {
			out = [];
		}

		out[0] = hueToRgb(m1, m2, h + 1/3);
		out[1] = hueToRgb(m1, m2, h);
		out[2] = hueToRgb(m1, m2, h - 1/3);
		out[3] = a;

		return out;
	}

	function colorArrayToHex(color) {
		var i,
			val,
			hex,
			s = '#',
			len = color[3] < 1 ? 4 : 3;

		for (i = 0; i < len; i++) {
			val = Math.min(255, Math.round(color[i] * 255 || 0));
			hex = val.toString(16);
			if (val < 16) {
				hex = '0' + hex;
			}
			s += hex;
		}
		return s;
	}

	function isArrayLike(obj) {
		return Array.isArray(obj) ||
			(obj && obj.BYTES_PER_ELEMENT && 'length' in obj);
	}

	/*
	faster than setTimeout(fn, 0);
	http://dbaron.org/log/20100309-faster-timeouts
	*/
	function setTimeoutZero(fn) {
		/*
		Workaround for postMessage bug in Firefox if the page is loaded from the file system
		https://bugzilla.mozilla.org/show_bug.cgi?id=740576
		Should run fine, but maybe a few milliseconds slower per frame.
		*/
		function timeoutFunction() {
			if (timeouts.length) {
				(timeouts.shift())();
			}
		}

		if (typeof fn !== 'function') {
			throw new Error('setTimeoutZero argument is not a function');
		}

		timeouts.push(fn);
		if (window.location.protocol === 'file:') {
			setTimeout(timeoutFunction, 0);
			return;
		}

		window.postMessage('seriously-timeout-message', window.location);
	}

	window.addEventListener('message', function (event) {
		if (event.source === window && event.data === 'seriously-timeout-message') {
			event.stopPropagation();
			if (timeouts.length > 0) {
				var fn = timeouts.shift();
				fn();
			}
		}
	}, true);

	function getWebGlContext(canvas, options) {
		var context;
		try {
			if (window.WebGLDebugUtils && options && options.debugContext) {
				context = window.WebGLDebugUtils.makeDebugContext(canvas.getContext('webgl', options));
			} else {
				context = canvas.getContext('webgl', options);
			}
		} catch (expError) {
		}

		if (!context) {
			try {
				context = canvas.getContext('experimental-webgl', options);
			} catch (error) {
			}
		}
		return context;
	}

	function getTestContext() {
		var canvas;

		if (testContext && testContext.getError() === testContext.CONTEXT_LOST_WEBGL) {
			/*
			Test context was lost already, and the webglcontextlost event maybe hasn't fired yet
			so try making a new context
			*/
			testContext = undefined;
		}

		if (testContext || !window.WebGLRenderingContext || incompatibility) {
			return testContext;
		}

		canvas = document.createElement('canvas');
		testContext = getWebGlContext(canvas);

		if (testContext) {
			canvas.addEventListener('webglcontextlost', function contextLost(event) {
				/*
				If/When context is lost, just clear testContext and create
				a new one the next time it's needed
				*/
				event.preventDefault();
				if (testContext && testContext.canvas === this) {
					testContext = undefined;
					canvas.removeEventListener('webglcontextlost', contextLost, false);
				}
			}, false);
		} else {
			Seriously.logger.warn('Unable to access WebGL.');
		}

		return testContext;
	}

	function checkSource(source) {
		var element, canvas, ctx, texture;

		//todo: don't need to create a new array every time we do this
		element = getElement(source, ['img', 'canvas', 'video']);
		if (!element) {
			return false;
		}

		canvas = document.createElement('canvas');
		if (!canvas) {
			Seriously.logger.warn('Browser does not support canvas or Seriously.js');
			return false;
		}

		if (element.naturalWidth === 0 && element.tagName === 'IMG') {
			Seriously.logger.warn('Image not loaded');
			return false;
		}

		if (element.readyState === 0 && element.videoWidth === 0 && element.tagName === 'VIDEO') {
			Seriously.logger.warn('Video not loaded');
			return false;
		}

		ctx = getTestContext();
		if (ctx) {
			texture = ctx.createTexture();
			if (!texture) {
				Seriously.logger.error('Test WebGL context has been lost');
			}

			ctx.bindTexture(ctx.TEXTURE_2D, texture);

			try {
				ctx.texImage2D(ctx.TEXTURE_2D, 0, ctx.RGBA, ctx.RGBA, ctx.UNSIGNED_BYTE, element);
			} catch (textureError) {
				if (textureError.code === window.DOMException.SECURITY_ERR) {
					Seriously.logger.log('Unable to access cross-domain image');
				} else {
					Seriously.logger.error('Error storing image to texture: ' + textureError.message);
				}
				ctx.deleteTexture(texture);
				return false;
			}
			ctx.deleteTexture(texture);
		} else {
			ctx = canvas.getContext('2d');
			try {
				ctx.drawImage(element, 0, 0);
				ctx.getImageData(0, 0, 1, 1);
			} catch (drawImageError) {
				if (drawImageError.code === window.DOMException.SECURITY_ERR) {
					Seriously.logger.log('Unable to access cross-domain image');
				} else {
					Seriously.logger.error('Error drawing image to canvas: ' + drawImageError.message);
				}
				return false;
			}
		}

		// This method will return a false positive for resources that aren't
		// actually images or haven't loaded yet

		return true;
	}

	function validateInputSpecs(plugin) {
		var input,
			options,
			name;

		function normalizeEnumOption(option, i) {
			var key,
				name;

			if (isArrayLike(option)) {
				key = option[0];
				name = option[1] || key;
			} else {
				key = option;
			}

			if (typeof key === 'string') {
				key = key.toLowerCase();
			} else if (typeof key === 'number') {
				key = String(key);
			} else if (!key) {
				key = '';
			}

			options[key] = name;

			if (!i) {
				input.firstValue = key;
			}
		}

		function passThrough(value) {
			return value;
		}

		for (name in plugin.inputs) {
			if (plugin.inputs.hasOwnProperty(name)) {
				if (plugin.reserved.indexOf(name) >= 0 || Object.prototype[name]) {
					throw new Error('Reserved input name: ' + name);
				}

				input = plugin.inputs[name];
				input.name = name;

				if (isNaN(input.min)) {
					input.min = -Infinity;
				}

				if (isNaN(input.max)) {
					input.max = Infinity;
				}

				if (isNaN(input.minCount)) {
					input.minCount = -Infinity;
				}

				if (isNaN(input.maxCount)) {
					input.maxCount = Infinity;
				}

				if (isNaN(input.step)) {
					input.step = 0;
				}

				if (isNaN(input.mod)) {
					input.mod = 0;
				}

				if (input.type === 'enum') {
					/*
					Normalize options to make validation easy
					- all items will have both a key and a name
					- all keys will be lowercase strings
					*/
					if (input.options && isArrayLike(input.options) && input.options.length) {
						options = {};
						input.options.forEach(normalizeEnumOption);
						input.options = options;
					}
				}

				if (input.type === 'vector') {
					if (input.dimensions < 2) {
						input.dimensions = 2;
					} else if (input.dimensions > 4) {
						input.dimensions = 4;
					} else if (!input.dimensions || isNaN(input.dimensions)) {
						input.dimensions = 4;
					} else {
						input.dimensions = Math.round(input.dimensions);
					}
				} else {
					input.dimensions = 1;
				}

				input.shaderDirty = !!input.shaderDirty;

				if (typeof input.validate !== 'function') {
					input.validate = Seriously.inputValidators[input.type] || passThrough;
				}

				if (!plugin.defaultImageInput && input.type === 'image') {
					plugin.defaultImageInput = name;
				}
			}
		}
	}

	/*
		helper Classes
	*/

	function FrameBuffer(gl, width, height, options) {
		var frameBuffer,
			renderBuffer,
			tex,
			status,
			useFloat = options === true ? options : (options && options.useFloat);

		useFloat = false;//useFloat && !!gl.getExtension('OES_texture_float'); //useFloat is not ready!
		if (useFloat) {
			this.type = gl.FLOAT;
		} else {
			this.type = gl.UNSIGNED_BYTE;
		}

		frameBuffer = gl.createFramebuffer();
		gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);

		if (options && options.texture) {
			this.texture = options.texture;
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			this.ownTexture = false;
		} else {
			this.texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, this.texture);
			gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			this.ownTexture = true;
		}

		try {
			if (this.type === gl.FLOAT) {
				tex = new Float32Array(width * height * 4);
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.FLOAT, tex);
			} else {
				gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
				this.type = gl.UNSIGNED_BYTE;
			}
		} catch (e) {
			// Null rejected
			this.type = gl.UNSIGNED_BYTE;
			tex = new Uint8Array(width * height * 4);
			gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, tex);
		}

		renderBuffer = gl.createRenderbuffer();
		gl.bindRenderbuffer(gl.RENDERBUFFER, renderBuffer);
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
		gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, renderBuffer);

		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);

		status = gl.checkFramebufferStatus(gl.FRAMEBUFFER);

		if (status === gl.FRAMEBUFFER_INCOMPLETE_ATTACHMENT) {
			throw new Error('Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_ATTACHMENT');
		}

		if (status === gl.FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT) {
			throw new Error('Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_MISSING_ATTACHMENT');
		}

		if (status === gl.FRAMEBUFFER_INCOMPLETE_DIMENSIONS) {
			throw new Error('Incomplete framebuffer: FRAMEBUFFER_INCOMPLETE_DIMENSIONS');
		}

		if (status === gl.FRAMEBUFFER_UNSUPPORTED) {
			throw new Error('Incomplete framebuffer: FRAMEBUFFER_UNSUPPORTED');
		}

		if (status !== gl.FRAMEBUFFER_COMPLETE) {
			throw new Error('Incomplete framebuffer: ' + status);
		}

		//clean up
		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.bindRenderbuffer(gl.RENDERBUFFER, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);

		this.gl = gl;
		this.frameBuffer = frameBuffer;
		this.renderBuffer = renderBuffer;
		this.width = width;
		this.height = height;
	}

	FrameBuffer.prototype.resize = function (width, height) {
		var gl = this.gl;

		if (this.width === width && this.height === height) {
			return;
		}

		this.width = width;
		this.height = height;

		if (!gl) {
			return;
		}

		gl.bindTexture(gl.TEXTURE_2D, this.texture);
		gl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer);
		gl.bindRenderbuffer(gl.RENDERBUFFER, this.renderBuffer);

		//todo: handle float
		gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);
		gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
		gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, this.texture, 0);

		gl.bindTexture(gl.TEXTURE_2D, null);
		gl.bindRenderbuffer(gl.RENDERBUFFER, null);
		gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	};

	FrameBuffer.prototype.destroy = function () {
		var gl = this.gl;

		if (gl) {
			gl.deleteFramebuffer(this.frameBuffer);
			gl.deleteRenderbuffer(this.renderBuffer);
			if (this.ownTexture) {
				gl.deleteTexture(this.texture);
			}
		}

		delete this.frameBuffer;
		delete this.renderBuffer;
		delete this.texture;
		delete this.gl;
	};

	/* ShaderProgram - utility class for building and accessing WebGL shaders */

	function ShaderProgram(gl, vertexShaderSource, fragmentShaderSource) {
		var program, vertexShader, fragmentShader,
			programError = '',
			shaderError,
			i, l,
			shaderNameRegexMatch,
			obj;

		function compileShader(source, fragment) {
			var shader, j;
			if (fragment) {
				shader = gl.createShader(gl.FRAGMENT_SHADER);
			} else {
				shader = gl.createShader(gl.VERTEX_SHADER);
			}

			gl.shaderSource(shader, source);
			gl.compileShader(shader);

			if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
				source = source.split(/[\n\r]/);
				for (j = 0; j < source.length; j++) {
					source[j] = (j + 1) + ':\t' + source[j];
				}
				source.unshift('Error compiling ' + (fragment ? 'fragment' : 'vertex') + ' shader:');
				Seriously.logger.error(source.join('\n'));
				throw new Error('Shader error: ' + gl.getShaderInfoLog(shader));
			}

			return shader;
		}

		function makeShaderSetter(info, loc) {
			if (info.type === gl.SAMPLER_2D) {
				return function (value) {
					info.glTexture = gl['TEXTURE' + value];
					gl.uniform1i(loc, value);
				};
			}

			if (info.type === gl.BOOL|| info.type === gl.INT) {
				if (info.size > 1) {
					return function (value) {
						gl.uniform1iv(loc, value);
					};
				}

				return function (value) {
					gl.uniform1i(loc, value);
				};
			}

			if (info.type === gl.FLOAT) {
				if (info.size > 1) {
					return function (value) {
						gl.uniform1fv(loc, value);
					};
				}

				return function (value) {
					gl.uniform1f(loc, value);
				};
			}

			if (info.type === gl.FLOAT_VEC2) {
				return function (obj) {
					gl.uniform2f(loc, obj[0], obj[1]);
				};
			}

			if (info.type === gl.FLOAT_VEC3) {
				return function (obj) {
					gl.uniform3f(loc, obj[0], obj[1], obj[2]);
				};
			}

			if (info.type === gl.FLOAT_VEC4) {
				return function (obj) {
					gl.uniform4f(loc, obj[0], obj[1], obj[2], obj[3]);
				};
			}

			if (info.type === gl.FLOAT_MAT3) {
				return function (mat3) {
					gl.uniformMatrix3fv(loc, false, mat3);
				};
			}

			if (info.type === gl.FLOAT_MAT4) {
				return function (mat4) {
					gl.uniformMatrix4fv(loc, false, mat4);
				};
			}

			throw new Error('Unknown shader uniform type: ' + info.type);
		}

		function makeShaderGetter(loc) {
			return function () {
				return gl.getUniform(program, loc);
			};
		}

		vertexShader = compileShader(vertexShaderSource);
		fragmentShader = compileShader(fragmentShaderSource, true);

		program = gl.createProgram();
		gl.attachShader(program, vertexShader);
		shaderError = gl.getShaderInfoLog(vertexShader);
		if (shaderError) {
			programError += 'Vertex shader error: ' + shaderError + '\n';
		}
		gl.attachShader(program, fragmentShader);
		shaderError = gl.getShaderInfoLog(fragmentShader);
		if (shaderError) {
			programError += 'Fragment shader error: ' + shaderError + '\n';
		}
		gl.linkProgram(program);

		if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
			programError += gl.getProgramInfoLog(program);
			gl.deleteProgram(program);
			gl.deleteShader(vertexShader);
			gl.deleteShader(fragmentShader);

			shaderNameRegexMatch = shaderNameRegex.exec(vertexShaderSource) ||
				shaderNameRegex.exec(fragmentShaderSource);

			if (shaderNameRegexMatch) {
				programError = 'Shader = ' + shaderNameRegexMatch[1] + '\n' + programError;
			}

			shaderDebugConstants.forEach(function (c) {
				programError += '\n' + c + ': ' + gl.getParameter(gl[c]);
			});

			throw new Error('Could not initialize shader:\n' + programError);
		}

		gl.useProgram(program);

		this.uniforms = {};

		l = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
		for (i = 0; i < l; ++i) {
			obj = {
				info: gl.getActiveUniform(program, i)
			};

			obj.name = obj.info.name.replace(/\[0\]$/, '');
			obj.loc = gl.getUniformLocation(program, obj.name);
			obj.set = makeShaderSetter(obj.info, obj.loc);
			obj.get = makeShaderGetter(obj.loc);
			this.uniforms[obj.name] = obj;

			if (!this[obj.name]) {
				//for convenience
				this[obj.name] = obj;
			}
		}

		this.attributes = {};
		this.location = {};
		l = gl.getProgramParameter(program, gl.ACTIVE_ATTRIBUTES);
		for (i = 0; i < l; ++i) {
			obj = {
				info: gl.getActiveAttrib(program, i)
			};

			obj.name = obj.info.name;
			obj.location = gl.getAttribLocation(program, obj.name);
			this.attributes[obj.name] = obj;
			this.location[obj.name] = obj.location;
		}

		this.gl = gl;
		this.program = program;

		this.destroy = function () {
			var key;

			if (gl) {
				gl.deleteProgram(program);
				gl.deleteShader(vertexShader);
				gl.deleteShader(fragmentShader);
			}

			for (key in this) {
				if (this.hasOwnProperty(key)) {
					delete this[key];
				}
			}

			program = null;
			vertexShader = null;
			fragmentShader = null;
		};
	}

	ShaderProgram.prototype.use = function () {
		this.gl.useProgram(this.program);
	};

	/*
		main class: Seriously
	*/

	function Seriously(options) {

		//if called without 'new', make a new object and return that
		if (window === this || !(this instanceof Seriously) || this.id !== undefined) {
			return new Seriously(options);
		}

		//initialize object, private properties
		var id = ++maxSeriouslyId,
			seriously = this,
			nodes = [],
			nodesById = {},
			nodeId = 0,
			sources = [],
			targets = [],
			transforms = [],
			effects = [],
			aliases = {},
			preCallbacks = [],
			postCallbacks = [],
			defaultInputs = {},
			glCanvas,
			gl,
			primaryTarget,
			rectangleModel,
			commonShaders = {},
			baseShader,
			Node, SourceNode, EffectNode, TransformNode, TargetNode,
			Effect, Source, Transform, Target,
			auto = false,
			isDestroyed = false,
			rafId;

		function makeGlModel(shape, gl) {
			var vertex, index, texCoord;

			if (!gl) {
				return false;
			}

			vertex = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, vertex);
			gl.bufferData(gl.ARRAY_BUFFER, shape.vertices, gl.STATIC_DRAW);
			vertex.size = 3;

			index = gl.createBuffer();
			gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, index);
			gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, shape.indices, gl.STATIC_DRAW);

			texCoord = gl.createBuffer();
			gl.bindBuffer(gl.ARRAY_BUFFER, texCoord);
			gl.bufferData(gl.ARRAY_BUFFER, shape.coords, gl.STATIC_DRAW);
			texCoord.size = 2;

			return {
				vertex: vertex,
				index: index,
				texCoord: texCoord,
				length: shape.indices.length,
				mode: shape.mode || gl.TRIANGLES
			};
		}

		function buildRectangleModel(gl) {
			var shape = {};

			shape.vertices = new Float32Array([
				-1, -1, 0,
				1, -1, 0,
				1, 1, 0,
				-1, 1, 0
			]);

			shape.indices = new Uint16Array([
				0, 1, 2,
				0, 2, 3	// Front face
			]);

			shape.coords = new Float32Array([
				0, 0,
				1, 0,
				1, 1,
				0, 1
			]);

			return makeGlModel(shape, gl);
		}

		function attachContext(context) {
			var i, node;

			if (gl) {
				return;
			}

			context.canvas.addEventListener('webglcontextlost', destroyContext, false);
			context.canvas.addEventListener('webglcontextrestored', restoreContext, false);

			if (context.isContextLost()) {
				Seriously.logger.warn('Unable to attach lost WebGL context. Will try again when context is restored.');
				return;
			}

			gl = context;
			glCanvas = context.canvas;

			rectangleModel = buildRectangleModel(gl);

			baseShader = new ShaderProgram(
				gl,
				'#define SHADER_NAME seriously.base\n' + baseVertexShader, '#define SHADER_NAME seriously.base\n' + baseFragmentShader
			);

			for (i = 0; i < effects.length; i++) {
				node = effects[i];
				node.gl = gl;
				node.initialize();
				node.buildShader();
			}

			for (i = 0; i < sources.length; i++) {
				node = sources[i];
				node.initialize();
			}

			for (i = 0; i < targets.length; i++) {
				node = targets[i];

				if (!node.model) {
					node.model = rectangleModel;
					node.shader = baseShader;
				}

				//todo: initialize frame buffer if not main canvas
			}
		}

		function restoreContext() {
			var context,
				target,
				i,
				node;

			if (primaryTarget && !gl) {
				target = primaryTarget.target;

				//todo: if too many webglcontextlost events fired in too short a time, abort
				//todo: consider allowing "manual" control of restoring context

				if (isInstance(target, 'WebGLFramebuffer')) {
					Seriously.logger.error('Unable to restore target built on WebGLFramebuffer');
					return;
				}

				context = getWebGlContext(target, {
					alpha: true,
					premultipliedAlpha: true,
					preserveDrawingBuffer: true,
					stencil: true,
					debugContext: primaryTarget.debugContext
				});

				if (context) {
					if (context.isContextLost()) {
						Seriously.logger.error('Unable to restore WebGL Context');
						return;
					}

					attachContext(context);

					if (primaryTarget.renderToTexture) {
						primaryTarget.frameBuffer = new FrameBuffer(gl, primaryTarget.width, primaryTarget.height, false);
					} else {
						primaryTarget.frameBuffer = {
							frameBuffer: null
						};
					}

					/*
					Set all nodes dirty. In most cases, it should only be necessary
					to set sources dirty, but we want to make sure unattached nodes are covered

					This should get renderDaemon running again if necessary.
					*/
					for (i = 0; i < nodes.length; i++) {
						node = nodes[i];
						node.setDirty();
						node.emit('webglcontextrestored');
					}

					Seriously.logger.log('WebGL context restored');
				}
			}
		}

		function destroyContext(event) {
			// either webglcontextlost or primary target node has been destroyed
			var i, node;

			/*
			todo: once multiple shared webgl resources are supported,
			see if we can switch context to another existing one and
			rebuild immediately
			*/

			if (event) {
				Seriously.logger.warn('WebGL context lost');
				/*
				todo: if too many webglcontextlost events fired in too short a time,
				don't preventDefault
				*/
				event.preventDefault();
			}

			//don't draw anymore until context is restored
			if (rafId) {
				cancelAnimFrame(rafId);
				rafId = 0;
			}

			if (glCanvas) {
				glCanvas.removeEventListener('webglcontextlost', destroyContext, false);
			}

			for (i = 0; i < effects.length; i++) {
				node = effects[i];
				node.gl = null;
				node.initialized = false;
				node.baseShader = null;
				node.model = null;
				node.frameBuffer = null;
				node.texture = null;
				if (node.shader && node.shader.destroy) {
					node.shader.destroy();
					if (node.effect.commonShader) {
						delete commonShaders[node.hook];
					}
				}
				node.shaderDirty = true;
				node.shader = null;
				if (node.effect.lostContext) {
					node.effect.lostContext.call(node);
				}

				/*
				todo: do we need to set nodes to uready?
				if so, make sure nodes never get set to ready unless gl exists
				and make sure to set ready again when context is restored
				*/

				if (event) {
					node.emit('webglcontextlost');
				}
			}

			for (i = 0; i < sources.length; i++) {
				node = sources[i];
				//node.setUnready();
				node.texture = null;
				node.initialized = false;
				node.allowRefresh = false;
				if (event) {
					node.emit('webglcontextlost');
				}
			}

			for (i = 0; i < transforms.length; i++) {
				node = transforms[i];
				node.frameBuffer = null;
				node.texture = null;
				if (event) {
					node.emit('webglcontextlost');
				}
			}

			for (i = 0; i < targets.length; i++) {
				node = targets[i];
				node.model = false;
				node.frameBuffer = null;
				//texture?
				if (event) {
					node.emit('webglcontextlost');
				}
			}

			if (baseShader && baseShader.destroy) {
				baseShader.destroy();
			}

			//clean up rectangleModel
			if (gl) {
				gl.deleteBuffer(rectangleModel.vertex);
				gl.deleteBuffer(rectangleModel.texCoord);
				gl.deleteBuffer(rectangleModel.index);
			}

			if (rectangleModel) {
				delete rectangleModel.vertex;
				delete rectangleModel.texCoord;
				delete rectangleModel.index;
			}

			rectangleModel = null;
			baseShader = null;
			gl = null;
			glCanvas = null;
		}

		/*
		runs on every frame, as long as there are media sources (img, video, canvas, etc.) to check,
		dirty target nodes or pre/post callbacks to run. any sources that are updated are set to dirty,
		forcing all dependent nodes to render
		*/
		function renderDaemon(now) {
			var i, node,
				keepRunning = false;

			rafId = 0;

			if (preCallbacks.length) {
				keepRunning = true;
				for (i = 0; i < preCallbacks.length; i++) {
					preCallbacks[i].call(seriously, now);
				}
			}

			if (sources && sources.length) {
				keepRunning = true;
				for (i = 0; i < sources.length; i++) {
					node = sources[i];

					if (node.dirty ||
							node.checkDirty && node.checkDirty()) {
						node.dirty = false;
						node.setDirty();
					}
				}
			}

			for (i = 0; i < targets.length; i++) {
				node = targets[i];
				if (node.auto && node.dirty) {
					node.render();
				}
			}

			if (postCallbacks.length) {
				keepRunning = true;
				for (i = 0; i < postCallbacks.length; i++) {
					postCallbacks[i].call(seriously);
				}
			}

			//rafId may have been set again by a callback or in target.setDirty()
			if (keepRunning && !rafId) {
				rafId = requestAnimationFrame(renderDaemon);
			}
		}

		function draw(shader, model, uniforms, frameBuffer, node, options) {
			var numTextures = 0,
				name, value, shaderUniform,
				width, height,
				nodeGl = (node && node.gl) || gl,
				srcRGB, srcAlpha,
				dstRGB, dstAlpha;

			if (!nodeGl) {
				return;
			}

			if (node) {
				width = options && options.width || node.width || nodeGl.canvas.width;
				height = options && options.height || node.height || nodeGl.canvas.height;
			} else {
				width = options && options.width || nodeGl.canvas.width;
				height = options && options.height || nodeGl.canvas.height;
			}

			shader.use();

			nodeGl.viewport(0, 0, width, height);

			nodeGl.bindFramebuffer(nodeGl.FRAMEBUFFER, frameBuffer);

			/* todo: do this all only once at the beginning, since we only have one model? */
			nodeGl.enableVertexAttribArray(shader.location.position);
			nodeGl.enableVertexAttribArray(shader.location.texCoord);

			if (model.texCoord) {
				nodeGl.bindBuffer(nodeGl.ARRAY_BUFFER, model.texCoord);
				nodeGl.vertexAttribPointer(shader.location.texCoord, model.texCoord.size, nodeGl.FLOAT, false, 0, 0);
			}

			nodeGl.bindBuffer(nodeGl.ARRAY_BUFFER, model.vertex);
			nodeGl.vertexAttribPointer(shader.location.position, model.vertex.size, nodeGl.FLOAT, false, 0, 0);

			nodeGl.bindBuffer(nodeGl.ELEMENT_ARRAY_BUFFER, model.index);

			//default for depth is disable
			if (options && options.depth) {
				gl.enable(gl.DEPTH_TEST);
			} else {
				gl.disable(gl.DEPTH_TEST);
			}

			//default for blend is enabled
			if (!options) {
				gl.enable(gl.BLEND);
				gl.blendFunc(
					gl.ONE,
					gl.ZERO
				);
				gl.blendEquation(gl.FUNC_ADD);
			} else if (options.blend === undefined || options.blend) {
				gl.enable(gl.BLEND);

				srcRGB = options.srcRGB === undefined ? gl.ONE : options.srcRGB;
				dstRGB = options.dstRGB || gl.ZERO;
				srcAlpha = options.srcAlpha === undefined ? srcRGB : options.srcAlpha;
				dstAlpha = options.dstAlpha === undefined ? dstRGB : options.dstAlpha;

				gl.blendFuncSeparate(srcRGB, dstRGB, srcAlpha, dstAlpha);
				gl.blendEquation(options.blendEquation || gl.FUNC_ADD);
			} else {
				gl.disable(gl.BLEND);
			}

			/* set uniforms to current values */
			for (name in uniforms) {
				if (uniforms.hasOwnProperty(name)) {
					value = uniforms[name];
					shaderUniform = shader.uniforms[name];
					if (shaderUniform) {
						if (isInstance(value, 'WebGLTexture')) {
							nodeGl.activeTexture(nodeGl.TEXTURE0 + numTextures);
							nodeGl.bindTexture(nodeGl.TEXTURE_2D, value);
							shaderUniform.set(numTextures);
							numTextures++;
						} else if (value instanceof SourceNode ||
								value instanceof EffectNode ||
								value instanceof TransformNode) {
							if (value.texture) {
								nodeGl.activeTexture(nodeGl.TEXTURE0 + numTextures);
								nodeGl.bindTexture(nodeGl.TEXTURE_2D, value.texture);
								shaderUniform.set(numTextures);
								numTextures++;
							}
						} else if(value !== undefined && value !== null) {
							shaderUniform.set(value);
						}
					}
				}
			}

			//default for clear is true
			if (!options || options.clear === undefined || options.clear) {
				nodeGl.clearColor(0.0, 0.0, 0.0, 0.0);
				nodeGl.clear(nodeGl.COLOR_BUFFER_BIT | nodeGl.DEPTH_BUFFER_BIT);
			}

			// draw!
			nodeGl.drawElements(model.mode, model.length, nodeGl.UNSIGNED_SHORT, 0);

			//to protect other 3D libraries that may not remember to turn their depth tests on
			gl.enable(gl.DEPTH_TEST);
		}

		function findInputNode(hook, source, options) {
			var node, i;

			if (typeof hook !== 'string' || !source && source !== 0) {
				if (!options || typeof options !== 'object') {
					options = source;
				}
				source = hook;
			}

			if (typeof hook !== 'string' || !seriousSources[hook]) {
				hook = null;
			}

			if (source instanceof SourceNode ||
					source instanceof EffectNode ||
					source instanceof TransformNode) {
				node = source;
			} else if (source instanceof Effect ||
					source instanceof Source ||
					source instanceof Transform) {
				node = nodesById[source.id];

				if (!node) {
					throw new Error('Cannot connect a foreign node');
				}
			} else {
				if (typeof source === 'string' && isNaN(source)) {
					source = getElement(source, ['canvas', 'img', 'video']);
				}

				for (i = 0; i < sources.length; i++) {
					node = sources[i];
					if ((!hook || hook === node.hook) && node.compare && node.compare(source, options)) {
						return node;
					}
				}

				node = new SourceNode(hook, source, options);
			}

			return node;
		}

		//trace back all sources to make sure we're not making a cyclical connection
		function traceSources(node, original) {
			var i,
				source,
				nodeSources;

			if (!(node instanceof EffectNode) && !(node instanceof TransformNode)) {
				return false;
			}

			if (node === original) {
				return true;
			}

			nodeSources = node.sources;

			for (i in nodeSources) {
				if (nodeSources.hasOwnProperty(i)) {
					source = nodeSources[i];

					if (source === original || traceSources(source, original)) {
						return true;
					}
				}
			}

			return false;
		}

		Node = function () {
			this.ready = false;
			this.width = 1;
			this.height = 1;

			this.gl = gl;

			this.uniforms = {
				resolution: [this.width, this.height],
				transform: null
			};

			this.dirty = true;
			this.isDestroyed = false;

			this.seriously = seriously;

			this.listeners = {};

			this.id = nodeId;
			nodeId++;
		};

		Node.prototype.setReady = function () {
			var i;

			if (!this.ready) {
				this.ready = true;
				this.emit('ready');
				if (this.targets) {
					for (i = 0; i < this.targets.length; i++) {
						this.targets[i].setReady();
					}
				}
			}
		};

		Node.prototype.setUnready = function () {
			var i;

			if (this.ready) {
				this.ready = false;
				this.emit('unready');
				if (this.targets) {
					for (i = 0; i < this.targets.length; i++) {
						this.targets[i].setUnready();
					}
				}
			}
		};

		Node.prototype.setDirty = function () {
			//loop through all targets calling setDirty (depth-first)
			var i;

			if (!this.dirty) {
				this.emit('dirty');
				this.dirty = true;
				if (this.targets) {
					for (i = 0; i < this.targets.length; i++) {
						this.targets[i].setDirty();
					}
				}
			}
		};

		Node.prototype.initFrameBuffer = function (useFloat) {
			if (gl) {
				this.frameBuffer = new FrameBuffer(gl, this.width, this.height, useFloat);
			}
		};

		Node.prototype.readPixels = function (x, y, width, height, dest) {
			var nodeGl = this.gl || gl;

			if (!gl) {
				//todo: is this the best approach?
				throw new Error('Cannot read pixels until a canvas is connected');
			}

			//todo: check on x, y, width, height

			if (!this.frameBuffer) {
				this.initFrameBuffer();
				this.setDirty();
			}

			//todo: should we render here?
			this.render();

			//todo: figure out formats and types
			if (dest === undefined) {
				dest = new Uint8Array(width * height * 4);
			} else if (!(isInstance(dest, 'Uint8Array'))) {
				throw new Error('Incompatible array type');
			}

			nodeGl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer.frameBuffer);
			nodeGl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, dest);

			return dest;
		};

		Node.prototype.resize = function () {
			var width,
				height;

			if (this.source) {
				width = this.source.width;
				height = this.source.height;
			} else if (this.sources && this.sources.source) {
				width = this.sources.source.width;
				height = this.sources.source.height;
			} else if (this.inputs && this.inputs.width) {
				width = this.inputs.width;
				height = this.inputs.height || width;
			} else if (this.inputs && this.inputs.height) {
				width = height = this.inputs.height;
			} else {
				//this node will be responsible for calculating its own size
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

			if (this.uniforms && this.uniforms.resolution) {
				this.uniforms.resolution[0] = width;
				this.uniforms.resolution[1] = height;
			}

			if (this.frameBuffer && this.frameBuffer.resize) {
				this.frameBuffer.resize(width, height);
			}
		};

		Node.prototype.on = function (eventName, callback) {
			var listeners,
				index = -1;

			if (!eventName || typeof callback !== 'function') {
				return;
			}

			listeners = this.listeners[eventName];
			if (listeners) {
				index = listeners.indexOf(callback);
			} else {
				listeners = this.listeners[eventName] = [];
			}

			if (index < 0) {
				listeners.push(callback);
			}
		};

		Node.prototype.off = function (eventName, callback) {
			var listeners,
				index = -1;

			if (!eventName || typeof callback !== 'function') {
				return;
			}

			listeners = this.listeners[eventName];
			if (listeners) {
				index = listeners.indexOf(callback);
				if (index >= 0) {
					listeners.splice(index, 1);
				}
			}
		};

		Node.prototype.emit = function (eventName) {
			var i,
				listeners = this.listeners[eventName];

			if (listeners && listeners.length) {
				for (i = 0; i < listeners.length; i++) {
					setTimeoutZero(listeners[i]);
				}
			}
		};

		Node.prototype.destroy = function () {
			var i,
				key;

			delete this.gl;
			delete this.seriously;

			//remove all listeners
			for (key in this.listeners) {
				if (this.listeners.hasOwnProperty(key)) {
					delete this.listeners[key];
				}
			}

			//clear out uniforms
			for (i in this.uniforms) {
				if (this.uniforms.hasOwnProperty(i)) {
					delete this.uniforms[i];
				}
			}

			//clear out list of targets and disconnect each
			if (this.targets) {
				delete this.targets;
			}

			//clear out frameBuffer
			if (this.frameBuffer && this.frameBuffer.destroy) {
				this.frameBuffer.destroy();
				delete this.frameBuffer;
			}

			//remove from main nodes index
			i = nodes.indexOf(this);
			if (i >= 0) {
				nodes.splice(i, 1);
			}
			delete nodesById[this.id];

			this.isDestroyed = true;
		};

		Effect = function (effectNode) {
			var name, me = effectNode;

			function setInput(inputName, input) {
				var lookup, value, effectInput, i;

				effectInput = me.effect.inputs[inputName];

				lookup = me.inputElements[inputName];

				if (typeof input === 'string' && isNaN(input)) {
					if (effectInput.type === 'enum') {
						if (!effectInput.options.hasOwnProperty(input)) {
							input = getElement(input, ['select']);
						}
					} else if (effectInput.type === 'number' || effectInput.type === 'boolean') {
						input = getElement(input, ['input', 'select']);
					} else if (effectInput.type === 'image') {
						input = getElement(input, ['canvas', 'img', 'video']);
					}
					//todo: color? date/time?
				}

				if (isInstance(input, 'HTMLInputElement') || isInstance(input, 'HTMLSelectElement')) {
					value = input.value;

					if (lookup && lookup.element !== input) {
						lookup.element.removeEventListener('change', lookup.listener, true);
						lookup.element.removeEventListener('input', lookup.listener, true);
						delete me.inputElements[inputName];
						lookup = null;
					}

					if (!lookup) {
						lookup = {
							element: input,
							listener: (function (name, element) {
								return function () {
									var oldValue, newValue;

									if (input.type === 'checkbox') {
										//special case for check box
										oldValue = input.checked;
									} else {
										oldValue = element.value;
									}
									newValue = me.setInput(name, oldValue);

									//special case for color type
									if (effectInput.type === 'color') {
										newValue = colorArrayToHex(newValue).substr(0, 7);
									}

									//if input validator changes our value, update HTML Element
									//todo: make this optional...somehow
									if (newValue !== oldValue) {
										element.value = newValue;
									}
								};
							}(inputName, input))
						};

						me.inputElements[inputName] = lookup;
						if (input.type === 'range') {
							input.addEventListener('input', lookup.listener, true);
							input.addEventListener('change', lookup.listener, true);
						} else {
							input.addEventListener('change', lookup.listener, true);
						}
					}

					if (lookup && input.type === 'checkbox') {
						value = input.checked;
					}
				} else {
					if (lookup) {
						lookup.element.removeEventListener('change', lookup.listener, true);
						lookup.element.removeEventListener('input', lookup.listener, true);
						delete me.inputElements[inputName];
					}
					value = input;
				}

				me.setInput(inputName, value);
				return me.inputs[inputName];
			}

			function makeImageSetter(inputName) {
				return function (value) {
					var val = setInput(inputName, value);
					return val && val.pub;
				};
			}

			function makeImageGetter(inputName) {
				return function () {
					var val = me.inputs[inputName];
					return val && val.pub;
				};
			}

			function makeSetter(inputName) {
				return function (value) {
					return setInput(inputName, value);
				};
			}

			function makeGetter(inputName) {
				return function () {
					return me.inputs[inputName];
				};
			}

			//priveleged publicly accessible methods/setters/getters
			//todo: provide alternate set/get methods
			for (name in me.effect.inputs) {
				if (me.effect.inputs.hasOwnProperty(name)) {
					if (this[name] === undefined) {
						if (me.effect.inputs[name].type === 'image') {
							Object.defineProperty(this, name, {
								configurable: true,
								enumerable: true,
								get: makeImageGetter(name),
								set: makeImageSetter(name)
							});
						} else {
							Object.defineProperty(this, name, {
								configurable: true,
								enumerable: true,
								get: makeGetter(name),
								set: makeSetter(name)
							});
						}
					} else {
						//todo: this is temporary. get rid of it.
						throw new Error('Cannot overwrite Seriously.' + name);
					}
				}
			}

			Object.defineProperties(this, {
				effect: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.hook;
					}
				},
				title: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.effect.title || me.hook;
					}
				},
				width: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.width;
					}
				},
				height: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.height;
					}
				},
				id: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.id;
					}
				}
			});

			this.render = function () {
				me.render();
				return this;
			};

			this.readPixels = function (x, y, width, height, dest) {
				return me.readPixels(x, y, width, height, dest);
			};

			this.on = function (eventName, callback) {
				me.on(eventName, callback);
			};

			this.off = function (eventName, callback) {
				me.off(eventName, callback);
			};

			this.inputs = function (name) {
				var result,
					input,
					inputs,
					i,
					key;

				inputs = me.effect.inputs;

				if (name) {
					input = inputs[name];
					if (!input) {
						return null;
					}

					result = {
						type: input.type,
						defaultValue: input.defaultValue,
						title: input.title || name
					};

					if (input.type === 'number') {
						result.min = input.min;
						result.max = input.max;
						result.step = input.step;
						result.mod = input.mod;
					} else if (input.type === 'enum') {
						//make a copy
						result.options = extend({}, input.options);
					} else if (input.type === 'vector') {
						result.dimensions = input.dimensions;
					}

					if (input.description) {
						result.description = input.description;
					}

					return result;
				}

				result = {};
				for (key in inputs) {
					if (inputs.hasOwnProperty(key)) {
						result[key] = this.inputs(key);
					}
				}
				return result;
			};

			this.alias = function (inputName, aliasName) {
				me.alias(inputName, aliasName);
				return this;
			};

			this.matte = function (polygons) {
				me.matte(polygons);
			};

			this.destroy = function () {
				var i,
					descriptor;

				me.destroy();

				for (i in this) {
					if (this.hasOwnProperty(i) && i !== 'isDestroyed' && i !== 'id') {
						descriptor = Object.getOwnPropertyDescriptor(this, i);
						if (descriptor.get || descriptor.set ||
								typeof this[i] !== 'function') {
							delete this[i];
						} else {
							this[i] = nop;
						}
					}
				}
			};

			this.isDestroyed = function () {
				return me.isDestroyed;
			};

			this.isReady = function () {
				return me.ready;
			};
		};

		EffectNode = function (hook, options) {
			var key, name, input,
				defaultValue,
				defaults,
				defaultSources = {};

			Node.call(this, options);
			this.gl = gl;

			this.effectRef = seriousEffects[hook];
			this.sources = {};
			this.targets = [];
			this.inputElements = {};
			this.dirty = true;
			this.shaderDirty = true;
			this.hook = hook;
			this.options = options;
			this.transform = null;

			this.effect = extend({}, this.effectRef);
			if (this.effectRef.definition) {
				/*
				todo: copy over inputs object separately in case some are specified
				in advance and some are specified in definition function
				*/
				extend(this.effect, this.effectRef.definition.call(this, options));
			}
			validateInputSpecs(this.effect);

			this.uniforms.transform = identity;
			this.inputs = {};
			defaults = defaultInputs[hook];
			for (name in this.effect.inputs) {
				if (this.effect.inputs.hasOwnProperty(name)) {
					input = this.effect.inputs[name];

					if (input.defaultValue === undefined || input.defaultValue === null) {
						if (input.type === 'number') {
							input.defaultValue = Math.min(Math.max(0, input.min), input.max);
						} else if (input.type === 'color') {
							input.defaultValue = [0, 0, 0, 0];
						} else if (input.type === 'boolean') {
							input.defaultValue = false;
						} else if (input.type === 'string') {
							input.defaultValue = '';
						} else if (input.type === 'enum') {
							input.defaultValue = input.firstValue;
						}
					}

					defaultValue = input.validate.call(this, input.defaultValue, input);
					if (defaults && defaults[name] !== undefined) {
						defaultValue = input.validate.call(this, defaults[name], input, input.defaultValue, defaultValue);
						defaults[name] = defaultValue;
						if (input.type === 'image') {
							defaultSources[name] = defaultValue;
						}
					}

					this.inputs[name] = defaultValue;
					if (input.uniform) {
						this.uniforms[input.uniform] = input.defaultValue;
					}
				}
			}

			if (gl) {
				this.initialize();
				if (this.effect.commonShader) {
					/*
					this effect is unlikely to need to be modified again
					by changing parameters, so build it now to avoid jank later
					*/
					this.buildShader();
				}
			}

			this.updateReady();
			this.inPlace = this.effect.inPlace;

			this.pub = new Effect(this);

			nodes.push(this);
			nodesById[this.id] = this;
			effects.push(this);

			allEffectsByHook[hook].push(this);

			for (name in defaultSources) {
				if (defaultSources.hasOwnProperty(name)) {
					this.setInput(name, defaultSources[name]);
				}
			}
		};

		EffectNode.prototype = Object.create(Node.prototype);
		EffectNode.prototype.constructor = EffectNode;

		EffectNode.prototype.initialize = function () {
			if (!this.initialized) {
				var that = this;

				this.baseShader = baseShader;

				if (this.shape) {
					this.model = makeGlModel(this.shape, this.gl);
				} else {
					this.model = rectangleModel;
				}

				if (typeof this.effect.initialize === 'function') {
					this.effect.initialize.call(this, function () {
						that.initFrameBuffer(true);
					}, gl);
				} else {
					this.initFrameBuffer(true);
				}

				if (this.frameBuffer) {
					this.texture = this.frameBuffer.texture;
				}

				this.initialized = true;
			}
		};

		EffectNode.prototype.resize = function () {
			var i;

			Node.prototype.resize.call(this);

			if (this.effect.resize) {
				this.effect.resize.call(this);
			}

			for (i = 0; i < this.targets.length; i++) {
				this.targets[i].resize();
			}
		};

		EffectNode.prototype.updateReady = function () {
			var i,
				input,
				key,
				effect,
				ready = true,
				method;

			effect = this.effect;
			for (key in effect.inputs) {
				if (effect.inputs.hasOwnProperty(key)) {
					input = this.effect.inputs[key];
					if (input.type === 'image' &&
							(!this.sources[key] || !this.sources[key].ready) &&
							(!effect.requires || effect.requires.call(this, key, this.inputs))
							) {
						ready = false;
						break;
					}
				}
			}

			if (this.ready !== ready) {
				this.ready = ready;
				this.emit(ready ? 'ready' : 'unready');
				method = ready ? 'setReady' : 'setUnready';

				if (this.targets) {
					for (i = 0; i < this.targets.length; i++) {
						this.targets[i][method]();
					}
				}
			}
		};

		EffectNode.prototype.setReady = EffectNode.prototype.updateReady;

		EffectNode.prototype.setUnready = EffectNode.prototype.updateReady;

		EffectNode.prototype.addTarget = function (target) {
			var i;
			for (i = 0; i < this.targets.length; i++) {
				if (this.targets[i] === target) {
					return;
				}
			}

			this.targets.push(target);
		};

		EffectNode.prototype.removeTarget = function (target) {
			var i = this.targets && this.targets.indexOf(target);
			if (i >= 0) {
				this.targets.splice(i, 1);
			}
		};

		EffectNode.prototype.removeSource = function (source) {
			var i, pub = source && source.pub;

			for (i in this.inputs) {
				if (this.inputs.hasOwnProperty(i) &&
					(this.inputs[i] === source || this.inputs[i] === pub)) {
					this.inputs[i] = null;
				}
			}

			for (i in this.sources) {
				if (this.sources.hasOwnProperty(i) &&
					(this.sources[i] === source || this.sources[i] === pub)) {
					this.sources[i] = null;
				}
			}
		};

		EffectNode.prototype.buildShader = function () {
			var shader,
				effect = this.effect,
				me = this;

			function addShaderName(shaderSrc) {
				if (shaderNameRegex.test(shaderSrc)) {
					return shaderSrc;
				}

				return '#define SHADER_NAME seriously.' + me.hook + '\n' +
					shaderSrc;
			}

			if (this.shaderDirty) {
				if (effect.commonShader && commonShaders[this.hook]) {
					if (!this.shader) {
						commonShaders[this.hook].count++;
					}
					this.shader = commonShaders[this.hook].shader;
				} else if (effect.shader) {
					if (this.shader && !effect.commonShader) {
						this.shader.destroy();
					}
					shader = effect.shader.call(this, this.inputs, {
						vertex: baseVertexShader,
						fragment: baseFragmentShader
					}, Seriously.util);

					if (shader instanceof ShaderProgram) {
						this.shader = shader;
					} else if (shader && shader.vertex && shader.fragment) {
						this.shader = new ShaderProgram(
							gl,
							addShaderName(shader.vertex),
							addShaderName(shader.fragment)
						);
					} else {
						this.shader = baseShader;
					}

					if (effect.commonShader) {
						commonShaders[this.hook] = {
							count: 1,
							shader: this.shader
						};
					}
				} else {
					this.shader = baseShader;
				}

				this.shaderDirty = false;
			}
		};

		EffectNode.prototype.render = function () {
			var key,
				frameBuffer,
				effect = this.effect,
				that = this,
				inPlace;

			function drawFn(shader, model, uniforms, frameBuffer, node, options) {
				draw(shader, model, uniforms, frameBuffer, node || that, options);
			}

			if (!gl) {
				return;
			}

			if (!this.initialized) {
				this.initialize();
			}

			if (this.shaderDirty) {
				this.buildShader();
			}

			if (this.dirty && this.ready) {
				for (key in this.sources) {
					if (this.sources.hasOwnProperty(key) &&
						(!effect.requires || effect.requires.call(this, key, this.inputs))) {

						//todo: set source texture in case it changes?
						//sourcetexture = this.sources[i].render() || this.sources[i].texture

						inPlace = typeof this.inPlace === 'function' ? this.inPlace(key) : this.inPlace;
						this.sources[key].render(!inPlace);
					}
				}

				if (this.frameBuffer) {
					frameBuffer = this.frameBuffer.frameBuffer;
				}

				if (typeof effect.draw === 'function') {
					effect.draw.call(this, this.shader, this.model, this.uniforms, frameBuffer, drawFn);
					this.emit('render');
				} else if (frameBuffer) {
					draw(this.shader, this.model, this.uniforms, frameBuffer, this);
					this.emit('render');
				}

				this.dirty = false;
			}

			return this.texture;
		};

		EffectNode.prototype.setInput = function (name, value) {
			var input, uniform,
				sourceKeys,
				source,
				me = this,
				defaultValue;

			function disconnectSource() {
				var previousSource = me.sources[name],
					key;

				/*
				remove this node from targets of previously connected source node,
				but only if the source node is not being used as another input
				*/
				if (previousSource) {
					for (key in me.sources) {
						if (key !== name &&
								me.sources.hasOwnProperty(key) &&
								me.sources[key] === previousSource) {
							return;
						}
					}
					previousSource.removeTarget(me);
				}
			}

			if (this.effect.inputs.hasOwnProperty(name)) {
				input = this.effect.inputs[name];
				if (input.type === 'image') {
					//&& !(value instanceof Effect) && !(value instanceof Source)) {

					if (value) {
						value = findInputNode(value);

						if (value !== this.sources[name]) {
							disconnectSource();

							if (traceSources(value, this)) {
								throw new Error('Attempt to make cyclical connection.');
							}

							this.sources[name] = value;
							value.addTarget(this);
						}
					} else {
						delete this.sources[name];
						value = false;
					}

					uniform = this.sources[name];

					sourceKeys = Object.keys(this.sources);
					if (this.inPlace === true && sourceKeys.length === 1) {
						source = this.sources[sourceKeys[0]];
						this.uniforms.transform = source && source.cumulativeMatrix || identity;
					} else {
						this.uniforms.transform = identity;
					}
				} else {
					if (defaultInputs[this.hook] && defaultInputs[this.hook][name] !== undefined) {
						defaultValue = defaultInputs[this.hook][name];
					} else {
						defaultValue = input.defaultValue;
					}
					value = input.validate.call(this, value, input, defaultValue, this.inputs[name]);
					uniform = value;
				}

				if (this.inputs[name] === value && input.type !== 'color' && input.type !== 'vector') {
					return value;
				}

				this.inputs[name] = value;

				if (input.uniform) {
					this.uniforms[input.uniform] = uniform;
				}

				if (input.type === 'image') {
					this.resize();
					this.updateReady();
				} else if (input.updateSources) {
					this.updateReady();
				}

				if (input.shaderDirty) {
					this.shaderDirty = true;
				}

				this.setDirty();

				if (input.update) {
					input.update.call(this, value);
				}

				return value;
			}
		};

		EffectNode.prototype.alias = function (inputName, aliasName) {
			var that = this;

			if (reservedNames.indexOf(aliasName) >= 0) {
				throw new Error('\'' + aliasName + '\' is a reserved name and cannot be used as an alias.');
			}

			if (this.effect.inputs.hasOwnProperty(inputName)) {
				if (!aliasName) {
					aliasName = inputName;
				}

				seriously.removeAlias(aliasName);

				aliases[aliasName] = {
					node: this,
					input: inputName
				};

				Object.defineProperty(seriously, aliasName, {
					configurable: true,
					enumerable: true,
					get: function () {
						return that.inputs[inputName];
					},
					set: function (value) {
						return that.setInput(inputName, value);
					}
				});
			}

			return this;
		};

		/*
		matte function to be assigned as a method to EffectNode and TargetNode
		*/
		EffectNode.prototype.matte = function (poly) {
			var polys,
				polygons = [],
				polygon,
				vertices = [],
				i, j, v,
				vert, prev,
				//triangles = [],
				shape = {};

			//detect whether it's multiple polygons or what
			function makePolygonsArray(poly) {
				if (!poly || !poly.length || !Array.isArray(poly)) {
					return [];
				}

				if (!Array.isArray(poly[0])) {
					return [poly];
				}

				if (Array.isArray(poly[0]) && !isNaN(poly[0][0])) {
					return [poly];
				}

				return poly;
			}

			function linesIntersect(a1, a2, b1, b2) {
				var ua_t, ub_t, u_b, ua, ub;
				ua_t = (b2.x - b1.x) * (a1.y - b1.y) - (b2.y - b1.y) * (a1.x - b1.x);
				ub_t = (a2.x - a1.x) * (a1.y - b1.y) - (a2.y - a1.y) * (a1.x - b1.x);
				u_b = (b2.y - b1.y) * (a2.x - a1.x) - (b2.x - b1.x) * (a2.y - a1.y);
				if (u_b) {
					ua = ua_t / u_b;
					ub = ub_t / u_b;
					if (ua > 0 && ua <= 1 && ub > 0 && ub <= 1) {
						return {
							x: a1.x + ua * (a2.x - a1.x),
							y: a1.y + ua * (a2.y - a1.y)
						};
					}
				}
				return false;
			}

			function makeSimple(poly) {
				/*
				this uses a slow, naive approach to detecting line intersections.
				Use Bentley-Ottmann Algorithm
				see: http://softsurfer.com/Archive/algorithm_0108/algorithm_0108.htm#Bentley-Ottmann Algorithm
				see: https://github.com/tokumine/sweepline
				*/
				var i, j,
					edge1, edge2,
					intersect,
					intersections = [],
					newPoly,
					head, point,
					newPolygons,
					point1, point2;

				if (poly.simple) {
					return;
				}

				for (i = 0; i < poly.edges.length; i++) {
					edge1 = poly.edges[i];
					for (j = i + 1; j < poly.edges.length; j++) {
						edge2 = poly.edges[j];
						intersect = linesIntersect(edge1[0], edge1[1], edge2[0], edge2[1]);
						if (intersect) {
							intersect.edge1 = edge1;
							intersect.edge2 = edge2;
							intersections.push(intersect);
						}
					}
				}

				if (intersections.length) {
					newPolygons = [];

					for (i = 0; i < intersections.length; i++) {
						intersect = intersections[i];
						edge1 = intersect.edge1;
						edge2 = intersect.edge2;

						//make new points
						//todo: set ids for points
						point1 = {
							x: intersect.x,
							y: intersect.y,
							prev: edge1[0],
							next: edge2[1],
							id: vertices.length
						};
						poly.vertices.push(point1);
						vertices.push(point1);

						point2 = {
							x: intersect.x,
							y: intersect.y,
							prev: edge2[0],
							next: edge1[1],
							id: vertices.length
						};
						poly.vertices.push(point2);
						vertices.push(point1);

						//modify old points
						point1.prev.next = point1;
						point1.next.prev = point1;
						point2.prev.next = point2;
						point2.next.prev = point2;

						//don't bother modifying the old edges. we're just gonna throw them out
					}

					//make new polygons
					do {
						newPoly = {
							edges: [],
							vertices: [],
							simple: true
						};
						newPolygons.push(newPoly);
						point = poly.vertices[0];
						head = point;
						//while (point.next !== head && poly.vertices.length) {
						do {
							i = poly.vertices.indexOf(point);
							poly.vertices.splice(i, 1);
							newPoly.edges.push([point, point.next]);
							newPoly.vertices.push(point);
							point = point.next;
						} while (point !== head);
					} while (poly.vertices.length);

					//remove original polygon from list
					i = polygons.indexOf(poly);
					polygons.splice(i, 1);

					//add new polygons to list
					for (i = 0; i < newPolygons.length; i++) {
						polygons.push(newPolygons[i]);
					}
				} else {
					poly.simple = true;
				}
			}

			function clockWise(poly) {
				var p, q, n = poly.vertices.length,
					pv, qv, sum = 0;
				for (p = n - 1, q = 0; q < n; p = q, q++) {
					pv = poly.vertices[p];
					qv = poly.vertices[q];
					//sum += (next.x - v.x) * (next.y + v.y);
					//sum += (v.next.x + v.x) * (v.next.y - v.y);
					sum += pv.x * qv.y - qv.x * pv.y;
				}
				return sum > 0;
			}

			function triangulate(poly) {
				var v, points = poly.vertices,
					n, V = [], indices = [],
					nv, count, m, u, w,

					//todo: give these variables much better names
					a, b, c, s, t;

				function pointInTriangle(a, b, c, p) {
					var ax, ay, bx, by, cx, cy, apx, apy, bpx, bpy, cpx, cpy,
						cXap, bXcp, aXbp;

					ax = c.x - b.x;
					ay = c.y - b.y;
					bx = a.x - c.x;
					by = a.y - c.y;
					cx = b.x - a.x;
					cy = b.y - a.y;
					apx = p.x - a.x;
					apy = p.y - a.y;
					bpx = p.x - b.x;
					bpy = p.y - b.y;
					cpx = p.x - c.x;
					cpy = p.y - c.y;

					aXbp = ax * bpy - ay * bpx;
					cXap = cx * apy - cy * apx;
					bXcp = bx * cpy - by * cpx;

					return aXbp >= 0 && bXcp >=0 && cXap >=0;
				}

				function snip(u, v, w, n, V) {
					var p, a, b, c, point;
					a = points[V[u]];
					b = points[V[v]];
					c = points[V[w]];
					if (0 > (b.x - a.x) * (c.y - a.y) - (b.y - a.y) * (c.x - a.x)) {
						return false;
					}
					for (p = 0; p < n; p++) {
						if (!(p === u || p === v || p === w)) {
							point = points[V[p]];
							if (pointInTriangle(a, b, c, point)) {
								return false;
							}
						}
					}
					return true;
				}

				//copy points
				//for (v = 0; v < poly.vertices.length; v++) {
				//	points.push(poly.vertices[v]);
				//}
				n = points.length;

				if (poly.clockWise) {
					for (v = 0; v < n; v++) {
						V[v] = v;
					}
				} else {
					for (v = 0; v < n; v++) {
						V[v] = (n - 1) - v;
					}
				}

				nv = n;
				count = 2 * nv;
				m = 0;
				v = nv - 1;
				while (nv > 2) {
					if ((count--) <= 0) {
						return indices;
					}

					u = v;
					if (nv <= u) {
						u = 0;
					}

					v = u + 1;
					if (nv <= v) {
						v = 0;
					}

					w = v + 1;
					if (nv < w) {
						w = 0;
					}

					if (snip(u, v, w, nv, V)) {
						a = V[u];
						b = V[v];
						c = V[w];
						if (poly.clockWise) {
							indices.push(points[a]);
							indices.push(points[b]);
							indices.push(points[c]);
						} else {
							indices.push(points[c]);
							indices.push(points[b]);
							indices.push(points[a]);
						}
						m++;
						for (s = v, t = v + 1; t < nv; s++, t++) {
							V[s] = V[t];
						}
						nv--;
						count = 2 * nv;
					}
				}

				polygon.indices = indices;
			}

			polys = makePolygonsArray(poly);

			for (i = 0; i < polys.length; i++) {
				poly = polys[i];
				prev = null;
				polygon = {
					vertices: [],
					edges: []
				};

				for (j = 0; j < poly.length; j++) {
					v = poly[j];
					if (typeof v ==='object' && !isNaN(v.x) && !isNaN(v.y)) {
						vert = {
							x: v.x,
							y: v.y,
							id: vertices.length
						};
					} else if (v.length >= 2 && !isNaN(v[0]) && !isNaN(v[1])) {
						vert = {
							x: v[0],
							y: v[1],
							id: vertices.length
						};
					}
					if (vert) {
						if (prev) {
							prev.next = vert;
							vert.prev = prev;
							vert.next = polygon.vertices[0];
							polygon.vertices[0].prev = vert;
						} else {
							polygon.head = vert;
							vert.next = vert;
							vert.prev = vert;
						}
						vertices.push(vert);
						polygon.vertices.push(vert);
						prev = vert;
					}
				}

				if (polygon.vertices.length > 2) {
					if (polygon.vertices.length === 3) {
						polygon.simple = true;
					}

					polygons.push(polygon);

					//save edges
					for (j = 0; j < polygon.vertices.length; j++) {
						vert = polygon.vertices[j];
						polygon.edges.push([
							vert, vert.next
						]);
					}
				}
			}

			for (i = polygons.length - 1; i >= 0; i--) {
				polygon = polygons[i];
				makeSimple(polygon);
			}

			for (i = 0; i < polygons.length; i++) {
				polygon = polygons[i];
				polygon.clockWise = clockWise(polygon);
				triangulate(polygon);
			}

			//build shape
			shape.vertices = [];
			shape.coords = [];
			for (i = 0; i < vertices.length; i++) {
				v = vertices[i];
				shape.vertices.push(v.x * 2 - 1);
				shape.vertices.push(v.y * -2 + 1);
				shape.vertices.push(-1);

				shape.coords.push(v.x);
				shape.coords.push(v.y * -1 + 1);
			}
			shape.vertices = new Float32Array(shape.vertices);
			shape.coords = new Float32Array(shape.coords);

			shape.indices = [];
			for (i = 0; i < polygons.length; i++) {
				polygon = polygons[i];
				for (j = 0; j < polygon.indices.length; j++) {
					v = polygon.indices[j];
					shape.indices.push(v.id);
					//shape.indices.push(v[1].id);
					//shape.indices.push(v[2].id);
				}
			}
			shape.indices = new Uint16Array(shape.indices);

			this.shape = shape;
			if (this.gl) {
				makeGlModel(shape, this.gl);
			}
		};

		EffectNode.prototype.destroy = function () {
			var i, key, item, hook = this.hook;

			//let effect destroy itself
			if (this.effect.destroy && typeof this.effect.destroy === 'function') {
				this.effect.destroy.call(this);
			}
			delete this.effect;

			//shader
			if (commonShaders[hook]) {
				commonShaders[hook].count--;
				if (!commonShaders[hook].count) {
					delete commonShaders[hook];
				}
			}
			if (this.shader && this.shader.destroy && this.shader !== baseShader && !commonShaders[hook]) {
				this.shader.destroy();
			}
			delete this.shader;

			//stop watching any input elements
			for (key in this.inputElements) {
				if (this.inputElements.hasOwnProperty(key)) {
					item = this.inputElements[key];
					item.element.removeEventListener('change', item.listener, true);
					item.element.removeEventListener('input', item.listener, true);
				}
			}

			//sources
			for (key in this.sources) {
				if (this.sources.hasOwnProperty(key)) {
					item = this.sources[key];
					if (item && item.removeTarget) {
						item.removeTarget(this);
					}
					delete this.sources[key];
				}
			}

			//targets
			while (this.targets.length) {
				item = this.targets.pop();
				if (item && item.removeSource) {
					item.removeSource(this);
				}
			}

			for (key in this) {
				if (this.hasOwnProperty(key) && key !== 'id') {
					delete this[key];
				}
			}

			//remove any aliases
			for (key in aliases) {
				if (aliases.hasOwnProperty(key)) {
					item = aliases[key];
					if (item.node === this) {
						seriously.removeAlias(key);
					}
				}
			}

			//remove self from master list of effects
			i = effects.indexOf(this);
			if (i >= 0) {
				effects.splice(i, 1);
			}

			i = allEffectsByHook[hook].indexOf(this);
			if (i >= 0) {
				allEffectsByHook[hook].splice(i, 1);
			}

			Node.prototype.destroy.call(this);
		};

		Source = function (sourceNode) {
			var me = sourceNode;

			//priveleged accessor methods
			Object.defineProperties(this, {
				original: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.source;
					}
				},
				id: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.id;
					}
				},
				width: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.width;
					}
				},
				height: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.height;
					}
				}
			});

			this.render = function () {
				me.render();
			};

			this.update = function () {
				me.setDirty();
			};

			this.readPixels = function (x, y, width, height, dest) {
				return me.readPixels(x, y, width, height, dest);
			};

			this.on = function (eventName, callback) {
				me.on(eventName, callback);
			};

			this.off = function (eventName, callback) {
				me.off(eventName, callback);
			};

			this.destroy = function () {
				var i,
					descriptor;

				me.destroy();

				for (i in this) {
					if (this.hasOwnProperty(i) && i !== 'isDestroyed' && i !== 'id') {
						descriptor = Object.getOwnPropertyDescriptor(this, i);
						if (descriptor.get || descriptor.set ||
								typeof this[i] !== 'function') {
							delete this[i];
						} else {
							this[i] = nop;
						}
					}
				}
			};

			this.isDestroyed = function () {
				return me.isDestroyed;
			};

			this.isReady = function () {
				return me.ready;
			};
		};

		/*
			possible sources: img, video, canvas (2d or 3d), texture, ImageData, array, typed array
		*/
		SourceNode = function (hook, source, options) {
			var opts = options || {},
				flip = opts.flip === undefined ? true : opts.flip,
				width = opts.width,
				height = opts.height,
				deferTexture = false,
				that = this,
				matchedType = false,
				key,
				plugin;

			function sourcePlugin(hook, source, options, force) {
				var p = seriousSources[hook];
				if (p.definition) {
					p = p.definition.call(that, source, options, force);
					if (p) {
						p = extend(extend({}, seriousSources[hook]), p);
					} else {
						return null;
					}
				}
				return p;
			}

			function compareSource(source) {
				return that.source === source;
			}

			Node.call(this);

			if (hook && typeof hook !== 'string' || !source && source !== 0) {
				if (!options || typeof options !== 'object') {
					options = source;
				}
				source = hook;
			}

			if (typeof source === 'string' && isNaN(source)) {
				source = getElement(source, ['canvas', 'img', 'video']);
			}

			// forced source type?
			if (typeof hook === 'string' && seriousSources[hook]) {
				plugin = sourcePlugin(hook, source, options, true);
				if (plugin) {
					this.hook = hook;
					matchedType = true;
					deferTexture = plugin.deferTexture;
					this.plugin = plugin;
					this.compare = plugin.compare;
					this.checkDirty = plugin.checkDirty;
					if (plugin.source) {
						source = plugin.source;
					}
				}
			}

			//todo: could probably stand to re-work and re-indent this whole block now that we have plugins
			if (!plugin && isInstance(source)) {
				if (source.tagName === 'CANVAS') {
					this.width = source.width;
					this.height = source.height;

					this.render = this.renderImageCanvas;
					matchedType = true;
					this.hook = 'canvas';
					this.compare = compareSource;
				} else if (source.tagName === 'IMG') {
					this.width = source.naturalWidth || 1;
					this.height = source.naturalHeight || 1;

					if (!source.complete || !source.naturalWidth) {
						deferTexture = true;
					}

					source.addEventListener('load', function () {
						if (!that.isDestroyed) {
							if (that.width !== source.naturalWidth || that.height !== source.naturalHeight) {
								that.width = source.naturalWidth;
								that.height = source.naturalHeight;
								that.resize();
							}

							that.setDirty();
							that.setReady();
						}
					}, true);

					this.render = this.renderImageCanvas;
					matchedType = true;
					this.hook = 'image';
					this.compare = compareSource;
				}
			} else if (!plugin && isInstance(source, 'WebGLTexture')) {
				if (gl && !gl.isTexture(source)) {
					throw new Error('Not a valid WebGL texture.');
				}

				//different defaults
				if (!isNaN(width)) {
					if (isNaN(height)) {
						height = width;
					}
				} else if (!isNaN(height)) {
					width = height;
				}/* else {
					//todo: guess based on dimensions of target canvas
					//throw new Error('Must specify width and height when using a WebGL texture as a source');
				}*/

				this.width = width;
				this.height = height;

				if (opts.flip === undefined) {
					flip = false;
				}
				matchedType = true;

				this.texture = source;
				this.initialized = true;
				this.hook = 'texture';
				this.compare = compareSource;

				//todo: if WebGLTexture source is from a different context render it and copy it over
				this.render = function () {};
			}

			if (!matchedType && !plugin) {
				for (key in seriousSources) {
					if (seriousSources.hasOwnProperty(key) && seriousSources[key]) {
						plugin = sourcePlugin(key, source, options, false);
						if (plugin) {
							this.hook = key;
							matchedType = true;
							deferTexture = plugin.deferTexture;
							this.plugin = plugin;
							this.compare = plugin.compare;
							this.checkDirty = plugin.checkDirty;
							if (plugin.source) {
								source = plugin.source;
							}

							break;
						}
					}
				}
			}

			if (!matchedType) {
				throw new Error('Unknown source type');
			}

			this.source = source;
			if (this.flip === undefined) {
				this.flip = flip;
			}

			this.targets = [];

			if (!deferTexture) {
				that.setReady();
			}

			this.pub = new Source(this);

			nodes.push(this);
			nodesById[this.id] = this;
			sources.push(this);
			allSourcesByHook[this.hook].push(this);

			if (sources.length && !rafId) {
				renderDaemon();
			}
		};

		SourceNode.prototype = Object.create(Node.prototype);
		SourceNode.prototype.constructor = SourceNode;

		SourceNode.prototype.initialize = function () {
			var texture;

			if (!gl || this.texture || !this.ready) {
				return;
			}

			texture = gl.createTexture();
			gl.bindTexture(gl.TEXTURE_2D, texture);
			gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
			gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
			gl.bindTexture(gl.TEXTURE_2D, null);

			this.texture = texture;
			this.initialized = true;
			this.allowRefresh = true;
			this.setDirty();
		};

		SourceNode.prototype.initFrameBuffer = function (useFloat) {
			if (gl) {
				this.frameBuffer = new FrameBuffer(gl, this.width, this.height, {
					texture: this.texture,
					useFloat: useFloat
				});
			}
		};

		SourceNode.prototype.addTarget = function (target) {
			var i;
			for (i = 0; i < this.targets.length; i++) {
				if (this.targets[i] === target) {
					return;
				}
			}

			this.targets.push(target);
		};

		SourceNode.prototype.removeTarget = function (target) {
			var i = this.targets && this.targets.indexOf(target);
			if (i >= 0) {
				this.targets.splice(i, 1);
			}
		};

		SourceNode.prototype.resize = function () {
			var i,
				target;

			this.uniforms.resolution[0] = this.width;
			this.uniforms.resolution[1] = this.height;

			if (this.framebuffer) {
				this.framebuffer.resize(this.width, this.height);
			}

			this.emit('resize');
			this.setDirty();

			if (this.targets) {
				for (i = 0; i < this.targets.length; i++) {
					target = this.targets[i];
					target.resize();
					if (target.setTransformDirty) {
						target.setTransformDirty();
					}
				}
			}
		};

		SourceNode.prototype.setReady = function () {
			var i;
			if (!this.ready) {
				this.ready = true;
				this.resize();
				this.initialize();

				this.emit('ready');
				if (this.targets) {
					for (i = 0; i < this.targets.length; i++) {
						this.targets[i].setReady();
					}
				}

			}
		};

		SourceNode.prototype.render = function () {
			var media = this.source;

			if (!gl || !media && media !== 0 || !this.ready) {
				return;
			}

			if (!this.initialized) {
				this.initialize();
			}

			if (!this.allowRefresh) {
				return;
			}

			if (this.plugin && this.plugin.render &&
					(this.dirty || this.checkDirty && this.checkDirty()) &&
					this.plugin.render.call(this, gl, draw, rectangleModel, baseShader)) {

				this.dirty = false;
				this.emit('render');
			}
		};

		SourceNode.prototype.renderImageCanvas = function () {
			var media = this.source;

			if (!gl || !media || !this.ready) {
				return;
			}

			if (!this.initialized) {
				this.initialize();
			}

			if (!this.allowRefresh) {
				return;
			}

			if (this.dirty) {
				gl.bindTexture(gl.TEXTURE_2D, this.texture);
				gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, this.flip);
				gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
				try {
					gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, media);

					this.dirty = false;
					this.emit('render');
					return true;
				} catch (securityError) {
					if (securityError.code === window.DOMException.SECURITY_ERR) {
						this.allowRefresh = false;
						Seriously.logger.error('Unable to access cross-domain image');
					}
				}

				return false;
			}
		};

		SourceNode.prototype.destroy = function () {
			var i, key, item;

			if (this.plugin && this.plugin.destroy) {
				this.plugin.destroy.call(this);
			}

			if (gl && this.texture) {
				gl.deleteTexture(this.texture);
			}

			//targets
			while (this.targets.length) {
				item = this.targets.pop();
				if (item && item.removeSource) {
					item.removeSource(this);
				}
			}

			//remove self from master list of sources
			i = sources.indexOf(this);
			if (i >= 0) {
				sources.splice(i, 1);
			}

			i = allSourcesByHook[this.hook].indexOf(this);
			if (i >= 0) {
				allSourcesByHook[this.hook].splice(i, 1);
			}

			for (key in this) {
				if (this.hasOwnProperty(key) && key !== 'id') {
					delete this[key];
				}
			}

			Node.prototype.destroy.call(this);
		};

		//todo: implement render for array and typed array

		Target = function (targetNode) {
			var me = targetNode;

			//priveleged accessor methods
			Object.defineProperties(this, {
				source: {
					enumerable: true,
					configurable: true,
					get: function () {
						if (me.source) {
							return me.source.pub;
						}
					},
					set: function (value) {
						me.setSource(value);
					}
				},
				original: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.target;
					}
				},
				width: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.width;
					},
					set: function (value) {
						if (!isNaN(value) && value >0 && me.width !== value) {
							me.width = value;
							me.resize();
							me.setTransformDirty();
						}
					}
				},
				height: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.height;
					},
					set: function (value) {
						if (!isNaN(value) && value >0 && me.height !== value) {
							me.height = value;
							me.resize();
							me.setTransformDirty();
						}
					}
				},
				id: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.id;
					}
				}
			});

			this.render = function () {
				me.render();
			};

			this.readPixels = function (x, y, width, height, dest) {
				return me.readPixels(x, y, width, height, dest);
			};

			this.on = function (eventName, callback) {
				me.on(eventName, callback);
			};

			this.off = function (eventName, callback) {
				me.off(eventName, callback);
			};

			this.go = function (options) {
				me.go(options);
			};

			this.stop = function () {
				me.stop();
			};

			this.getTexture = function () {
				return me.frameBuffer.texture;
			};

			this.destroy = function () {
				var i,
					descriptor;

				me.destroy();

				for (i in this) {
					if (this.hasOwnProperty(i) && i !== 'isDestroyed' && i !== 'id') {
						descriptor = Object.getOwnPropertyDescriptor(this, i);
						if (descriptor.get || descriptor.set ||
								typeof this[i] !== 'function') {
							delete this[i];
						} else {
							this[i] = nop;
						}
					}
				}
			};

			this.inputs = function (name) {
				return {
					source: {
						type: 'image'
					}
				};
			};

			this.isDestroyed = function () {
				return me.isDestroyed;
			};

			this.isReady = function () {
				return me.ready;
			};
		};

		/*
			possible targets: canvas (2d or 3d), gl render buffer (must be same canvas)
		*/
		TargetNode = function (hook, target, options) {
			var opts,
				flip,
				width,
				height,
				that = this,
				matchedType = false,
				i, element, elements, context,
				debugContext,
				frameBuffer,
				targetList,
				triedWebGl = false,
				key;

			function targetPlugin(hook, target, options, force) {
				var plugin = seriousTargets[hook];
				if (plugin.definition) {
					plugin = plugin.definition.call(that, target, options, force);
					if (!plugin) {
						return null;
					}
					plugin = extend(extend({}, seriousTargets[hook]), plugin);
					that.hook = key;
					matchedType = true;
					that.plugin = plugin;
					that.compare = plugin.compare;
					if (plugin.target) {
						target = plugin.target;
					}
					if (plugin.gl && !that.gl) {
						that.gl = plugin.gl;
						if (!gl) {
							attachContext(plugin.gl);
						}
					}
					if (that.gl === gl) {
						that.model = rectangleModel;
						that.shader = baseShader;
					}
				}
				return plugin;
			}

			function compareTarget(target) {
				return that.target === target;
			}

			Node.call(this);

			if (hook && typeof hook !== 'string' || !target && target !== 0) {
				if (!options || typeof options !== 'object') {
					options = target;
				}
				target = hook;
			}

			opts = options || {};
			flip = opts.flip === undefined ? true : opts.flip;
			width = parseInt(opts.width, 10);
			height = parseInt(opts.height, 10);
			debugContext = opts.debugContext;

			// forced target type?
			if (typeof hook === 'string' && seriousTargets[hook]) {
				targetPlugin(hook, target, opts, true);
			}

			this.renderToTexture = opts.renderToTexture;

			if (isInstance(target, 'WebGLFramebuffer')) {
				frameBuffer = target;

				if (isInstance(opts, 'HTMLCanvasElement')) {
					target = opts;
				} else if (isInstance(opts, 'WebGLRenderingContext')) {
					target = opts.canvas;
				} else if (isInstance(opts.canvas, 'HTMLCanvasElement')) {
					target = opts.canvas;
				} else if (isInstance(opts.context, 'WebGLRenderingContext')) {
					target = opts.context.canvas;
				} else {
					//todo: search all canvases for matching contexts?
					throw new Error('Must provide a canvas with WebGLFramebuffer target');
				}
			}

			if (isInstance(target, 'HTMLCanvasElement')) {
				width = target.width;
				height = target.height;

				//try to get a webgl context.
				if (!gl || gl.canvas !== target && opts.allowSecondaryWebGL) {
					triedWebGl = true;
					context = getWebGlContext(target, {
						alpha: true,
						premultipliedAlpha: true,
						preserveDrawingBuffer: true,
						stencil: true,
						debugContext: debugContext
					});
				}

				if (!context) {
					if (!opts.allowSecondaryWebGL && gl && gl.canvas !== target) {
						throw new Error('Only one WebGL target canvas allowed. Set allowSecondaryWebGL option to create secondary context.');
					}

					this.render = nop;
					Seriously.logger.log('Unable to create WebGL context.');
					//throw new Error('Unable to create WebGL context.');
				} else if (!gl || gl === context) {
					//this is our main WebGL canvas
					if (!primaryTarget) {
						primaryTarget = this;
					}
					if (!gl) {
						attachContext(context);
					}
					this.render = this.renderWebGL;

					/*
					Don't remember what this is for. Maybe we should remove it
					*/
					if (opts.renderToTexture) {
						if (gl) {
							this.frameBuffer = new FrameBuffer(gl, width, height, false);
						}
					} else {
						this.frameBuffer = {
							frameBuffer: frameBuffer || null
						};
					}
				} else {
					//set up alternative drawing method using ArrayBufferView
					this.gl = context;

					//this.pixels = new Uint8Array(width * height * 4);
					//todo: probably need another framebuffer for renderToTexture?
					//todo: handle lost context on secondary webgl
					this.frameBuffer = {
						frameBuffer: frameBuffer || null
					};
					this.shader = new ShaderProgram(this.gl, baseVertexShader, baseFragmentShader);
					this.model = buildRectangleModel.call(this, this.gl);
					this.pixels = null;

					this.texture = this.gl.createTexture();
					this.gl.bindTexture(gl.TEXTURE_2D, this.texture);
					this.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
					this.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
					this.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
					this.gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

					this.render = this.renderSecondaryWebGL;
				}

				matchedType = true;
			}

			if (!matchedType) {
				for (key in seriousTargets) {
					if (seriousTargets.hasOwnProperty(key) && seriousTargets[key]) {
						if (targetPlugin(key, target, opts, false)) {
							break;
						}
					}
				}
			}

			if (!matchedType) {
				throw new Error('Unknown target type');
			}

			if (allTargets) {
				targetList = allTargets.get(target);
				if (targetList) {
					Seriously.logger.warn(
						'Target already in use by another instance',
						target,
						Object.keys(targetList).map(function (key) {
							return targetList[key];
						})
					);
				} else {
					targetList = {};
					allTargets.set(target, targetList);
				}
				targetList[seriously.id] = seriously;
			}

			this.target = target;
			this.transform = null;
			this.transformDirty = true;
			this.flip = flip;
			if (width) {
				this.width = width;
			}
			if (height) {
				this.height = height;
			}

			this.uniforms.resolution[0] = this.width;
			this.uniforms.resolution[1] = this.height;

			if (opts.auto !== undefined) {
				this.auto = opts.auto;
			} else {
				this.auto = auto;
			}
			this.frames = 0;

			this.pub = new Target(this);

			nodes.push(this);
			nodesById[this.id] = this;
			targets.push(this);
		};

		TargetNode.prototype = Object.create(Node.prototype);
		TargetNode.prototype.constructor = TargetNode;

		TargetNode.prototype.setSource = function (source) {
			var newSource;

			//todo: what if source is null/undefined/false

			newSource = findInputNode(source);

			//todo: check for cycles

			if (newSource !== this.source) {
				if (this.source) {
					this.source.removeTarget(this);
				}
				this.source = newSource;
				newSource.addTarget(this);

				if (newSource) {
					this.resize();
					if (newSource.ready) {
						this.setReady();
					} else {
						this.setUnready();
					}
				}

				this.setDirty();
			}
		};

		TargetNode.prototype.setDirty = function () {
			this.dirty = true;

			if (this.auto && !rafId) {
				rafId = requestAnimationFrame(renderDaemon);
			}
		};

		TargetNode.prototype.resize = function () {
			//if target is a canvas, reset size to canvas size
			if (isInstance(this.target, 'HTMLCanvasElement')) {
				if (this.width !== this.target.width || this.height !== this.target.height) {
					this.target.width = this.width;
					this.target.height = this.height;
					this.uniforms.resolution[0] = this.width;
					this.uniforms.resolution[1] = this.height;
					this.emit('resize');
					this.setTransformDirty();
				}
			} else if (this.plugin && this.plugin.resize) {
				this.plugin.resize.call(this);
			}

			if (this.source &&
				(this.source.width !== this.width || this.source.height !== this.height)) {
				if (!this.transform) {
					this.transform = new Float32Array(16);
				}
			}
		};

		TargetNode.prototype.setTransformDirty = function () {
			this.transformDirty = true;
			this.setDirty();
		};

		TargetNode.prototype.go = function () {
			this.auto = true;
			this.setDirty();
		};

		TargetNode.prototype.stop = function () {
			this.auto = false;
		};

		TargetNode.prototype.render = function () {
			if (gl && this.plugin && this.plugin.render) {
				this.plugin.render.call(this, draw, baseShader, rectangleModel);
			}
		};

		TargetNode.prototype.renderWebGL = function () {
			var matrix, x, y;

			this.resize();

			if (gl && this.dirty && this.ready) {
				if (!this.source) {
					return;
				}

				this.source.render();

				this.uniforms.source = this.source.texture;

				if (this.source.width === this.width && this.source.height === this.height) {
					this.uniforms.transform = this.source.cumulativeMatrix || identity;
				} else if (this.transformDirty) {
					matrix = this.transform;
					mat4.copy(matrix, this.source.cumulativeMatrix || identity);
					x = this.source.width / this.width;
					y = this.source.height / this.height;
					matrix[0] *= x;
					matrix[1] *= x;
					matrix[2] *= x;
					matrix[3] *= x;
					matrix[4] *= y;
					matrix[5] *= y;
					matrix[6] *= y;
					matrix[7] *= y;
					this.uniforms.transform = matrix;
					this.transformDirty = false;
				}

				draw(baseShader, rectangleModel, this.uniforms, this.frameBuffer.frameBuffer, this, outputRenderOptions);

				this.emit('render');
				this.dirty = false;
			}
		};

		TargetNode.prototype.renderSecondaryWebGL = function () {
			var sourceWidth,
				sourceHeight,
				matrix,
				x,
				y;

			if (this.dirty && this.ready && this.source) {
				this.emit('render');
				this.source.render(true);

				sourceWidth = this.source.width;
				sourceHeight = this.source.height;

				if (!this.pixels || this.pixels.length !== sourceWidth * sourceHeight * 4) {
					this.pixels = new Uint8Array(sourceWidth * sourceHeight * 4);
				}

				this.source.readPixels(0, 0, sourceWidth, sourceHeight, this.pixels);

				this.gl.texImage2D(this.gl.TEXTURE_2D, 0, this.gl.RGBA, sourceWidth, sourceHeight, 0, this.gl.RGBA, this.gl.UNSIGNED_BYTE, this.pixels);

				if (sourceWidth === this.width && sourceHeight === this.height) {
					this.uniforms.transform = identity;
				} else if (this.transformDirty) {
					matrix = this.transform;
					mat4.copy(matrix, identity);
					x = this.source.width / this.width;
					y = this.source.height / this.height;
					matrix[0] *= x;
					matrix[1] *= x;
					matrix[2] *= x;
					matrix[3] *= x;
					matrix[4] *= y;
					matrix[5] *= y;
					matrix[6] *= y;
					matrix[7] *= y;
					this.uniforms.transform = matrix;
					this.transformDirty = false;
				}

				this.uniforms.source = this.texture;
				draw(this.shader, this.model, this.uniforms, null, this, outputRenderOptions);

				this.dirty = false;
			}
		};

		TargetNode.prototype.removeSource = function (source) {
			if (this.source === source || this.source === source.pub) {
				this.source = null;
			}
		};

		TargetNode.prototype.destroy = function () {
			var i,
				targetList;

			//source
			if (this.source && this.source.removeTarget) {
				this.source.removeTarget(this);
			}

			if (allTargets) {
				targetList = allTargets.get(this.target);
				delete targetList[seriously.id];
				if (!Object.keys(targetList).length) {
					allTargets.delete(this.target);
				}
			}

			if (this.plugin && this.plugin.destroy) {
				this.plugin.destroy.call(this);
			}

			delete this.source;
			delete this.target;
			delete this.pub;
			delete this.uniforms;
			delete this.pixels;
			delete this.auto;

			//remove self from master list of targets
			i = targets.indexOf(this);
			if (i >= 0) {
				targets.splice(i, 1);
			}

			Node.prototype.destroy.call(this);

			//clear out context so we can start over
			if (this === primaryTarget) {
				glCanvas.removeEventListener('webglcontextrestored', restoreContext, false);
				destroyContext();
				primaryTarget = null;
			}
		};

		Transform = function (transformNode) {
			var me = transformNode,
				self = this,
				key;

			function setInput(inputName, def, input) {
				var inputKey, lookup, value;

				lookup = me.inputElements[inputName];

				//todo: there is some duplicate code with Effect here. Consolidate.
				if (typeof input === 'string' && isNaN(input)) {
					if (def.type === 'enum') {
						if (!def.options.hasOwnProperty(input)) {
							input = getElement(input, ['select']);
						}
					} else if (def.type === 'number' || def.type === 'boolean') {
						input = getElement(input, ['input', 'select']);
					} else if (def.type === 'image') {
						input = getElement(input, ['canvas', 'img', 'video']);
					}
				}

				if (isInstance(input, 'HTMLInputElement') || isInstance(input, 'HTMLSelectElement')) {
					value = input.value;

					if (lookup && lookup.element !== input) {
						lookup.element.removeEventListener('change', lookup.listener, true);
						lookup.element.removeEventListener('input', lookup.listener, true);
						delete me.inputElements[inputName];
						lookup = null;
					}

					if (!lookup) {
						lookup = {
							element: input,
							listener: (function (element) {
								return function () {
									var oldValue, newValue;

									if (input.type === 'checkbox') {
										//special case for check box
										oldValue = input.checked;
									} else {
										oldValue = element.value;
									}
									newValue = me.setInput(inputName, oldValue);

									//special case for color type
									if (input.type === 'color') {
										newValue = colorArrayToHex(newValue);
									}

									//if input validator changes our value, update HTML Element
									//todo: make this optional...somehow
									if (newValue !== oldValue) {
										element.value = newValue;
									}
								};
							}(input))
						};

						me.inputElements[inputName] = lookup;
						if (input.type === 'range') {
							input.addEventListener('input', lookup.listener, true);
							input.addEventListener('change', lookup.listener, true);
						} else {
							input.addEventListener('change', lookup.listener, true);
						}
					}

					if (lookup && input.type === 'checkbox') {
						value = input.checked;
					}
				} else {
					if (lookup) {
						lookup.element.removeEventListener('change', lookup.listener, true);
						lookup.element.removeEventListener('input', lookup.listener, true);
						delete me.inputElements[inputName];
					}
					value = input;
				}

				me.setInput(inputName, value);
			}

			function setProperty(name, def) {
				// todo: validate value passed to 'set'
				Object.defineProperty(self, name, {
					configurable: true,
					enumerable: true,
					get: function () {
						return def.get.call(me);
					},
					set: function (val) {
						setInput(name, def, val);
					}
				});
			}

			function makeMethod(method) {
				return function () {
					if (method.apply(me, arguments)) {
						me.setTransformDirty();
					}
				};
			}

			//priveleged accessor methods
			Object.defineProperties(this, {
				transform: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.hook;
					}
				},
				title: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.plugin.title || me.hook;
					}
				},
				width: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.width;
					}
				},
				height: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.height;
					}
				},
				id: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.id;
					}
				},
				source: {
					enumerable: true,
					configurable: true,
					get: function () {
						return me.source && me.source.pub;
					},
					set: function (source) {
						me.setSource(source);
					}
				}
			});

			// attach methods
			for (key in me.methods) {
				if (me.methods.hasOwnProperty(key)) {
					this[key] = makeMethod(me.methods[key]);
				}
			}

			for (key in me.inputs) {
				if (me.inputs.hasOwnProperty(key)) {
					setProperty(key, me.inputs[key]);
				}
			}

			this.update = function () {
				me.setDirty();
			};

			this.inputs = function (name) {
				var result,
					input,
					inputs,
					i,
					key;

				inputs = me.plugin.inputs;

				/*
				Only reports setter/getter inputs, not methods
				*/

				if (name) {
					input = inputs[name];
					if (!input || input.method) {
						return null;
					}

					result = {
						type: input.type,
						defaultValue: input.defaultValue,
						title: input.title || name
					};

					if (input.type === 'number') {
						result.min = input.min;
						result.max = input.max;
						result.step = input.step;
						result.mod = input.mod;
					} else if (input.type === 'enum') {
						//make a copy
						result.options = extend({}, input.options);
					} else if (input.type === 'vector') {
						result.dimensions = input.dimensions;
					}

					if (input.description) {
						result.description = input.description;
					}

					return result;
				}

				result = {};
				for (key in inputs) {
					if (inputs.hasOwnProperty(key) && !inputs[key].method) {
						result[key] = this.inputs(key);
					}
				}
				return result;
			};

			this.alias = function (inputName, aliasName) {
				me.alias(inputName, aliasName);
				return this;
			};

			this.on = function (eventName, callback) {
				me.on(eventName, callback);
			};

			this.off = function (eventName, callback) {
				me.off(eventName, callback);
			};

			this.destroy = function () {
				var i,
					descriptor;

				me.destroy();

				for (i in this) {
					if (this.hasOwnProperty(i) && i !== 'isDestroyed' && i !== 'id') {
						//todo: probably can simplify this if the only setter/getter is id
						descriptor = Object.getOwnPropertyDescriptor(this, i);
						if (descriptor.get || descriptor.set ||
								typeof this[i] !== 'function') {
							delete this[i];
						} else {
							this[i] = nop;
						}
					}
				}
			};

			this.isDestroyed = function () {
				return me.isDestroyed;
			};

			this.isReady = function () {
				return me.ready;
			};
		};

		TransformNode = function (hook, options) {
			var key,
				input,
				initialValue,
				defaultValue,
				defaults;

			this.matrix = new Float32Array(16);
			this.cumulativeMatrix = new Float32Array(16);

			this.ready = false;
			this.width = 1;
			this.height = 1;

			this.seriously = seriously;

			this.transformRef = seriousTransforms[hook];
			this.hook = hook;
			this.id = nodeId;
			nodeId++;

			this.options = options;
			this.sources = null;
			this.targets = [];
			this.inputElements = {};
			this.inputs = {};
			this.methods = {};
			this.listeners = {};

			this.texture = null;
			this.frameBuffer = null;
			this.uniforms = null;

			this.dirty = true;
			this.transformDirty = true;
			this.renderDirty = false;
			this.isDestroyed = false;
			this.transformed = false;

			this.plugin = extend({}, this.transformRef);
			if (this.transformRef.definition) {
				extend(this.plugin, this.transformRef.definition.call(this, options));
			}

			// set up inputs and methods
			for (key in this.plugin.inputs) {
				if (this.plugin.inputs.hasOwnProperty(key)) {
					input = this.plugin.inputs[key];

					if (input.method && typeof input.method === 'function') {
						this.methods[key] = input.method;
					} else if (typeof input.set === 'function' && typeof input.get === 'function') {
						this.inputs[key] = input;
					}
				}
			}
			validateInputSpecs(this.plugin);

			// set default value for all inputs (no defaults for methods)
			defaults = defaultInputs[hook];
			for (key in this.plugin.inputs) {
				if (this.plugin.inputs.hasOwnProperty(key)) {
					input = this.plugin.inputs[key];

					if (typeof input.set === 'function' && typeof input.get === 'function' &&
							typeof input.method !== 'function') {

						initialValue = input.get.call(this);
						defaultValue = input.defaultValue === undefined ? initialValue : input.defaultValue;
						defaultValue = input.validate.call(this, defaultValue, input, initialValue);
						if (defaults && defaults[key] !== undefined) {
							defaultValue = input.validate.call(this, defaults[key], input, input.defaultValue, defaultValue);
							defaults[key] = defaultValue;
						}
						if (defaultValue !== initialValue) {
							input.set.call(this, defaultValue);
						}
					}
				}
			}

			nodes.push(this);
			nodesById[this.id] = this;

			this.pub = new Transform(this);

			transforms.push(this);

			allTransformsByHook[hook].push(this);
		};

		TransformNode.prototype = Object.create(Node.prototype);
		TransformNode.prototype.constructor = TransformNode;

		TransformNode.prototype.setDirty = function () {
			this.renderDirty = true;
			Node.prototype.setDirty.call(this);
		};

		TransformNode.prototype.setTransformDirty = function () {
			var i,
				target;
			this.transformDirty = true;
			this.dirty = true;
			this.renderDirty = true;
			for (i = 0; i < this.targets.length; i++) {
				target = this.targets[i];
				if (target.setTransformDirty) {
					target.setTransformDirty();
				} else {
					target.setDirty();
				}
			}
		};

		TransformNode.prototype.resize = function () {
			var i;

			Node.prototype.resize.call(this);

			if (this.plugin.resize) {
				this.plugin.resize.call(this);
			}

			for (i = 0; i < this.targets.length; i++) {
				this.targets[i].resize();
			}

			this.setTransformDirty();
		};

		TransformNode.prototype.setSource = function (source) {
			var newSource;

			//todo: what if source is null/undefined/false

			newSource = findInputNode(source);

			if (newSource === this.source) {
				return;
			}

			if (traceSources(newSource, this)) {
				throw new Error('Attempt to make cyclical connection.');
			}

			if (this.source) {
				this.source.removeTarget(this);
			}
			this.source = newSource;
			newSource.addTarget(this);

			if (newSource && newSource.ready) {
				this.setReady();
			} else {
				this.setUnready();
			}
			this.resize();
		};

		TransformNode.prototype.addTarget = function (target) {
			var i;
			for (i = 0; i < this.targets.length; i++) {
				if (this.targets[i] === target) {
					return;
				}
			}

			this.targets.push(target);
		};

		TransformNode.prototype.removeTarget = function (target) {
			var i = this.targets && this.targets.indexOf(target);
			if (i >= 0) {
				this.targets.splice(i, 1);
			}

			if (this.targets && this.targets.length) {
				this.resize();
			}
		};

		TransformNode.prototype.setInput = function (name, value) {
			var input,
				defaultValue,
				previous;

			if (this.plugin.inputs.hasOwnProperty(name)) {
				input = this.plugin.inputs[name];

				if (defaultInputs[this.hook] && defaultInputs[this.hook][name] !== undefined) {
					defaultValue = defaultInputs[this.hook][name];
				} else {
					defaultValue = input.defaultValue;
				}

				previous = input.get.call(this);
				if (defaultValue === undefined) {
					defaultValue = previous;
				}
				value = input.validate.call(this, value, input, defaultValue, previous);

				if (input.set.call(this, value)) {
					this.setTransformDirty();
				}

				return input.get.call(this);
			}
		};

		TransformNode.prototype.alias = function (inputName, aliasName) {
			var me = this,
				input,
				def;

			if (reservedNames.indexOf(aliasName) >= 0) {
				throw new Error('\'' + aliasName + '\' is a reserved name and cannot be used as an alias.');
			}

			if (this.plugin.inputs.hasOwnProperty(inputName)) {
				if (!aliasName) {
					aliasName = inputName;
				}

				seriously.removeAlias(aliasName);

				input = this.inputs[inputName];
				if (input) {
					def = me.inputs[inputName];
					Object.defineProperty(seriously, aliasName, {
						configurable: true,
						enumerable: true,
						get: function () {
							return def.get.call(me);
						},
						set: function (val) {
							if (def.set.call(me, val)) {
								me.setTransformDirty();
							}
						}
					});
				} else {
					input = this.methods[inputName];
					if (input) {
						def = input;
						seriously[aliasName] = function () {
							if (def.apply(me, arguments)) {
								me.setTransformDirty();
							}
						};
					}
				}

				if (input) {
					aliases[aliasName] = {
						node: this,
						input: inputName
					};
				}
			}

			return this;
		};

		TransformNode.prototype.render = function (renderTransform) {
			if (!this.source) {
				if (this.transformDirty) {
					mat4.copy(this.cumulativeMatrix, this.matrix);
					this.transformDirty = false;
				}
				this.texture = null;
				this.dirty = false;

				return;
			}

			this.source.render();

			if (this.transformDirty) {
				if (this.transformed) {
					//use this.matrix
					if (this.source.cumulativeMatrix) {
						mat4.multiply(this.cumulativeMatrix, this.matrix, this.source.cumulativeMatrix);
					} else {
						mat4.copy(this.cumulativeMatrix, this.matrix);
					}
				} else {
					//copy source.cumulativeMatrix
					mat4.copy(this.cumulativeMatrix, this.source.cumulativeMatrix || identity);
				}

				this.transformDirty = false;
			}

			if (renderTransform && gl) {
				if (this.renderDirty) {
					if (!this.frameBuffer) {
						this.uniforms = {
							resolution: [this.width, this.height]
						};
						this.frameBuffer = new FrameBuffer(gl, this.width, this.height);
					}

					this.uniforms.source = this.source.texture;
					this.uniforms.transform = this.cumulativeMatrix || identity;
					draw(baseShader, rectangleModel, this.uniforms, this.frameBuffer.frameBuffer, this);

					this.renderDirty = false;
				}
				this.texture = this.frameBuffer.texture;
			} else if (this.source) {
				this.texture = this.source.texture;
			} else {
				this.texture = null;
			}

			this.dirty = false;

			return this.texture;
		};

		TransformNode.prototype.readPixels = function (x, y, width, height, dest) {
			var nodeGl = this.gl || gl;

			if (!gl) {
				//todo: is this the best approach?
				throw new Error('Cannot read pixels until a canvas is connected');
			}

			//todo: check on x, y, width, height
			this.render(true);

			if (dest === undefined) {
				dest = new Uint8Array(width * height * 4);
			} else if (!(isInstance(dest, 'Uint8Array'))) {
				throw new Error('Incompatible array type');
			}

			nodeGl.bindFramebuffer(gl.FRAMEBUFFER, this.frameBuffer.frameBuffer);
			nodeGl.readPixels(x, y, width, height, gl.RGBA, gl.UNSIGNED_BYTE, dest);

			return dest;
		};

		TransformNode.prototype.destroy = function () {
			var i, key, item, hook = this.hook;

			//let effect destroy itself
			if (this.plugin.destroy && typeof this.plugin.destroy === 'function') {
				this.plugin.destroy.call(this);
			}
			delete this.effect;

			if (this.frameBuffer) {
				this.frameBuffer.destroy();
				delete this.frameBuffer;
				delete this.texture;
			}

			//stop watching any input elements
			for (i in this.inputElements) {
				if (this.inputElements.hasOwnProperty(i)) {
					item = this.inputElements[i];
					item.element.removeEventListener('change', item.listener, true);
					item.element.removeEventListener('input', item.listener, true);
				}
			}

			//sources
			if (this.source) {
				this.source.removeTarget(this);
			}

			//targets
			while (this.targets.length) {
				item = this.targets.pop();
				if (item && item.removeSource) {
					item.removeSource(this);
				}
			}

			for (key in this) {
				if (this.hasOwnProperty(key) && key !== 'id') {
					delete this[key];
				}
			}

			//remove any aliases
			for (key in aliases) {
				if (aliases.hasOwnProperty(key)) {
					item = aliases[key];
					if (item.node === this) {
						seriously.removeAlias(key);
					}
				}
			}

			//remove self from master list of effects
			i = transforms.indexOf(this);
			if (i >= 0) {
				transforms.splice(i, 1);
			}

			i = allTransformsByHook[hook].indexOf(this);
			if (i >= 0) {
				allTransformsByHook[hook].splice(i, 1);
			}

			Node.prototype.destroy.call(this);
		};

		TransformNode.prototype.setReady = Node.prototype.setReady;
		TransformNode.prototype.setUnready = Node.prototype.setUnready;
		TransformNode.prototype.on = Node.prototype.on;
		TransformNode.prototype.off = Node.prototype.off;
		TransformNode.prototype.emit = Node.prototype.emit;

		/*
		Initialize Seriously object based on options
		*/

		if (isInstance(options, 'HTMLCanvasElement')) {
			options = {
				canvas: options
			};
		} else {
			options = options || {};
		}

		if (options.canvas) {
		}

		/*
		priveleged methods
		*/
		this.effect = function (hook, options) {
			if (!seriousEffects[hook]) {
				throw new Error('Unknown effect: ' + hook);
			}

			var effectNode = new EffectNode(hook, options);
			return effectNode.pub;
		};

		this.source = function (hook, source, options) {
			var sourceNode = findInputNode(hook, source, options);
			return sourceNode.pub;
		};

		this.transform = function (hook, opts) {
			var transformNode;

			if (typeof hook !== 'string') {
				opts = hook;
				hook = false;
			}

			if (hook) {
				if (!seriousTransforms[hook]) {
					throw new Error('Unknown transform: ' + hook);
				}
			} else {
				hook = options && options.defaultTransform || '2d';
				if (!seriousTransforms[hook]) {
					throw new Error('No transform specified');
				}
			}

			transformNode = new TransformNode(hook, opts);
			return transformNode.pub;
		};

		this.target = function (hook, target, options) {
			var targetNode,
				element,
				i;

			if (hook && typeof hook === 'string' && !seriousTargets[hook]) {
				element = document.querySelector(hook);
			}

			if (typeof hook !== 'string' || !target && target !== 0 || element) {
				if (!options || typeof options !== 'object') {
					options = target;
				}
				target = element || hook;
				hook = null;
			}

			if (typeof target === 'string' && isNaN(target)) {
				target = document.querySelector(target);
			}

			for (i = 0; i < targets.length; i++) {
				targetNode = targets[i];
				if ((!hook || hook === targetNode.hook) &&
						(targetNode.target === target || targetNode.compare && targetNode.compare(target, options))) {

					return targetNode.pub;
				}
			}

			targetNode = new TargetNode(hook, target, options);

			return targetNode.pub;
		};

		this.aliases = function () {
			return Object.keys(aliases);
		};

		this.removeAlias = function (name) {
			if (aliases[name]) {
				delete this[name];
				delete aliases[name];
			}
		};

		this.defaults = function (hook, options) {
			var key;

			if (!hook) {
				if (hook === null) {
					for (key in defaultInputs) {
						if (defaultInputs.hasOwnProperty(key)) {
							delete defaultInputs[key];
						}
					}
				}
				return;
			}

			if (typeof hook === 'object') {
				for (key in hook) {
					if (hook.hasOwnProperty(key)) {
						this.defaults(key, hook[key]);
					}
				}

				return;
			}

			if (options === null) {
				delete defaultInputs[hook];
			} else if (typeof options === 'object') {
				defaultInputs[hook] = extend({}, options);
			}
		};

		this.go = function (pre, post) {
			var i;

			if (typeof pre === 'function' && preCallbacks.indexOf(pre) < 0) {
				preCallbacks.push(pre);
			}

			if (typeof post === 'function' && postCallbacks.indexOf(post) < 0) {
				postCallbacks.push(post);
			}

			auto = true;
			for (i = 0; i < targets.length; i++) {
				targets[i].go();
			}

			if (!rafId && (preCallbacks.length || postCallbacks.length)) {
				renderDaemon();
			}
		};

		this.stop = function () {
			preCallbacks.length = 0;
			postCallbacks.length = 0;
			cancelAnimFrame(rafId);
			rafId = 0;
		};

		this.render = function () {
			var i;
			for (i = 0; i < targets.length; i++) {
				targets[i].render(options);
			}
		};

		this.destroy = function () {
			var i,
				node,
				descriptor;

			while (nodes.length) {
				node = nodes[0];
				node.pub.destroy();
			}

			for (i in this) {
				if (this.hasOwnProperty(i) && i !== 'isDestroyed' && i !== 'id') {
					descriptor = Object.getOwnPropertyDescriptor(this, i);
					if (descriptor.get || descriptor.set ||
							typeof this[i] !== 'function') {
						delete this[i];
					} else {
						this[i] = nop;
					}
				}
			}

			seriously = null;

			//todo: do we really need to allocate new arrays here?
			sources = [];
			targets = [];
			effects = [];
			nodes = [];

			preCallbacks.length = 0;
			postCallbacks.length = 0;
			cancelAnimFrame(rafId);
			rafId = 0;

			isDestroyed = true;
		};

		this.isDestroyed = function () {
			return isDestroyed;
		};

		this.incompatible = function (hook) {
			var key,
				plugin,
				failure = false;

			failure = Seriously.incompatible(hook);

			if (failure) {
				return failure;
			}

			if (!hook) {
				for (key in allEffectsByHook) {
					if (allEffectsByHook.hasOwnProperty(key) && allEffectsByHook[key].length) {
						plugin = seriousEffects[key];
						if (plugin && typeof plugin.compatible === 'function' &&
								!plugin.compatible.call(this)) {
							return 'plugin-' + key;
						}
					}
				}

				for (key in allSourcesByHook) {
					if (allSourcesByHook.hasOwnProperty(key) && allSourcesByHook[key].length) {
						plugin = seriousSources[key];
						if (plugin && typeof plugin.compatible === 'function' &&
								!plugin.compatible.call(this)) {
							return 'source-' + key;
						}
					}
				}
			}

			return false;
		};

		/*
		Informational utility methods
		*/

		this.isNode = function (candidate) {
			var node;
			if (candidate) {
				node = nodesById[candidate.id];
				if (node && !node.isDestroyed) {
					return true;
				}
			}
			return false;
		};

		this.isSource = function (candidate) {
			return this.isNode(candidate) && candidate instanceof Source;
		};

		this.isEffect = function (candidate) {
			return this.isNode(candidate) && candidate instanceof Effect;
		};

		this.isTransform = function (candidate) {
			return this.isNode(candidate) && candidate instanceof Transform;
		};

		this.isTarget = function (candidate) {
			return this.isNode(candidate) && candidate instanceof Target;
		};

		Object.defineProperties(this, {
			id: {
				enumerable: true,
				configurable: true,
				get: function () {
					return id;
				}
			}
		});

		//todo: load, save, find

		this.defaults(options.defaults);
	}

	Seriously.incompatible = function (hook) {
		var canvas, gl, plugin;

		if (incompatibility === undefined) {
			canvas = document.createElement('canvas');
			if (!canvas || !canvas.getContext) {
				incompatibility = 'canvas';
			} else if (!window.WebGLRenderingContext) {
				incompatibility = 'webgl';
			} else {
				gl = getTestContext();
				if (!gl) {
					incompatibility = 'context';
				}
			}
		}

		if (incompatibility) {
			return incompatibility;
		}

		if (hook) {
			plugin = seriousEffects[hook];
			if (plugin && typeof plugin.compatible === 'function' &&
				!plugin.compatible(gl)) {

				return 'plugin-' + hook;
			}

			plugin = seriousSources[hook];
			if (plugin && typeof plugin.compatible === 'function' &&
				!plugin.compatible(gl)) {

				return 'source-' + hook;
			}
		}

		return false;
	};

	Seriously.plugin = function (hook, definition, meta) {
		var effect;

		if (seriousEffects[hook]) {
			Seriously.logger.warn('Effect [' + hook + '] already loaded');
			return;
		}

		if (meta === undefined && typeof definition === 'object') {
			meta = definition;
		}

		if (!meta) {
			return;
		}

		effect = extend({}, meta);

		if (typeof definition === 'function') {
			effect.definition = definition;
		}

		effect.reserved = reservedEffectProperties;

		if (effect.inputs) {
			validateInputSpecs(effect);
		}

		if (!effect.title) {
			effect.title = hook;
		}

		/*
		if (typeof effect.requires !== 'function') {
			effect.requires = false;
		}
		*/

		seriousEffects[hook] = effect;
		allEffectsByHook[hook] = [];

		return effect;
	};

	Seriously.removePlugin = function (hook) {
		var all, effect, plugin;

		if (!hook) {
			return this;
		}

		plugin = seriousEffects[hook];

		if (!plugin) {
			return this;
		}

		all = allEffectsByHook[hook];
		if (all) {
			while (all.length) {
				effect = all.shift();
				effect.destroy();
			}
			delete allEffectsByHook[hook];
		}

		delete seriousEffects[hook];

		return this;
	};

	Seriously.source = function (hook, definition, meta) {
		var source;

		if (seriousSources[hook]) {
			Seriously.logger.warn('Source [' + hook + '] already loaded');
			return;
		}

		if (meta === undefined && typeof definition === 'object') {
			meta = definition;
		}

		if (!meta && !definition) {
			return;
		}

		source = extend({}, meta);

		if (typeof definition === 'function') {
			source.definition = definition;
		}

		if (!source.title) {
			source.title = hook;
		}


		seriousSources[hook] = source;
		allSourcesByHook[hook] = [];

		return source;
	};

	Seriously.removeSource = function (hook) {
		var all, source, plugin;

		if (!hook) {
			return this;
		}

		plugin = seriousSources[hook];

		if (!plugin) {
			return this;
		}

		all = allSourcesByHook[hook];
		if (all) {
			while (all.length) {
				source = all.shift();
				source.destroy();
			}
			delete allSourcesByHook[hook];
		}

		delete seriousSources[hook];

		return this;
	};

	Seriously.transform = function (hook, definition, meta) {
		var transform;

		if (seriousTransforms[hook]) {
			Seriously.logger.warn('Transform [' + hook + '] already loaded');
			return;
		}

		if (meta === undefined && typeof definition === 'object') {
			meta = definition;
		}

		if (!meta && !definition) {
			return;
		}

		transform = extend({}, meta);

		if (typeof definition === 'function') {
			transform.definition = definition;
		}

		transform.reserved = reservedTransformProperties;

		//todo: validate method definitions
		if (transform.inputs) {
			validateInputSpecs(transform);
		}

		if (!transform.title) {
			transform.title = hook;
		}

		seriousTransforms[hook] = transform;
		allTransformsByHook[hook] = [];

		return transform;
	};

	Seriously.removeTransform = function (hook) {
		var all, transform, plugin;

		if (!hook) {
			return this;
		}

		plugin = seriousTransforms[hook];

		if (!plugin) {
			return this;
		}

		all = allTransformsByHook[hook];
		if (all) {
			while (all.length) {
				transform = all.shift();
				transform.destroy();
			}
			delete allTransformsByHook[hook];
		}

		delete seriousTransforms[hook];

		return this;
	};

	Seriously.target = function (hook, definition, meta) {
		var target;

		if (seriousTargets[hook]) {
			Seriously.logger.warn('Target [' + hook + '] already loaded');
			return;
		}

		if (meta === undefined && typeof definition === 'object') {
			meta = definition;
		}

		if (!meta && !definition) {
			return;
		}

		target = extend({}, meta);

		if (typeof definition === 'function') {
			target.definition = definition;
		}

		if (!target.title) {
			target.title = hook;
		}


		seriousTargets[hook] = target;
		allTargetsByHook[hook] = [];

		return target;
	};

	Seriously.removeTarget = function (hook) {
		var all, target, plugin;

		if (!hook) {
			return this;
		}

		plugin = seriousTargets[hook];

		if (!plugin) {
			return this;
		}

		all = allTargetsByHook[hook];
		if (all) {
			while (all.length) {
				target = all.shift();
				target.destroy();
			}
			delete allTargetsByHook[hook];
		}

		delete seriousTargets[hook];

		return this;
	};

	//todo: validators should not allocate new objects/arrays if input is valid
	Seriously.inputValidators = {
		color: function (value, input, defaultValue, oldValue) {
			var s,
				a,
				match,
				i;

			a = oldValue || [];

			if (typeof value === 'string') {
				//todo: support percentages, decimals
				match = colorRegex.exec(value);
				if (match && match.length) {
					if (match.length < 3) {
						a[0] = a[1] = a[2] = a[3] = 0;
						return a;
					}

					a[3] = 1;
					for (i = 0; i < 3; i++) {
						a[i] = parseFloat(match[i + 2]) / 255;
					}
					if (!isNaN(match[6])) {
						a[3] = parseFloat(match[6]);
					}
					if (match[1].toLowerCase() === 'hsl') {
						return hslToRgb(a[0], a[1], a[2], a[3], a);
					}

					return a;
				}

				match = hexColorRegex.exec(value);
				if (match && match.length) {
					s = match[1];
					if (s.length === 3) {
						a[0] = parseInt(s[0], 16) / 15;
						a[1] = parseInt(s[1], 16) / 15;
						a[2] = parseInt(s[2], 16) / 15;
						a[3] = 1;
					} else if (s.length === 4) {
						a[0] = parseInt(s[0], 16) / 15;
						a[1] = parseInt(s[1], 16) / 15;
						a[2] = parseInt(s[2], 16) / 15;
						a[3] = parseInt(s[3], 16) / 15;
					} else if (s.length === 6) {
						a[0] = parseInt(s.substr(0, 2), 16) / 255;
						a[1] = parseInt(s.substr(2, 2), 16) / 255;
						a[2] = parseInt(s.substr(4, 2), 16) / 255;
						a[3] = 1;
					} else if (s.length === 8) {
						a[0] = parseInt(s.substr(0, 2), 16) / 255;
						a[1] = parseInt(s.substr(2, 2), 16) / 255;
						a[2] = parseInt(s.substr(4, 2), 16) / 255;
						a[3] = parseInt(s.substr(6, 2), 16) / 255;
					} else {
						a[0] = a[1] = a[2] = a[3] = 0;
					}
					return a;
				}

				match = colorNames[value.toLowerCase()];
				if (match) {
					for (i = 0; i < 4; i++) {
						a[i] = match[i];
					}
					return a;
				}

				if (!colorCtx) {
					colorCtx = document.createElement('canvas').getContext('2d');
				}
				colorCtx.fillStyle = value;
				s = colorCtx.fillStyle;
				if (s && s !== '#000000') {
					return Seriously.inputValidators.color(s, input, defaultValue, oldValue);
				}

				a[0] = a[1] = a[2] = a[3] = 0;
				return a;
			}

			if (isArrayLike(value)) {
				a = value;
				if (a.length < 3) {
					a[0] = a[1] = a[2] = a[3] = 0;
					return a;
				}
				for (i = 0; i < 3; i++) {
					if (isNaN(a[i])) {
						a[0] = a[1] = a[2] = a[3] = 0;
						return a;
					}
				}
				if (a.length < 4) {
					a.push(1);
				}
				return a;
			}

			if (typeof value === 'number') {
				a[0] = a[1] = a[2] = value;
				a[3] = 1;
				return a;
			}

			if (typeof value === 'object') {
				for (i = 0; i < 4; i++) {
					s = colorFields[i];
					if (value[s] === null || isNaN(value[s])) {
						a[i] = i === 3 ? 1 : 0;
					} else {
						a[i] = value[s];
					}
				}
				return a;
			}

			a[0] = a[1] = a[2] = a[3] = 0;
			return a;
		},
		number: function (value, input, defaultValue) {
			value = parseFloat(value);

			if (isNaN(value)) {
				return defaultValue || 0;
			}

			if (input.mod) {
				value = value - input.mod * Math.floor(value / input.mod);
			}

			if (value < input.min) {
				return input.min;
			}

			if (value > input.max) {
				return input.max;
			}

			if (input.step) {
				return Math.round(value / input.step) * input.step;
			}

			return value;
		},
		'enum': function (value, input, defaultValue) {
			var options = input.options || [],
				i,
				opt;

			if (typeof value === 'string') {
				value = value.toLowerCase();
			} else if (typeof value === 'number') {
				value = value.toString();
			} else if (!value) {
				value = '';
			}

			if (options.hasOwnProperty(value)) {
				return value;
			}

			return defaultValue || '';
		},
		vector: function (value, input, defaultValue, oldValue) {
			var a, i, s, n = input.dimensions || 4;

			a = oldValue || [];
			if (isArrayLike(value)) {
				for (i = 0; i < n; i++) {
					a[i] = value[i] || 0;
				}
				return a;
			}

			if (typeof value === 'object') {
				for (i = 0; i < n; i++) {
					s = vectorFields[i];
					if (value[s] === undefined) {
						s = colorFields[i];
					}
					a[i] = value[s] || 0;
				}
				return a;
			}

			value = parseFloat(value) || 0;
			for (i = 0; i < n; i++) {
				a[i] = value;
			}

			return a;
		},
		'boolean': function (value) {
			if (!value) {
				return false;
			}

			if (value && value.toLowerCase && value.toLowerCase() === 'false') {
				return false;
			}

			return true;
		},
		'string': function (value) {
			if (typeof value === 'string') {
				return value;
			}

			if (value !== 0 && !value) {
				return '';
			}

			if (value.toString) {
				return value.toString();
			}

			return String(value);
		}
		//todo: date/time
	};

	Seriously.prototype.effects = Seriously.effects = function () {
		var name,
			effect,
			manifest,
			effects = {},
			input,
			i;

		for (name in seriousEffects) {
			if (seriousEffects.hasOwnProperty(name)) {
				effect = seriousEffects[name];
				manifest = {
					title: effect.title || name,
					description: effect.description || '',
					inputs: {}
				};

				for (i in effect.inputs) {
					if (effect.inputs.hasOwnProperty(i)) {
						input = effect.inputs[i];
						manifest.inputs[i] = {
							type: input.type,
							defaultValue: input.defaultValue,
							step: input.step,
							min: input.min,
							max: input.max,
							mod: input.mod,
							minCount: input.minCount,
							maxCount: input.maxCount,
							dimensions: input.dimensions,
							title: input.title || i,
							description: input.description || '',
							options: input.options || []
						};
					}
				}

				effects[name] = manifest;
			}
		}

		return effects;
	};

	if (window.Float32Array) {
		identity = new Float32Array([
			1, 0, 0, 0,
			0, 1, 0, 0,
			0, 0, 1, 0,
			0, 0, 0, 1
		]);
	}

	//check for plugins loaded out of order
	if (window.Seriously) {
		if (typeof window.Seriously === 'object') {
			(function () {
				var i;
				for (i in window.Seriously) {
					if (window.Seriously.hasOwnProperty(i) &&
						i !== 'plugin' &&
						typeof window.Seriously[i] === 'object') {

						Seriously.plugin(i, window.Seriously[i]);
					}
				}
			}());
		}
	}

	/*

	*/
	Seriously.logger = {
		log: consoleMethod('log'),
		info: consoleMethod('info'),
		warn: consoleMethod('warn'),
		error: consoleMethod('error')
	};

	Seriously.util = {
		mat4: mat4,
		checkSource: checkSource,
		hslToRgb: hslToRgb,
		colors: colorNames,
		setTimeoutZero: setTimeoutZero,
		ShaderProgram: ShaderProgram,
		FrameBuffer: FrameBuffer,
		requestAnimationFrame: requestAnimationFrame,
		shader: {
			makeNoise: 'float makeNoise(float u, float v, float timer) {\n' +
						'	float x = u * v * mod(timer * 1000.0, 100.0);\n' +
						'	x = mod(x, 13.0) * mod(x, 127.0);\n' +
						'	float dx = mod(x, 0.01);\n' +
						'	return clamp(0.1 + dx * 100.0, 0.0, 1.0);\n' +
						'}\n',
			random: '#ifndef RANDOM\n' +
				'#define RANDOM\n' +
				'float random(vec2 n) {\n' +
				'	return 0.5 + 0.5 * fract(sin(dot(n.xy, vec2(12.9898, 78.233)))* 43758.5453);\n' +
				'}\n' +
				'#endif\n'
		}
	};

	Seriously.source('video', function (video, options, force) {
		var me = this,
			key,
			opts,

			canvas,
			ctx2d,

			destroyed = false,
			deferTexture = false,

			isSeeking = false,
			lastRenderTime = 0;

		function initializeVideo() {
			video.removeEventListener('loadedmetadata', initializeVideo, true);

			if (destroyed) {
				return;
			}

			if (video.videoWidth) {
				if (me.width !== video.videoWidth || me.height !== video.videoHeight) {
					me.width = video.videoWidth;
					me.height = video.videoHeight;
					me.resize();
				}

				if (deferTexture) {
					me.setReady();
				}
			} else {
				//Workaround for Firefox bug https://bugzilla.mozilla.org/show_bug.cgi?id=926753
				deferTexture = true;
				setTimeout(initializeVideo, 50);
			}
		}

		function seeking() {
			// IE doesn't report .seeking properly so make our own
			isSeeking = true;
		}

		function seeked() {
			isSeeking = false;
			me.setDirty();
		}

		if (isInstance(video, 'HTMLVideoElement')) {
			if (video.readyState) {
				initializeVideo();
			} else {
				deferTexture = true;
				video.addEventListener('loadedmetadata', initializeVideo, true);
			}

			video.addEventListener('seeking', seeking, false);
			video.addEventListener('seeked', seeked, false);

			return {
				deferTexture: deferTexture,
				source: video,
				render: function renderVideo(gl) {
					var source,
						error;

					lastRenderTime = video.currentTime;

					if (!video.videoHeight || !video.videoWidth) {
						return false;
					}

					if (noVideoTextureSupport) {
						if (!ctx2d) {
							ctx2d = document.createElement('canvas').getContext('2d');
							canvas = ctx2d.canvas;
							canvas.width = me.width;
							canvas.height = me.height;
						}
						source = canvas;
						ctx2d.drawImage(video, 0, 0, me.width, me.height);
					} else {
						source = video;
					}

					gl.bindTexture(gl.TEXTURE_2D, me.texture);
					gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, me.flip);
					gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, false);
					try {
						gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, source);

						//workaround for lack of video texture support in IE
						if (noVideoTextureSupport === undefined) {
							error = gl.getError();
							if (error === gl.INVALID_VALUE) {
								noVideoTextureSupport = true;
								return renderVideo(gl);
							}
							noVideoTextureSupport = false;
						}
						return true;
					} catch (securityError) {
						if (securityError.code === window.DOMException.SECURITY_ERR) {
							me.allowRefresh = false;
							Seriously.logger.error('Unable to access cross-domain image');
						} else {
							Seriously.logger.error('Error rendering video source', securityError);
						}
					}
					return false;
				},
				checkDirty: function () {
					return !isSeeking && video.currentTime !== lastRenderTime;
				},
				compare: function (source) {
					return me.source === source;
				},
				destroy: function () {
					destroyed = true;
					video.removeEventListener('seeking', seeking, false);
					video.removeEventListener('seeked', seeked, false);
					video.removeEventListener('loadedmetadata', initializeVideo, true);
				}
			};
		}
	}, {
		title: 'Video'
	});

	/*
	Default transform - 2D
	Affine transforms
	- translate
	- rotate (degrees)
	- scale
	- skew

	todo: move this to a different file when we have a build tool
	*/
	Seriously.transform('2d', function (options) {
		var me = this,
			degrees = !(options && options.radians),

			centerX = 0,
			centerY = 0,
			scaleX = 1,
			scaleY = 1,
			translateX = 0,
			translateY = 0,
			rotation = 0,
			skewX = 0,
			skewY = 0;

		//todo: skew order
		//todo: invert?

		function recompute() {
			var matrix = me.matrix,
				angle,
				s, c,
				m00,
				m01,
				m02,
				m03,
				m10,
				m11,
				m12,
				m13;

			function translate(x, y) {
				matrix[12] = matrix[0] * x + matrix[4] * y + matrix[12];
				matrix[13] = matrix[1] * x + matrix[5] * y + matrix[13];
				matrix[14] = matrix[2] * x + matrix[6] * y + matrix[14];
				matrix[15] = matrix[3] * x + matrix[7] * y + matrix[15];
			}

			if (!translateX &&
					!translateY &&
					!rotation &&
					!skewX &&
					!skewY &&
					scaleX === 1 &&
					scaleY === 1
					) {
				me.transformed = false;
				return;
			}

			//calculate transformation matrix
			mat4.identity(matrix);

			translate(translateX + centerX, translateY + centerY);

			//skew
			if (skewX) {
				matrix[4] = skewX / me.width;
			}
			if (skewY) {
				matrix[1] = skewY / me.height;
			}

			if (rotation) {
				m00 = matrix[0];
				m01 = matrix[1];
				m02 = matrix[2];
				m03 = matrix[3];
				m10 = matrix[4];
				m11 = matrix[5];
				m12 = matrix[6];
				m13 = matrix[7];

				//rotate
				angle = -(degrees ? rotation * Math.PI / 180 : rotation);
				//...rotate
				s = Math.sin(angle);
				c = Math.cos(angle);
				matrix[0] = m00 * c + m10 * s;
				matrix[1] = m01 * c + m11 * s;
				matrix[2] = m02 * c + m12 * s;
				matrix[3] = m03 * c + m13 * s;
				matrix[4] = m10 * c - m00 * s;
				matrix[5] = m11 * c - m01 * s;
				matrix[6] = m12 * c - m02 * s;
				matrix[7] = m13 * c - m03 * s;
			}

			//scale
			if (scaleX !== 1) {
				matrix[0] *= scaleX;
				matrix[1] *= scaleX;
				matrix[2] *= scaleX;
				matrix[3] *= scaleX;
			}
			if (scaleY !== 1) {
				matrix[4] *= scaleY;
				matrix[5] *= scaleY;
				matrix[6] *= scaleY;
				matrix[7] *= scaleY;
			}

			translate(-centerX, -centerY);

			me.transformed = true;
		}

		return {
			inputs: {
				reset: {
					method: function () {
						centerX = 0;
						centerY = 0;
						scaleX = 1;
						scaleY = 1;
						translateX = 0;
						translateY = 0;
						rotation = 0;
						skewX = 0;
						skewY = 0;

						if (me.transformed) {
							me.transformed = false;
							return true;
						}

						return false;
					}
				},
				translate: {
					method: function (x, y) {
						if (isNaN(x)) {
							x = translateX;
						}

						if (isNaN(y)) {
							y = translateY;
						}

						if (x === translateX && y === translateY) {
							return false;
						}

						translateX = x;
						translateY = y;

						recompute();
						return true;
					},
					type: [
						'number',
						'number'
					]
				},
				translateX: {
					get: function () {
						return translateX;
					},
					set: function (x) {
						if (x === translateX) {
							return false;
						}

						translateX = x;

						recompute();
						return true;
					},
					type: 'number'
				},
				translateY: {
					get: function () {
						return translateY;
					},
					set: function (y) {
						if (y === translateY) {
							return false;
						}

						translateY = y;

						recompute();
						return true;
					},
					type: 'number'
				},
				rotation: {
					get: function () {
						return rotation;
					},
					set: function (angle) {
						if (angle === rotation) {
							return false;
						}

						//todo: fmod 360deg or Math.PI * 2 radians
						rotation = parseFloat(angle);

						recompute();
						return true;
					},
					type: 'number'
				},
				center: {
					method: function (x, y) {
						if (isNaN(x)) {
							x = centerX;
						}

						if (isNaN(y)) {
							y = centerY;
						}

						if (x === centerX && y === centerY) {
							return false;
						}

						centerX = x;
						centerY = y;

						recompute();
						return true;
					},
					type: [
						'number',
						'number'
					]
				},
				centerX: {
					get: function () {
						return centerX;
					},
					set: function (x) {
						if (x === centerX) {
							return false;
						}

						centerX = x;

						recompute();
						return true;
					},
					type: 'number'
				},
				centerY: {
					get: function () {
						return centerY;
					},
					set: function (y) {
						if (y === centerY) {
							return false;
						}

						centerY = y;

						recompute();
						return true;
					},
					type: 'number'
				},
				skew: {
					method: function (x, y) {
						if (isNaN(x)) {
							x = skewX;
						}

						if (isNaN(y)) {
							y = skewY;
						}

						if (x === skewX && y === skewY) {
							return false;
						}

						skewX = x;
						skewY = y;

						recompute();
						return true;
					},
					type: [
						'number',
						'number'
					]
				},
				skewX: {
					get: function () {
						return skewX;
					},
					set: function (x) {
						if (x === skewX) {
							return false;
						}

						skewX = x;

						recompute();
						return true;
					},
					type: 'number'
				},
				skewY: {
					get: function () {
						return skewY;
					},
					set: function (y) {
						if (y === skewY) {
							return false;
						}

						skewY = y;

						recompute();
						return true;
					},
					type: 'number'
				},
				scale: {
					method: function (x, y) {
						var newX, newY;

						if (isNaN(x)) {
							newX = scaleX;
						} else {
							newX = x;
						}

						/*
						if only one value is specified, set both x and y to the same scale
						*/
						if (isNaN(y)) {
							if (isNaN(x)) {
								return false;
							}

							newY = newX;
						} else {
							newY = y;
						}

						if (newX === scaleX && newY === scaleY) {
							return false;
						}

						scaleX = newX;
						scaleY = newY;

						recompute();
						return true;
					},
					type: [
						'number',
						'number'
					]
				},
				scaleX: {
					get: function () {
						return scaleX;
					},
					set: function (x) {
						if (x === scaleX) {
							return false;
						}

						scaleX = x;

						recompute();
						return true;
					},
					type: 'number'
				},
				scaleY: {
					get: function () {
						return scaleY;
					},
					set: function (y) {
						if (y === scaleY) {
							return false;
						}

						scaleY = y;

						recompute();
						return true;
					},
					type: 'number'
				}
			}
		};
	}, {
		title: '2D Transform',
		description: 'Translate, Rotate, Scale, Skew'
	});

	/*
	todo: move this to a different file when we have a build tool
	*/
	Seriously.transform('flip', function () {
		var me = this,
			horizontal = true;

		function recompute() {
			var matrix = me.matrix;

			//calculate transformation matrix
			//mat4.identity(matrix);

			//scale
			if (horizontal) {
				matrix[0] = -1;
				matrix[5] = 1;
			} else {
				matrix[0] = 1;
				matrix[5] = -1;
			}
		}

		mat4.identity(me.matrix);
		recompute();

		me.transformDirty = true;

		me.transformed = true;

		return {
			inputs: {
				direction: {
					get: function () {
						return horizontal ? 'horizontal' : 'vertical';
					},
					set: function (d) {
						var horiz;
						if (d === 'vertical') {
							horiz = false;
						} else {
							horiz = true;
						}

						if (horiz === horizontal) {
							return false;
						}

						horizontal = horiz;
						recompute();
						return true;
					},
					type: 'string'
				}
			}
		};
	}, {
		title: 'Flip',
		description: 'Flip Horizontal/Vertical'
	});

	/*
	Reformat
	todo: move this to a different file when we have a build tool
	*/
	Seriously.transform('reformat', function () {
		var me = this,
			forceWidth,
			forceHeight,
			mode = 'contain';

		function recompute() {
			var matrix = me.matrix,
				width = forceWidth || me.width,
				height = forceHeight || me.height,
				scaleX,
				scaleY,
				source = me.source,
				sourceWidth = source && source.width || 1,
				sourceHeight = source && source.height || 1,
				aspectIn,
				aspectOut;

			if (mode === 'distort' || width === sourceWidth && height === sourceHeight) {
				me.transformed = false;
				return;
			}

			aspectIn = sourceWidth / sourceHeight;

			aspectOut = width / height;

			if (mode === 'none') {
				scaleX = sourceWidth / width;
				scaleY = sourceHeight / height;
			} else if (mode === 'width' || mode === 'contain' && aspectOut <= aspectIn) {
				scaleX = 1;
				scaleY = aspectOut / aspectIn;
			} else if (mode === 'height' || mode === 'contain' && aspectOut > aspectIn) {
				scaleX = aspectIn / aspectOut;
				scaleY = 1;
			} else {
				//mode === 'cover'
				if (aspectOut > aspectIn) {
					scaleX = 1;
					scaleY = aspectOut / aspectIn;
				} else {
					scaleX = aspectIn / aspectOut;
					scaleY = 1;
				}
			}

			if (scaleX === 1 && scaleY === 1) {
				me.transformed = false;
				return;
			}

			//calculate transformation matrix
			mat4.identity(matrix);

			//scale
			if (scaleX !== 1) {
				matrix[0] *= scaleX;
				matrix[1] *= scaleX;
				matrix[2] *= scaleX;
				matrix[3] *= scaleX;
			}
			if (scaleY !== 1) {
				matrix[4] *= scaleY;
				matrix[5] *= scaleY;
				matrix[6] *= scaleY;
				matrix[7] *= scaleY;
			}
			me.transformed = true;
		}

		function getWidth() {
			return forceWidth || me.source && me.source.width || 1;
		}

		function getHeight() {
			return forceHeight || me.source && me.source.height || 1;
		}

		this.resize = function () {
			var width = getWidth(),
				height = getHeight(),
				i;

			if (this.width !== width || this.height !== height) {
				this.width = width;
				this.height = height;

				if (this.uniforms && this.uniforms.resolution) {
					this.uniforms.resolution[0] = width;
					this.uniforms.resolution[1] = height;
				}

				if (this.frameBuffer && this.frameBuffer.resize) {
					this.frameBuffer.resize(width, height);
				}

				for (i = 0; i < this.targets.length; i++) {
					this.targets[i].resize();
				}
			}

			this.setTransformDirty();

			recompute();
		};

		return {
			inputs: {
				width: {
					get: getWidth,
					set: function (x) {
						x = Math.floor(x);
						if (x === forceWidth) {
							return false;
						}

						forceWidth = x;

						this.resize();

						//don't need to run setTransformDirty again
						return false;
					},
					type: 'number'
				},
				height: {
					get: getHeight,
					set: function (y) {
						y = Math.floor(y);
						if (y === forceHeight) {
							return false;
						}

						forceHeight = y;

						this.resize();

						//don't need to run setTransformDirty again
						return false;
					},
					type: 'number'
				},
				mode: {
					get: function () {
						return mode;
					},
					set: function (m) {
						if (m === mode) {
							return false;
						}

						mode = m;

						recompute();
						return true;
					},
					type: 'enum',
					options: [
						'cover',
						'contain',
						'distort',
						'width',
						'height',
						'none'
					]
				}
			}
		};
	}, {
		title: 'Reformat',
		description: 'Change output dimensions'
	});

	/*
	todo: additional transform node types
	- perspective
	- matrix
	*/

	baseVertexShader = [
		'precision mediump float;',

		'attribute vec4 position;',
		'attribute vec2 texCoord;',

		'uniform vec2 resolution;',
		'uniform mat4 transform;',

		'varying vec2 vTexCoord;',

		'void main(void) {',
		// first convert to screen space
		'	vec4 screenPosition = vec4(position.xy * resolution / 2.0, position.z, position.w);',
		'	screenPosition = transform * screenPosition;',

		// convert back to OpenGL coords
		'	gl_Position.xy = screenPosition.xy * 2.0 / resolution;',
		'	gl_Position.z = screenPosition.z * 2.0 / (resolution.x / resolution.y);',
		'	gl_Position.w = screenPosition.w;',
		'	vTexCoord = texCoord;',
		'}\n'
	].join('\n');

	baseFragmentShader = [
		'precision mediump float;',

		'varying vec2 vTexCoord;',

		'uniform sampler2D source;',

		'void main(void) {',
		/*
		'	if (any(lessThan(vTexCoord, vec2(0.0))) || any(greaterThanEqual(vTexCoord, vec2(1.0)))) {',
		'		gl_FragColor = vec4(0.0);',
		'	} else {',
		*/
		'		gl_FragColor = texture2D(source, vTexCoord);',
		//'	}',
		'}'
	].join('\n');

	/*
	 * simplex noise shaders
	 * https://github.com/ashima/webgl-noise
	 * Copyright (C) 2011 by Ashima Arts (Simplex noise)
	 * Copyright (C) 2011 by Stefan Gustavson (Classic noise)
	 */

	Seriously.util.shader.noiseHelpers = '#ifndef NOISE_HELPERS\n' +
		'#define NOISE_HELPERS\n' +
		'vec2 mod289(vec2 x) {\n' +
		'	return x - floor(x * (1.0 / 289.0)) * 289.0;\n' +
		'}\n' +
		'vec3 mod289(vec3 x) {\n' +
		'	return x - floor(x * (1.0 / 289.0)) * 289.0;\n' +
		'}\n' +
		'vec4 mod289(vec4 x) {\n' +
		'	return x - floor(x * (1.0 / 289.0)) * 289.0;\n' +
		'}\n' +
		'vec3 permute(vec3 x) {\n' +
		'	return mod289(((x*34.0)+1.0)*x);\n' +
		'}\n' +
		'vec4 permute(vec4 x) {\n' +
		'	return mod289(((x*34.0)+1.0)*x);\n' +
		'}\n' +
		'vec4 taylorInvSqrt(vec4 r) {\n' +
		'	return 1.79284291400159 - 0.85373472095314 * r;\n' +
		'}\n' +
		'float taylorInvSqrt(float r) {\n' +
		'	return 1.79284291400159 - 0.85373472095314 * r;\n' +
		'}\n' +
		'#endif\n';

	Seriously.util.shader.snoise2d = '#ifndef NOISE2D\n' +
		'#define NOISE2D\n' +
		'float snoise(vec2 v) {\n' +
		'	const vec4 C = vec4(0.211324865405187, // (3.0-sqrt(3.0))/6.0\n' +
		'		0.366025403784439, // 0.5*(sqrt(3.0)-1.0)\n' +
		'		-0.577350269189626, // -1.0 + 2.0 * C.x\n' +
		'		0.024390243902439); // 1.0 / 41.0\n' +
		'	vec2 i = floor(v + dot(v, C.yy));\n' +
		'	vec2 x0 = v - i + dot(i, C.xx);\n' +
		'	vec2 i1;\n' +
		'	//i1.x = step(x0.y, x0.x); // x0.x > x0.y ? 1.0 : 0.0\n' +
		'	//i1.y = 1.0 - i1.x;\n' +
		'	i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n' +
		'	// x0 = x0 - 0.0 + 0.0 * C.xx ;\n' +
		'	// x1 = x0 - i1 + 1.0 * C.xx ;\n' +
		'	// x2 = x0 - 1.0 + 2.0 * C.xx ;\n' +
		'	vec4 x12 = x0.xyxy + C.xxzz;\n' +
		'	x12.xy -= i1;\n' +
		'	i = mod289(i); // Avoid truncation effects in permutation\n' +
		'	vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));\n' +
		'	vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);\n' +
		'	m = m*m ;\n' +
		'	m = m*m ;\n' +
		'	vec3 x = 2.0 * fract(p * C.www) - 1.0;\n' +
		'	vec3 h = abs(x) - 0.5;\n' +
		'	vec3 ox = floor(x + 0.5);\n' +
		'	vec3 a0 = x - ox;\n' +
		'	m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);\n' +
		'	vec3 g;\n' +
		'	g.x = a0.x * x0.x + h.x * x0.y;\n' +
		'	g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n' +
		'	return 130.0 * dot(m, g);\n' +
		'}\n' +
		'#endif\n';

	Seriously.util.shader.snoise3d = '#ifndef NOISE3D\n' +
		'#define NOISE3D\n' +
		'float snoise(vec3 v) {\n' +
		'	const vec2 C = vec2(1.0/6.0, 1.0/3.0) ;\n' +
		'	const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);\n' +

		// First corner
		'	vec3 i = floor(v + dot(v, C.yyy));\n' +
		'	vec3 x0 = v - i + dot(i, C.xxx) ;\n' +

		// Other corners
		'	vec3 g = step(x0.yzx, x0.xyz);\n' +
		'	vec3 l = 1.0 - g;\n' +
		'	vec3 i1 = min(g.xyz, l.zxy);\n' +
		'	vec3 i2 = max(g.xyz, l.zxy);\n' +

		'	// x0 = x0 - 0.0 + 0.0 * C.xxx;\n' +
		'	// x1 = x0 - i1 + 1.0 * C.xxx;\n' +
		'	// x2 = x0 - i2 + 2.0 * C.xxx;\n' +
		'	// x3 = x0 - 1.0 + 3.0 * C.xxx;\n' +
		'	vec3 x1 = x0 - i1 + C.xxx;\n' +
		'	vec3 x2 = x0 - i2 + C.yyy; // 2.0*C.x = 1/3 = C.y\n' +
		'	vec3 x3 = x0 - D.yyy; // -1.0+3.0*C.x = -0.5 = -D.y\n' +

		// Permutations
		'	i = mod289(i);\n' +
		'	vec4 p = permute(permute(permute(\n' +
		'						i.z + vec4(0.0, i1.z, i2.z, 1.0))\n' +
		'						+ i.y + vec4(0.0, i1.y, i2.y, 1.0))\n' +
		'						+ i.x + vec4(0.0, i1.x, i2.x, 1.0));\n' +

		// Gradients: 7x7 points over a square, mapped onto an octahedron.
		// The ring size 17*17 = 289 is close to a multiple of 49 (49*6 = 294)
		'	float n_ = 0.142857142857; // 1.0/7.0\n' +
		'	vec3 ns = n_ * D.wyz - D.xzx;\n' +

		'	vec4 j = p - 49.0 * floor(p * ns.z * ns.z); // mod(p, 7 * 7)\n' +

		'	vec4 x_ = floor(j * ns.z);\n' +
		'	vec4 y_ = floor(j - 7.0 * x_); // mod(j, N)\n' +

		'	vec4 x = x_ * ns.x + ns.yyyy;\n' +
		'	vec4 y = y_ * ns.x + ns.yyyy;\n' +
		'	vec4 h = 1.0 - abs(x) - abs(y);\n' +

		'	vec4 b0 = vec4(x.xy, y.xy);\n' +
		'	vec4 b1 = vec4(x.zw, y.zw);\n' +

		'	//vec4 s0 = vec4(lessThan(b0, 0.0)) * 2.0 - 1.0;\n' +
		'	//vec4 s1 = vec4(lessThan(b1, 0.0)) * 2.0 - 1.0;\n' +
		'	vec4 s0 = floor(b0) * 2.0 + 1.0;\n' +
		'	vec4 s1 = floor(b1) * 2.0 + 1.0;\n' +
		'	vec4 sh = -step(h, vec4(0.0));\n' +

		'	vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy ;\n' +
		'	vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww ;\n' +

		'	vec3 p0 = vec3(a0.xy, h.x);\n' +
		'	vec3 p1 = vec3(a0.zw, h.y);\n' +
		'	vec3 p2 = vec3(a1.xy, h.z);\n' +
		'	vec3 p3 = vec3(a1.zw, h.w);\n' +

		//Normalise gradients
		'	vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));\n' +
		'	p0 *= norm.x;\n' +
		'	p1 *= norm.y;\n' +
		'	p2 *= norm.z;\n' +
		'	p3 *= norm.w;\n' +

		// Mix final noise value
		'	vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);\n' +
		'	m = m * m;\n' +
		'	return 42.0 * dot(m*m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));\n' +
		'}\n' +
		'#endif\n';

	Seriously.util.shader.snoise4d = '#ifndef NOISE4D\n' +
		'#define NOISE4D\n' +
		'vec4 grad4(float j, vec4 ip)\n' +
		'	{\n' +
		'	const vec4 ones = vec4(1.0, 1.0, 1.0, -1.0);\n' +
		'	vec4 p, s;\n' +
		'\n' +
		'	p.xyz = floor(fract (vec3(j) * ip.xyz) * 7.0) * ip.z - 1.0;\n' +
		'	p.w = 1.5 - dot(abs(p.xyz), ones.xyz);\n' +
		'	s = vec4(lessThan(p, vec4(0.0)));\n' +
		'	p.xyz = p.xyz + (s.xyz*2.0 - 1.0) * s.www;\n' +
		'\n' +
		'	return p;\n' +
		'	}\n' +
		'\n' +
		// (sqrt(5) - 1)/4 = F4, used once below\n
		'#define F4 0.309016994374947451\n' +
		'\n' +
		'float snoise(vec4 v)\n' +
		'	{\n' +
		'	const vec4 C = vec4(0.138196601125011, // (5 - sqrt(5))/20 G4\n' +
		'						0.276393202250021, // 2 * G4\n' +
		'						0.414589803375032, // 3 * G4\n' +
		'						-0.447213595499958); // -1 + 4 * G4\n' +
		'\n' +
		// First corner
		'	vec4 i = floor(v + dot(v, vec4(F4)));\n' +
		'	vec4 x0 = v - i + dot(i, C.xxxx);\n' +
		'\n' +
		// Other corners
		'\n' +
		// Rank sorting originally contributed by Bill Licea-Kane, AMD (formerly ATI)
		'	vec4 i0;\n' +
		'	vec3 isX = step(x0.yzw, x0.xxx);\n' +
		'	vec3 isYZ = step(x0.zww, x0.yyz);\n' +
		// i0.x = dot(isX, vec3(1.0));
		'	i0.x = isX.x + isX.y + isX.z;\n' +
		'	i0.yzw = 1.0 - isX;\n' +
		// i0.y += dot(isYZ.xy, vec2(1.0));
		'	i0.y += isYZ.x + isYZ.y;\n' +
		'	i0.zw += 1.0 - isYZ.xy;\n' +
		'	i0.z += isYZ.z;\n' +
		'	i0.w += 1.0 - isYZ.z;\n' +
		'\n' +
			// i0 now contains the unique values 0, 1, 2, 3 in each channel
		'	vec4 i3 = clamp(i0, 0.0, 1.0);\n' +
		'	vec4 i2 = clamp(i0 - 1.0, 0.0, 1.0);\n' +
		'	vec4 i1 = clamp(i0 - 2.0, 0.0, 1.0);\n' +
		'\n' +
		'	vec4 x1 = x0 - i1 + C.xxxx;\n' +
		'	vec4 x2 = x0 - i2 + C.yyyy;\n' +
		'	vec4 x3 = x0 - i3 + C.zzzz;\n' +
		'	vec4 x4 = x0 + C.wwww;\n' +
		'\n' +
		// Permutations
		'	i = mod289(i);\n' +
		'	float j0 = permute(permute(permute(permute(i.w) + i.z) + i.y) + i.x);\n' +
		'	vec4 j1 = permute(permute(permute(permute (\n' +
		'					i.w + vec4(i1.w, i2.w, i3.w, 1.0))\n' +
		'					+ i.z + vec4(i1.z, i2.z, i3.z, 1.0))\n' +
		'					+ i.y + vec4(i1.y, i2.y, i3.y, 1.0))\n' +
		'					+ i.x + vec4(i1.x, i2.x, i3.x, 1.0));\n' +
		'\n' +
		// Gradients: 7x7x6 points over a cube, mapped onto a 4-cross polytope
		// 7*7*6 = 294, which is close to the ring size 17*17 = 289.
		'	vec4 ip = vec4(1.0/294.0, 1.0/49.0, 1.0/7.0, 0.0) ;\n' +
		'\n' +
		'	vec4 p0 = grad4(j0, ip);\n' +
		'	vec4 p1 = grad4(j1.x, ip);\n' +
		'	vec4 p2 = grad4(j1.y, ip);\n' +
		'	vec4 p3 = grad4(j1.z, ip);\n' +
		'	vec4 p4 = grad4(j1.w, ip);\n' +
		'\n' +
		// Normalise gradients
		'	vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));\n' +
		'	p0 *= norm.x;\n' +
		'	p1 *= norm.y;\n' +
		'	p2 *= norm.z;\n' +
		'	p3 *= norm.w;\n' +
		'	p4 *= taylorInvSqrt(dot(p4, p4));\n' +
		'\n' +
		// Mix contributions from the five corners
		'	vec3 m0 = max(0.6 - vec3(dot(x0, x0), dot(x1, x1), dot(x2, x2)), 0.0);\n' +
		'	vec2 m1 = max(0.6 - vec2(dot(x3, x3), dot(x4, x4)), 0.0);\n' +
		'	m0 = m0 * m0;\n' +
		'	m1 = m1 * m1;\n' +
		'	return 49.0 * (dot(m0*m0, vec3(dot(p0, x0), dot(p1, x1), dot(p2, x2)))\n' +
		'							+ dot(m1*m1, vec2(dot(p3, x3), dot(p4, x4)))) ;\n' +
		'}\n' +
		'#endif\n';

	return Seriously;
}));
