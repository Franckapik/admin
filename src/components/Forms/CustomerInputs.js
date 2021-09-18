import { FormGroup } from 'reactstrap'

const CustomerInputs = ({ errors, register, setValue, nextId, unregister }) => (
	<>
		<FormGroup>
			<label className="form-control-label" for="user_id">
				{' '}
				Id{' '}
			</label>
			<input className="form-control" type="number" {...register('customer.user_id')} />
		</FormGroup>
		<FormGroup>
			<label className="form-control-label" for="session_id">
				{' '}
				Session Id{' '}
			</label>
			<input className="form-control" type="text" {...register('customer.session_id')} />
		</FormGroup>
		<FormGroup>
			<label className="form-control-label" for="c_name">
				{' '}
				Nom{' '}
			</label>
			<input className="form-control" type="text" {...register('customer.name', { required: true, maxLength: 20 })} />
			{errors.name?.type === 'required' && 'Un nom est requis'}
			{errors.name?.type === 'maxLength' && 'Le nom est trop long'}
		</FormGroup>
		<FormGroup>
			<label className="form-control-label" for="c_firstname">
				{' '}
				Prénom{' '}
			</label>
			<input className="form-control" type="text" {...register('customer.firstname', { required: true, maxLength: 20 })} />
			{errors.name?.type === 'required' && 'Un prénom est requis'}
			{errors.name?.type === 'maxLength' && 'Le prénom est trop long'}
		</FormGroup>
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
			<label className="form-control-label" for="c_mail">
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

export default CustomerInputs
