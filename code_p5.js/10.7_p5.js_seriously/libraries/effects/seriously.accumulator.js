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

	/*
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
		linearburn: 'max(base + blend - ONE, ZERO)', //same as subtract?

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

	/*
	All blend modes other than "normal" effectively act as adjustment layers,
	so the alpha channel of the resulting image is just a copy of the "bottom"
	or "destination" layer. The "top" or "source" alpha is only used to dampen
	the color effect.
	*/
	mixAlpha = {
		normal: true
	};

	Seriously.plugin('accumulator', function () {
		var drawOpts = {
			clear: false
		},
		frameBuffers,
		fbIndex = 0,
		me = this,
		width = this.width,
		height = this.height;

		function clear() {
			var gl = me.gl,
				width = me.width,
				height = me.height,
				color = me.inputs.startColor;

			if (gl && width && height) {
				gl.viewport(0, 0, width, height);
				gl.clearColor.apply(gl, color);

				gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffers[0].frameBuffer);
				gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

				gl.bindFramebuffer(gl.FRAMEBUFFER, frameBuffers[1].frameBuffer);
				gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
			}
		}

		return {
			initialize: function (initialize, gl) {
				initialize();
				frameBuffers = [
					this.frameBuffer,
					new Seriously.util.FrameBuffer(gl, this.width, this.height)
				];
				clear();
			},
			shader: function (inputs, shaderSource) {
				var mode = inputs.blendMode || 'normal';
				mode = mode.toLowerCase();

				shaderSource.fragment = [
					'#define SHADER_NAME seriously.accumulator.' + mode,
					'precision mediump float;',

					'const vec3 ZERO = vec3(0.0);',
					'const vec3 ONE = vec3(1.0);',
					'const vec3 HALF = vec3(0.5);',
					'const vec3 TWO = vec3(2.0);',

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
					Linear Light is another contrast-increasing mode
					If the blend color is darker than midgray, Linear Light darkens the image
					by decreasing the brightness. If the blend color is lighter than midgray,
					the result is a brighter image due to increased brightness.
					*/

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
					(mixAlpha[mode] ? '#define MIX_ALPHA' : ''),

					'varying vec2 vTexCoord;',

					'uniform sampler2D source;',
					'uniform sampler2D previous;',

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
					'	vec4 topPixel = linear(texture2D(source, vTexCoord), exp);',
					'	vec4 bottomPixel = texture2D(previous, vTexCoord);',

					'	if (topPixel.a == 0.0) {',
					'		gl_FragColor = bottomPixel;',
					'	} else {',
					'		float alpha;',
					'#ifdef MIX_ALPHA',
					'		alpha = topPixel.a * opacity;',
					'		alpha = alpha + bottomPixel.a * (1.0 - alpha);',
					'#else',
					'		alpha = bottomPixel.a;',
					'#endif',
					'		bottomPixel = linear(bottomPixel, exp);',
					'		gl_FragColor = vec4(pow(BlendOpacity(bottomPixel, topPixel, opacity), 1.0 / exp), alpha);',
					'	}',
					'}'
				].join('\n');

				return shaderSource;
			},
			resize: function () {
				if (frameBuffers && (this.width !== width || this.height !== height)) {
					width = this.width;
					height = this.height;
					frameBuffers[0].resize(width, height);
					frameBuffers[1].resize(width, height);
					clear();
				}
			},
			draw: function (shader, model, uniforms, frameBuffer, draw) {
				var fb;

				// ping-pong textures
				this.uniforms.previous = this.frameBuffer.texture;
				fbIndex = (fbIndex + 1) % 2;
				fb = frameBuffers[fbIndex];
				this.frameBuffer = fb;
				this.texture = fb.texture;

				if (this.inputs.clear) {
					clear();
					draw(this.baseShader, model, uniforms, fb.frameBuffer, null);
					return;
				}

				draw(shader, model, uniforms, fb.frameBuffer, null, drawOpts);
			},
			destroy: function () {
				if (frameBuffers) {
					frameBuffers[0].destroy();
					frameBuffers[1].destroy();
					frameBuffers.length = 0;
				}
			}
		};
	}, {
		inPlace: false,
		title: 'Accumulator',
		description: 'Draw on top of previous frame',
		inputs: {
			source: {
				type: 'image',
				uniform: 'source'
			},
			clear: {
				type: 'boolean',
				defaultValue: false
			},
			startColor: {
				type: 'color',
				defaultValue: [0, 0, 0, 0]
			},
			opacity: {
				type: 'number',
				uniform: 'opacity',
				defaultValue: 1,
				min: 0,
				max: 1
			},
			blendGamma: {
				type: 'number',
				uniform: 'blendGamma',
				defaultValue: 2.2,
				min: 0,
				max: 4
			},
			blendMode: {
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
				]
			}
		}
	});
}));
