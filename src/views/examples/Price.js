// core components
import ProductHeader from 'components/Headers/ProductHeader.js'
import postData from 'hooks/postData'
import dimension from 'hooks/useDimension'
import useFetch from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'
import { CSVReader } from 'react-papaparse'
import Select from 'react-select'
// reactstrap components
import { Button, Card, CardBody, CardHeader, Col, Container, Input, Row, Table } from 'reactstrap'

const Price = () => {
	const { response: productList } = useFetch('/complete_product')
	const { response: collectionList } = useFetch('/collection')
	const { response: propertyList } = useFetch('/property')
	const { response: uploadedList } = useFetch('/uploadedList')

	const [p_selected, setSelection] = useState(0)
	const [matiere, setMatiere] = useState([])
	const [m_selected, setMatSelected] = useState(0)
	const [perte, setPerte] = useState(1.18)
	const [fraisAd, setFraisAd] = useState(2)
	const [m_favorite, setFav] = useState([])
	const [dim, setDim] = useState({ e: 0, w: 0, p: 0, l: 0, d: 0, c: 0, n: 0, n2: 0, a: 0, aMax: 0, ai: 0 })

	const [productState, setProductState] = useState([]) //update when deleting

	useEffect(() => {
		productList && productList.length && setProductState(productList)
	}, [productList])

	useEffect(() => {
		console.log(p_selected)
		p_selected && setDim(dimension(p_selected))
	}, [p_selected])

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
		postData('/addCSV', { catalogue: data })
	}

	const handleOnError = (err, file, inputElem, reason) => {
		console.log(err)
	}

	const handleOnRemoveFile = (data) => {
		console.log('remove', data)
	}

	const onChangeHandler = (event) => {
		event.preventDefault()
		const data = new FormData()
		data.append('catalogue', event.target.files[0])
		fetch('/addCSV', { method: 'POST', body: data }).then((res) => res.json())
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
							<input type="file" name="file" onChange={onChangeHandler} />
							{propertyList && propertyList.length ? (
								<select
									className="form-control"
									type="select"
									onChange={(e) => {
										setSelection(
											propertyList.filter(
												(a, i) => a.property_id === Number(e.target.value) || a.product_id === Number(e.target.value)
											)[0]
										)
									}}
								>
									<option disabled selected value="">
										{' '}
										-- Choisir une propriété --{' '}
									</option>
									{Array.from(propertyList).map((a, i) => {
										return <option value={a.property_id}>{a.type}</option>
									})}
								</select>
							) : (
								'Pas de propriétés disponibles'
							)}
						</Card>{' '}
						<Card>
							{productState && productState.length ? (
								<select
									className="form-control"
									type="select"
									onChange={(e) => {
										setSelection(
											productState.filter(
												(a, i) => (a, i) =>
													a.property_id === Number(e.target.value) || a.product_id === Number(e.target.value)
											)[0]
										)
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
							Surface usinée : {dim.ai / 1000000} m2 ({dim.ai} mm2) Cout de fabrication :
							{(dim.ai / 1000000) * perte * m_selected.price + fraisAd} €
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
						<Card>
							{' '}
							{uploadedList &&
								uploadedList.map((a, i) => (
									<a href={process.env.PUBLIC_URL + '/uploads/' + a}>
										{' '}
										<li>{a}</li>
									</a>
								))}
						</Card>
					</Col>
				</Row>
				<Row>
					<Col md={4}>
						<Card>
							<CardHeader>Matière</CardHeader>
							<CardBody>
								{' '}
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
								<Select onChange={(e) => setMatSelected(e)} options={matiere}></Select>
								{m_favorite.map((a) => (
									<li>{a.label}</li>
								))}
								<Table>
									<tbody>
										<tr>
											<th>Nom</th>
											<td>
												{dim.ai / 1000000} m2 ({dim.ai} mm2)
											</td>
										</tr>
										<tr>
											<th>Fournisseur</th>
											<td>{(dim.ai / 1000000) * perte * m_selected.price + fraisAd} €</td>
										</tr>
										<tr>
											<th>Marque</th>
											<td>Prix HT</td>
										</tr>
										<tr>
											<th>Prix/m2</th>
											<td>Prix TTC</td>
										</tr>
										<tr>
											<th>Autre</th>
											<td>Bénéfice</td>
										</tr>
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
					<Col md={4}>
						<Card>
							<CardHeader>Produit</CardHeader>
							<CardBody>
								{' '}
								{propertyList && propertyList.length ? (
									<select
										className="form-control"
										type="select"
										onChange={(e) => {
											setSelection(
												propertyList.filter(
													(a, i) =>
														a.property_id === Number(e.target.value) || a.product_id === Number(e.target.value)
												)[0]
											)
										}}
									>
										<option disabled selected value="">
											{' '}
											-- Choisir une propriété --{' '}
										</option>
										{Array.from(propertyList).map((a, i) => {
											return <option value={a.property_id}>{a.type}</option>
										})}
									</select>
								) : (
									'Pas de propriétés disponibles'
								)}
								ou
								{productState && productState.length ? (
									<select
										className="form-control"
										type="select"
										onChange={(e) => {
											setSelection(
												productState.filter(
													(a, i) => (a, i) =>
														a.property_id === Number(e.target.value) || a.product_id === Number(e.target.value)
												)[0]
											)
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
								<Table>
									<tbody>
										<tr>
											<th>Surface usinée</th>
											<td>
												{dim.ai / 1000000} m2 ({dim.ai} mm2)
											</td>
										</tr>
										<tr>
											<th>Coût de fabrication</th>
											<td>{(dim.ai / 1000000) * perte * m_selected.price + fraisAd} €</td>
										</tr>
										<tr>
											<th>Prix HT</th>
											<td>Prix HT</td>
										</tr>
										<tr>
											<th>Prix TTC</th>
											<td>Prix TTC</td>
										</tr>
										<tr>
											<th>Bénéfice</th>
											<td>Bénéfice</td>
										</tr>
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
					<Col md={4}>
						<Card>
							<CardHeader>Prix</CardHeader>
							<CardBody>
								<Table>
									<tbody>
										<tr>
											<th>Marge</th>
											<td>marge</td>
										</tr>
										<tr>
											<th>Taxe urssaf</th>
											<td>Taxe urssaf</td>
										</tr>
										<tr>
											<th>Prix HT</th>
											<td>Prix HT</td>
										</tr>
										<tr>
											<th>Prix TTC</th>
											<td>Prix TTC</td>
										</tr>
										<tr>
											<th>Bénéfice</th>
											<td>Bénéfice</td>
										</tr>
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Price
