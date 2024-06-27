let base = '0123456789abcdefghijklmnopqrstuvwxyz';
let base2 = Object.fromEntries([...base].map((v, i) => ([v, i])));

decodebutton.onclick = () => {
	decodingText.value = encodingText.value.split('\n').map(url => {
		let tmp = url.split('=');
		if (tmp.length < 2) return url;
		let tmp2 = tmp[1].split('_');
		if (tmp2.length < 3) return url;
		return [tmp[0], '=', ...tmp2[0].split('').map((v, i) => {
			if (v == '-') return '-';
			let n = base2[v] - 17 - i;
			while (n < 0) n += 36;
			return base[n];
		}), '_', tmp2[1]].join('');
	}).join('\n');
};

encodebutton.onclick = () => {
	encodingText.value = decodingText.value.split('\n').map(url => {
		let tmp = url.split('=');
		if (tmp.length < 2) return url;
		let tmp2 = tmp[1].split('_');
		if (tmp2.length < 2) return url;
		return [tmp[0], '=', ...tmp2[0].split('').map((v, i) => {
			if (v == '-') return '-';
			let n = base2[v] + 17 + i;
			while (n >= 36) n -= 36;
			return base[n];
		}), '_', tmp2[1], '_2'].join('');
	}).join('\n');
};