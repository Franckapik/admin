const dimension = (product) => {
	if (product) {
		const e = product.thickness
		const w = product.width
		const p = product.prime_nb //nombre premier
		const l = product.length
		const d = product.depth
		const j = l - 2 * e
		const k = w - 2 * e
		const c = (k - (p - 1) * e) / p //taille de cellule. Pas de marge necessaire.
		const c2 = c - 0 //taille de celllule en retirant 1 mm
		const n = Math.floor(w / c) * Math.floor(l / c) // nombre de cellules
		const n2 = Math.round(j / (c + e)) // nombre de rangées, arrondi au plus proche
		const j2 = (n2 - 1) * (c + e) + c
		const l2 = j2 + 2 * e
		const ai = l * d * (p + 1) + l * d * (p + 1) + c * l * p

		const a = Array(n)
			.fill('')
			.map((a, i) => {
				const n = i % p
				const m = Math.floor(i / p)
				const an = (Math.pow(n, 2) + Math.pow(m, 2)) % p
				return an
			})
		const amax = Math.max(...a)
		return { e, w, p, l, d, j, k, c, c2, n, n2, l2, j2, a, amax, ai }
	} else {
		return null
	}
}

export default dimension
