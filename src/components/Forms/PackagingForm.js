import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormGroup } from 'reactstrap'

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
			<FormGroup>
				<label for="packaging_id">Identifiant Packaging</label>
				<input className="form-control" type="text" placeholder={nextId} disabled></input>
			</FormGroup>
			<FormGroup>
				<label for="packaging_length">Reference</label>
				<input className="form-control" type="text" {...register('packaging.reference', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="packaging_length">Longueur</label>
				<input className="form-control" type="number" {...register('packaging.length', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="packaging_width">Largueur</label>
				<input className="form-control" type="number" {...register('packaging.width', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="packaging_weight">Poids</label>
				<input className="form-control" type="number" {...register('packaging.weight', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="packaging_depth">Profondeur</label>
				<input className="form-control" type="number" {...register('packaging.depth', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="packaging_price">Prix</label>
				<input className="form-control" type="number" {...register('packaging.charge', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="packaging_unit">Unités</label>
				<input className="form-control" type="number" {...register('packaging.unit', { required: true })}></input>
			</FormGroup>
		</>
	)
}
