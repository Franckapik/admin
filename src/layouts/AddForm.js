import { Card, CardBody, CardTitle } from 'reactstrap'

export const AddForm = ({ children, toggleFunction, title }) => (
	<Card color="lighter mb-3">
		<CardTitle className="text-center">
			<i className="fas fa-plus m-2"></i> {title}
			<small onClick={toggleFunction}>
				<i className="fas fa-undo btn close text-danger"></i>
			</small>
		</CardTitle>
		<CardBody className="pt-0">{children} </CardBody>
	</Card>
)
