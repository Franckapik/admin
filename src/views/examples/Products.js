  // core components
import Header from "components/Headers/Header.js";
import useFetch from "hooks/useFetch";
import React from "react";
// reactstrap components
import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row, Table } from "reactstrap";

  const Products = () => {

    const { response, errors } = useFetch("/db/1");

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
                <Table
                  className="align-items-center table-dark table-flush"
                  responsive
                >
                  <thead className="thead-dark">
                    <tr>
                      {response ? Object.keys(response[0]).map((a,i) => {
                        return <th scope="col">{a}</th>
                      }) : "non"}
                    </tr>
                  </thead>
                  <tbody>
                  {response ? Array.from(response).map((a,i)=> {
                    return (<tr>
                        { Object.keys(a).map((b, c) => {
                              return(                          
                                <td>{a[b]}</td>
                              )
                            })}
                      </tr>);
                  }) : "non"}
                  </tbody>
                </Table>
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
          <Form>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="example-text-input"
              >
                Id 
              </label>
              <Input
                defaultValue="42"
                id="example-text-input"
                type="text"
                disabled
              />
            </FormGroup>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="example-text-input"
              >
                Nom 
              </label>
              <Input
                defaultValue="Woodik-7"
                id="example-text-input"
                type="text"
              />
            </FormGroup>
            <FormGroup>
              <label
                className="form-control-label"
                htmlFor="example-search-input"
              >
                Prix
              </label>
              <Input
                defaultValue="87 €"
                id="example-search-input"
                type="search"
              />
            </FormGroup>
            <FormGroup>
            <label htmlFor="exampleFormControlSelect1">Collection</label>
            <Input id="exampleFormControlSelect1" type="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
            <FormGroup>
        <label 
        className="form-control-label"
        for="exampleFile"
        >File
        </label>
        <Input type="file" name="file" id="exampleFile" />

      </FormGroup>
      <FormGroup>
            <label htmlFor="exampleFormControlSelect1">Performances</label>
            <Input id="exampleFormControlSelect1" type="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <label htmlFor="exampleFormControlSelect1">Packaging</label>
            <Input id="exampleFormControlSelect1" type="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
            <label htmlFor="exampleFormControlSelect1">Propriétés</label>
            <Input id="exampleFormControlSelect1" type="select">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
            </Input>
          </FormGroup>
          <FormGroup>
              <label
                className="form-control-label"
                htmlFor="example-search-input"
              >
                Stock
              </label>
              <Input
                defaultValue="rupture"
                id="example-search-input"
                type="search"
              />
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
