      // core components
    import Header from "components/Headers/Header.js";
    import useFetch from "hooks/useFetch";
    import React from "react";
    // reactstrap components
    import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row, Table } from "reactstrap";
    import { useForm } from "react-hook-form";
      const Products = () => {

        const postData = (url, body) => {
          return fetch(url, {
            credentials: 'include',
            method: 'post',
            body: JSON.stringify(body),
            headers: new Headers({'Content-Type': 'application/json'})
          })
          .then(response => {
            return response
          });
        }

        const { response, fetchError } = useFetch("/status");

        const { register, formState: { errors }, handleSubmit } = useForm({mode: 'onBlur'});
        const handleRegistration = (data) => {
          console.log(data);
          postData('/addStatus', data)
          .then(res=> console.log(res))
        };
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
                      <h3 className="text-white mb-0">Liste des produits</h3>
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
                    <h3 className="mb-0">Ajouter un produit</h3>
                  </CardHeader>
                  <CardBody>
              <Form onSubmit={handleSubmit(handleRegistration, handleError)}>
                <FormGroup>
                  <label className="form-control-label" htmlFor="example-text-input" > Id </label>
                  <Input name="id"  defaultValue="42" id="example-text-input" type="number" disabled {...register("product_id")} />
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label" htmlFor="example-text-input" > Nom </label>
                  <Input defaultValue="Woodik-7" id="example-text-input" type="text" {...register('name', { required: true, maxLength: 20 })} />
                  {errors.name?.type === 'required' && "Un nom est requis"}
                  {errors.name?.type === 'maxLength' && "Le nom est trop long"}
                </FormGroup>
                <FormGroup>
                  <label className="form-control-label" htmlFor="example-search-input" > Prix </label>
                  <Input defaultValue="87" id="example-search-input" type="number" {...register("price", { required : true, min: 0, max: 1000 })} />
                  {errors.price?.type === 'required' && "Un prix est requis"}
                  {errors.price?.type === 'min' && "Prix positif seulement"}
                  {errors.price?.type === 'max' && "Prix trop important"}

                </FormGroup>
                <FormGroup>
                <label htmlFor="exampleFormControlSelect1">Collection</label>
                <Input id="exampleFormControlSelect1" type="select" {...register("collection_id", { required: true} )}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
                {errors.collection_id?.type === 'required' && "Une collection est requise"}
              </FormGroup>
                <FormGroup>
            <label className="form-control-label" for="exampleFile" >File </label>
            <Input type="file" name="product_picture" id="exampleFile" {...register("img")} />
          </FormGroup>
          <FormGroup>
                <label htmlFor="exampleFormControlSelect1">Performances</label>
                <Input id="exampleFormControlSelect1" type="select" {...register("performance_id", { required: true})}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
                {errors.performance_id?.type === 'required' && "Une performance est requise"}

              </FormGroup>
              <FormGroup>
                <label htmlFor="exampleFormControlSelect1">Packaging</label>
                <Input id="exampleFormControlSelect1" type="select" {...register("packaging_id", { required: true})}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
                {errors.packaging_id?.type === 'required' && "Un packaging est requis"}

              </FormGroup>
              <FormGroup>
                <label htmlFor="exampleFormControlSelect1">Propriétés</label>
                <Input id="exampleFormControlSelect1" type="select" {...register("property_id", { required: true})}>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Input>
                {errors.property_id?.type === 'required' && "Une propriété est requise"}

              </FormGroup>
              <FormGroup>
                  <label className="form-control-label" htmlFor="example-search-input" > Stock </label>
                  <Input defaultValue="rupture" id="example-search-input" type="text" {...register("stock")} />
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

      export default Products;
