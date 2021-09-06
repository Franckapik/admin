      // core components
    import ProductForm from "components/Forms/ProductForm";
import ProductHeader from "components/Headers/ProductHeader.js";
import useFetch from "hooks/useFetch";
import React from "react";
// reactstrap components
import { Card, CardBody, CardHeader, Col, Container, Row, Table } from "reactstrap";
      const Products = () => {

        const {response: productList} = useFetch("/complete_product");
        const {response: collectionList } = useFetch("/collection");
        const {response: propertyList } = useFetch("/property");
        const {response: performanceList } = useFetch("/performance");
        const {response: packagingList } = useFetch("/packaging");

        return (
          <>
            {productList && collectionList && productList.length && collectionList.length && productList.length > 0 && collectionList.length > 0 ?
            <ProductHeader products={productList} collections={collectionList} /> : "Aucun Produit" }
            
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
                      <th scope="col">Id</th>
                      <th scope="col">Nom</th>
                      <th scope="col">Collection</th>
                      <th scope="col">Prix</th>
                      <th scope="col">Dimensions</th>
                      <th scope="col">Spectre</th>
                      <th scope="col">Type</th>
                      <th scope="col">Matière</th>
                      </tr>
                    </thead>
                    <tbody>
                    {Array.from(productList).map((a,i)=> {
                      return (<tr>
                              <td>{a.product_id}</td>
                              <td>{a.name}</td>
                              <td>{a.col_name}</td>
                              <td>{a.price} €</td>
                              <td>{a.width}x{a.lenght}x{a.depth}</td>
                              <td>{a.spectre} Hz</td>
                              <td>{a.type}</td>
                              <td>{a.wood}</td>

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
                  : "Aucun produit trouvé" } 
              </CardBody>
              </Card>
              </Col>
            </Row>
            </Container>
          </>
        );
      };

      export default Products;
