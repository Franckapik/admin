// core components
import ProductHeader from 'components/Headers/ProductHeader.js'
import useDimension from 'hooks/useDimension'
import useFetch from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'
// reactstrap components
import { Card, Col, Container, Row } from 'reactstrap'
import Dropzone from 'layouts/Dropzone'
const Price = () => {
	const { response: productList } = useFetch('/complete_product')
	const { response: collectionList } = useFetch('/collection')

	const [p_selected, setSelection] = useState(0)

	const { e, w, p, l, d, c, n, n2, a, aMax, ai } = useDimension(p_selected)

	const [productState, setProductState] = useState([]) //update when deleting

	useEffect(() => {
		productList && productList.length && setProductState(productList)
	}, [productList])

	return (
		<>
			{productList && collectionList && collectionList.length > 0 ? (
				<ProductHeader products={productState} collections={collectionList} />
			) : (
				'Aucun Produit'
			)}

			{/* Page content */}
			<Container className="mt--7" fluid>
				{/* Dark table */}
				<Row className="mt-5">
					<Col md={12}>
						<Card>
							{console.log(productState)}
							{productState && productState.length ? (
								<select
									className="form-control"
									type="select"
									onChange={(e) => {
										setSelection(productState.filter((a, i) => a.product_id === Number(e.target.value))[0])
									}}
								>
									<option disabled selected value="">
										{' '}
										-- Choisir un produit --{' '}
									</option>
									{Array.from(productState).map((a, i) => {
										return <option value={a.product_id}>{a.name}</option>
									})}
								</select>
							) : (
								'Pas de produits disponibles'
							)}
							Aire {ai}
							<Dropzone></Dropzone>
						</Card>{' '}
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Price
