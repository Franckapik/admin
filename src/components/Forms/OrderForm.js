import { Alert } from 'bootstrap'
import postData from 'hooks/postData'
import useToggle from 'hooks/useToggle'
import Cookies from 'js-cookie'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, FormGroup, InputGroup, InputGroupAddon } from 'reactstrap'
import CustomerInputs from './CustomerInputs'
import { DiscountInputs } from './DiscountInputs'
import { StatusInputs } from './StatusInputs'
import TransactionInputs from './TransactionInputs'
import { TransporterInputs } from './TransporterInputs'

const OrderForm = ({
	invoiceList,
	transporterList,
	statusList,
	itemList,
	discountList,
	productList,
	customerList,
	transactionList,
}) => {
	const nextInvoiceId = invoiceList[invoiceList.length - 1].invoice_id + 1

	const nextCustomerId = customerList[customerList.length - 1].user_id + 1
	const nextStatusId = statusList[statusList.length - 1].status_id + 1
	const nextDiscountId = discountList[discountList.length - 1].discount_id + 1
	const nextTransporterId = transporterList[transporterList.length - 1].transporter_id + 1
	const nextTransactionId = transactionList.length && transactionList[transactionList.length - 1].transaction_id + 1

	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		unregister,
	} = useForm({
		defaultValues: {
			invoice: {
				invoice_id: nextInvoiceId,
			},
			customer: {
				user_id: nextCustomerId,
			},
			status: {
				status_id: nextStatusId,
			},
			discount: {
				discount_id: nextDiscountId,
			},
			transporter: {
				transporter_id: nextTransporterId,
			},
			transaction: {
				transaction_id: nextTransactionId,
			},
		},
	})

	const [errorsForm, setErrors] = useState()

	const [newClient, addClient] = useToggle()
	const [newDiscount, addDiscount] = useToggle()
	const [newStatus, addStatus] = useToggle()
	const [newTransporter, addTransporter] = useToggle()
	const [newTransaction, addTransaction] = useToggle()

	const handleRegistration = (data) => postData('/addInvoice', data)

	const handleError = (errors) => console.log('error', errors)
	return (
		<Form onSubmit={handleSubmit(handleRegistration, handleError)}>
			<FormGroup>
				<label for="prod_ident">Identifiant facture</label>
				<input className="form-control" type="text" placeholder={nextInvoiceId} disabled></input>
			</FormGroup>
			<FormGroup
				style={{
					display: !newClient ? 'block' : 'none', // toggle the visbility of an input
				}}
			>
				<label for="collection_id">Client</label>
				<InputGroup>
					<select className="form-control" type="select" {...register('invoice.user_id', { required: true })}>
						<option disabled selected value="">
							{' '}
							-- Choisir un client --{' '}
						</option>
						{Array.from(customerList).map((a, i) => {
							return <option value={a.user_id}>{a.name}</option>
						})}
					</select>
					<InputGroupAddon addonType="append">
						<Button onClick={addClient}>Ajouter</Button>
					</InputGroupAddon>
				</InputGroup>
				{errorsForm && errorsForm.invoice && errorsForm.invoice.user_id?.type === 'required' && (
					<Alert color="warning">Un client est requis</Alert>
				)}
			</FormGroup>
			{newClient ? (
				<CustomerInputs
					errors={errors}
					register={register}
					setValue={setValue}
					nextId={nextCustomerId}
					unregister={unregister}
				></CustomerInputs>
			) : null}
			<FormGroup
				style={{
					display: !newDiscount ? 'block' : 'none', // toggle the visbility of an input
				}}
			>
				<label for="collection_id">Remise</label>
				<InputGroup>
					<select className="form-control" type="select" {...register('invoice.discount_id', { required: true })}>
						<option disabled selected value="">
							{' '}
							-- Choisir une remise --{' '}
						</option>
						{Array.from(discountList).map((a, i) => {
							return <option value={a.discount_id}>{a.reduction}</option>
						})}
					</select>
					<InputGroupAddon addonType="append">
						<Button onClick={addDiscount}>Ajouter</Button>
					</InputGroupAddon>
				</InputGroup>
				{errorsForm && errorsForm.invoice && errorsForm.invoice.discount_id?.type === 'required' && (
					<Alert color="warning">Une remise est requise</Alert>
				)}
			</FormGroup>
			{newDiscount ? (
				<DiscountInputs
					errors={errors}
					register={register}
					setValue={setValue}
					nextId={nextDiscountId}
					unregister={unregister}
				></DiscountInputs>
			) : null}
			<FormGroup
				style={{
					display: !newStatus ? 'block' : 'none', // toggle the visbility of an input
				}}
			>
				<label for="status_id">Statut</label>
				<InputGroup>
					<select className="form-control" type="select" {...register('invoice.status_id', { required: true })}>
						<option disabled selected value="">
							{' '}
							-- Choisir un statut --{' '}
						</option>
						{Array.from(statusList).map((a, i) => {
							return <option value={a.status_id}>{a.status_msg}</option>
						})}
					</select>
					<InputGroupAddon addonType="append">
						<Button onClick={addStatus}>Ajouter</Button>
					</InputGroupAddon>
				</InputGroup>
				{errorsForm && errorsForm.invoice && errorsForm.invoice.status_id?.type === 'required' && (
					<Alert color="warning">Un statut est requis</Alert>
				)}
			</FormGroup>
			{newStatus ? (
				<StatusInputs
					errors={errors}
					register={register}
					setValue={setValue}
					nextId={nextStatusId}
					unregister={unregister}
				></StatusInputs>
			) : null}
			<FormGroup
				style={{
					display: !newTransporter ? 'block' : 'none', // toggle the visbility of an input
				}}
			>
				<label for="status_id">Transporteur</label>
				<InputGroup>
					<select className="form-control" type="select" {...register('invoice.transporter_id', { required: true })}>
						<option disabled selected value="">
							{' '}
							-- Choisir un transporteur --{' '}
						</option>
						{Array.from(transporterList).map((a, i) => {
							return <option value={a.transporter_id}>{a.reference}</option>
						})}
					</select>
					<InputGroupAddon addonType="append">
						<Button onClick={addTransporter}>Ajouter</Button>
					</InputGroupAddon>
				</InputGroup>
				{errorsForm && errorsForm.invoice && errorsForm.invoice.transporter_id?.type === 'required' && (
					<Alert color="warning">Un transporter est requis</Alert>
				)}
			</FormGroup>
			{newTransporter ? (
				<TransporterInputs
					errors={errors}
					register={register}
					setValue={setValue}
					nextId={nextTransporterId}
					unregister={unregister}
				></TransporterInputs>
			) : null}
			<FormGroup
				style={{
					display: !newTransaction ? 'block' : 'none', // toggle the visbility of an input
				}}
			>
				<label for="status_id">Transaction</label>
				<InputGroup>
					<select className="form-control" type="select" {...register('invoice.transaction_id', { required: true })}>
						<option disabled selected value="">
							{' '}
							-- Choisir une transaction --{' '}
						</option>
						{Array.from(transactionList).map((a, i) => {
							return <option value={a.transaction_id}>{a.desc}</option>
						})}
					</select>
					<InputGroupAddon addonType="append">
						<Button onClick={addTransaction}>Ajouter</Button>
					</InputGroupAddon>
				</InputGroup>
				{errorsForm && errorsForm.invoice && errorsForm.invoice.transaction_id?.type === 'required' && (
					<Alert color="warning">Une transaction est requise</Alert>
				)}
			</FormGroup>
			{newTransaction ? (
				<TransactionInputs
					errors={errors}
					register={register}
					setValue={setValue}
					nextId={nextTransactionId}
					nextInvoiceId={nextInvoiceId}
					unregister={unregister}
				></TransactionInputs>
			) : null}
			<Button>Ajouter</Button>
		</Form>
	)
}

export default OrderForm
