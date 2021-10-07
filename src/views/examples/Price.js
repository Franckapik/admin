// core components
import ProductHeader from 'components/Headers/ProductHeader.js'
import useDimension from 'hooks/useDimension'
import useFetch from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'
// reactstrap components
import { Button, Card, Col, Container, Row } from 'reactstrap'
import { CSVReader } from 'react-papaparse'
import Select from 'react-select'

const Price = () => {
	const { response: productList } = useFetch('/complete_product')
	const { response: collectionList } = useFetch('/collection')

	const [p_selected, setSelection] = useState(0)
	const [matiere, setMatiere] = useState([])
	const [m_selected, setMatSelected] = useState(0)
	const [m_favorite, setFav] = useState([])

	const { e, w, p, l, d, c, n, n2, a, aMax, ai } = useDimension(p_selected)

	const [productState, setProductState] = useState([]) //update when deleting

	useEffect(() => {
		productList && productList.length && setProductState(productList)
	}, [productList])

	const handleOnDrop = (data) => {
		console.log(data)
		const a =
			data.length &&
			data.map((a, i) => ({
				value: a.data[2],
				label: a.data[2] + ' ' + a.data[6] + ' ' + a.data[3],
				brand: a.data[6],
				name: a.data[3],
				price: a.data[8],
				stock: a.data[10],
			}))
		setMatiere(a)
	}

	const handleOnError = (err, file, inputElem, reason) => {
		console.log(err)
	}

	const handleOnRemoveFile = (data) => {
		console.log('remove', data)
	}

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
							<CSVReader
								config={{ encoding: 'ISO-8859-1' }}
								onDrop={handleOnDrop}
								onError={handleOnError}
								noClick
								addRemoveButton
								onRemoveFile={handleOnRemoveFile}
							>
								<span>Drop CSV file here to upload.</span>
							</CSVReader>
						</Card>{' '}
						<Card>
							<Select onChange={(e) => setMatSelected(e)} options={matiere}></Select>
						</Card>
						<Card>
							ref {m_selected.value} {m_selected.price} € {m_selected.stock}{' '}
							<Button onClick={() => setFav((old) => [...old, m_selected])}>Ajouter</Button>
						</Card>
						<Card>
							{m_favorite.map((a) => (
								<li>{a.label}</li>
							))}
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Price
