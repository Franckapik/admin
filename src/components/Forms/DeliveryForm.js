import postData from 'hooks/postData'
import { useForm } from 'react-hook-form'
import { Button, Form } from 'reactstrap'
import { DeliveryInputs } from './DeliveryInputs'

const DeliveryForm = ({ deliveryList }) => {
	const nextDeliveryId = deliveryList.length && deliveryList[deliveryList.length - 1].delivery_id + 1

	const {
		register,
		formState: { errors },
		handleSubmit,
		unregister,
		setValue,
		watch,
	} = useForm({
		defaultValues: {
			delivery: {
				delivery_id: nextDeliveryId,
			},
		},
	})

	const handleRegistration = (data) => postData('/addDelivery', data)

	const handleError = (errors) => console.log('error', errors)

	return (
		<Form onSubmit={handleSubmit(handleRegistration, handleError)}>
			<DeliveryInputs
				errors={errors}
				nextId={nextDeliveryId}
				register={register}
				setValue={setValue}
				unregister={unregister}
				watch={watch}
			></DeliveryInputs>
			<Button>Ajouter</Button>
		</Form>
	)
}

export default DeliveryForm
