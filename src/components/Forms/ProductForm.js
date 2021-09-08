import postData from "hooks/postData";
import { FormProvider, useForm } from "react-hook-form";
import {
  Button,
  Card,
  CardBody,
  CardTitle,
  CustomInput,
  Form,
  FormFeedback,
  FormGroup,
  FormText,
  Input,
  InputGroup,
  InputGroupAddon,
  Label,
} from "reactstrap";
import { useEffect, useState } from "react";
import useToggle from "hooks/useToggle";
import { CollectionForm } from "./CollectionForm";
import { PerformanceForm } from "./PerformanceForm";
import { PackagingForm } from "./PackagingForm";
import { PropertyForm } from "./PropertyForm";

export default function ProductForm({
  productList,
  collectionList,
  packagingList,
  propertyList,
  performanceList,
}) {

  const methods = useForm({
    product: {
      product_id: productList[productList.length - 1].product_id + 1,
      performance_id: 1,
      name: "Woodik-7",
      price: 88,
      img: "src",
      stock: "disponible",
      collection_id: 1,
      packaging_id: 1,
      property_id: 1,
      product_publish: false,
    },
    collection: {
      collection_id:
        collectionList[collectionList.length - 1].collection_id + 1,
      col_name: "Nouvelle collection",
      desc: "Description de la collection",
      folder: "nouvelleCollection",
    },
    performance : {
      performance_id:         performanceList[performanceList.length - 1].performance_id + 1,
      desc : "Description des performances",
      freq_min : "1040",
      freq_max : "2048",
      spectre : "1040-2048 Hz"
    },
    property : {
      property_id : propertyList[propertyList.length - 1].property_id + 1,
      depth : 100,
      length : 500,
      weight : 2,
      width : 500,
      width_cel : 68,
      area : 4,
      part_nb : 64,
      cel_nb : 49,
      paint : false,
      wood : "peuplier",
      finish : "vernis"
    },
    packaging : {
      packaging_id : packagingList[packagingList.length - 1].packaging_id + 1,
      length: 500,
      width: 600,
      weight : 4,
      depth: 500,
      price: 3,
      unit : 1
    }
  });
  
  const register = methods.register;
 
  const [errorsForm, setErrors] = useState();

  const handleRegistration = (data) => postData("/addProduct", data);

  const handleError = (errors) => {
    console.log(errors);
    setErrors(errors);
  };

  const [newCollection, addCollection] = useToggle();
  const [newPerformance, addPerformance] = useToggle();
  const [newPackaging, addPackaging] = useToggle();
  const [newProperty, addProperty] = useToggle();

  return (
    <FormProvider {...methods} >
    <Form onSubmit={methods.handleSubmit(handleRegistration, handleError)}>
      <FormGroup>
        <Label for="product_id">Identifiant produit</Label>
        <Input
          name="p_id"
          id="product_id"
          placeholder={productList[productList.length - 1].product_id + 1}
          {...register("product.product_id")}
          disabled
        />
      </FormGroup>
      <FormGroup>
        <Label for="product_name">Nom</Label>
        <Input
          name="p_name"
          id="product_name"
          placeholder="Woodik-7"
          {...register("product.name", { required: true, maxLength: 20 })}
        />
        {errorsForm &&
          errorsForm.product.name?.type === "required" &&
          "Un nom est requis"}
        {errorsForm &&
          errorsForm.product.name?.type === "maxLength" &&
          "Le nom est trop long"}
      </FormGroup>
      <FormGroup>
        <Label for="product_price">Prix</Label>
        <Input
          type="number"
          name="p_price"
          id="product_price"
          placeholder="88"
          {...register("product.price", {
            required: true,
            min: 0,
            max: 1000,
          })}
        />
        {errorsForm &&
          errorsForm.product.price?.type === "required" &&
          "Un prix est requis"}
        {errorsForm &&
          errorsForm.product.price?.type === "min" &&
          "Prix positif seulement"}
        {errorsForm &&
          errorsForm.product.price?.type === "max" &&
          "Prix trop important"}
      </FormGroup>

      {/* switch to new collection */}
      {newCollection ? (
        <Card color="info">
          <CardTitle>
            Nouvelle Collection |{" "}
            <small onClick={addCollection}>Collection Existante</small>
          </CardTitle>
          <CardBody>
            <CollectionForm
              collectionList={collectionList}
              errorsForm={errorsForm}
              register={register}
            />
          </CardBody>
        </Card>
      ) : (
        <FormGroup>
          <Label for="collection_id">Collection</Label>
          <InputGroup>
            <Input
              name="c_id"
              type="select"
              id="collection_id"
              {...register("product.collection_id", { required: true })}
            >
              {Array.from(collectionList).map((a, i) => {
                return <option value={a.collection_id}>{a.col_name}</option>;
              })}
            </Input>
            <InputGroupAddon addonType="append">
              <Button onClick={addCollection}>Ajouter</Button>
            </InputGroupAddon>
          </InputGroup>
          {errorsForm &&
            errorsForm.product.collection_id?.type === "required" &&
            "Une collection est requise"}
        </FormGroup>
      )}
      <FormGroup>
        <Label for="product_img">Image</Label>
        <Input
          type="file"
          name="p_img"
          id="product_img"
          {...register("product.img")}
        />
      </FormGroup>

      {newPerformance ? 
        <Card color="info">
          <CardTitle>
            Nouvelle Performance |{" "}
            <small onClick={addPerformance}>Performance Existante</small>
          </CardTitle>
          <CardBody>
            <PerformanceForm
              performanceList={performanceList}
              errorsForm={errorsForm}
              register={register}
            />
          </CardBody>
        </Card>
       : 
      <FormGroup>
        <Label for="product_perf">Performance</Label>
        <InputGroup>
        <Input
          type="select"
          name="p_perf"
          id="product_perf"
          {...register("product.performance_id", { required: true })}
        >
          {Array.from(performanceList).map((a, i) => {
            return <option value={a.performance_id}>{a.spectre}</option>;
          })}
        </Input>
        <InputGroupAddon addonType="append">
              <Button onClick={addPerformance}>Ajouter</Button>
            </InputGroupAddon>
          </InputGroup>
        {errorsForm &&
          errorsForm.product.performance_id?.type === "required" &&
          "Une performance est requise"}
      </FormGroup> }

      {newPackaging ? 
        <Card color="info">
          <CardTitle>
            Nouveau Packaging |{" "}
            <small onClick={addPackaging}>Packaging Existant</small>
          </CardTitle>
          <CardBody>
            <PackagingForm
              packagingList={packagingList}
              errorsForm={errorsForm}
              register={register}
            />
          </CardBody>
        </Card>
       : 
      <FormGroup>
        <Label for="product_pack">Packaging</Label>
        <InputGroup>
        <Input
          type="select"
          name="p_pack"
          id="product_pack"
          {...register("product.packaging_id", { required: true })}
        >
          {Array.from(packagingList).map((a, i) => {
            return <option value={a.packaging_id}>{a.reference}</option>;
          })}
        </Input>
        <InputGroupAddon addonType="append">
              <Button onClick={addPackaging}>Ajouter</Button>
            </InputGroupAddon>
          </InputGroup>
        {errorsForm &&
          errorsForm.product.packaging_id?.type === "required" &&
          "Un packaging est requis"}
      </FormGroup> }

      {newProperty ? 
        <Card color="info">
          <CardTitle>
            Nouvelle Propriété |{" "}
            <small onClick={addProperty}>Propriété Existante</small>
          </CardTitle>
          <CardBody>
            <PropertyForm
              propertyList={propertyList}
              errorsForm={errorsForm}
              register={register}
            />
          </CardBody>
        </Card>
       : 
      <FormGroup>
        <Label for="product_prop">Propriétés</Label>
        <InputGroup>
        <Input
          type="select"
          name="p_prop"
          id="product_prop"
          {...register("product.property_id", { required: true })}
        >
          {Array.from(propertyList).map((a, i) => {
            return <option value={a.property_id}>{a.type}</option>;
          })}
        </Input>
        <InputGroupAddon addonType="append">
              <Button onClick={addProperty}>Ajouter</Button>
            </InputGroupAddon>
          </InputGroup>
        {errorsForm &&
          errorsForm.product.property_id?.type === "required" &&
          "Une propriété est requise"}
      </FormGroup> }

      <FormGroup>
        <Label for="product_stock">Stock</Label>
        <Input
          name="p_stock"
          id="product_stock"
          {...register("product.stock")}
        />
      </FormGroup>
      <FormGroup>
        <Label for="product_publish">Publication</Label>
        <CustomInput
          type="switch"
          name="p_publish"
          id="product_publish"
          {...register("product.publish")}
        />
      </FormGroup>
      <Button>Ajouter</Button>
    </Form>
    </FormProvider>
  );
}


