import CustomerForm from 'components/Forms/CustomerForm'
import DeliveryForm from 'components/Forms/DeliveryForm'
import ModifyCustomerForm from 'components/Forms/ModifyCustomerForm'
import Header from 'components/Headers/Header.js'
import delData from 'hooks/delData'
import useFetch from 'hooks/useFetch'
import useToggle from 'hooks/useToggle'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row, Table, Button, Modal } from 'reactstrap'

const Delivery = () => {
	const { response: deliveryList } = useFetch('/delivery')

	const [c_selected, setSelection] = useState(0)

	const [modalModif, setModif] = useToggle()

	const [deliveryState, setDeliveryState] = useState([]) //update when deleting

	useEffect(() => {
		deliveryList && deliveryList.length && setDeliveryState(deliveryList)
	}, [deliveryList])

	const removeCustomer = (id) => {
		delData('/delCustomer/' + id)
		setDeliveryState(deliveryState.filter((obj) => obj.user_id !== id))
	}

	return (
		<>
			<Header />
			{/* Page content */}
			<Container className="mt--7" fluid>
				{/* Dark table */}
				<Row className="mt-5">
					<div className="col">
						<Card className="bg-default shadow">
							<CardHeader className="bg-transparent border-0">
								<h3 className="text-white mb-0">Liste des livraisons</h3>
							</CardHeader>
							{deliveryState && deliveryState.length && deliveryState.length > 0 ? (
								<Table className="align-items-center table-dark table-flush" responsive>
									<thead className="thead-dark">
										<tr>
											<th scope="col">
												<i className="far fa-trash-alt" />
											</th>
											<th scope="col">
												<i className="far fa-edit"></i>
											</th>
											{Object.keys(deliveryState[0]).map((a, i) => {
												return (
													<th key={a + i} scope="col">
														{a}
													</th>
												)
											})}
										</tr>
									</thead>
									<tbody>
										{Array.from(deliveryState).map((a, i) => {
											return (
												<tr key={a + i}>
													<td onClick={() => removeCustomer(a.user_id)}>
														<i className="far fa-trash-alt text-danger"></i>
													</td>
													<td
														onClick={() => {
															setSelection(a)
															setModif()
														}}
													>
														<i className="far fa-edit text-info"></i>
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
								'Aucun produit existant'
							)}
						</Card>
					</div>
				</Row>
				<Row className="mt-5">
					<Col>
						<Card className="shadow">
							<CardHeader className="bg-transparent">
								<h3 className="mb-0">Ajouter une livraison</h3>
							</CardHeader>
							<CardBody>
								{deliveryState && deliveryState.length ? (
									<DeliveryForm deliveryList={deliveryState} />
								) : (
									'Aucune livraison trouvé'
								)}
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>

			<Modal className="modal-dialog-centered" isOpen={modalModif} toggle={setModif} size="xl">
				<div className="modal-header">
					<h5 className="modal-title" id="exampleModalLabel">
						Détails
					</h5>
					<button aria-label="Close" className="close" data-dismiss="modal" type="button" onClick={setModif}>
						<span aria-hidden={true}>×</span>
					</button>
				</div>
				<div className="modal-body">
					<Card className="shadow">
						<CardHeader className="bg-transparent">
							<h3 className="mb-0">Modification du produit</h3>
						</CardHeader>
						<CardBody>
							<ModifyCustomerForm c_selected={c_selected} />
						</CardBody>
					</Card>
				</div>
				<div className="modal-footer">
					<Button color="secondary" data-dismiss="modal" type="button" onClick={setModif}>
						Close
					</Button>
					<Button color="primary" type="button">
						Save changes
					</Button>
				</div>
			</Modal>
		</>
	)
}

export default Delivery
