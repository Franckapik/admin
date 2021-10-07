const dimension = (product) => {
	const e = product.thickness
	const w = product.width
	const p = product.prime_nb
	const l = product.length
	const d = product.depth
	const c = (w - (p + 1) * e) / p
	const n = Math.floor(w / c) * Math.floor(l / c)
	const n2 = Math.floor(l / (c + e))
	const ai = l * d * (p + 1) + (l * d * (p + 1) + c * l * p)
	const a = Array(n)
		.fill('')
		.map((a, i) => {
			const n = i % p
			const m = Math.floor(i / p)
			const an = (Math.pow(n, 2) + Math.pow(m, 2)) % p
			return an
		})
	const amax = Math.max(...a)

	return { e, w, p, l, d, c, n, n2, a, amax, ai }
}

export default dimension
