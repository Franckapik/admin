import { Alert } from 'bootstrap'
import postData from 'hooks/postData'
import useToggle from 'hooks/useToggle'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Form, FormGroup, InputGroup, InputGroupAddon } from 'reactstrap'
import CustomerInputs from './CustomerInputs'
import { DiscountInputs } from './DiscountInputs'
import { StatusInputs } from './StatusInputs'
import TransactionInputs from './TransactionInputs'
import { TransporterInputs } from './TransporterInputs'
import { DeliveryInputs } from './DeliveryInputs'
import { ParcelInputs } from './ParcelInputs'

const ParcelForm = ({ invoiceList }) => {
	const [invoiceSelected, setInvoiceSelected] = useState(0)

	const order_number = Math.floor(Math.random() * (10000 - 2500) + 2500)
	const {
		register,
		formState: { errors },
		handleSubmit,
		setValue,
		unregister,
	} = useForm()

	useEffect(() => {
		console.log(invoiceSelected)
		if (invoiceSelected) {
			setValue('parcel.name', invoiceSelected.recipient)
			setValue('parcel.address', invoiceSelected.address)
			setValue('parcel.city', invoiceSelected.city)
			setValue('parcel.postal_code', invoiceSelected.postal)
			setValue('parcel.email', invoiceSelected.mail)
			setValue('parcel.country', 'FR')
			setValue('parcel.length', '50')
			setValue('parcel.width', '50')
			setValue('parcel.height', '50')
			setValue('parcel.quantity', '1')
			setValue('parcel.to_service_point', Number(invoiceSelected.service_point))
			setValue('parcel.order_number', invoiceSelected.order_number)
		}
	}, [invoiceSelected, setValue])

	const [errorsForm, setErrors] = useState()

	const handleRegistration = (data) => postData('/addParcel', data)

	const handleError = (errors) => console.log('error', errors)
	return (
		<Form onSubmit={handleSubmit(handleRegistration, handleError)}>
			<InputGroup>
				<select
					className="form-control"
					type="select"
					defaultValue=""
					onClick={(e) => {
						console.log(e.target.value)
						setInvoiceSelected(invoiceList.filter((a, i) => a.invoice_id === Number(e.target.value))[0])
					}}
				>
					<option disabled value="">
						{' '}
						-- Choisir une facture --{' '}
					</option>
					{Array.from(invoiceList).map((a, i) => {
						return (
							<option key={a + i} value={a.invoice_id}>
								{a.name} | {a.address} | {a.amount} €
							</option>
						)
					})}
				</select>
			</InputGroup>
			<ParcelInputs register={register}></ParcelInputs>

			<Button>Ajouter le colis</Button>
		</Form>
	)
}

export default ParcelForm
