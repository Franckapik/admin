import InvoiceForm from 'components/Forms/InvoiceForm'
import Header from 'components/Headers/Header.js'
import easyinvoice from 'easyinvoice'
import delData from 'hooks/delData'
import useFetch from 'hooks/useFetch'
import useToggle from 'hooks/useToggle'
import React, { useEffect, useState } from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row, Table } from 'reactstrap'

const Orders = () => {
	const { response: transporterList } = useFetch('/transporter')
	const { response: statusList } = useFetch('/status')
	const { response: itemList } = useFetch('/item')
	const { response: transactionList } = useFetch('/transaction')
	const { response: productList } = useFetch('/product')
	const { response: discountList } = useFetch('/discount')
	const { response: customerList } = useFetch('/customer')
	const { response: deliveryList } = useFetch('/delivery')

	var data = {
		documentTitle: 'Facture',
		locale: 'fr-FR',
		currency: 'EUR', //See documentation 'Locales and Currency' for more info
		taxNotation: 'vat', //or gst
		marginTop: 25,
		marginRight: 25,
		marginLeft: 25,
		marginBottom: 25,
		logo: 'https://public.easyinvoice.cloud/img/logo_en_original.png', //or base64
		background: 'https://public.easyinvoice.cloud/img/watermark-draft.jpg', //or base64 //img or pdf
		sender: {
			company: 'Quadratik.fr',
			address: '1 rue d aubigné',
			zip: '35440',
			city: 'Feins',
			country: 'France',
			//"custom1": "custom value 1",
			//"custom2": "custom value 2",
			//"custom3": "custom value 3"
		},
		client: {
			company: 'Mr Franck Girard',
			address: '1 rue des lilas',
			zip: '54212',
			city: 'Ici les moulineaux',
			country: 'France',
			//"custom1": "custom value 1",
			//"custom2": "custom value 2",
			//"custom3": "custom value 3"
		},
		invoiceNumber: '#125485',
		invoiceDate: '12.09.2021',
		products: [
			{
				quantity: '2',
				description: 'Woodik-7',
				tax: 0,
				price: 68,
			},
			{
				quantity: '4',
				description: 'Quadrablack',
				tax: 0,
				price: 62,
			},
		],
		bottomNotice:
			'TVA non applicable, article 293 B du CGI | Escompte pour réglement anticipé de 0% - Pénalité en cas de retard de paiement: 1.5 fois le taux d intéret légal | IBAN : FR76 1380 7005 8132 3192 3592 810 BIC/SWIFT : CCBPFRPPNAN',
		translate: {
			invoiceNumber: 'Facture n°',
			invoiceDate: 'Date de facturation',
			products: 'Produits',
			quantity: 'Quantité',
			price: 'Prix',
			subtotal: 'Sous-total',
			total: 'Total',
		},
	}

	//Create your invoice! Easy!
	const facturation = () =>
		easyinvoice.createInvoice(data, function (result) {
			//The response will contain a base64 encoded PDF file
			easyinvoice.download('myInvoice.pdf', result.pdf)
			console.log(result.pdf)
		})

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
											<i className="far fa-list-alt"></i>
										</th>
										<th scope="col">
											<i className="far fa-edit"></i>
										</th>
										<th scope="col">Id</th>
										<th scope="col">Client</th>
										<th scope="col">Statut</th>
										<th scope="col">FDP</th>
										<th scope="col">Transporteur</th>
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
												<td>{a.invoice_id}</td>
												<td>{a.name}</td>
												<td>{a.status_msg}</td>
												<td>{a.fdp} €</td>
												<td>{a.reference}</td>
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
								<span onClick={facturation}>Generer une facture en pdf</span>
								{invoiceState &&
								invoiceState.length &&
								transporterList &&
								statusList &&
								itemList &&
								transactionList &&
								productList &&
								discountList &&
								customerList &&
								deliveryList ? (
									<InvoiceForm
										invoiceList={invoiceState}
										transporterList={transporterList}
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
