import postData from 'hooks/postData'
import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import { Button, Form } from 'reactstrap'
import CustomerInputs from './CustomerInputs'

const CustomerForm = ({ customerList }) => {
	const {
		register,
		formState: { errors },
		handleSubmit,
		reset,
	} = useForm({
		defaultValues: {
			user_id: customerList[customerList.length - 1].user_id + 1,
			session_id: 'admin' + Cookies.get('connect.sid'),
		},
	})

	const handleRegistration = (data) => postData('/addCustomer', data)

	const handleError = (errors) => console.log('error', errors)

	return (
		<Form onSubmit={handleSubmit(handleRegistration, handleError)}>
			<CustomerInputs errors={errors} register={register}></CustomerInputs>
			<Button>Ajouter</Button>
		</Form>
	)
}

export default CustomerForm
