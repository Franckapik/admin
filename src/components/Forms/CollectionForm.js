import { useEffect } from 'react'
import { useFormContext } from 'react-hook-form'
import { FormGroup } from 'reactstrap'

export const CollectionForm = ({ nextId, errorsForm }) => {
	const { register, setValue, unregister } = useFormContext()

	useEffect(() => {
		setValue('collection.collection_id', nextId)
		setValue('product.collection_id', nextId)

		return () => {
			unregister('collection')
			unregister('product.collection_id')
		}
	}, [setValue, unregister, nextId])

	return (
		<>
			<FormGroup>
				<label htmlFor="collection_name">Identifiant Collection</label>
				<input className="form-control" type="text" placeholder={nextId}></input>
			</FormGroup>
			<FormGroup>
				<label htmlFor="collection_name">Nom</label>
				<input className="form-control" {...register('collection.col_name', { required: true })}></input>
				{errorsForm && errorsForm.collection && errorsForm.collection.col_name?.type === 'required' && 'Un nom est requis'}
				{errorsForm &&
					errorsForm.collection &&
					errorsForm.collection.col_name?.type === 'maxLength' &&
					'Le nom est trop long'}
			</FormGroup>
			<FormGroup>
				<label htmlFor="collection_desc">Description</label>
				<input className="form-control" rows="3" {...register('collection.desc')} />
			</FormGroup>
			<FormGroup>
				<label htmlFor="collection_folder">Nom de dossier</label>

				<input className="form-control" type="text" {...register('collection.folder')} />
			</FormGroup>
			<FormGroup>
				<label htmlFor="col_publish">Publication</label>
				<select className="form-control" type="select" {...register('collection.col_publish')}>
					<option value="true">Publication en boutique</option>
					<option value="false">Stockage caché</option>
				</select>
			</FormGroup>
		</>
	)
}
