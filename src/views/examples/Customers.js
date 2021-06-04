    import Header from "components/Headers/Header.js";
    import useFetch from "hooks/useFetch";
    import postData from 'hooks/postData';
    import React from "react";
    import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row, Table } from "reactstrap";
    import { useForm } from "react-hook-form";

      const Customers = () => {
        const { response, fetchError } = useFetch("/customer");

        const defaultUser = { user_id : "2", session_id : "sessionId" }

        const { register, formState: { errors }, handleSubmit } = useForm({ defaultValues : defaultUser } );

        const handleRegistration = data => postData('/addCustomer', data);

        const handleError = (errors) => console.log("error", errors);

        return (
          <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
              {/* Dark table */}
              <Row className="mt-5">
                <div className="col">
                  <Card className="bg-default shadow">
                    <CardHeader className="bg-transparent border-0">
                      <h3 className="text-white mb-0">Liste des clients</h3>
                    </CardHeader>
                    {response && response.length && response.length > 0 ?
                    <Table
                    className="align-items-center table-dark table-flush"
                    responsive
                  >
                    <thead className="thead-dark">
                      <tr>
                        {Object.keys(response[0]).map((a,i) => {
                          return <th scope="col">{a}</th>
                        })}
                      </tr>
                    </thead>
                    <tbody>
                    {Array.from(response).map((a,i)=> {
                      return (<tr>
                          { Object.keys(a).map((b, c) => {
                                return(                          
                                  <td>{a[b]}</td>
                                )
                              })}
                        </tr>);
                    })}
                    </tbody>
                  </Table>
                    : "Aucun produit existant"}
                    
                  </Card>
                </div>
              </Row>
              <Row className="mt-5">
                <Col>
                <Card className="shadow">
                  <CardHeader className="bg-transparent">
                    <h3 className="mb-0">Ajouter un client</h3>
                  </CardHeader>
                  <CardBody>
              <Form onSubmit={handleSubmit(handleRegistration, handleError)}>
                <FormGroup>
                  <label className="form-control-label" for="user_id" > Id </label>
                  <Input name="id" defaultValue={defaultUser.user_id}  id="c_user_id" type="number" disabled {...register("user_id")} />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label" for="session_id" > Session Id </label>
                  <Input name="id" defaultValue={defaultUser.session_id}  id="c_session_id" type="text" disabled {...register("session_id")} />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label" for="c_name" > Nom </label>
                  <Input defaultValue="Girard" id="c_name" type="text" {...register('name', { required: true, maxLength: 20 })} />
                  {errors.name?.type === 'required' && "Un nom est requis"}
                  {errors.name?.type === 'maxLength' && "Le nom est trop long"}
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label" for="c_firstname" > Prénom </label>
                  <Input defaultValue="Franck" id="c_firstname" type="text" {...register('firstname', { required: true, maxLength: 20 })} />
                  {errors.name?.type === 'required' && "Un prénom est requis"}
                  {errors.name?.type === 'maxLength' && "Le prénom est trop long"}
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label" for="c_address" > Adresse </label>
                  <Input defaultValue="1 rue des lilas" id="c_address" type="text" {...register('address', { required: true, maxLength: 150 })} />
                  {errors.name?.type === 'required' && "Une adresse est requise"}
                  {errors.name?.type === 'maxLength' && "L'adresse est trop longue"}
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label" for="c_postal" > Postal </label>
                  <Input defaultValue="35423" id="c_postal" type="text" {...register('postal', { required: true, maxLength: 5 })} />
                  {errors.name?.type === 'required' && "Un code postal est requis"}
                  {errors.name?.type === 'maxLength' && "Le code postal est trop long"}

                </FormGroup>
                <FormGroup>
                  <label className="form-control-label" for="c_mail" > Mail </label>
                  <Input defaultValue="Franck" id="c_mail" type="text" {...register('mail', { required: true, pattern : /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/ })} />
                  {errors.name?.type === 'required' && "Une adresse mail est requise"}
                  {errors.name?.type === 'pattern' && "L'adresse mail est erronée"}
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label" for="c_city" > City </label>
                  <Input defaultValue="Rennes" id="c_city" type="text" {...register('city', { required: true, maxLength: 80 })} />
                  {errors.name?.type === 'required' && "Une ville est requise"}
                  {errors.name?.type === 'maxLength' && "Le nom de ville est trop long"}

                </FormGroup>
                <FormGroup>
                  <label className="form-control-label" for="c_country" > Pays </label>
                  <Input defaultValue="Rennes" id="c_country" type="text" {...register('country', { required: true, maxLength: 20 })} />
                  {errors.name?.type === 'required' && "Un pays est requis"}
                  {errors.name?.type === 'maxLength' && "Le nom de pays est trop long"}

                </FormGroup>

                <Button>Submit</Button>
              </Form>
              </CardBody>
              </Card>
              </Col>
            </Row>
            </Container>
          </>
        );
      };

      export default Customers;
