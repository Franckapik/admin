import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Col, FormGroup, Row } from 'reactstrap'

const CustomerInputs = ({ nextId }) => {
	const {
		formState: { errors },
		register,
		setValue,
		unregister,
	} = useFormContext()

	useEffect(() => {
		setValue('customer.user_id', nextId)
		setValue('invoice.user_id', nextId)

		return () => {
			unregister('customer')
			unregister('invoice.user_id')
		}
	}, [setValue, unregister, nextId])

	return (
		<>
			<Row form>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="user_id">
							{' '}
							Id{' '}
						</label>
						<input className="form-control" type="number" {...register('customer.user_id')} />
					</FormGroup>
				</Col>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="session_id">
							{' '}
							Session Id{' '}
						</label>
						<input className="form-control" type="text" {...register('customer.session_id')} />
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="c_name">
							{' '}
							Nom{' '}
						</label>
						<input className="form-control" type="text" {...register('customer.name', { required: true, maxLength: 20 })} />
						{errors.name?.type === 'required' && 'Un nom est requis'}
						{errors.name?.type === 'maxLength' && 'Le nom est trop long'}
					</FormGroup>
				</Col>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="c_firstname">
							{' '}
							Prénom{' '}
						</label>
						<input
							className="form-control"
							type="text"
							{...register('customer.firstname', { required: true, maxLength: 20 })}
						/>
						{errors.name?.type === 'required' && 'Un prénom est requis'}
						{errors.name?.type === 'maxLength' && 'Le prénom est trop long'}
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="c_address">
							{' '}
							Adresse{' '}
						</label>
						<input
							className="form-control"
							type="text"
							{...register('customer.address', { required: true, maxLength: 150 })}
						/>
						{errors.name?.type === 'required' && 'Une adresse est requise'}
						{errors.name?.type === 'maxLength' && "L'adresse est trop longue"}
					</FormGroup>
				</Col>
				<Col md={3}>
					<FormGroup>
						<label className="form-control-label" htmlFor="c_postal">
							{' '}
							Postal{' '}
						</label>
						<input
							className="form-control"
							type="text"
							{...register('customer.postal', { required: true, maxLength: 5 })}
						/>
						{errors.name?.type === 'required' && 'Un code postal est requis'}
						{errors.name?.type === 'maxLength' && 'Le code postal est trop long'}
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="c_city">
							{' '}
							Ville{' '}
						</label>
						<input className="form-control" type="text" {...register('customer.city', { required: true, maxLength: 80 })} />
						{errors.name?.type === 'required' && 'Une ville est requise'}
						{errors.name?.type === 'maxLength' && 'Le nom de ville est trop long'}
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="c_mail">
							{' '}
							Mail{' '}
						</label>
						<input
							className="form-control"
							type="text"
							{...register('customer.mail', {
								required: true,
								pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
							})}
						/>
						{errors.name?.type === 'required' && 'Une adresse mail est requise'}
						{errors.name?.type === 'pattern' && "L'adresse mail est erronée"}
					</FormGroup>
				</Col>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label className="form-control-label" htmlFor="c_country">
							{' '}
							Pays{' '}
						</label>
						<input
							className="form-control"
							type="text"
							{...register('customer.country', { required: true, maxLength: 20 })}
						/>
						{errors.name?.type === 'required' && 'Un pays est requis'}
						{errors.name?.type === 'maxLength' && 'Le nom de pays est trop long'}
					</FormGroup>
				</Col>
			</Row>
		</>
	)
}

export default CustomerInputs
