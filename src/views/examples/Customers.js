import UserForm from "components/Forms/UserForm";
import Header from "components/Headers/Header.js";
import useFetch from "hooks/useFetch";
import React from "react";
import { Card, CardBody, CardHeader, Col, Container, Row, Table } from "reactstrap";

      const Customers = () => {
        const {response } = useFetch("/customer");      

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
                  {response && response.length? <UserForm preloadValues = {response} /> : "Aucun client trouvé" } 
              </CardBody>
              </Card>
              </Col>
            </Row>
            </Container>
          </>
        );
      };

      export default Customers;
