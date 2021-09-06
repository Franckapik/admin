// core components
import Header from "components/Headers/Header.js";
import useFetch from "hooks/useFetch";
import React from "react";
// reactstrap components
import { Card, CardHeader, Container, Row, Table } from "reactstrap";

const List = ({data, name}) => {
  return (
    <Row className="mt-5">
    <div className="col">
      <Card className="bg-default shadow">
        <CardHeader className="bg-transparent border-0">
          <h3 className="text-white mb-0"> Les {name}</h3>
        </CardHeader>
        <Table
        className="align-items-center table-dark table-flush"
        responsive
      >
        <thead className="thead-dark">
          <tr>
            {Object.keys(data[0]).map((a,i) => {
              return <th scope="col">{a}</th>
            })}
          </tr>
        </thead>
        <tbody>
        {Array.from(data).map((a,i)=> {
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
      </Card>
    </div>
  </Row>
  )
}

      const Database = () => {

        const {response: customerList } = useFetch("/customer");      
        const {response: productList} = useFetch("/complete_product");
        const {response: collectionList } = useFetch("/collection");
        const {response: propertyList } = useFetch("/property");
        const {response: performanceList } = useFetch("/performance");
        const {response: packagingList } = useFetch("/packaging");
        const {response: invoiceList } = useFetch("/invoice");

        return (
          <>
            <Header />
            {/* Page content */}
            <Container className="mt--7" fluid>
              {/* Dark table */}
              {productList && productList.length && productList.length > 0 ? <List data={productList} name="produits" /> : "Aucun produit"}
              {customerList && customerList.length && customerList.length > 0 ? <List data={customerList} name="clients" /> : "Aucun client"}
              {collectionList && collectionList.length && collectionList.length > 0 ? <List data={collectionList} name="collections" /> : "Aucune collection"}
              {propertyList && propertyList.length && propertyList.length > 0 ? <List data={propertyList} name="propriétés" /> : "Aucune propriété"}
              {performanceList && performanceList.length && performanceList.length > 0 ? <List data={performanceList} name="performances" /> : "Aucune performance"}
              {packagingList && packagingList.length && packagingList.length > 0 ? <List data={packagingList} name="packaging" /> : "Aucun packaging"}
              {invoiceList && invoiceList.length && invoiceList.length > 0 ? <List data={invoiceList} name="factures" /> : "Aucune facture"}
            </Container>
          </>
        );
      };

      export default Database;
