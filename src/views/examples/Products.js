// core components
import ProductForm from 'components/Forms/ProductForm'
import ProductHeader from 'components/Headers/ProductHeader.js'
import useFetch from 'hooks/useFetch'
import React, { useEffect, useState } from 'react'
import useToggle from 'hooks/useToggle'
// reactstrap components
import { Button, Card, CardBody, CardHeader, Col, Container, ListGroup, ListGroupItem, Modal, Row, Table } from 'reactstrap'
import delData from 'hooks/delData'
import ModifyProductForm from 'components/Forms/ModifyProductForm'
import ModalBox from 'layouts/ModalBox'
const Products = () => {
	const { response: productList } = useFetch('/complete_product')
	const { response: collectionList } = useFetch('/collection')
	const { response: propertyList } = useFetch('/property')
	const { response: performanceList } = useFetch('/performance')
	const { response: packagingList } = useFetch('/packaging')

	const [p_selected, setSelection] = useState(0)

	const [modal, setModal] = useToggle()
	const [modalModif, setModif] = useToggle()

	const [productState, setProductState] = useState([]) //update when deleting

	useEffect(() => {
		productList && productList.length && setProductState(productList)
	}, [productList])

	const removeProduct = (pid) => {
		delData('/delProduct/' + pid)
		setProductState(productState.filter((obj) => obj.product_id !== pid))
	}

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
											<th scope="col">
												<i className="far fa-trash-alt" />
											</th>
											<th scope="col">
												<i className="far fa-list-alt"></i>
											</th>
											<th scope="col">
												<i className="far fa-edit"></i>
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
													<td onClick={() => removeProduct(a.product_id)}>
														<i className="far fa-trash-alt text-danger"></i>
													</td>
													<td
														onClick={() => {
															setSelection(a)
															setModal()
														}}
													>
														<i className="far fa-list-alt text-info"></i>
													</td>
													<td
														onClick={() => {
															setSelection(a)
															setModif()
														}}
													>
														<i className="far fa-edit text-info"></i>
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
		</>
	)
}

export default Products
