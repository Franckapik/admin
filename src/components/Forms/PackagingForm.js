import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { Col, FormGroup, Row } from 'reactstrap'

export const PackagingForm = ({ nextId, errorsForm }) => {
	const { register, setValue, unregister } = useFormContext()

	useEffect(() => {
		setValue('packaging.packaging_id', nextId)
		setValue('product.packaging_id', nextId)

		return () => {
			unregister('packaging')
			unregister('product.packaging_id')
		}
	}, [setValue, unregister, nextId])

	return (
		<>
			<Row form>
				<Col md={2}>
					{' '}
					<FormGroup>
						<label htmlFor="packaging_id">Id</label>
						<input className="form-control" type="text" placeholder={nextId} disabled></input>
					</FormGroup>
				</Col>
				<Col md={10}>
					{' '}
					<FormGroup>
						<label htmlFor="packaging_length">Reference</label>
						<input className="form-control" type="text" {...register('packaging.reference', { required: true })}></input>
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="packaging_length">Longueur</label>
						<input className="form-control" type="number" {...register('packaging.length', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="packaging_width">Largueur</label>
						<input className="form-control" type="number" {...register('packaging.width', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="packaging_weight">Poids</label>
						<input className="form-control" type="number" {...register('packaging.weight', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={3}>
					{' '}
					<FormGroup>
						<label htmlFor="packaging_depth">Profondeur</label>
						<input className="form-control" type="number" {...register('packaging.depth', { required: true })}></input>
					</FormGroup>
				</Col>
			</Row>
			<Row form>
				<Col md={6}>
					<FormGroup>
						<label htmlFor="packaging_price">Prix</label>
						<input className="form-control" type="number" {...register('packaging.charge', { required: true })}></input>
					</FormGroup>
				</Col>
				<Col md={6}>
					{' '}
					<FormGroup>
						<label htmlFor="packaging_unit">Unités</label>
						<input className="form-control" type="number" {...register('packaging.unit', { required: true })}></input>
					</FormGroup>
				</Col>
			</Row>
		</>
	)
}
