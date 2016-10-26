/* global define, require, exports, Float32Array */
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

	/*
	todo: if transforms are used, do multiple passes and enable depth testing?
	todo: for now, only supporting float blend modes. Add complex ones
	todo: apply proper credit and license

	Adapted from blend mode shader by Romain Dura
	http://mouaif.wordpress.com/2009/01/05/photoshop-math-with-glsl-shaders/
	*/

	function vectorBlendFormula(formula, base, blend) {
		function replace(channel) {
			var r = {
				base: (base || 'base') + '.' + channel,
				blend: (blend || 'blend') + '.' + channel
			};
			return function (match) {
				return r[match] || match;
			};
		}

		return 'vec3(' +
			formula.replace(/blend|base/g, replace('r')) + ', ' +
			formula.replace(/blend|base/g, replace('g')) + ', ' +
			formula.replace(/blend|base/g, replace('b')) +
			')';
	}

	var blendModes = {
		normal: 'blend',
		lighten: 'max(blend, base)',
		darken: 'min(blend, base)',
		multiply: '(base * blend)',
		average: '(base + blend / TWO)',
		add: 'min(base + blend, ONE)',
		subtract: 'max(base - blend, ZERO)',
		divide: 'base / blend',
		difference: 'abs(base - blend)',
		negation: '(ONE - abs(ONE - base - blend))',
		exclusion: '(base + blend - TWO * base * blend)',
		screen: '(ONE - ((ONE - base) * (ONE - blend)))',
		lineardodge: 'min(base + blend, ONE)',
		phoenix: '(min(base, blend) - max(base, blend) + ONE)',
		linearburn: 'max(base + blend - ONE, ZERO)',

		hue: 'BlendHue(base, blend)',
		saturation: 'BlendSaturation(base, blend)',
		color: 'BlendColor(base, blend)',
		luminosity: 'BlendLuminosity(base, blend)',
		darkercolor: 'BlendDarkerColor(base, blend)',
		lightercolor: 'BlendLighterColor(base, blend)',

		overlay: vectorBlendFormula('base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend))'),
		softlight: vectorBlendFormula('blend < 0.5 ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend)) : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend))'),
		hardlight: vectorBlendFormula('base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend))', 'blend', 'base'),
		colordodge: vectorBlendFormula('blend == 1.0 ? blend : min(base / (1.0 - blend), 1.0)'),
		colorburn: vectorBlendFormula('blend == 0.0 ? blend : max((1.0 - ((1.0 - base) / blend)), 0.0)'),
		linearlight: vectorBlendFormula('BlendLinearLightf(base, blend)'),
		vividlight: vectorBlendFormula('BlendVividLightf(base, blend)'),
		pinlight: vectorBlendFormula('BlendPinLightf(base, blend)'),
		hardmix: vectorBlendFormula('BlendHardMixf(base, blend)'),
		reflect: vectorBlendFormula('BlendReflectf(base, blend)'),
		glow: vectorBlendFormula('BlendReflectf(blend, base)')
	},
	nativeBlendModes = {
		//native blend modes removed for now, because they don't work with linear blending
		// normal: ['FUNC_ADD', 'SRC_ALPHA', 'ONE_MINUS_SRC_ALPHA', 'SRC_ALPHA', 'DST_ALPHA']
		//todo: add, multiply, screen
	},
	identity = new Float32Array([
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1
	]);

	Seriously.plugin('blend', function () {
		var topUniforms,
			bottomUniforms,
			topOpts = {
				clear: false
			},
			inputs,
			gl;

		function updateDrawFunction() {
			var nativeMode = inputs && nativeBlendModes[inputs.mode];
			if (nativeMode && gl) {
				topOpts.blendEquation = gl[nativeMode[0]];
				topOpts.srcRGB = gl[nativeMode[1]];
				topOpts.dstRGB = gl[nativeMode[2]];
				topOpts.srcAlpha = gl[nativeMode[3]];
				topOpts.dstAlpha = gl[nativeMode[4]];
			}
		}

		// custom resize method
		this.resize = function () {
			var width,
				height,
				mode = this.inputs.sizeMode,
				node,
				fn,
				i,
				bottom = this.inputs.bottom,
				top = this.inputs.top;

			if (mode === 'bottom' || mode === 'top') {
				node = this.inputs[mode];
				if (node) {
					width = node.width;
					height = node.height;
				} else {
					width = 1;
					height = 1;
				}
			} else {
				if (bottom) {
					if (top) {
						fn = (mode === 'union' ? Math.max : Math.min);
						width = fn(bottom.width, top.width);
						height = fn(bottom.height, top.height);
					} else {
						width = bottom.width;
						height = bottom.height;
					}
				} else if (top) {
					width = top.width;
					height = top.height;
				} else {
					width = 1;
					height = 1;
				}
			}

			if (this.width !== width || this.height !== height) {
				this.width = width;
				this.height = height;

				this.uniforms.resolution[0] = width;
				this.uniforms.resolution[1] = height;

				if (this.frameBuffer) {
					this.frameBuffer.resize(width, height);
				}

				this.emit('resize');
				this.setDirty();
			}

			this.uniforms.resBottom[0] = bottom && bottom.width || 1;
			this.uniforms.resBottom[1] = bottom && bottom.height || 1;
			this.uniforms.resTop[0] = top && top.width || 1;
			this.uniforms.resTop[1] = top && top.height || 1;

			if (topUniforms) {
				if (bottom) {
					bottomUniforms.resolution[0] = bottom.width;
					bottomUniforms.resolution[1] = bottom.height;
				}
				if (top) {
					topUniforms.resolution[0] = top.width;
					topUniforms.resolution[1] = top.height;
				}
			}

			for (i = 0; i < this.targets.length; i++) {
				this.targets[i].resize();
			}
		};

		this.uniforms.resTop = [1, 1];
		this.uniforms.resBottom = [1, 1];

		return {
			initialize: function (initialize) {
				inputs = this.inputs;
				initialize();
				gl = this.gl;
				updateDrawFunction();
			},
			shader: function (inputs, shaderSource) {
				var mode = inputs.mode || 'normal',
					node;
				mode = mode.toLowerCase();

				if (nativeBlendModes[mode]) {
					//todo: move this to an 'update' event for 'mode' input
					if (!topUniforms) {
						node = this.inputs.top;
						topUniforms = {
							resolution: [
								node && node.width || 1,
								node && node.height || 1
							],
							targetRes: this.uniforms.resolution,
							source: node,
							transform: node && node.cumulativeMatrix || identity,
							opacity: this.inputs.opacity
						};

						node = this.inputs.bottom;
						bottomUniforms = {
							resolution: [
								node && node.width || 1,
								node && node.height || 1
							],
							targetRes: this.uniforms.resolution,
							source: node,
							transform: node && node.cumulativeMatrix || identity,
							opacity: 1
						};
					}

					shaderSource.vertex = [
						'#define SHADER_NAME seriously.blend.' + mode,
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
						'	gl_Position.xy = screenPosition.xy * 2.0 / resolution;',
						'	gl_Position.z = screenPosition.z * 2.0 / (resolution.x / resolution.y);',
						'	gl_Position.xy *= resolution / targetRes;',
						'	gl_Position.w = screenPosition.w;',
						'	vTexCoord = texCoord;',
						'}\n'
					].join('\n');

					shaderSource.fragment = [
						'#define SHADER_NAME seriously.blend.' + mode,
						'precision mediump float;',
						'varying vec2 vTexCoord;',
						'uniform sampler2D source;',
						'uniform float opacity;',
						'void main(void) {',
						'	gl_FragColor = texture2D(source, vTexCoord);',
						'	gl_FragColor.a *= opacity;',
						'}'
					].join('\n');

					return shaderSource;
				}

				topUniforms = null;
				bottomUniforms = null;

				//todo: need separate texture coords for different size top/bottom images
				shaderSource.vertex = [
					'#define SHADER_NAME seriously.blend.' + mode,
					'precision mediump float;',

					'attribute vec4 position;',
					'attribute vec2 texCoord;',

					'uniform vec2 resolution;',
					'uniform vec2 resBottom;',
					'uniform vec2 resTop;',

					'varying vec2 texCoordBottom;',
					'varying vec2 texCoordTop;',

					'const vec2 HALF = vec2(0.5);',

					'void main(void) {',
					//we don't need to do a transform in this shader, since this effect is not "inPlace"
					'	gl_Position = position;',

					'	vec2 adjusted = (texCoord - HALF) * resolution;',

					'	texCoordBottom = adjusted / resBottom + HALF;',
					'	texCoordTop = adjusted / resTop + HALF;',
					'}'
				].join('\n');

				shaderSource.fragment = [
					'#define SHADER_NAME seriously.blend.' + mode,
					'precision mediump float;',

					'const vec3 ZERO = vec3(0.0);',
					'const vec3 ONE = vec3(1.0);',
					'const vec3 HALF = vec3(0.5);',
					'const vec3 TWO = vec3(2.0);',

					/*
					Linear Light is another contrast-increasing mode
					If the blend color is darker than midgray, Linear Light darkens the image
					by decreasing the brightness. If the blend color is lighter than midgray,
					the result is a brighter image due to increased brightness.
					*/

					'#define BlendAddf(base, blend)			min(base + blend, 1.0)',
					'#define BlendLinearDodgef(base, blend)	BlendAddf(base, blend)',
					'#define BlendLinearBurnf(base, blend)	max(base + blend - 1.0, 0.0)',
					'#define BlendLightenf(base, blend)		max(blend, base)',
					'#define BlendDarkenf(base, blend)		min(blend, base)',
					'#define BlendLinearLightf(base, blend)	(blend < 0.5 ? BlendLinearBurnf(base, (2.0 * blend)) : BlendLinearDodgef(base, (2.0 * (blend - 0.5))))',
					'#define BlendScreenf(base, blend)		(1.0 - ((1.0 - base) * (1.0 - blend)))',
					'#define BlendOverlayf(base, blend)		(base < 0.5 ? (2.0 * base * blend) : (1.0 - 2.0 * (1.0 - base) * (1.0 - blend)))',
					'#define BlendSoftLightf(base, blend)	((blend < 0.5) ? (2.0 * base * blend + base * base * (1.0 - 2.0 * blend)) : (sqrt(base) * (2.0 * blend - 1.0) + 2.0 * base * (1.0 - blend)))',
					'#define BlendColorDodgef(base, blend)	((blend == 1.0) ? blend : min(base / (1.0 - blend), 1.0))',
					'#define BlendColorBurnf(base, blend)	((blend == 0.0) ? blend : max((1.0 - ((1.0 - base) / blend)), 0.0))',
					'#define BlendVividLightf(base, blend)	((blend < 0.5) ? BlendColorBurnf(base, (2.0 * blend)) : BlendColorDodgef(base, (2.0 * (blend - 0.5))))',
					'#define BlendPinLightf(base, blend)	((blend < 0.5) ? BlendDarkenf(base, (2.0 * blend)) : BlendLightenf(base, (2.0 *(blend - 0.5))))',
					'#define BlendHardMixf(base, blend)		((BlendVividLightf(base, blend) < 0.5) ? 0.0 : 1.0)',
					'#define BlendReflectf(base, blend)		((blend == 1.0) ? blend : min(base * base / (1.0 - blend), 1.0))',

					/*
					RGB/HSL conversion functions needed for Color, Saturation, Hue, Luminosity, etc.
					*/

					'vec3 RGBToHSL(vec3 color) {',
					'	vec3 hsl;', // init to 0 to avoid warnings ? (and reverse if + remove first part)

					'	float fmin = min(min(color.r, color.g), color.b);',    //Min. value of RGB
					'	float fmax = max(max(color.r, color.g), color.b);',    //Max. value of RGB
					'	float delta = fmax - fmin;',             //Delta RGB value

					'	hsl.z = (fmax + fmin) / 2.0;', // Luminance

					'	if (delta == 0.0) {',		//This is a gray, no chroma...
					'		hsl.x = 0.0;',	// Hue
					'		hsl.y = 0.0;',	// Saturation
					'	} else {',                                    //Chromatic data...
					'		if (hsl.z < 0.5)',
					'			hsl.y = delta / (fmax + fmin);', // Saturation
					'		else',
					'			hsl.y = delta / (2.0 - fmax - fmin);', // Saturation

					'		float deltaR = (((fmax - color.r) / 6.0) + (delta / 2.0)) / delta;',
					'		float deltaG = (((fmax - color.g) / 6.0) + (delta / 2.0)) / delta;',
					'		float deltaB = (((fmax - color.b) / 6.0) + (delta / 2.0)) / delta;',

					'		if (color.r == fmax )',
					'			hsl.x = deltaB - deltaG;', // Hue
					'		else if (color.g == fmax)',
					'			hsl.x = (1.0 / 3.0) + deltaR - deltaB;', // Hue
					'		else if (color.b == fmax)',
					'			hsl.x = (2.0 / 3.0) + deltaG - deltaR;', // Hue

					'		if (hsl.x < 0.0)',
					'			hsl.x += 1.0;', // Hue
					'		else if (hsl.x > 1.0)',
					'			hsl.x -= 1.0;', // Hue
					'	}',

					'	return hsl;',
					'}',

					'float HueToRGB(float f1, float f2, float hue) {',
					'	if (hue < 0.0)',
					'		hue += 1.0;',
					'	else if (hue > 1.0)',
					'		hue -= 1.0;',
					'	float res;',
					'	if ((6.0 * hue) < 1.0)',
					'		res = f1 + (f2 - f1) * 6.0 * hue;',
					'	else if ((2.0 * hue) < 1.0)',
					'		res = f2;',
					'	else if ((3.0 * hue) < 2.0)',
					'		res = f1 + (f2 - f1) * ((2.0 / 3.0) - hue) * 6.0;',
					'	else',
					'		res = f1;',
					'	return res;',
					'}',

					'vec3 HSLToRGB(vec3 hsl) {',
					'	vec3 rgb;',

					'	if (hsl.y == 0.0)',
					'		rgb = vec3(hsl.z);', // Luminance
					'	else {',
					'		float f2;',

					'		if (hsl.z < 0.5)',
					'			f2 = hsl.z * (1.0 + hsl.y);',
					'		else',
					'			f2 = (hsl.z + hsl.y) - (hsl.y * hsl.z);',

					'		float f1 = 2.0 * hsl.z - f2;',

					'		rgb.r = HueToRGB(f1, f2, hsl.x + (1.0/3.0));',
					'		rgb.g = HueToRGB(f1, f2, hsl.x);',
					'		rgb.b= HueToRGB(f1, f2, hsl.x - (1.0/3.0));',
					'	}',

					'	return rgb;',
					'}',

					// Hue Blend mode creates the result color by combining the luminance and saturation of the base color with the hue of the blend color.
					'vec3 BlendHue(vec3 base, vec3 blend) {',
					'	vec3 baseHSL = RGBToHSL(base);',
					'	return HSLToRGB(vec3(RGBToHSL(blend).r, baseHSL.g, baseHSL.b));',
					'}',

					// Saturation Blend mode creates the result color by combining the luminance and hue of the base color with the saturation of the blend color.
					'vec3 BlendSaturation(vec3 base, vec3 blend) {',
					'	vec3 baseHSL = RGBToHSL(base);',
					'	return HSLToRGB(vec3(baseHSL.r, RGBToHSL(blend).g, baseHSL.b));',
					'}',

					// Color Mode keeps the brightness of the base color and applies both the hue and saturation of the blend color.
					'vec3 BlendColor(vec3 base, vec3 blend) {',
					'	vec3 blendHSL = RGBToHSL(blend);',
					'	return HSLToRGB(vec3(blendHSL.r, blendHSL.g, RGBToHSL(base).b));',
					'}',

					// Luminosity Blend mode creates the result color by combining the hue and saturation of the base color with the luminance of the blend color.
					'vec3 BlendLuminosity(vec3 base, vec3 blend) {',
					'	vec3 baseHSL = RGBToHSL(base);',
					'	return HSLToRGB(vec3(baseHSL.r, baseHSL.g, RGBToHSL(blend).b));',
					'}',

					// Compares the total of all channel values for the blend and base color and displays the higher value color.
					'vec3 BlendLighterColor(vec3 base, vec3 blend) {',
					'	float baseTotal = base.r + base.g + base.b;',
					'	float blendTotal = blend.r + blend.g + blend.b;',
					'	return blendTotal > baseTotal ? blend : base;',
					'}',

					// Compares the total of all channel values for the blend and base color and displays the lower value color.
					'vec3 BlendDarkerColor(vec3 base, vec3 blend) {',
					'	float baseTotal = base.r + base.g + base.b;',
					'	float blendTotal = blend.r + blend.g + blend.b;',
					'	return blendTotal < baseTotal ? blend : base;',
					'}',

					'#define BlendFunction(base, blend) ' + blendModes[mode],

					'varying vec2 texCoordBottom;',
					'varying vec2 texCoordTop;',

					'uniform sampler2D top;',
					'uniform sampler2D bottom;',
					'uniform float opacity;',
					'uniform float blendGamma;',

					'vec3 BlendOpacity(vec4 base, vec4 blend, float opacity) {',
					//apply blend, then mix by (opacity * blend.a)
					'	vec3 blendedColor = BlendFunction(base.rgb, blend.rgb);',
					'	return mix(base.rgb, blendedColor, opacity * blend.a);',
					'}',

					'vec4 linear(vec4 color, vec3 gamma) {',
					'	return vec4(pow(color.rgb, gamma), color.a);',
					'}',

					'void main(void) {',
					'	vec3 exp = vec3(blendGamma);',
					'	vec4 topPixel = linear(texture2D(top, texCoordTop), exp);',
					'	vec4 bottomPixel = texture2D(bottom, texCoordBottom);',

					'	if (topPixel.a == 0.0) {',
					'		gl_FragColor = bottomPixel;',
					'	} else {',
					'		bottomPixel = linear(bottomPixel, exp);',
					'		gl_FragColor = vec4(pow(BlendOpacity(bottomPixel, topPixel, opacity), 1.0 / exp), bottomPixel.a);',
					'	}',
					'}'
				].join('\n');

				return shaderSource;
			},
			draw: function (shader, model, uniforms, frameBuffer, draw) {
				if (nativeBlendModes[this.inputs.mode]) {
					if (this.inputs.bottom) {
						draw(shader, model, bottomUniforms, frameBuffer);
					} else {
						//just clear
						gl.viewport(0, 0, this.width, this.height);
						gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffer);
						gl.clearColor(0.0, 0.0, 0.0, 0.0);
						gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
					}

					if (this.inputs.top && this.inputs.opacity) {
						draw(shader, model, topUniforms, frameBuffer, null, topOpts);
					}
				} else {
					draw(shader, model, uniforms, frameBuffer);
				}
			},
			requires: function (sourceName) {
				if (!this.inputs.opacity && sourceName === 'top') {
					return false;
				}
				return true;
			},
			inputs: {
				top: {
					type: 'image',
					uniform: 'top',
					update: function () {
						if (topUniforms) {
							topUniforms.source = this.inputs.top;
							topUniforms.transform = this.inputs.top.cumulativeMatrix || identity;
						}
						this.resize();
					}
				},
				bottom: {
					type: 'image',
					uniform: 'bottom',
					update: function () {
						if (bottomUniforms) {
							bottomUniforms.source = this.inputs.bottom;
							bottomUniforms.transform = this.inputs.bottom.cumulativeMatrix || identity;
						}
						this.resize();
					}
				},
				opacity: {
					type: 'number',
					uniform: 'opacity',
					defaultValue: 1,
					min: 0,
					max: 1,
					updateSources: true,
					update: function (opacity) {
						if (topUniforms) {
							topUniforms.opacity = opacity;
						}
					}
				},
				blendGamma: {
					type: 'number',
					uniform: 'blendGamma',
					defaultValue: 2.2,
					min: 0,
					max: 4
				},
				sizeMode: {
					type: 'enum',
					defaultValue: 'bottom',
					options: [
						'bottom',
						'top',
						'union',
						'intersection'
					],
					update: function () {
						this.resize();
					}
				},
				mode: {
					type: 'enum',
					shaderDirty: true,
					defaultValue: 'normal',
					options: [
						['normal', 'Normal'],
						['lighten', 'Lighten'],
						['darken', 'Darken'],
						['multiply', 'Multiply'],
						['average', 'Average'],
						['add', 'Add'],
						['subtract', 'Subtract'],
						['divide', 'Divide'],
						['difference', 'Difference'],
						['negation', 'Negation'],
						['exclusion', 'Exclusion'],
						['screen', 'Screen'],
						['overlay', 'Overlay'],
						['softlight', 'Soft Light'],
						['hardlight', 'Hard Light'],
						['colordodge', 'Color Dodge'],
						['colorburn', 'Color Burn'],
						['lineardodge', 'Linear Dodge'],
						['linearburn', 'Linear Burn'],
						['linearlight', 'Linear Light'],
						['vividlight', 'Vivid Light'],
						['pinlight', 'Pin Light'],
						['hardmix', 'Hard Mix'],
						['reflect', 'Reflect'],
						['glow', 'Glow'],
						['phoenix', 'Phoenix'],
						['hue', 'Hue'],
						['saturation', 'Saturation'],
						['color', 'color'],
						['luminosity', 'Luminosity'],
						['darkercolor', 'Darker Color'],
						['lightercolor', 'Lighter Color']
					],
					update: function () {
						updateDrawFunction();
					}
				}
			}
		};
	},
	{
		inPlace: function () {
			return !!nativeBlendModes[this.inputs.mode];
		},
		description: 'Blend two layers',
		title: 'Blend'
	});
}));
