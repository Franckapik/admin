// core components
import ProductForm from 'components/Forms/ProductForm'
import ProductHeader from 'components/Headers/ProductHeader.js'
import useFetch from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'
import useToggle from 'hooks/useToggle'
// reactstrap components
import {
	Button,
	Card,
	CardBody,
	CardHeader,
	CardTitle,
	Col,
	Container,
	CustomInput,
	FormGroup,
	ListGroup,
	ListGroupItem,
	Modal,
	Row,
	Table,
} from 'reactstrap'
import delData from 'hooks/delData'
import ModifyProductForm from 'components/Forms/ModifyProductForm'
import ModalBox from 'layouts/ModalBox'
import Preview3D from 'layouts/Preview3D'
const Products = () => {
	const { response: productList } = useFetch('/complete_product')
	const { response: collectionList } = useFetch('/collection')
	const { response: propertyList } = useFetch('/property')
	const { response: performanceList } = useFetch('/performance')
	const { response: packagingList } = useFetch('/packaging')

	const [p_selected, setSelection] = useState(0)

	const [modal, setModal] = useToggle()
	const [modal3d, setModal3d] = useToggle()
	const [modalModif, setModif] = useToggle()

	const [productState, setProductState] = useState([]) //update when deleting

	useEffect(() => {
		productList && productList.length && setProductState(productList)
	}, [productList])

	const removeProduct = (pid) => {
		delData('/delProduct/' + pid)
		setProductState(productState.filter((obj) => obj.product_id !== pid))
	}

	const [width, setWidth] = useState(50)
	const [length, setLength] = useState(50)
	const [depth, setDepth] = useState(10)
	const [prime, setPrime] = useState(7)
	const [ratio, setRatio] = useToggle()
	const [invert, setInvert] = useToggle()
	const [vert, setVert] = useState(0)
	const [hor, setHor] = useState(0)
	const [amax, setAmax] = useState(4)
	const [cwidth, setCwidth] = useState(31)
	const [thickness, setThickness] = useState(0.3)

	const fmin = Math.round((((344 / 2 / depth / 10) * amax) / prime) * 1000)
	const fmax = Math.round(344 / 2 / (cwidth / 100))

	useEffect(() => {
		setWidth(p_selected.width)
		setLength(p_selected.length)
		setDepth(p_selected.depth)
		setPrime(p_selected.prime_nb)
	}, [p_selected])

	return (
		<>
			{productList &&
			collectionList &&
			productList.length &&
			collectionList.length &&
			productList.length > 0 &&
			collectionList.length > 0 ? (
				<ProductHeader products={productState} collections={collectionList} />
			) : (
				'Aucun Produit'
			)}

			{/* Page content */}
			<Container className="mt--7" fluid>
				{/* Dark table */}
				<Row className="mt-5">
					<div className="col">
						<Card className="bg-default shadow">
							<CardHeader className="bg-transparent border-0">
								<h3 className="text-white mb-0">Liste des produits</h3>
							</CardHeader>
							{productState && productState.length && productState.length > 0 ? (
								<Table className="align-items-center table-dark table-flush" responsive>
									<thead className="thead-dark">
										<tr>
											<th scope="col" className="p-2">
												<i className="far fa-trash-alt" />
											</th>
											<th scope="col" className="p-2">
												<i className="far fa-list-alt"></i>
											</th>
											<th scope="col" className="p-2">
												<i className="far fa-edit"></i>
											</th>
											<th scope="col" className="p-2">
												<i className="fas fa-cubes"></i>
											</th>
											<th className="p-2">
												<i className="far fa-file-pdf "></i>
											</th>
											<th scope="col">Id</th>
											<th scope="col">Nom</th>
											<th scope="col">Collection</th>
											<th scope="col">Prix</th>
											<th scope="col">Dimensions</th>
											<th scope="col">Spectre</th>
											<th scope="col">Type</th>
											<th scope="col">Matière</th>
										</tr>
									</thead>
									<tbody>
										{Array.from(productState).map((a, i) => {
											return (
												<tr key={a + i}>
													<td onClick={() => removeProduct(a.product_id)} className="p-2">
														<i className="far fa-trash-alt text-danger"></i>
													</td>
													<td
														onClick={() => {
															setSelection(a)
															setModal()
														}}
														className="p-2"
													>
														<i className="far fa-list-alt text-info"></i>
													</td>
													<td
														onClick={() => {
															setSelection(a)
															setModif()
														}}
														className="p-2"
													>
														<i className="far fa-edit text-orange"></i>
													</td>
													<td
														onClick={() => {
															setModal3d()
															setSelection(a)
														}}
														className="p-2"
													>
														<i className="fas fa-cubes text-pink"></i>
													</td>
													<td className="p-2">
														<i className="far fa-file-pdf text-yellow"></i>
													</td>
													<td>{a.product_id}</td>
													<td>{a.name}</td>
													<td>{a.col_name}</td>
													<td>{a.price} €</td>
													<td>
														{a.width}x{a.lenght}x{a.depth}
													</td>
													<td>{a.spectre} Hz</td>
													<td>{a.type}</td>
													<td>{a.wood}</td>
												</tr>
											)
										})}
									</tbody>
								</Table>
							) : (
								'Aucun produit existant'
							)}
						</Card>
					</div>
				</Row>
				<Row className="mt-5">
					<Col>
						<Card className="shadow">
							<CardHeader className="bg-transparent">
								<h3 className="mb-0">Ajouter un produit</h3>
							</CardHeader>
							<CardBody>
								{productList && collectionList && propertyList && packagingList && performanceList ? (
									<ProductForm
										productList={productList}
										collectionList={collectionList}
										packagingList={packagingList}
										performanceList={performanceList}
										propertyList={propertyList}
									/>
								) : (
									'Aucun produit trouvé'
								)}
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
			<ModalBox title="Modification du produit" isOpen={modalModif} toggle={setModif} button1="Fermer" button2="Enregistrer">
				<ModifyProductForm
					p_selected={p_selected}
					productList={productList}
					collectionList={collectionList}
					packagingList={packagingList}
					propertyList={propertyList}
					performanceList={performanceList}
				/>
			</ModalBox>
			<ModalBox
				title={'Image du produit n°' + p_selected.product_id}
				isOpen={modal}
				toggle={setModal}
				button1="Fermer"
				button2="Enregistrer"
			>
				<Container>
					<Row>
						<ListGroup className="col-3">
							<ListGroupItem>{p_selected.product_id}</ListGroupItem>
							<ListGroupItem>{p_selected.name}</ListGroupItem>
							<ListGroupItem>{p_selected.col_name}</ListGroupItem>
							<ListGroupItem>{p_selected.price} €</ListGroupItem>
							<ListGroupItem>
								{p_selected.width}x{p_selected.lenght}x{p_selected.depth}
							</ListGroupItem>
						</ListGroup>
						<ListGroup className="col-3">
							<ListGroupItem>{p_selected.spectre} Hz</ListGroupItem>
							<ListGroupItem>{p_selected.type}</ListGroupItem>
							<ListGroupItem>{p_selected.wood}</ListGroupItem>
							<ListGroupItem>{p_selected.stock} </ListGroupItem>
							<ListGroupItem>{p_selected.desc}</ListGroupItem>
						</ListGroup>
						<ListGroup className="col-3">
							<ListGroupItem>{p_selected.cel_nb}</ListGroupItem>
							<ListGroupItem>{p_selected.weight}</ListGroupItem>
							<ListGroupItem>{p_selected.charge}</ListGroupItem>
							<ListGroupItem>{p_selected.width_cel}</ListGroupItem>
							<ListGroupItem>{p_selected.part_nb}</ListGroupItem>
						</ListGroup>
						<ListGroup className="col-3">
							<ListGroupItem>{p_selected.reference}</ListGroupItem>
							<ListGroupItem>{p_selected.finish}</ListGroupItem>
							<ListGroupItem>{p_selected.area}</ListGroupItem>
							<ListGroupItem>{p_selected.value}</ListGroupItem>
							<ListGroupItem>{p_selected.unit}</ListGroupItem>
						</ListGroup>
					</Row>
				</Container>
			</ModalBox>
			<ModalBox isOpen={modal3d} toggle={setModal3d} button1="Fermer" button2="Ajouter en Boutique" noheader>
				<Container>
					<Row>
						<Col md={8}>
							<Card className="m-2 p-2">
								<h3 style={{ textAlign: 'center' }}>
									D2N{prime}P{Math.round(depth)}L{Math.round(width)}
									{width !== length ? 'W' + Math.round(length) : null}P
								</h3>{' '}
							</Card>
							<Row style={{ height: '33em' }}>
								<div
									style={{
										position: 'absolute',
										width: '150px',
										top: '25%',
										zIndex: '1000',
										fontSize: '0.8em',
									}}
									onClick={() => console.log('hey')}
								>
									<ListGroup>
										<ListGroupItem className="border-0 bg-transparent">
											<i className="fas fa-ruler-combined mr-2"></i> {width} x {length} x {depth} cm
										</ListGroupItem>
										<ListGroupItem className="border-0 bg-transparent">
											<i className="fas fa-grip-lines-vertical mr-2"></i> {thickness} cm
										</ListGroupItem>
										<ListGroupItem className="border-0 bg-transparent">
											<i className="fas fa-square-full mr-2"></i> {cwidth.toFixed(2)} cm
										</ListGroupItem>
										<ListGroupItem className="border-0 bg-transparent" style={{ cursor: 'pointer' }}>
											<i className="fas fa-file-export mr-2 "></i> 2D report
										</ListGroupItem>
									</ListGroup>
								</div>
								<div
									style={{
										position: 'absolute',
										width: '100px',
										left: '75%',
										top: '80%',
										zIndex: '1000',
										cursor: 'pointer',
										fontSize: '0.8em',
									}}
									onClick={() => console.log('hey')}
								>
									<Table style={{ textAlign: 'center' }} className="table-borderless table-sm">
										<tbody>
											<tr>
												<td></td>
												<td onClick={() => setVert(vert - 1)}>
													<i className="fas fa-arrow-up p-0"></i>
												</td>
												<td></td>
											</tr>
											<tr>
												<td onClick={() => setHor(hor + 1)}>
													<i className="fas fa-arrow-left"></i>
												</td>
												<td>
													{vert} / {hor}
												</td>

												<td onClick={() => setHor(hor - 1)}>
													<i className="fas fa-arrow-right"></i>
												</td>
											</tr>
											<tr>
												<td></td>
												<td onClick={() => setVert(vert + 1)}>
													<i className="fas fa-arrow-down"></i>
												</td>
												<td></td>
											</tr>
										</tbody>
									</Table>
								</div>
								<Preview3D
									style={{ position: 'absolute' }}
									p_selected={p_selected}
									width={width}
									length={length}
									prime={prime}
									depth={depth}
									ratio={ratio}
									hor={hor}
									vert={vert}
									invert={invert}
									amax={amax}
									setAmax={setAmax}
									cwidth={cwidth}
									setCwidth={setCwidth}
									thickness={thickness}
									setThickness={setThickness}
								></Preview3D>
							</Row>
						</Col>

						<Col md={4}>
							<Card style={{ width: '100%', display: 'inline-block' }} className="m-2">
								<label className="mr-4">Type </label>

								<Button onClick={() => setPrime(7)}>7</Button>
								<Button onClick={() => setPrime(11)}>11</Button>
								<Button onClick={() => setPrime(13)}>13</Button>
								<Button onClick={() => setPrime(17)}>17</Button>
							</Card>
							<Card style={{ width: '100%' }} className="m-2">
								<label>Largeur</label>
								<input
									type="range"
									min="1"
									max="200"
									className="form-control"
									onChange={(e) => setWidth(e.target.value)}
								></input>
								<label>Longueur</label>
								<input
									type="range"
									min="1"
									max="200"
									className="form-control"
									onChange={(e) => setLength(e.target.value)}
								></input>
								<label>Profondeur</label>
								<input
									type="range"
									min="1"
									max="50"
									className="form-control"
									onChange={(e) => setDepth(e.target.value)}
								></input>
								<CustomInput type="switch" id="ratio" name="rationame" label="Ratio/Hauteur" onClick={setRatio} />
								<CustomInput type="switch" id="inv" name="invname" label="Inverser" onClick={setInvert} />
							</Card>
							<Row>
								<Col md={12}>
									<Card style={{ width: '100%' }} className="m-2">
										<CardHeader>
											<CardTitle>Diffusion</CardTitle>
										</CardHeader>
										<CardBody tag="h3">
											{fmin} Hz -{fmax} Hz
										</CardBody>
									</Card>
								</Col>
							</Row>
						</Col>
					</Row>
				</Container>
			</ModalBox>
		</>
	)
}

export default Products
