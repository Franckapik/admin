import CustomerForm from 'components/Forms/CustomerForm'
import ModifyCustomerForm from 'components/Forms/ModifyCustomerForm'
import Header from 'components/Headers/Header.js'
import delData from 'hooks/delData'
import useFetch from 'hooks/useFetch'
import useToggle from 'hooks/useToggle'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row, Table, Button, Modal } from 'reactstrap'

const Customers = () => {
	const { response: customerList } = useFetch('/customer')

	const [c_selected, setSelection] = useState(0)

	const [modalModif, setModif] = useToggle()

	const [userState, setUserState] = useState([]) //update when deleting

	useEffect(() => {
		customerList && customerList.length && setUserState(customerList)
		console.log(userState)
	}, [customerList])

	const removeCustomer = (id) => {
		delData('/delCustomer/' + id)
		setUserState(userState.filter((obj) => obj.user_id !== id))
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
								<h3 className="text-white mb-0">Liste des clients</h3>
							</CardHeader>
							{userState && userState.length && userState.length > 0 ? (
								<Table className="align-items-center table-dark table-flush" responsive>
									<thead className="thead-dark">
										<tr>
											<th scope="col">
												<i className="far fa-trash-alt" />
											</th>
											<th scope="col">
												<i className="far fa-edit"></i>
											</th>
											{Object.keys(userState[0]).map((a, i) => {
												return <th scope="col">{a}</th>
											})}
										</tr>
									</thead>
									<tbody>
										{Array.from(userState).map((a, i) => {
											return (
												<tr>
													<td onClick={() => removeCustomer(a.user_id)}>
														<i className="far fa-trash-alt text-danger"></i>
													</td>
													<td
														onClick={() => {
															console.log(a)
															setSelection(a)
															setModif()
														}}
													>
														<i className="far fa-edit text-info"></i>
													</td>
													{Object.keys(a).map((b, c) => {
														return <td>{a[b]}</td>
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
								<h3 className="mb-0">Ajouter un client</h3>
							</CardHeader>
							<CardBody>
								{userState && userState.length ? <CustomerForm customerList={userState} /> : 'Aucun client trouvé'}
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

export default Customers
