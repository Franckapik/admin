import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormGroup } from 'reactstrap'

export const PropertyForm = ({ nextId, errorsForm }) => {
	const { register, setValue, unregister } = useFormContext()

	useEffect(() => {
		setValue('property.property_id', nextId)
		setValue('product.property_id', nextId)

		return () => {
			unregister('property')
			unregister('product.property_id')
		}
	}, [setValue, unregister, nextId])

	return (
		<>
			<FormGroup>
				<label for="prop_id">Identifiant Propriété</label>
				<input className="form-control" type="text" placeholder={nextId} disabled></input>
			</FormGroup>
			<FormGroup>
				<label for="property_depth">Profondeur</label>
				<input className="form-control" type="number" {...register('property.depth', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="property_length">Longueur</label>
				<input className="form-control" type="number" {...register('property.length', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="property_weight">Poids</label>
				<input className="form-control" type="number" {...register('property.weight', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="property_width">Largeur</label>
				<input className="form-control" type="number" {...register('property.width', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="property_width_cel">Largeur des cellules</label>
				<input className="form-control" type="number" {...register('property.width_cel', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="property_area">Aire</label>
				<input className="form-control" type="number" {...register('property.area', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="property_part_nb">Nombre de pièces</label>
				<input className="form-control" type="number" {...register('property.part_nb', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="property_cel_nb">Nombre de cellules</label>
				<input className="form-control" type="number" {...register('property.cel_nb', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="property_paint">Peinture </label>
				<select className="form-control" type="select" {...register('property.paint')}>
					<option value="true">Oui</option>
					<option value="false">Non</option>
				</select>
			</FormGroup>
			<FormGroup>
				<label for="property_wood">Matière</label>
				<input className="form-control" type="text" {...register('property.wood', { required: true })}></input>
			</FormGroup>
			<FormGroup>
				<label for="property_finish">Finition</label>
				<input className="form-control" type="text" {...register('property.finish', { required: true })}></input>
			</FormGroup>
		</>
	)
}
