      // core components
    import Header from "components/Headers/Header.js";
    import useFetch from "hooks/useFetch";
    import React from "react";
    // reactstrap components
    import { Button, Card, CardBody, CardHeader, Col, Container, Form, FormGroup, Input, Row, Table } from "reactstrap";
    import { useForm } from "react-hook-form";
import ProductForm from "components/Forms/ProductForm";
      const Products = () => {

        const {response: productList} = useFetch("/complete_product");
        const {response: collectionList } = useFetch("/collection");
        const {response: propertyList } = useFetch("/property");
        const {response: performanceList } = useFetch("/performance");
        const {response: packagingList } = useFetch("/packaging");

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
                    {productList && productList.length && productList.length > 0 ?
                    <Table
                    className="align-items-center table-dark table-flush"
                    responsive
                  >
                    <thead className="thead-dark">
                      <tr>
                        {Object.keys(productList[0]).map((a,i) => {
                          return <th scope="col">{a}</th>
                        })}
                      </tr>
                    </thead>
                    <tbody>
                    {Array.from(productList).map((a,i)=> {
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
                  {productList && collectionList && propertyList && packagingList && performanceList ? 
                  <ProductForm productList={productList} 
                  collectionList={collectionList} 
                  packagingList={packagingList} 
                  performanceList={performanceList} 
                  propertyList={propertyList} /> 
                  : "Loading..." } 
              </CardBody>
              </Card>
              </Col>
            </Row>
            </Container>
          </>
        );
      };

      export default Products;
