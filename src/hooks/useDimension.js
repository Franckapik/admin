import { useCallback, useEffect, useState } from 'react'
// Hook
// Parameter is the boolean, with default "false" value
const useDimension = (product) => {
	const [e, setE] = useState(0) //epaisseur
	const [w, setW] = useState(0) // width
	const [p, setP] = useState(0) // nombre premier
	const [l, setL] = useState(0) // longueur
	const [d, setD] = useState(0) // profondeur
	const [c, setC] = useState(0) // largeur cellule
	const [n, setN] = useState(false) // nb de cellules
	const [n2, setN2] = useState(0) // nb de rangées
	const [a, setA] = useState(false) // ensemble des profondeurs (resultat du modulo)
	const [aMax, setAmax] = useState(0) // profondeur max

	useEffect(() => {
		if (product.product_id) {
			setE(product.thickness)
			setW(product.width)
			setP(product.prime_nb)
			setL(product.length)
			setD(product.depth)
			setC(product.width_cel)
			setN(Math.floor(w / c) * Math.floor(l / c))
			setN2(Math.ceil(l / (c + e)))
			setA(
				n &&
					Array(n)
						.fill('')
						.map((a, i) => {
							const n = i % p
							const m = Math.floor(i / p)
							const an = (Math.pow(n, 2) + Math.pow(m, 2)) % p
							return an
						})
			)

			a && a.length && setAmax(Math.max(...a))
		}
	}, [product, e, w, p, l, d, c, n, n2, a, aMax])

	return { e, w, p, l, d, c, n, n2, a, aMax }

	console.log({ e, w, p, l, d, c, n, n2, a, aMax })
}

export default useDimension
