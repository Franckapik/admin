import InvoiceForm from 'components/Forms/InvoiceForm'
import Header from 'components/Headers/Header.js'
import easyinvoice from 'easyinvoice'
import delData from 'hooks/delData'
import useFetch from 'hooks/useFetch'
import useToggle from 'hooks/useToggle'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row, Table } from 'reactstrap'
import { invoicePdf } from 'variables/invoicePdf'

const Orders = () => {
	const { response: statusList } = useFetch('/status')
	const { response: itemList } = useFetch('/item')
	const { response: transactionList } = useFetch('/transaction')
	const { response: productList } = useFetch('/product')
	const { response: discountList } = useFetch('/discount')
	const { response: customerList } = useFetch('/customer')
	const { response: deliveryList } = useFetch('/delivery')

	const facturation = (invoice) => {
		//get invoice data
		invoicePdf.client.company = invoice.name + ' ' + invoice.firstname
		invoicePdf.client.address = invoice.address
		invoicePdf.client.zip = invoice.postal
		invoicePdf.client.city = invoice.city
		invoicePdf.client.country = invoice.country
		invoicePdf.invoiceNumber = invoice.order_number
		invoicePdf.invoiceDate = invoice.order_date

		//send to pdf
		easyinvoice.createInvoice(invoicePdf, function (result) {
			//The response will contain a base64 encoded PDF file
			result && easyinvoice.download('myInvoice.pdf', result.pdf)
		})
	}

	const { response: invoiceList } = useFetch('/complete_invoice')

	const [p_selected, setSelection] = useState(0)

	const [modal, setModal] = useToggle()
	const [modalModif, setModif] = useToggle()

	const [invoiceState, setInvoiceState] = useState([]) //update when deleting

	useEffect(() => {
		invoiceList && invoiceList.length && setInvoiceState(invoiceList)
	}, [invoiceList])

	const removeProduct = (pid) => {
		delData('/delProduct/' + pid)
		setInvoiceState(invoiceState.filter((obj) => obj.product_id !== pid))
	}

	return (
		<>
			<Header />
			{/* Page content */}
			<Container className="mt--7" fluid>
				{/* Dark table */}
				<Row className="mt-5">
					<Col>
						<Card className="bg-default shadow">
							<CardHeader className="bg-transparent border-0">
								<h3 className="text-white mb-0">Les commandes</h3>
							</CardHeader>
							<Table className="align-items-center table-dark table-flush" responsive>
								<thead className="thead-dark">
									<tr>
										<th scope="col">
											<i className="far fa-trash-alt" />
										</th>
										<th scope="col">
											<i className="far fa-file-pdf"></i>
										</th>
										<th scope="col">
											<i className="far fa-edit"></i>
										</th>
										<th scope="col">Id</th>
										<th scope="col">Client</th>
										<th scope="col">Statut</th>
										<th scope="col">FDP</th>
										<th scope="col">Date</th>
										<th scope="col">Réduction</th>
										<th scope="col">Items</th>
									</tr>
								</thead>
								<tbody>
									{Array.from(invoiceState).map((a, i) => {
										return (
											<tr key={a + i}>
												<td onClick={() => removeProduct(a.product_id)}>
													<i className="far fa-trash-alt text-danger"></i>
												</td>
												<td onClick={() => facturation(a)}>
													<i className="far fa-file-pdf text-yellow"></i>
												</td>
												<td>
													<i className="far fa-edit text-info"></i>
												</td>
												<td>{a.invoice_id}</td>
												<td>{a.name}</td>
												<td>{a.status_msg}</td>
												<td>{a.fdp} €</td>
												<td>{a.order_date}</td>
												<td>{a.reduction} €</td>
												<td>produits</td>
											</tr>
										)
									})}
								</tbody>
							</Table>
						</Card>
					</Col>
				</Row>
				<Row className="mt-5">
					<Col>
						<Card className="shadow">
							<CardHeader className="bg-transparent">
								<h3 className="mb-0">Ajouter un devis/facture</h3>
							</CardHeader>
							<CardBody>
								{invoiceState &&
								invoiceState.length &&
								statusList &&
								itemList &&
								transactionList &&
								productList &&
								discountList &&
								customerList &&
								deliveryList ? (
									<InvoiceForm
										invoiceList={invoiceState}
										statusList={statusList}
										itemList={itemList}
										transactionList={transactionList}
										productList={productList}
										discountList={discountList}
										customerList={customerList}
										deliveryList={deliveryList}
									/>
								) : (
									'Aucune facturation possible'
								)}
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Orders
