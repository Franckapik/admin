import CustomerForm from 'components/Forms/CustomerForm'
import Header from 'components/Headers/Header.js'
import React from 'react'
import { Card, CardBody, CardHeader, Col, Container, Row } from 'reactstrap'
import easyinvoice from 'easyinvoice'
import { Button } from 'bootstrap'

const Orders = () => {
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

	return (
		<>
			<Header />
			{/* Page content */}
			<Container className="mt--7" fluid>
				{/* Dark table */}
				<Row className="mt-5">
					<Col>
						<Card className="shadow">
							<CardHeader className="bg-transparent">
								<h3 className="mb-0">Essai de generateur pdf</h3>
							</CardHeader>
							<CardBody>
								<span onClick={facturation}>generer</span>
							</CardBody>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	)
}

export default Orders
