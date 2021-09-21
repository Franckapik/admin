import { FormGroup } from 'reactstrap'

const FindRelaisInputs = ({ errors, register, setValue, nextId, unregister }) => (
	<>
		<FormGroup>
			<label className="form-control-label" for="c_address">
				{' '}
				Adresse{' '}
			</label>
			<input className="form-control" type="text" {...register('customer.address', { required: true, maxLength: 150 })} />
			{errors.name?.type === 'required' && 'Une adresse est requise'}
			{errors.name?.type === 'maxLength' && "L'adresse est trop longue"}
		</FormGroup>
		<FormGroup>
			<label className="form-control-label" for="c_postal">
				{' '}
				Postal{' '}
			</label>
			<input className="form-control" type="text" {...register('customer.postal', { required: true, maxLength: 5 })} />
			{errors.name?.type === 'required' && 'Un code postal est requis'}
			{errors.name?.type === 'maxLength' && 'Le code postal est trop long'}
		</FormGroup>
		<FormGroup>
			<label className="form-control-label" for="c_city">
				{' '}
				City{' '}
			</label>
			<input className="form-control" type="text" {...register('customer.city', { required: true, maxLength: 80 })} />
			{errors.name?.type === 'required' && 'Une ville est requise'}
			{errors.name?.type === 'maxLength' && 'Le nom de ville est trop long'}
		</FormGroup>
		<FormGroup>
			<label className="form-control-label" for="c_country">
				{' '}
				Pays{' '}
			</label>
			<input className="form-control" type="text" {...register('customer.country', { required: true, maxLength: 20 })} />
			{errors.name?.type === 'required' && 'Un pays est requis'}
			{errors.name?.type === 'maxLength' && 'Le nom de pays est trop long'}
		</FormGroup>
	</>
)

export default FindRelaisInputs
