  /*!

  =========================================================
  * Argon Dashboard React - v1.2.0
  =========================================================

  * Product Page: https://www.creative-tim.com/product/argon-dashboard-react
  * Copyright 2021 Creative Tim (https://www.creative-tim.com)
  * Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

  * Coded by Creative Tim

  =========================================================

  * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

  */
  import React from "react";

  // reactstrap components
  import {
    Badge,
    Card,
    CardHeader,
    CardFooter,
    DropdownMenu,
    DropdownItem,
    UncontrolledDropdown,
    DropdownToggle,
    Media,
    Pagination,
    PaginationItem,
    PaginationLink,
    Progress,
    Table,
    Container,
    Row,
    UncontrolledTooltip,
  } from "reactstrap";
  // core components
  import Header from "components/Headers/Header.js";
  import useFetch from "hooks/useFetch"


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
        </Container>
      </>
    );
  };

  export default Products;
