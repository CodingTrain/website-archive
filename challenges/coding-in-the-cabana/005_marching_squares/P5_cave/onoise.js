function openSimplexNoise(clientSeed) {
	"use strict";
	const SQ5 = 2.23606797749979;
	const SQ4 = 2;
	const SQ3 = 1.7320508075688772;
	const toNums = (s) => s.split(",").map(s => new Uint8Array(s.split("").map(v => Number(v))));
	const decode = (m, r, s) => new Int8Array(s.split("").map(v => parseInt(v, r) + m));
	const toNumsB32 = (s) => s.split(",").map(s => parseInt(s, 32));
	const NORM_2D = 1.0 / 47.0;
	const NORM_3D = 1.0 / 103.0;
	const NORM_4D = 1.0 / 30.0;
	const SQUISH_2D = (SQ3 - 1) / 2;
	const SQUISH_3D = (SQ4 - 1) / 3;
	const SQUISH_4D = (SQ5 - 1) / 4;
	const STRETCH_2D = (1 / SQ3 - 1) / 2;
	const STRETCH_3D = (1 / SQ4 - 1) / 3;
	const STRETCH_4D = (1 / SQ5 - 1) / 4;
	var base2D = toNums("110101000,110101211");
	var base3D = toNums("0000110010101001,2110210120113111,110010101001211021012011");
	var base4D = toNums("0000011000101001001010001,3111031101310113011141111,11000101001001010001211002101021001201102010120011,31110311013101130111211002101021001201102010120011");
	const gradients2D = decode(-5, 11, "a77a073aa3700330");
	const gradients3D = decode(-11, 23, "0ff7mf7fmmfffmfffm07f70f77mm7ff0ff7m0f77m77f0mf7fm7ff0077707770m77f07f70");
	const gradients4D = decode(-3, 7, "6444464444644446044426442464244662444044426442460244204422642246642446244404442604242624240424266224402442044226022420242204222664424642446244400442264224622440624240424262424002422042226222406422462244024420042226222402242062224022420242200222202222022220");
	var lookupPairs2D = () => new Uint8Array([0,1, 1,0, 4,1, 17,0, 20,2, 21,2, 22,5, 23, 5,26, 4,39, 3,42, 4,43, 3]);
	var lookupPairs3D = () => new Uint16Array(toNumsB32("0,2,1,1,2,2,5,1,6,0,7,0,10,2,12,2,41,1,45,1,50,5,51,5,g6,0,g7,0,h2,4,h6,4,k5,3,k7,3,l0,5,l1,5,l2,4,l5,3,l6,4,l7,3,l8,d,l9,d,la,c,ld,e,le,c,lf,e,m8,k,ma,i,p9,l,pd,n,q8,k,q9,l,15e,j,15f,m,16a,i,16e,j,19d,n,19f,m,1a8,f,1a9,h,1aa,f,1ad,h,1ae,g,1af,g,1ag,b,1ah,a,1ai,b,1al,a,1am,9,1an,9,1bg,b,1bi,b,1eh,a,1el,a,1fg,8,1fh,8,1qm,9,1qn,9,1ri,7,1rm,7,1ul,6,1un,6,1vg,8,1vh,8,1vi,7,1vl,6,1vm,7,1vn,6"));
	var lookupPairs4D = () => new Uint32Array(toNumsB32("0,3,1,2,2,3,5,2,6,1,7,1,8,3,9,2,a,3,d,2,g,3,i,3,m,1,n,1,o,3,q,3,11,2,15,2,16,1,17,1,19,2,1d,2,1m,1,1n,1,1o,0,1p,0,1q,0,1r,0,1s,0,1t,0,1u,0,1v,0,80,3,82,3,88,3,8a,3,8g,3,8i,3,8o,3,8q,3,201,2,205,2,209,2,20d,2,211,2,215,2,219,2,21d,2,280,9,281,9,288,9,289,9,g06,1,g07,1,g0m,1,g0n,1,g16,1,g17,1,g1m,1,g1n,1,g82,8,g86,8,g8i,8,g8m,8,i05,6,i07,6,i15,6,i17,6,i80,9,i81,9,i82,8,i85,6,i86,8,i87,6,i88,9,i89,9,i8i,8,i8m,8,i95,6,i97,6,401o,0,401p,0,401q,0,401r,0,401s,0,401t,0,401u,0,401v,0,408o,7,408q,7,409o,7,409q,7,4219,5,421d,5,421p,5,421t,5,4280,9,4281,9,4288,9,4289,9,428o,7,428q,7,4299,5,429d,5,429o,7,429p,5,429q,7,429t,5,4g1m,4,4g1n,4,4g1u,4,4g1v,4,4g82,8,4g86,8,4g8i,8,4g8m,8,4g8o,7,4g8q,7,4g9m,4,4g9n,4,4g9o,7,4g9q,7,4g9u,4,4g9v,4,4i05,6,4i07,6,4i15,6,4i17,6,4i19,5,4i1d,5,4i1m,4,4i1n,4,4i1p,5,4i1t,5,4i1u,4,4i1v,4,4i80,9,4i81,9,4i82,8,4i85,6,4i86,8,4i87,6,4i88,9,4i89,9,4i8i,8,4i8m,8,4i8o,7,4i8q,7,4i95,6,4i97,6,4i99,5,4i9d,5,4i9m,4,4i9n,4,4i9o,7,4i9p,5,4i9q,7,4i9t,5,4i9u,4,4i9v,4,4ia0,15,4ia1,15,4ia2,14,4ia5,12,4ia6,14,4ia7,12,4ia8,15,4ia9,15,4iai,14,4iam,14,4iao,13,4iaq,13,4ib5,12,4ib7,12,4ib9,11,4ibd,11,4ibm,10,4ibn,10,4ibo,13,4ibp,11,4ibq,13,4ibt,11,4ibu,10,4ibv,10,4ii0,1h,4ii2,1g,4ii8,1h,4iii,1g,4iio,1f,4iiq,1f,4ka1,1e,4ka5,1d,4ka9,1e,4kb5,1d,4kb9,1c,4kbd,1c,4ki0,1h,4ki1,1e,4ki8,1h,4ki9,1e,52a6,1b,52a7,1a,52am,1b,52b7,1a,52bm,19,52bn,19,52i2,1g,52i6,1b,52ii,1g,52im,1b,54a5,1d,54a7,1a,54b5,1d,54b7,1a,54i0,v,54i1,s,54i2,v,54i5,s,54i6,p,54i7,p,8ibo,18,8ibp,17,8ibq,18,8ibt,17,8ibu,16,8ibv,16,8iio,1f,8iiq,1f,8ijo,18,8ijq,18,8kb9,1c,8kbd,1c,8kbp,17,8kbt,17,8ki8,u,8ki9,r,8kio,u,8kj9,r,8kjo,m,8kjp,m,92bm,19,92bn,19,92bu,16,92bv,16,92ii,t,92im,o,92iq,t,92jm,o,92jq,l,92ju,l,94b5,q,94b7,n,94bd,q,94bn,n,94bt,k,94bv,k,94i0,v,94i1,s,94i2,v,94i5,s,94i6,p,94i7,p,94i8,u,94i9,r,94ii,t,94im,o,94io,u,94iq,t,94j5,q,94j7,n,94j9,r,94jd,q,94jm,o,94jn,n,94jo,m,94jp,m,94jq,l,94jt,k,94ju,l,94jv,k,94k0,1t,94k1,1s,94k2,1t,94k5,1s,94k6,1r,94k7,1r,94k8,1q,94k9,1p,94ki,1n,94km,1m,94ko,1q,94kq,1n,94l5,1k,94l7,1j,94l9,1p,94ld,1k,94lm,1m,94ln,1j,94lo,1o,94lp,1o,94lq,1l,94lt,1i,94lu,1l,94lv,1i,94s0,1t,94s2,1t,94s8,1q,94si,1n,94so,1q,94sq,1n,96k1,1s,96k5,1s,96k9,1p,96l5,1k,96l9,1p,96ld,1k,96s0,2f,96s1,2f,96s8,2c,96s9,2c,9kk6,1r,9kk7,1r,9kkm,1m,9kl7,1j,9klm,1m,9kln,1j,9ks2,2e,9ks6,2e,9ksi,29,9ksm,29,9mk5,2d,9mk7,2d,9ml5,26,9ml7,26,9ms0,2f,9ms1,2f,9ms2,2e,9ms5,2d,9ms6,2e,9ms7,2d,d4lo,1o,d4lp,1o,d4lq,1l,d4lt,1i,d4lu,1l,d4lv,1i,d4so,2b,d4sq,28,d4to,2b,d4tq,28,d6l9,2a,d6ld,25,d6lp,2a,d6lt,25,d6s8,2c,d6s9,2c,d6so,2b,d6t9,2a,d6to,2b,d6tp,2a,dklm,27,dkln,24,dklu,27,dklv,24,dksi,29,dksm,29,dksq,28,dktm,27,dktq,28,dktu,27,dml5,26,dml7,26,dmld,25,dmln,24,dmlt,25,dmlv,24,dms0,23,dms1,23,dms2,22,dms5,20,dms6,22,dms7,20,dms8,23,dms9,23,dmsi,22,dmsm,22,dmso,21,dmsq,21,dmt5,20,dmt7,20,dmt9,1v,dmtd,1v,dmtm,1u,dmtn,1u,dmto,21,dmtp,1v,dmtq,21,dmtt,1v,dmtu,1u,dmtv,1u,dmu0,j,dmu1,j,dmu2,i,dmu5,g,dmu6,i,dmu7,g,dmu8,j,dmu9,j,dmui,i,dmum,i,dmuo,h,dmuq,h,dmv5,g,dmv7,g,dmv9,f,dmvd,f,dmvm,e,dmvn,e,dmvo,h,dmvp,f,dmvq,h,dmvt,f,dmvu,e,dmvv,e,dn60,j,dn61,j,dn62,i,dn66,i,dn68,j,dn69,j,dn6i,i,dn6m,i,dn6o,h,dn6q,h,dn7o,h,dn7q,h,dou0,j,dou1,j,dou5,g,dou7,g,dou8,j,dou9,j,dov5,g,dov7,g,dov9,f,dovd,f,dovp,f,dovt,f,dp60,j,dp61,j,dp68,j,dp69,j,e6u2,i,e6u5,g,e6u6,i,e6u7,g,e6ui,i,e6um,i,e6v5,g,e6v7,g,e6vm,e,e6vn,e,e6vu,e,e6vv,e,e762,i,e766,i,e76i,i,e76m,i,e8u5,g,e8u7,g,e8v5,g,e8v7,g,e960,d,e961,d,e962,d,e963,d,e964,d,e965,d,e966,d,e967,d,hmuo,h,hmuq,h,hmv9,f,hmvd,f,hmvm,e,hmvn,e,hmvo,h,hmvp,f,hmvq,h,hmvt,f,hmvu,e,hmvv,e,hn6o,h,hn6q,h,hn7o,h,hn7q,h,hov9,f,hovd,f,hovp,f,hovt,f,hp68,c,hp69,c,hp6o,c,hp6p,c,hp78,c,hp79,c,hp7o,c,hp7p,c,i6vm,e,i6vn,e,i6vu,e,i6vv,e,i76i,b,i76m,b,i76q,b,i76u,b,i77i,b,i77m,b,i77q,b,i77u,b,i8v5,a,i8v7,a,i8vd,a,i8vf,a,i8vl,a,i8vn,a,i8vt,a,i8vv,a,i960,d,i961,d,i962,d,i963,d,i964,d,i965,d,i966,d,i967,d,i968,c,i969,c,i96i,b,i96m,b,i96o,c,i96p,c,i96q,b,i96u,b,i975,a,i977,a,i978,c,i979,c,i97d,a,i97f,a,i97i,b,i97l,a,i97m,b,i97n,a,i97o,c,i97p,c,i97q,b,i97t,a,i97u,b,i97v,a"));
	var p2D = decode(-1, 4, "112011021322233123132111");
	var p3D = decode(-1, 5, "112011210110211120110121102132212220132122202131222022243214231243124213241324123222113311221213131221123113311112202311112022311112220342223113342223311342223131322023113322023311320223113320223131322203311322203131");
	var p4D = decode(-1, 6, "11201112101121101102111120111210110121110211112011011211012111021322112220122210132121220212212013122120221212201321122201222102131212202122120213112220122210222532215232152231253212523125221325312252132521232513225123251223232211432114231123212143121421312312214132141231232112431124211323121241312412132311224113241123342221322203311134221232202331113421223202233111342221322203131134221232202313113412223022231311342221322203113134212232022311313412223022231131342212322023111334212232022311133412223022231113322201222101111132202122120111113202212122011111322012221021111132021221202111113201222102211111322201222103311132202122120331113220122210233111322201222103131132022121220313113202122120231311322021221203113132022121220311313201222102231131322012221023111332021221202311133201222102231113422111331113222042121131311322204211213113132220422111331113220242121131311322024211123111332202422111331113202242112131131320224211123111332022421211313113022242112131131302224211123111330222443211423115222244312142131522224413214123152222443112421135222244131241213522224411324112352222443211423113222044312142131322204413214123132220443211423113220244311242113322024413124121332202443121421313202244311242113320224411324112332022441321412313022244131241213302224411324112330222");

	const setOf = (count, cb = (i)=>i) => { var a = [],i = 0; while (i < count) { a.push(cb(i ++)) } return a };
	const doFor = (count, cb) => { var i = 0; while (i < count && cb(i++) !== true); };

	function shuffleSeed(seed,count = 1){
		seed = seed * 1664525 + 1013904223 | 0;
		count -= 1;
		return count > 0 ? shuffleSeed(seed, count) : seed;
	}
	const types = {
		_2D : {
			base : base2D,
			squish : SQUISH_2D,
			dimensions : 2,
			pD : p2D,
			lookup : lookupPairs2D,
		},
		_3D : {
			base : base3D,
			squish : SQUISH_3D,
			dimensions : 3,
			pD : p3D,
			lookup : lookupPairs3D,
		},
		_4D : {
			base : base4D,
			squish : SQUISH_4D,
			dimensions : 4,
			pD : p4D,
			lookup : lookupPairs4D,
		},
	};

	function createContribution(type, baseSet, index) {
		var i = 0;
		const multiplier = baseSet[index ++];
		const c = { next : undefined };
		while(i < type.dimensions){
			const axis = ("xyzw")[i];
			c[axis + "sb"] = baseSet[index + i];
			c["d" + axis] = - baseSet[index + i++] - multiplier * type.squish;
		}
		return c;
	}

	function createLookupPairs(lookupArray, contributions){
		var i;
		const a = lookupArray();
		const res = new Map();
		for (i = 0; i < a.length; i += 2) { res.set(a[i], contributions[a[i + 1]]) }
		return res;
	}

	function createContributionArray(type) {
		const conts = [];
		const d = type.dimensions;
		const baseStep = d * d;
		var k, i = 0;
		while (i < type.pD.length) {
			const baseSet = type.base[type.pD[i]];
			let previous, current;
			k = 0;
			do {
				current = createContribution(type, baseSet, k);
				if (!previous) { conts[i / baseStep] = current }
				else { previous.next = current }
				previous = current;
				k += d + 1;
			} while(k < baseSet.length);

			current.next = createContribution(type, type.pD, i + 1);
			if (d >= 3) { current.next.next = createContribution(type, type.pD, i + d + 2) }
			if (d === 4) { current.next.next.next = createContribution(type, type.pD, i + 11) }
			i += baseStep;
		}
		const result = [conts, createLookupPairs(type.lookup, conts)];
		type.base = undefined;
		type.lookup = undefined;
		return result;
	}

	const [contributions2D, lookup2D] = createContributionArray(types._2D);
	const [contributions3D, lookup3D] = createContributionArray(types._3D);
	const [contributions4D, lookup4D] = createContributionArray(types._4D);
	const perm = new Uint8Array(256);
	const perm2D = new Uint8Array(256);
	const perm3D = new Uint8Array(256);
	const perm4D = new Uint8Array(256);
	const source = new Uint8Array(setOf(256, i => i));
	var seed = shuffleSeed(clientSeed, 3);
	doFor(256, i => {
		i = 255 - i;
		seed = shuffleSeed(seed);
		var r = (seed + 31) % (i + 1);
		r += r < 0 ? i + 1 : 0;
		perm[i] = source[r];
		perm2D[i] = perm[i] & 0x0E;
		perm3D[i] = (perm[i] % 24) * 3;
		perm4D[i] = perm[i] & 0xFC;
		source[r] = source[i];
	});
	base2D = base3D = base4D = undefined;
	lookupPairs2D = lookupPairs3D = lookupPairs4D = undefined;
	p2D = p3D = p4D = undefined;

	const API = {
		noise2D(x, y) {
			const pD = perm2D;
			const p = perm;
			const g = gradients2D;
			const stretchOffset = (x + y) * STRETCH_2D;
			const xs = x + stretchOffset, ys = y + stretchOffset;
			const xsb = Math.floor(xs), ysb = Math.floor(ys);
			const squishOffset	= (xsb + ysb) * SQUISH_2D;
			const dx0 = x - (xsb + squishOffset), dy0 = y - (ysb + squishOffset);
			var c = (() => {
				const xins = xs - xsb, yins = ys - ysb;
				const inSum = xins + yins;
				return lookup2D.get(
					(xins - yins + 1) |
					(inSum << 1) |
					((inSum + yins) << 2) |
					((inSum + xins) << 4)
				);
			})();
			var i, value = 0;
			while (c !== undefined) {
				const dx = dx0 + c.dx;
				const dy = dy0 + c.dy;
				let attn = 2 - dx * dx - dy * dy;
				if (attn > 0) {
					i = pD[(p[(xsb + c.xsb) & 0xFF] + (ysb + c.ysb)) & 0xFF];
					attn *= attn;
					value += attn * attn * (g[i++] * dx + g[i] * dy);
				}
				c = c.next;
			}
			return value * NORM_2D;
		},
		noise3D(x, y, z) {
			const pD = perm3D;
			const p = perm;
			const g = gradients3D;
			const stretchOffset = (x + y + z) * STRETCH_3D;
			const xs = x + stretchOffset, ys = y + stretchOffset, zs = z + stretchOffset;
			const xsb = Math.floor(xs), ysb = Math.floor(ys), zsb = Math.floor(zs);
			const squishOffset	= (xsb + ysb + zsb) * SQUISH_3D;
			const dx0 = x - (xsb + squishOffset), dy0 = y - (ysb + squishOffset), dz0 = z - (zsb + squishOffset);
			var c = (() => {
				const xins = xs - xsb, yins = ys - ysb, zins = zs - zsb;
				const inSum = xins + yins + zins;
				return lookup3D.get(
					(yins - zins + 1) |
					((xins - yins + 1) << 1) |
					((xins - zins + 1) << 2) |
					(inSum << 3) |
					((inSum + zins) << 5) |
					((inSum + yins) << 7) |
					((inSum + xins) << 9)
				);
			})();
			var i, value = 0;
			while (c !== undefined) {
				const dx = dx0 + c.dx, dy = dy0 + c.dy, dz = dz0 + c.dz;
				let attn = 2 - dx * dx - dy * dy - dz * dz;
				if (attn > 0) {
					i = pD[(((p[(xsb + c.xsb) & 0xFF] + (ysb + c.ysb)) & 0xFF) + (zsb + c.zsb)) & 0xFF];
					attn *= attn;
					value += attn * attn * (g[i++] * dx + g[i++] * dy + g[i] * dz);
				}
				c = c.next;
			}
			return value * NORM_3D;
		},
		noise4D(x, y, z, w) {
			const pD = perm4D;
			const p = perm;
			const g = gradients4D;
			const stretchOffset = (x + y + z + w) * STRETCH_4D;
			const xs = x + stretchOffset, ys = y + stretchOffset, zs = z + stretchOffset, ws = w + stretchOffset;
			const xsb = Math.floor(xs), ysb = Math.floor(ys), zsb = Math.floor(zs), wsb = Math.floor(ws);
			const squishOffset	= (xsb + ysb + zsb + wsb) * SQUISH_4D;
			const dx0 = x - (xsb + squishOffset), dy0 = y - (ysb + squishOffset), dz0 = z - (zsb + squishOffset), dw0 = w - (wsb + squishOffset);
			var c = (() => {
				const xins = xs - xsb, yins = ys - ysb, zins = zs - zsb, wins = ws - wsb;
				const inSum = xins + yins + zins + wins;
				return lookup4D.get(
					(zins - wins + 1)  |
					((yins - zins + 1) << 1) |
					((yins - wins + 1) << 2) |
					((xins - yins + 1) << 3) |
					((xins - zins + 1) << 4) |
					((xins - wins + 1) << 5) |
					(inSum << 6) |
					((inSum + wins) << 8) |
					((inSum + zins) << 11) |
					((inSum + yins) << 14) |
					((inSum + xins) << 17)
				);
			})();
			var i, value = 0;
			while (c !== undefined) {
				const dx = dx0 + c.dx, dy = dy0 + c.dy, dz = dz0 + c.dz, dw = dw0 + c.dw;
				let attn = 2 - dx * dx - dy * dy - dz * dz - dw * dw;
				if (attn > 0) {
					i = pD[(((((p[(xsb + c.xsb) & 0xFF] + (ysb + c.ysb)) & 0xFF) + (zsb + c.zsb)) & 0xFF) + (wsb + c.wsb)) & 0xFF];
					attn *= attn;
					value += attn * attn * (g[i++] * dx + g[i++] * dy  + g[i++] * dz + g[i] * dw);
				}
				c = c.next;
			}
			return value * NORM_4D;
		},
	}
	return API;
}