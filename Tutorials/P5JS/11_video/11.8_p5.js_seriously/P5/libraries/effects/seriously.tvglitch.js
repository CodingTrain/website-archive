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

	//particle parameters
	var minVelocity = 0.2,
		maxVelocity = 0.8,
		minSize = 0.02,
		maxSize = 0.3,
		particleCount = 20;

	Seriously.plugin('tvglitch', function () {
		var lastHeight,
			lastTime,
			particleBuffer,
			particleShader,
			particleFrameBuffer,
			gl;

		return {
			initialize: function (parent) {
				var i,
					sizeRange,
					velocityRange,
					particleVertex,
					particleFragment,
					particles;

				gl = this.gl;

				lastHeight = this.height;

				//initialize particles
				particles = [];
				sizeRange = maxSize - minSize;
				velocityRange = maxVelocity - minVelocity;
				for (i = 0; i < particleCount; i++) {
					particles.push(Math.random() * 2 - 1); //position
					particles.push(Math.random() * velocityRange + minVelocity); //velocity
					particles.push(Math.random() * sizeRange + minSize); //size
					particles.push(Math.random() * 0.2); //intensity
				}

				particleBuffer = gl.createBuffer();
				gl.bindBuffer(gl.ARRAY_BUFFER, particleBuffer);
				gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(particles), gl.STATIC_DRAW);
				particleBuffer.itemSize = 4;
				particleBuffer.numItems = particleCount;

				particleVertex = [
					'#define SHADER_NAME seriously.tvglitch.particle',
					'precision mediump float;',

					'attribute vec4 particle;',

					'uniform float time;',
					'uniform float height;',

					'varying float intensity;',

					'void main(void) {',
					'	float y = particle.x + time * particle.y;',
					'	y = fract((y + 1.0) / 2.0) * 4.0 - 2.0;',
					'	intensity = particle.w;',
					'	gl_Position = vec4(0.0, -y , 1.0, 2.0);',
					//'	gl_Position = vec4(0.0, 1.0 , 1.0, 1.0);',
					'	gl_PointSize = height * particle.z;',
					'}'
				].join('\n');

				particleFragment = [
					'#define SHADER_NAME seriously.tvglitch.particle',
					'precision mediump float;',

					'varying float intensity;',

					'void main(void) {',
					'	gl_FragColor = vec4(1.0);',
					'	gl_FragColor.a = 2.0 * intensity * (1.0 - abs(gl_PointCoord.y - 0.5));',
					'}'
				].join('\n');

				particleShader = new Seriously.util.ShaderProgram(gl, particleVertex, particleFragment);

				particleFrameBuffer = new Seriously.util.FrameBuffer(gl, 1, Math.max(1, this.height / 2));
				parent();
			},
			commonShader: true,
			shader: function (inputs, shaderSource) {
				shaderSource.fragment = [
					'precision mediump float;',

					'#define HardLight(top, bottom)  (1.0 - 2.0 * (1.0 - top) * (1.0 - bottom))',

					'varying vec2 vTexCoord;',

					'uniform sampler2D source;',
					'uniform sampler2D particles;',
					'uniform float time;',
					'uniform float scanlines;',
					'uniform float lineSync;',
					'uniform float lineHeight;', //for scanlines and distortion
					'uniform float distortion;',
					'uniform float vsync;',
					'uniform float bars;',
					'uniform float frameSharpness;',
					'uniform float frameShape;',
					'uniform float frameLimit;',
					'uniform vec4 frameColor;',

					//todo: need much better pseudo-random number generator
					Seriously.util.shader.noiseHelpers +
					Seriously.util.shader.snoise2d +

					'void main(void) {',
					'	vec2 texCoord = vTexCoord;',

						//distortion
					'	float drandom = snoise(vec2(time * 10.0, texCoord.y /lineHeight));',
					'	float distortAmount = distortion * (drandom - 0.25) * 0.5;',
						//line sync
					'	vec4 particleOffset = texture2D(particles, vec2(0.0, texCoord.y));',
					'	distortAmount -= lineSync * (2.0 * particleOffset.a - 0.5);',

					'	texCoord.x -= distortAmount;',
					'	texCoord.x = mod(texCoord.x, 1.0);',

						//vertical sync
					'	float roll;',
					'	if (vsync != 0.0) {',
					'		roll = fract(time / vsync);',
					'		texCoord.y = mod(texCoord.y - roll, 1.0);',
					'	}',

					'	vec4 pixel = texture2D(source, texCoord);',

						//horizontal bars
					'	float barsAmount = particleOffset.r;',
					'	if (barsAmount > 0.0) {',
					'		pixel = vec4(pixel.r + bars * barsAmount,' +
								'pixel.g + bars * barsAmount,' +
								'pixel.b + bars * barsAmount,' +
								'pixel.a);',
					'	}',

					'	if (mod(texCoord.y / lineHeight, 2.0) < 1.0 ) {',
					'		pixel.rgb *= (1.0 - scanlines);',
					'	}',

					'	float f = (1.0 - gl_FragCoord.x * gl_FragCoord.x) * (1.0 - gl_FragCoord.y * gl_FragCoord.y);',
					'	float frame = clamp( frameSharpness * (pow(f, frameShape) - frameLimit), 0.0, 1.0);',

					'	gl_FragColor = mix(frameColor, pixel, frame);',
					'}'
				].join('\n');

				return shaderSource;
			},
			resize: function () {
				if (particleFrameBuffer) {
					particleFrameBuffer.resize(1, Math.max(1, this.height / 2));
				}
			},
			draw: function (shader, model, uniforms, frameBuffer, parent) {
				var doParticles = (lastTime !== this.inputs.time),
					vsyncPeriod;

				if (lastHeight !== this.height) {
					lastHeight = this.height;
					doParticles = true;
				}

				//todo: make this configurable?
				uniforms.lineHeight = 1 / this.height;

				if (this.inputs.verticalSync) {
					vsyncPeriod = 0.2 / this.inputs.verticalSync;
					uniforms.vsync = vsyncPeriod;
				} else {
					vsyncPeriod = 1;
					uniforms.vsync = 0;
				}
				uniforms.time = (this.inputs.time % (1000 * vsyncPeriod));
				uniforms.distortion = Math.random() * this.inputs.distortion;

				//render particle canvas and attach uniform
				//todo: this is a good spot for parallel processing. ParallelArray maybe?
				if (doParticles && (this.inputs.lineSync || this.inputs.bars)) {
					particleShader.use();
					gl.viewport(0, 0, 1, this.height / 2);
					gl.bindFramebuffer(gl.FRAMEBUFFER, particleFrameBuffer.frameBuffer);
					gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
					gl.enableVertexAttribArray(particleShader.location.particle);
					gl.bindBuffer(gl.ARRAY_BUFFER, particleBuffer);
					gl.vertexAttribPointer(particleShader.location.particle, particleBuffer.itemSize, gl.FLOAT, false, 0, 0);
					gl.enable(gl.BLEND);
					gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
					particleShader.time.set(uniforms.time * this.inputs.barsRate);
					particleShader.height.set(this.height);
					gl.drawArrays(gl.POINTS, 0, particleCount);

					lastTime = this.inputs.time;
				}
				uniforms.particles = particleFrameBuffer.texture;

				parent(shader, model, uniforms, frameBuffer);
			},
			destroy: function () {
				particleBuffer = null;
				if (particleFrameBuffer) {
					particleFrameBuffer.destroy();
					particleFrameBuffer = null;
				}
			}
		};
	},
	{
		inPlace: false,
		inputs: {
			source: {
				type: 'image',
				uniform: 'source',
				shaderDirty: false
			},
			time: {
				type: 'number',
				defaultValue: 0
			},
			distortion: {
				type: 'number',
				defaultValue: 0.1,
				min: 0,
				max: 1
			},
			verticalSync: {
				type: 'number',
				defaultValue: 0.1,
				min: 0,
				max: 1
			},
			lineSync: {
				type: 'number',
				uniform: 'lineSync',
				defaultValue: 0.2,
				min: 0,
				max: 1
			},
			scanlines: {
				type: 'number',
				uniform: 'scanlines',
				defaultValue: 0.3,
				min: 0,
				max: 1
			},
			bars: {
				type: 'number',
				uniform: 'bars',
				defaultValue: 0,
				min: 0,
				max: 1
			},
			barsRate: {
				type: 'number',
				defaultValue: 1
			},
			frameShape: {
				type: 'number',
				uniform: 'frameShape',
				min: 0,
				max: 2,
				defaultValue: 0.27
			},
			frameLimit: {
				type: 'number',
				uniform: 'frameLimit',
				min: -1,
				max: 1,
				defaultValue: 0.34
			},
			frameSharpness: {
				type: 'number',
				uniform: 'frameSharpness',
				min: 0,
				max: 40,
				defaultValue: 8.4
			},
			frameColor: {
				type: 'color',
				uniform: 'frameColor',
				defaultValue: [0, 0, 0, 1]
			}
		},
		title: 'TV Glitch'
	});
}));
