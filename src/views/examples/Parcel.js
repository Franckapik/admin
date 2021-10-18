// core components
import ParcelForm from 'components/Forms/ParcelForm'
import Header from 'components/Headers/Header'
import useFetch from 'hooks/useFetch'
import React from 'react'
import { useForm } from 'react-hook-form'
// reactstrap components
import { Card, CardBody, CardHeader, Container, Row, Table } from 'reactstrap'

const Parcel = () => {
	const { response: carriersList } = useFetch('/ship/carriers')
	const { response: parcelList } = useFetch('/getParcel')
	const { response: invoiceList } = useFetch('/complete_invoice')
	const { register } = useForm({})

	return (
		<>
			<Header />
			<Container className="mt--7" fluid>
				<Row className="mt-5">
					<div className="col">
						<Card className="bg-default shadow">
							<CardHeader className="bg-transparent border-0">
								<h3 className="text-white mb-0">Liste des transporteurs disponibles (carriers)</h3>
							</CardHeader>
							{carriersList && carriersList.length && carriersList.length > 0 ? (
								<Table className="align-items-center table-dark table-flush" responsive>
									<tbody>
										{Array.from(carriersList).map((a, i) => {
											return (
												<tr key={'carrier' + i}>
													<td>{a}</td>
												</tr>
											)
										})}
									</tbody>
								</Table>
							) : (
								'Aucun transporteur disponible'
							)}
						</Card>
					</div>
				</Row>
				<Row className="mt-5">
					<div className="col">
						<Card className="shadow">
							<CardHeader className="bg-transparent border-0">
								<h3 className="mb-0">Envoyer un colis</h3>
							</CardHeader>
							<CardBody>
								{invoiceList && invoiceList.length ? (
									<ParcelForm invoiceList={invoiceList} register={register}></ParcelForm>
								) : (
									'Pas de facture en cours'
								)}
							</CardBody>
						</Card>
					</div>
				</Row>
				<Row className="mt-5">
					<div className="col">
						<Card className="shadow">
							<CardHeader className="bg-transparent border-0">
								<h3 className="mb-0">Les colis importés</h3>
							</CardHeader>
							<CardBody>
								{console.log(parcelList)}
								{parcelList ? (
									<Table className="align-items-center table-dark table-flush" responsive>
										<thead className="thead-dark">
											<tr>
												<th scope="col">Destinataire</th>
												<th scope="col">Id</th>
												<th scope="col">N° commande</th>
												<th scope="col">Status</th>
												<th scope="col">Date création</th>
												<th scope="col">Colli uuid</th>
												<th scope="col">Shipment uuid</th>
												<th scope="col">Relais</th>
											</tr>
										</thead>
										<tbody>
											{parcelList.parcels.map((a, i) => {
												return (
													<tr key={a + i}>
														<td>{a.name}</td>
														<td>{a.id}</td>
														<td>{a.order_number}</td>
														<td>{a.status.message}</td>
														<td>{a.date_created}</td>
														<td>{a.colli_uuid}</td>
														<td>{a.shipment_uuid}</td>
														<td>{a.to_service_point}</td>
													</tr>
												)
											})}
										</tbody>
									</Table>
								) : (
									'Pas de colis importés'
								)}
							</CardBody>
						</Card>
					</div>
				</Row>
			</Container>
		</>
	)
}

export default Parcel

/* "parcel": {
    "name": "John Doe",
    "company_name": "Sendcloud",
    "address": "Insulindelaan",
    "house_number": "115",
    "city": "Eindhoven",
    "postal_code": "5642CV",
    "telephone": "+31612345678",
    "request_label": true,
    "email": "john@doe.com",
    "data": [],
    "country": "NL",
    "shipment": {
      "id": 8
    },
    "weight": "10.000",
    "order_number": "1234567890",
    "insured_value": 2000,
    "total_order_value_currency": "GBP",
    "total_order_value": "11.11",
    "quantity": 1
    "shipping_method_checkout_name": "DHL Express Domestic"
  } */
