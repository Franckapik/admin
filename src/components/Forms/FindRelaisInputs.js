import { Col, FormGroup, Row } from 'reactstrap'

const FindRelaisInputs = ({ errors, register, setValue, nextId, unregister }) => (
	<>
		<Row form>
			<Col md={4}>
				<FormGroup>
					<label className="form-control-label" htmlFor="c_address">
						{' '}
						Adresse{' '}
					</label>
					<input className="form-control" type="text" {...register('relais.address', { required: true, maxLength: 150 })} />
					{errors.name?.type === 'required' && 'Une adresse est requise'}
					{errors.name?.type === 'maxLength' && "L'adresse est trop longue"}
				</FormGroup>
			</Col>
			<Col md={4}>
				<FormGroup>
					<label className="form-control-label" htmlFor="c_postal">
						{' '}
						Postal{' '}
					</label>
					<input className="form-control" type="text" {...register('relais.postal', { required: true, maxLength: 5 })} />
					{errors.name?.type === 'required' && 'Un code postal est requis'}
					{errors.name?.type === 'maxLength' && 'Le code postal est trop long'}
				</FormGroup>
			</Col>
			<Col md={4}>
				<FormGroup>
					<label className="form-control-label" htmlFor="c_city">
						{' '}
						City{' '}
					</label>
					<input className="form-control" type="text" {...register('relais.city', { required: true, maxLength: 80 })} />
					{errors.name?.type === 'required' && 'Une ville est requise'}
					{errors.name?.type === 'maxLength' && 'Le nom de ville est trop long'}
				</FormGroup>
			</Col>
		</Row>
	</>
)

export default FindRelaisInputs
