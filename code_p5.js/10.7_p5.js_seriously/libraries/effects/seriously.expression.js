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

	function formatFloat(n) {
		if (n - Math.floor(n) === 0) {
			return n + '.0';
		}
		return n;
	}

	var symbols = {
			red: 'rgba.r',
			blue: 'rgba.b',
			green: 'rgba.g',
			alpha: 'rgba.a',
			x: 'dim.x',
			y: 'dim.y',
			width: 'resolution.x',
			height: 'resolution.y',
			a: 'a',
			b: 'b',
			c: 'c',
			d: 'd',
			luma: ['luma', 'rgba']

			/*
			todo:
			- time of day in seconds
			- video time
			- year, month, day
			- datetime in milliseconds
			- transform?
			- transformed position?
			*/
		},
		definitions = {
			dim: 'vec2 dim = vTexCoord * resolution;',
			rgba: 'vec4 rgba = texture2D(source, vTexCoord);',
			luma: 'float luma = dot(rgba.rgb, vec3(0.2125,0.7154,0.0721));',
			atan2: {
				source: '#define atan2(x, y) atan(x / y)',
				global: true
			},
			and: {
				source: [
					'float and(float a, float b) {',
					'	if (a == 0.0) {',
					'		return 0.0;',
					'	}',
					'	return b;',
					'}'
				].join('\n'),
				global: true
			},
			or: {
				source: [
					'float or(float a, float b) {',
					'	if (a != 0.0) {',
					'		return a;',
					'	}',
					'	return b;',
					'}'
				].join('\n'),
				global: true
			},
			luminance: {
				source: [
					'const vec3 lumaCoeffs = vec3(0.2125,0.7154,0.0721);',
					'float luminance(float r, float g, float b) {',
					'	return dot(vec3(r, g, b), lumaCoeffs);',
					'}'
				].join('\n'),
				global: true
			},
			saturation: {
				source: [
					'float saturation(float r, float g, float b) {',
					'	float lo = min(r, min(g, b));',
					'	float hi = max(r, max(g, b));',
					'	float l = (lo + hi) / 2.0;',
					'	float d = hi - lo;',
					'	return l > 0.5 ? d / (2.0 - hi - lo) : d / (hi + lo);',
					'}'
				].join('\n'),
				global: true
			},
			lightness: {
				source: [
					'float lightness(float r, float g, float b) {',
					'	float lo = min(r, min(g, b));',
					'	float hi = max(r, max(g, b));',
					'	return (lo + hi) / 2.0;',
					'}'
				].join('\n'),
				global: true
			},
			hue: {
				source: [
					'float hue(float r, float g, float b) {',
					'	float h;',
					'	if (r > g && r > b) {', //red is max
					'		h = (g - b) / d + (g < b ? 6.0 : 0.0);',
					'	} else if (g > r && g > b) {', //green is max
					'		h = (b - r) / d + 2.0;',
					'	} else {', //blue is max
					'		h = (r - g) / d + 4.0;',
					'	}',
					'	return h / 6.0;',
					'}'
				].join('\n'),
				global: true
			}
		},
		functions = {
			//built-in shader functions
			radians: 1,
			degrees: 1,
			sin: 1,
			cos: 1,
			tan: 1,
			asin: 1,
			acos: 1,
			atan: 1,
			pow: 2,
			exp: 1,
			log: 1,
			exp2: 1,
			log2: 1,
			sqrt: 1,
			inversesqrt: 1,
			abs: 1,
			sign: 1,
			floor: 1,
			ceil: 1,
			fract: 1,
			mod: 2,
			min: 2,
			max: 2,
			clamp: 3,
			mix: 3,
			step: 2,
			smoothstep: 3,

			//custom logic functions
			and: 2,
			or: 2,

			//custom functions
			atan2: 2,
			hue: 3,
			saturation: 3,
			lightness: 3,
			luminance: 3

			/*
			todo:
			noise, random, hslRed, hslGreen, hslBlue,
			int, sinh, cosh, tanh, mantissa, hypot, lerp, step
			noise with multiple octaves (See fBm)
			*/
		},
		unaryOps = {
			'-': true,
			'!': true,
			//'~': false, //todo: implement this or just get rid of it?
			'+': true
		},
		binaryOps = {
			//true means it's a comparison and needs to be converted to float
			'+': false,
			'-': false,
			'*': false,
			'/': false,
			'%': 'mod',
			'&&': 'and',
			'||': 'or',
			//'^^': false, //todo: implement xor?
			//'&',
			//'|',
			//'<<',
			//'>>',
			'===': '==',
			'==': true,
			'!==': '!=',
			'!=': true,
			'>=': true,
			'<=': true,
			'<': true,
			'>': true
		},
		pair,
		key,
		def,

		jsep;

	['E', 'LN2', 'LN10', 'LOG2E', 'LOG10E', 'PI', 'SQRT1_2', 'SQRT2'].forEach(function (key) {
		symbols[key] = key;
		definitions[key] = {
			source: 'const float ' + key + ' = ' + Math[key] + ';',
			global: true
		};
	});

	//clean up lookup tables
	for (key in symbols) {
		if (symbols.hasOwnProperty(key)) {
			def = symbols[key];
			if (typeof def === 'string') {
				def = [def];
			}

			pair = def[0].split('.');
			if (pair.length > 1) {
				def.push(pair[0]);
			}
			symbols[key] = def;
		}
	}

	for (key in definitions) {
		if (definitions.hasOwnProperty(key)) {
			def = definitions[key];
			if (typeof def === 'string') {
				definitions[key] = {
					source: def,
					global: false
				};
			}
		}
	}

	Seriously.plugin('expression', function () {
		var me = this;

		function updateSingle() {
			var inputs = me.inputs;

			if (inputs.blue === inputs.red &&
				inputs.green === inputs.blue) {
				inputs.rgb = inputs.red;
			} else {
				inputs.rgb = '';
			}
		}

		return {
			shader: function (inputs, shaderSource) {
				var expressions = {},
					channels = {
						red: '',
						green: '',
						blue: '',
						alpha: ''
					},
					dependencies = {},
					deps,
					expr,
					key,
					statements,
					globalDefinitions = [],
					nonGlobalDefinitions = [],
					cs = [],
					tree;

				function makeExpression(tree) {
					var verb, x, i,
						args;
					/*
					COMPOUND = 'Compound'
					*/

					//We do not have any objects to offer
					if (tree.type === 'MemberExpression') {
						throw new Error('Expression Error: Unknown object "' + (tree.object.name || 'this') + '"');
					}

					if (tree.type === 'BinaryExpression' || tree.type === 'LogicalExpression') {
						if (!tree.right) {
							throw new Error('Expression Error: Bad binary expression');
						}

						//jsep seems to parse some unary expressions as binary with missing left side
						//todo: consider removing this if/when jsep fixes it. file a github issue
						if (!tree.left) {
							tree.type = 'UnaryExpression';
							tree.argument = tree.right;
							return makeExpression(tree);
						}

						verb = tree.operator;
						x = binaryOps[verb];
						if (x === undefined) {
							throw new Error('Expression Error: Unknown operator "' + verb + '"');
						}

						if (typeof x === 'string') {
							if (x in binaryOps) {
								verb = binaryOps[x];
								x = binaryOps[verb];
							} else if (functions[x] === 2) {
								deps[x] = true;
								return x + '(' + makeExpression(tree.left) + ', ' + makeExpression(tree.right) + ')';
							}
						}

						return (x ? 'float' : '') + '(' + makeExpression(tree.left) + ' ' + verb + ' ' + makeExpression(tree.right) + ')';
					}

					if (tree.type === 'CallExpression') {
						if (tree.callee.type !== 'Identifier') {
							throw new Error('Expression Error: Unknown function');
						}

						verb = tree.callee.name;
						x = functions[verb];
						if (x === undefined) {
							throw new Error('Expression Error: Unknown function "' + verb + '"');
						}

						if (x > tree.arguments.length) {
							throw new Error('Expression Error: Function "' + verb + '" requires at least ' + x + ' arguments');
						}

						args = [];
						for (i = 0; i < x; i++) {
							args.push(makeExpression(tree.arguments[i]));
						}
						deps[verb] = true;
						return verb + '(' + args.join(', ') + ')';
					}

					if (tree.type === 'Identifier') {
						args = symbols[tree.name];
						if (!args) {
							throw new Error('Expression Error: Unknown identifier "' + tree.name + '"');
						}

						for (i = args.length - 1; i >= 0; i--) {
							x = args[i];
							if (definitions[x]) {
								deps[x] = true;
							}
						}
						return args[0];
					}

					if (tree.type === 'Literal') {
						if (tree.raw === 'true') {
							return 1.0;
						}

						if (tree.raw === 'true') {
							return 0.0;
						}

						if (typeof tree.value !== 'number' || isNaN(tree.value)) {
							throw new Error('Expression Error: Invalid literal ' + tree.raw);
						}

						return formatFloat(tree.value);
					}

					if (tree.type === 'UnaryExpression') {
						verb = tree.operator;
						x = unaryOps[verb];
						if (!x) {
							throw new Error('Expression Error: Unknown operator "' + verb + '"');
						}

						//todo: are there any unary operators that could become functions?
						return verb + '(' + makeExpression(tree.argument) + ')';
					}
				}

				for (key in channels) {
					if (channels.hasOwnProperty(key)) {
						expr = inputs[key] || key;
						channels[key] = expr;
						expressions[expr] = '';
					}
				}

				for (expr in expressions) {
					if (expressions.hasOwnProperty(expr)) {
						try {
							deps = {};
							tree = jsep(expr);
							//todo: convert this to a function?
							expressions[expr] = makeExpression(tree);

							//flag any required declarations/precalculations
							for (key in deps) {
								if (deps.hasOwnProperty(key)) {
									dependencies[key] = deps[key];
								}
							}

							//special case for luma. todo: generalize if we need to
							if (deps.luma) {
								dependencies.rgba = true;
							}
						} catch (parseError) {
							console.log(parseError.message);
							expressions[expr] = '0.0';
						}
					}
				}

				for (key in dependencies) {
					if (dependencies.hasOwnProperty(key)) {
						deps = definitions[key];
						if (deps) {
							if (deps.global) {
								globalDefinitions.push(deps.source);
							} else {
								nonGlobalDefinitions.push('\t' + deps.source);
							}
						}
					}
				}

				/*
				todo: assign duplicate expressions to temp variables
				for (expr in expressions) {
					if (expressions.hasOwnProperty(expr)) {
						statements.push('float val' + index = )
					}
				}
				*/

				for (key in channels) {
					if (channels.hasOwnProperty(key)) {
						expr = channels[key];
						cs.push(expressions[expr]);
					}
				}

				statements = [
					'precision mediump float;',
					'varying vec2 vTexCoord;',
					'varying vec4 vPosition;',

					'uniform sampler2D source;',
					'uniform float a, b, c, d;',
					'uniform vec2 resolution;',
					globalDefinitions.join('\n'),
					'void main(void) {',
					nonGlobalDefinitions.join('\n'),
					'\tgl_FragColor = vec4(',
					'\t\t' + cs.join(',\n\t\t'),
					'\t);',
					'}'
				];

				shaderSource.fragment = statements.join('\n');

				return shaderSource;
			},
			inputs: {
				source: {
					type: 'image',
					uniform: 'source',
					shaderDirty: true
				},
				a: {
					type: 'number',
					uniform: 'a',
					defaultValue: 0
				},
				b: {
					type: 'number',
					uniform: 'b',
					defaultValue: 0
				},
				c: {
					type: 'number',
					uniform: 'c',
					defaultValue: 0
				},
				d: {
					type: 'number',
					uniform: 'd',
					defaultValue: 0
				},
				rgb: {
					type: 'string',
					update: function (val) {
						var inputs = me.inputs;
						inputs.red = inputs.green = inputs.blue = val;
					},
					shaderDirty: true
				},
				red: {
					type: 'string',
					update: updateSingle,
					shaderDirty: true
				},
				green: {
					type: 'string',
					update: updateSingle,
					shaderDirty: true
				},
				blue: {
					type: 'string',
					update: updateSingle,
					shaderDirty: true
				},
				alpha: {
					type: 'string',
					shaderDirty: true
				}
			}
		};
	},
	{
		inPlace: false,
		title: 'Expression'
	});

	/* jsep v0.2.9 (http://jsep.from.so/) */
	!function(a){"use strict";var b="Compound",c="Identifier",d="MemberExpression",e="Literal",f="ThisExpression",g="CallExpression",h="UnaryExpression",i="BinaryExpression",j="LogicalExpression",k=!0,l={"-":k,"!":k,"~":k,"+":k},m={"||":1,"&&":2,"|":3,"^":4,"&":5,"==":6,"!=":6,"===":6,"!==":6,"<":7,">":7,"<=":7,">=":7,"<<":8,">>":8,">>>":8,"+":9,"-":9,"*":10,"/":10,"%":10},n=function(a){var b,c=0;for(var d in a)(b=d.length)>c&&a.hasOwnProperty(d)&&(c=b);return c},o=n(l),p=n(m),q={"true":!0,"false":!1,"null":null},r="this",s=function(a){return m[a]||0},t=function(a,b,c){var d="||"===a||"&&"===a?j:i;return{type:d,operator:a,left:b,right:c}},u=function(a){return a>=48&&57>=a},v=function(a){return 36===a||95===a||a>=65&&90>=a||a>=97&&122>=a},w=function(a){return 36===a||95===a||a>=65&&90>=a||a>=97&&122>=a||a>=48&&57>=a},x=function(a){for(var i,j,k=0,n=a.charAt,x=a.charCodeAt,y=function(b){return n.call(a,b)},z=function(b){return x.call(a,b)},A=a.length,B=function(){for(var a=z(k);32===a||9===a;)a=z(++k)},C=function(){B();for(var b=a.substr(k,p),c=b.length;c>0;){if(m.hasOwnProperty(b))return k+=c,b;b=b.substr(0,--c)}return!1},D=function(){var a,b,c,d,e,f,g,h;if(f=E(),b=C(),!b)return f;if(e={value:b,prec:s(b)},g=E(),!g)throw new Error("Expected expression after "+b+" at character "+k);for(d=[f,e,g];(b=C())&&(c=s(b),0!==c);){for(e={value:b,prec:c};d.length>2&&c<=d[d.length-2].prec;)g=d.pop(),b=d.pop().value,f=d.pop(),a=t(b,f,g),d.push(a);if(a=E(),!a)throw new Error("Expected expression after "+b+" at character "+k);d.push(e),d.push(a)}for(h=d.length-1,a=d[h];h>1;)a=t(d[h-1].value,d[h-2],a),h-=2;return a},E=function(){var b,c,d;if(B(),b=z(k),u(b)||46===b)return F();if(39===b||34===b)return G();if(v(b))return J();if(40===b)return K();for(c=a.substr(k,o),d=c.length;d>0;){if(l.hasOwnProperty(c))return k+=d,{type:h,operator:c,argument:E(),prefix:!0};c=c.substr(0,--d)}return!1},F=function(){for(var a="";u(z(k));)a+=y(k++);if("."===y(k))for(a+=y(k++);u(z(k));)a+=y(k++);if("e"===y(k)||"E"===y(k)){for(a+=y(k++),("+"===y(k)||"-"===y(k))&&(a+=y(k++));u(z(k));)a+=y(k++);if(!u(z(k-1)))throw new Error("Expected exponent ("+a+y(k)+") at character "+k)}if(v(z(k)))throw new Error("Variable names cannot start with a number ("+a+y(k)+") at character "+k);return{type:e,value:parseFloat(a),raw:a}},G=function(){for(var a,b="",c=y(k++),d=!1;A>k;){if(a=y(k++),a===c){d=!0;break}if("\\"===a)switch(a=y(k++)){case"n":b+="\n";break;case"r":b+="\r";break;case"t":b+="	";break;case"b":b+="\b";break;case"f":b+="\f";break;case"v":b+=""}else b+=a}if(!d)throw new Error('Unclosed quote after "'+b+'"');return{type:e,value:b,raw:c+b+c}},H=function(){var b,d=z(k),g=k;if(!v(d))throw new Error("Unexpected "+y(k)+"at character "+k);for(k++;A>k&&(d=z(k),w(d));)k++;return b=a.slice(g,k),q.hasOwnProperty(b)?{type:e,value:q[b],raw:b}:b===r?{type:f}:{type:c,name:b}},I=function(){for(var a,c,d=[];A>k;){if(B(),a=y(k),")"===a){k++;break}if(","===a)k++;else{if(c=D(),!c||c.type===b)throw new Error("Expected comma at character "+k);d.push(c)}}return d},J=function(){var a,b,c;for(b=H(),B(),a=y(k);"."===a||"["===a||"("===a;){if("."===a)k++,B(),b={type:d,computed:!1,object:b,property:H()};else if("["===a){if(c=k,k++,b={type:d,computed:!0,object:b,property:D()},B(),a=y(k),"]"!==a)throw new Error("Unclosed [ at character "+k);k++,B()}else"("===a&&(k++,b={type:g,arguments:I(),callee:b});B(),a=y(k)}return b},K=function(){k++;var a=D();if(B(),")"===y(k))return k++,a;throw new Error("Unclosed ( at character "+k)},L=[];A>k;)if(i=y(k),";"===i||","===i)k++;else if(j=D())L.push(j);else if(A>k)throw new Error("Unexpected '"+y(k)+"' at character "+k);return 1===L.length?L[0]:{type:b,body:L}};if(x.version="0.2.9",x.toString=function(){return"JavaScript Expression Parser (JSEP) v"+x.version},x.addUnaryOp=function(a){return l[a]=k,this},x.addBinaryOp=function(a,b){return p=Math.max(a.length,p),m[a]=b,this},x.removeUnaryOp=function(a){return delete l[a],a.length===o&&(o=n(l)),this},x.removeBinaryOp=function(a){return delete m[a],a.length===p&&(p=n(m)),this},"undefined"==typeof exports){var y=a.jsep;a.jsep=x,x.noConflict=function(){return a.jsep===x&&(a.jsep=y),x}}else"undefined"!=typeof module&&module.exports?exports=module.exports=x:exports.parse=x}(window);

	jsep = window.jsep.noConflict();
}));
