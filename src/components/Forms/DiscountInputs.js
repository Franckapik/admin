import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Col, FormGroup, Row } from 'reactstrap'

export const DiscountInputs = ({ nextId }) => {
	const { register, setValue, unregister } = useFormContext()
	useEffect(() => {
		setValue('discount.discount_id', nextId)
		setValue('invoice.discount_id', nextId)

		return () => {
			unregister('discount')
			unregister('invoice.discount_id')
		}
	}, [setValue, unregister, nextId])

	return (
		<>
			<Row form>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="d_id">Identifiant Discount</label>
						<input className="form-control" type="text" placeholder={nextId}></input>
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="d_red">Reduction (%)</label>
						<input className="form-control" type="number" {...register('discount.reduction', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="d_code">Code</label>
						<input className="form-control" type="text" {...register('discount.code', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={3}>
					<FormGroup>
						<label htmlFor="d_exp">Date d'expiration</label>
						<input className="form-control" type="date" {...register('discount.expiration', { required: true })}></input>
					</FormGroup>
				</Col>
			</Row>
		</>
	)
}
