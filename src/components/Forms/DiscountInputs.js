import { useEffect } from 'react'
import { FormGroup } from 'reactstrap'

export const DiscountInputs = ({ register, errors, setValue, nextId, unregister }) => {
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
			<FormGroup>
				<label htmlFor="d_id">Identifiant Discount</label>
				<input className="form-control" type="text" placeholder={nextId} disabled></input>
			</FormGroup>
			<FormGroup>
				<label htmlFor="d_red">Reduction (%)</label>
				<input className="form-control" type="number" {...register('discount.reduction', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label htmlFor="d_code">Code</label>
				<input className="form-control" type="text" {...register('discount.code', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label htmlFor="d_exp">Date d'expiration</label>
				<input className="form-control" type="date" {...register('discount.expiration', { required: true })}></input>
			</FormGroup>
		</>
	)
}
