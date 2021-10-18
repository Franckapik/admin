// core components
import ProductHeader from 'components/Headers/ProductHeader.js'
import delData from 'hooks/delData'
import postData from 'hooks/postData'
import dimension from 'hooks/useDimension'
import useFetch from 'hooks/useFetch'
import Autocomplete from 'layouts/Autocomplete'
import React, { useEffect, useState } from 'react'
import { Doughnut } from 'react-chartjs-2'
import { CSVReader } from 'react-papaparse'
import Select from 'react-select'
// reactstrap components
import {
	Button,
	Card,
	CardBody,
	CardGroup,
	CardHeader,
	Col,
	Container,
	CustomInput,
	FormGroup,
	Label,
	List,
	ListGroup,
	ListGroupItem,
	ListInlineItem,
	Row,
	Table,
} from 'reactstrap'

const Price = () => {
	const { response: productList } = useFetch('/complete_product')
	const { response: collectionList } = useFetch('/collection')
	const { response: propertyList } = useFetch('/property')
	const { response: uploadedList } = useFetch('/uploadedList')
	const { response: materialList } = useFetch('/material')

	const [p_selected, setSelection] = useState(0)
	const [production, setProduction] = useState(0)
	const [recette, setRecette] = useState(0)
	const [HT, setHT] = useState(0)
	const [TTC, setTTC] = useState(0)
	const [matiereList, setMatiereList] = useState([])
	const [m_selected, setMatSelected] = useState(0)
	const [perte, setPerte] = useState(1.18)
	const [fraisAd, setFraisAd] = useState(2)
	const [m_favorite, setFav] = useState([])
	const [marge, setMarge] = useState(3)
	const [taxe, setTaxe] = useState(12.8)
	const [dim, setDim] = useState({ e: 0, w: 0, p: 0, l: 0, d: 0, c: 0, n: 0, n2: 0, a: 0, aMax: 0, ai: 0 })

	const [productState, setProductState] = useState([]) //update when deleting
	const [materialState, setMaterialState] = useState([]) //update when deleting

	useEffect(() => {
		materialList && materialList.length && setMaterialState(materialList)
	}, [materialList])

	useEffect(() => {
		productList && productList.length && setProductState(productList)
	}, [productList])

	useEffect(() => {
		p_selected && setDim(dimension(p_selected))
	}, [p_selected])

	useEffect(() => {
		if (dim && m_selected) {
			setProduction(((dim.ai / 1000000) * perte * m_selected.price + fraisAd).toFixed(2))
			setHT((((dim.ai / 1000000) * perte * m_selected.price + fraisAd) * marge).toFixed(2))
			setTTC((((dim.ai / 1000000) * perte * m_selected.price + fraisAd) * marge * (1 + taxe / 100)).toFixed(2))
			setRecette((((dim.ai / 1000000) * perte * m_selected.price + fraisAd) * (marge - 1)).toFixed(2))
		}
	}, [dim, m_selected, fraisAd, marge, perte, taxe])

	const removeMaterial = (id) => {
		delData('/delMaterial/' + id)
		setMaterialState(materialState.filter((obj) => obj.value !== id))
	}

	const data = {
		labels: ['Production', 'Taxe Urssaf', 'Recette'],
		datasets: [
			{
				label: '# of Votes',
				data: [production, TTC - HT, recette],
				backgroundColor: [
					'rgba(255, 99, 132, 0.2)',
					'rgba(54, 162, 235, 0.2)',
					'rgba(255, 206, 86, 0.2)',
					'rgba(75, 192, 192, 0.2)',
					'rgba(153, 102, 255, 0.2)',
					'rgba(255, 159, 64, 0.2)',
				],
				borderColor: [
					'rgba(255, 99, 132, 1)',
					'rgba(54, 162, 235, 1)',
					'rgba(255, 206, 86, 1)',
					'rgba(75, 192, 192, 1)',
					'rgba(153, 102, 255, 1)',
					'rgba(255, 159, 64, 1)',
				],
				borderWidth: 1,
			},
		],
	}

	const handleOnDrop = (data) => {
		console.log(data)
		const a =
			data.length &&
			data.map((a, i) => ({
				value: a.data[2],
				provider: a.data[0],
				label: a.data[2] + ' ' + a.data[6] + ' ' + a.data[3],
				brand: a.data[6],
				name: a.data[3],
				price: a.data[8],
				stock: a.data[10],
			}))
		setMatiereList(a)
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
		console.log(event.target.files[0])
		data.append('catalogue', event.target.files[0])
		fetch('/addCSV', { method: 'POST', body: data }).then((res) => res.json())
	}

	const addFav = () => {
		console.log(m_favorite)
		postData('/addMatiere', m_favorite)
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

				<Row>
					<Col md={6}>
						<Card>
							<CardHeader>Matière</CardHeader>
							<CardBody>
								{' '}
								<Select onChange={(e) => setMatSelected(e)} options={materialList}></Select>
								<label htmlFor="collection_name">Frais additionnels</label>
								<input
									className="form-control"
									type="number"
									value={fraisAd}
									step={0.1}
									onChange={(e) => setFraisAd(Number(e.target.value))}
								></input>
								<Table className="mt-3" hover striped responsive>
									<tbody>
										<tr>
											<th>Nom</th>
											<td>
												{' '}
												<span>{m_selected.name}</span>
											</td>
										</tr>
										<tr>
											<th>Fournisseur</th>
											<td>{m_selected.provider}</td>
										</tr>
										<tr>
											<th>Marque</th>
											<td>{m_selected.brand}</td>
										</tr>
										<tr>
											<th>Prix/m2</th>
											<td>{m_selected.price} €</td>
										</tr>
										<tr>
											<th>Stock</th>
											<td>{m_selected.stock}</td>
										</tr>
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
					<Col md={6}>
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
											console.log(p_selected)
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
													(a, i) =>
														a.property_id === Number(e.target.value) || a.product_id === Number(e.target.value)
												)[0]
											)
											console.log(p_selected)
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
								<label htmlFor="collection_name">Perte de découpe</label>
								<input
									className="form-control"
									type="number"
									value={perte}
									step={0.01}
									onChange={(e) => setPerte(Number(e.target.value))}
								></input>
								<Table className="mt-3" hover striped responsive>
									<tbody>
										<tr>
											<th>Dimensions</th>
											<td>
												{dim.w} x {dim.l} x {dim.d} mm{' '}
											</td>
										</tr>
										<tr>
											<th>Surface usinée</th>
											<td>{(dim.ai / 1000000).toFixed(2)} m2</td>
										</tr>
										<tr>
											<th>Frais Additionnels</th>
											<td>{fraisAd.toFixed(2)} €</td>
										</tr>
										<tr>
											<th>Coût de fabrication</th>
											<td>{((dim.ai / 1000000) * perte * m_selected.price + fraisAd).toFixed(2)} €</td>
										</tr>
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Row className="mt-5">
					<Col md={4}>
						<Card>
							<CardHeader>Prix</CardHeader>
							<CardBody>
								<label htmlFor="collection_name">Marge (ratio)</label>
								<input
									className="form-control"
									type="number"
									value={marge}
									step={0.1}
									onChange={(e) => setMarge(e.target.value)}
								></input>
								<label htmlFor="collection_name">Taxe Urssaf</label>
								<input
									className="form-control"
									type="number"
									value={taxe}
									step={0.1}
									onChange={(e) => setTaxe(e.target.value)}
								></input>
								<Table className="mt-3" hover striped responsive>
									<tbody>
										<tr>
											<th>Prix HT</th>
											<td>{HT} €</td>
										</tr>
										<tr>
											<th>Prix TTC</th>
											<td>{TTC} €</td>
										</tr>
										<tr>
											<th>Bénéfice</th>
											<td>{recette} €</td>
										</tr>
									</tbody>
								</Table>
							</CardBody>
						</Card>
					</Col>
					<Col md={8}>
						{p_selected && m_selected ? (
							<Card>
								<CardHeader>
									{p_selected.type} || {m_selected.brand}
								</CardHeader>
								<CardBody>
									<Doughnut
										data={data}
										id="chart-doughnut"
										width={'300px'}
										height={'300px'}
										options={{ maintainAspectRatio: false }}
									/>
								</CardBody>
							</Card>
						) : null}
					</Col>
				</Row>
				<Row className="mt-5">
					<Col>
						<Card>
							<CardHeader>Catalogues sur le serveur</CardHeader>
							<CardBody>
								<FormGroup>
									<Label for="exampleCustomFileBrowser">Ajouter un catalogue</Label>
									<CustomInput
										type="file"
										id="exampleCustomFileBrowser"
										name="customFile"
										label="Choisir un fichier sur un dossier local"
										onChange={onChangeHandler}
									/>
								</FormGroup>{' '}
								<List type="inline">
									{uploadedList &&
										uploadedList.map((a, i) => (
											<a href={process.env.PUBLIC_URL + '/uploads/' + a}>
												{' '}
												<ListInlineItem>
													<Card className="text-center">
														{' '}
														<i style={{ fontSize: '55px' }} className="fas fa-file-csv m-2 "></i> {a}
													</Card>
												</ListInlineItem>
											</a>
										))}
								</List>
							</CardBody>
						</Card>
					</Col>
				</Row>
				<Row className="mt-5">
					<Col>
						<CardGroup>
							<Card>
								<CardHeader>Lire un fichier CSV</CardHeader>
								<CardBody>
									<CSVReader
										config={{ encoding: 'ISO-8859-1' }}
										onDrop={handleOnDrop}
										onError={handleOnError}
										noClick
										addRemoveButton
										onRemoveFile={handleOnRemoveFile}
									>
										<span>Drop un fichier csv pour la lecture</span>
									</CSVReader>
								</CardBody>
							</Card>
							<Card>
								<CardHeader>Ajouter une matière dans les favoris</CardHeader>
								<CardBody>
									<Select
										onChange={(e) => {
											setFav(e)
											console.log(e)
										}}
										options={matiereList}
									></Select>
									{m_favorite && m_favorite.value ? (
										<Card className="mt-3 border-0">
											<CardHeader tag="h3" className="text-info">
												{' '}
												Marque choisie : {m_favorite.brand} ( {m_favorite.value})
											</CardHeader>
											<CardBody className="p-0">
												<ListGroup>
													<ListGroupItem>{m_favorite.name}</ListGroupItem>
													<ListGroupItem className="text-danger"> {m_favorite.price} € (/m2)</ListGroupItem>
													<ListGroupItem>{m_favorite.stock}</ListGroupItem>
												</ListGroup>{' '}
											</CardBody>
											<Button onClick={() => addFav(m_favorite)}>Ajouter aux favoris</Button>
										</Card>
									) : null}
								</CardBody>
							</Card>
						</CardGroup>
					</Col>
				</Row>
				<Row className="mt-5">
					<Col>
						<Card className="bg-default shadow">
							<CardHeader className="bg-transparent border-0">
								<h3 className="text-white mb-0">Les matériaux favoris</h3>
							</CardHeader>
							{materialState && materialState.length && materialState.length > 0 ? (
								<Table className="align-items-center table-dark table-flush" responsive>
									<thead className="thead-dark">
										<tr>
											<th scope="col">
												<i className="far fa-trash-alt" />
											</th>
											<th scope="col">
												<i className="far fa-edit"></i>
											</th>
											{Object.keys(materialState[0]).map((a, i) => {
												return (
													<th key={a + i} scope="col">
														{a}
													</th>
												)
											})}
										</tr>
									</thead>
									<tbody>
										{Array.from(materialState).map((a, i) => {
											return (
												<tr key={a + i}>
													<td onClick={() => removeMaterial(a.value)}>
														<i className="far fa-trash-alt text-danger"></i>
													</td>

													{Object.keys(a).map((b, c) => {
														return <td key={b + c}>{a[b]}</td>
													})}
												</tr>
											)
										})}
									</tbody>
								</Table>
							) : (
								'Aucun client existant'
							)}
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Price
