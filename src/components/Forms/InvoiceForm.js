import { Alert } from 'bootstrap'
import postData from 'hooks/postData'
import useToggle from 'hooks/useToggle'
import { AddForm } from 'layouts/AddForm'
import { useState } from 'react'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { Button, Card, Col, Form, FormGroup, InputGroup, InputGroupAddon, Row } from 'reactstrap'
import CustomerInputs from './CustomerInputs'
import { DeliveryInputs } from './DeliveryInputs'
import { DiscountInputs } from './DiscountInputs'
import { StatusInputs } from './StatusInputs'
import TransactionInputs from './TransactionInputs'

const InvoiceForm = ({
	invoiceList,
	statusList,
	itemList,
	discountList,
	productList,
	customerList,
	transactionList,
	deliveryList,
}) => {
	const nextInvoiceId = invoiceList[invoiceList.length - 1].invoice_id + 1

	const nextCustomerId = customerList[customerList.length - 1].user_id + 1
	const nextStatusId = statusList[statusList.length - 1].status_id + 1
	const nextDiscountId = discountList[discountList.length - 1].discount_id + 1
	const nextTransactionId = transactionList.length && transactionList[transactionList.length - 1].transaction_id + 1
	const nextDeliveryId = deliveryList.length && deliveryList[deliveryList.length - 1].delivery_id + 1
	const order_number = Math.floor(Math.random() * (10000 - 2500) + 2500)

	const methods = useForm({
		defaultValues: {
			invoice: {
				invoice_id: nextInvoiceId,
				order_number: order_number,
			},
		},
	})

	const [errorsForm, setErrors] = useState()
	const [items, addItems] = useState([])
	const removeItem = (items) => {
		items.pop()
		return items
	}
	const [newClient, addClient] = useToggle()
	const [newDiscount, addDiscount] = useToggle()
	const [newStatus, addStatus] = useToggle()
	const [newTransaction, addTransaction] = useToggle()
	const [newDelivery, addDelivery] = useToggle()
	const [newProduct, addProduct] = useToggle()

	const handleRegistration = (data) => postData('/addInvoice', data)

	const handleError = (errors) => console.log('error', errors)
	return (
		<FormProvider {...methods}>
			<Form onSubmit={methods.handleSubmit(handleRegistration, handleError)}>
				<Row form>
					<Col md={4}>
						{' '}
						<FormGroup>
							<label htmlFor="invoice_ident">Identifiant facture</label>
							<input className="form-control" type="text" placeholder={nextInvoiceId} disabled></input>
						</FormGroup>
					</Col>
					<Col md={4}>
						{' '}
						<FormGroup>
							<label htmlFor="invoice_nb">Numero de commande</label>
							<input className="form-control" type="text" placeholder={order_number} disabled></input>
						</FormGroup>
					</Col>
					<Col md={4}>
						{' '}
						<FormGroup>
							<label htmlFor="invoice_order_date">Date de commande</label>
							<input
								className="form-control"
								type="date"
								{...methods.register('invoice.order_date', { required: true })}
							></input>
						</FormGroup>
					</Col>
				</Row>
				<FormGroup
					style={{
						display: !newClient ? 'block' : 'none', // toggle the visbility of an input
					}}
				>
					<label htmlFor="collection_id">Client</label>
					<InputGroup>
						<select
							className="form-control"
							type="select"
							defaultValue=""
							{...methods.register('invoice.user_id', { required: true })}
						>
							<option disabled value="">
								{' '}
								-- Choisir un client --{' '}
							</option>
							{Array.from(customerList).map((a, i) => {
								return (
									<option key={a + i} value={a.user_id}>
										{a.name}
									</option>
								)
							})}
						</select>
						<InputGroupAddon addonType="append">
							<Button onClick={addClient}>+</Button>
						</InputGroupAddon>
					</InputGroup>
					{errorsForm && errorsForm.invoice && errorsForm.invoice.user_id?.type === 'required' && (
						<Alert color="warning">Un client est requis</Alert>
					)}
				</FormGroup>
				{newClient ? (
					<AddForm toggleFunction={addClient} title="Client">
						{' '}
						<CustomerInputs nextId={nextCustomerId}></CustomerInputs>{' '}
					</AddForm>
				) : null}
				<FormGroup
					style={{
						display: !newDelivery ? 'block' : 'none', // toggle the visbility of an input
					}}
				>
					<label htmlFor="delivery_id">Livraison</label>
					<InputGroup>
						<select
							className="form-control"
							type="select"
							defaultValue=""
							{...methods.register('invoice.delivery_id', { required: true })}
						>
							<option disabled value="">
								{' '}
								-- Choisir une livraison --{' '}
							</option>
							{Array.from(deliveryList).map((a, i) => {
								return (
									<option key={a + i} value={a.delivery_id}>
										{a.recipient}
									</option>
								)
							})}
						</select>
						<InputGroupAddon addonType="append">
							<Button onClick={addDelivery}>+</Button>
						</InputGroupAddon>
					</InputGroup>
					{errorsForm && errorsForm.invoice && errorsForm.invoice.delivery_id?.type === 'required' && (
						<Alert color="warning">Une livraison est requise</Alert>
					)}
				</FormGroup>
				{newDelivery ? (
					<AddForm toggleFunction={addDelivery} title="Livraison">
						{' '}
						<DeliveryInputs nextId={nextDeliveryId} nextInvoiceId={nextInvoiceId}></DeliveryInputs>
					</AddForm>
				) : null}
				<FormGroup
					style={{
						display: !newDiscount ? 'block' : 'none', // toggle the visbility of an input
					}}
				>
					<label htmlFor="discount_id">Remise</label>
					<InputGroup>
						<select
							className="form-control"
							type="select"
							defaultValue=""
							{...methods.register('invoice.discount_id', { required: true })}
						>
							<option disabled value="">
								{' '}
								-- Choisir une remise --{' '}
							</option>
							{Array.from(discountList).map((a, i) => {
								return (
									<option key={a + i} value={a.discount_id}>
										{a.reduction}
									</option>
								)
							})}
						</select>
						<InputGroupAddon addonType="append">
							<Button onClick={addDiscount}>+</Button>
						</InputGroupAddon>
					</InputGroup>
					{errorsForm && errorsForm.invoice && errorsForm.invoice.discount_id?.type === 'required' && (
						<Alert color="warning">Une remise est requise</Alert>
					)}
				</FormGroup>
				{newDiscount ? (
					<AddForm toggleFunction={addDiscount} title="Réduction">
						{' '}
						<DiscountInputs nextId={nextDiscountId}></DiscountInputs>
					</AddForm>
				) : null}
				<FormGroup
					style={{
						display: !newStatus ? 'block' : 'none', // toggle the visbility of an input
					}}
				>
					<label htmlFor="status_id">Statut</label>
					<InputGroup>
						<select
							className="form-control"
							type="select"
							defaultValue=""
							{...methods.register('invoice.status_id', { required: true })}
						>
							<option disabled value="">
								{' '}
								-- Choisir un statut --{' '}
							</option>
							{Array.from(statusList).map((a, i) => {
								return (
									<option key={a + i} value={a.status_id}>
										{a.status_msg}
									</option>
								)
							})}
						</select>
						<InputGroupAddon addonType="append">
							<Button onClick={addStatus}>+</Button>
						</InputGroupAddon>
					</InputGroup>
					{errorsForm && errorsForm.invoice && errorsForm.invoice.status_id?.type === 'required' && (
						<Alert color="warning">Un statut est requis</Alert>
					)}
				</FormGroup>
				{newStatus ? (
					<AddForm toggleFunction={addStatus} title="Statut">
						{' '}
						<StatusInputs nextId={nextStatusId}></StatusInputs>
					</AddForm>
				) : null}
				<FormGroup
					style={{
						display: !newTransaction ? 'block' : 'none', // toggle the visbility of an input
					}}
				>
					<label htmlFor="status_id">Transaction</label>
					<InputGroup>
						<select
							className="form-control"
							type="select"
							defaultValue=""
							{...methods.register('invoice.transaction_id', { required: true })}
						>
							<option disabled value="">
								{' '}
								-- Choisir une transaction --{' '}
							</option>
							{Array.from(transactionList).map((a, i) => {
								return (
									<option key={a + i} value={a.transaction_id}>
										{a.desc}
									</option>
								)
							})}
						</select>
						<InputGroupAddon addonType="append">
							<Button onClick={addTransaction}>+</Button>
						</InputGroupAddon>
					</InputGroup>
					{errorsForm && errorsForm.invoice && errorsForm.invoice.transaction_id?.type === 'required' && (
						<Alert color="warning">Une transaction est requise</Alert>
					)}
				</FormGroup>
				{newTransaction ? (
					<AddForm toggleFunction={addTransaction} title="Transaction">
						{' '}
						<TransactionInputs nextId={nextTransactionId} nextInvoiceId={nextInvoiceId}></TransactionInputs>
					</AddForm>
				) : null}
				{items &&
					items.map((a, i) => (
						<Card className="bg-lighter p-2">
							<Row form>
								<Col md={1}>
									{' '}
									<FormGroup>
										<label htmlFor="invoice_item_id">Id</label>
										<input className="form-control" type="number" value={i} disabled></input>
										{methods.setValue(`items.${i}.invoice_id`, nextInvoiceId)}
									</FormGroup>
								</Col>
								<Col md={5}>
									{' '}
									<FormGroup
										style={{
											display: !newProduct ? 'block' : 'none', // toggle the visbility of an input
										}}
									>
										<label htmlFor="status_id">Produit</label>
										<InputGroup>
											<select
												className="form-control"
												type="select"
												defaultValue=""
												{...methods.register(`items.${i}.product_id`)}
											>
												<option disabled value="">
													{' '}
													-- Choisir un produit --{' '}
												</option>
												{Array.from(productList).map((a, i) => {
													return (
														<option key={a + i} value={a.product_id}>
															{a.name} - {a.price} €
														</option>
													)
												})}
											</select>
											<InputGroupAddon addonType="append">
												<Button onClick={addProduct}>+</Button>
											</InputGroupAddon>
										</InputGroup>
										{errorsForm && errorsForm.invoice && errorsForm.invoice.status_id?.type === 'required' && (
											<Alert color="warning">Un statut est requis</Alert>
										)}
									</FormGroup>
								</Col>
								<Col md={2}>
									{' '}
									<FormGroup>
										<label htmlFor="invoice_item_price">Prix</label>
										<Controller
											render={({ value, onChange, ...restProps }) => (
												<input
													className="form-control"
													type="number"
													value={value}
													defaultValue="0"
													onChange={(e) => {
														console.log(e.target.value)
														methods.setValue(`items.${i}.total`, e.target.value * methods.watch(`items.${i}.qty`))
														methods.setValue(`items.${i}.price`, e.target.value)
													}}
													{...restProps}
												/>
											)}
											name={`items.${i}.qty`}
											control={methods.control}
										/>
									</FormGroup>
								</Col>
								<Col md={1}>
									{' '}
									<FormGroup>
										<label htmlFor="invoice_item_qty">Quantité</label>
										<Controller
											render={({ value, onChange, ...restProps }) => (
												<input
													className="form-control"
													type="number"
													value={value}
													defaultValue="0"
													onChange={(e) => {
														console.log(e.target.value)
														methods.setValue(`items.${i}.total`, e.target.value * methods.watch(`items.${i}.price`))
														methods.setValue(`items.${i}.qty`, e.target.value)
													}}
													{...restProps}
												/>
											)}
											name={`items.${i}.qty`}
											control={methods.control}
										/>
									</FormGroup>
								</Col>
								<Col md={2}>
									{' '}
									<FormGroup>
										<label htmlFor="invoice_item_stotal">Sous-total</label>
										<input
											className="form-control"
											type="number"
											value={methods.watch(`items.${i}.qty`) * methods.watch(`items.${i}.price`)}
											{...methods.register(`items.${i}.total`, { required: true })}
										></input>
									</FormGroup>
								</Col>
								<Col md={1}>
									<label htmlFor="invoice_item_stotal">del</label>

									<Button
										onClick={() => {
											console.log(i, items)
											addItems(items.filter((c, d) => c !== i))
										}}
									>
										-
									</Button>
								</Col>
							</Row>
						</Card>
					))}
				{/* 			{watch('items') && watch('items').reduce((a, c) => a.price + c.price)}
				 */}{' '}
				<Button
					onClick={() =>
						addItems((items) => {
							return [...items, items.length]
						})
					}
				>
					+
				</Button>
				<Button
					onClick={() => {
						items.pop()
						addItems((items) => [...items])
					}}
				>
					-
				</Button>
				<div className="text-center">
					<Button className="text-center">Valider la commande</Button>
				</div>
			</Form>
		</FormProvider>
	)
}

export default InvoiceForm
