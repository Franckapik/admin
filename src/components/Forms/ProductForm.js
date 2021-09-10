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
import { setConstantValue } from "typescript";

export default function ProductForm({
  productList,
  collectionList,
  packagingList,
  propertyList,
  performanceList,
}) {

const nextProductId = productList[productList.length - 1].product_id + 1;
const nextCollectionId = collectionList[collectionList.length - 1].collection_id + 1;
const nextPerformanceId = performanceList[performanceList.length - 1].performance_id + 1;
const nextPropertyId = propertyList[propertyList.length - 1].property_id + 1;
const nextPackagingId = packagingList[packagingList.length - 1].packaging_id + 1;

  const methods = useForm({
    defaultValues : {
      product: {
        product_id: nextProductId,
        performance_id: 1,
        name: "Woodik-7",
        price: 88,
        img: "src",
        stock: "disponible",
        collection_id: 1,
        packaging_id: 1,
        property_id: 1,
        product_publish: false, //on ou off
      },
      collection: {
        collection_id: nextCollectionId,
        col_name: "Nouvelle collection",
        desc: "Description de la collection",
        folder: "nouvelleCollection",
      },
      performance: {
        performance_id: nextPerformanceId,
        desc: "Description des performances",
        freq_min: "1040",
        freq_max: "2048",
        spectre: "1040-2048 Hz",
      },
      property: {
        property_id: nextPropertyId,
        depth: 100,
        length: 500,
        weight: 2,
        width: 500,
        width_cel: 68,
        area: 4,
        part_nb: 64,
        cel_nb: 49,
        paint: false,
        wood: "peuplier",
        finish: "vernis",
      },
      packaging: {
        packaging_id: nextPackagingId,
        length: 500,
        width: 600,
        weight: 4,
        depth: 500,
        price: 3,
        unit: 1,
      }
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
    <FormProvider {...methods}>
      <Form onSubmit={methods.handleSubmit(handleRegistration, handleError)}>
      <FormGroup>
        <Label for="prod_ident">Identifiant produit</Label>
        <Input
          name="prod_id"
          id="prod_ident"
          type="text"
          placeholder={nextProductId}
          disabled
        >
        </Input>
      </FormGroup>
        <FormGroup>
          <Label for="product_name">Nom</Label>
          <Input
            name="p_name"
            id="product_name"
            placeholder="Woodik-7"
            {...register("product.name", { required: true, maxLength: 20 })}
          />
          {errorsForm && errorsForm.product &&
            errorsForm.product.name?.type === "required" &&
            "Un nom est requis"}
          {errorsForm && errorsForm.product &&
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
          {errorsForm && errorsForm.product &&
            errorsForm.product.price?.type === "required" &&
            "Un prix est requis"}
          {errorsForm && errorsForm.product &&
            errorsForm.product.price?.type === "min" &&
            "Prix positif seulement"}
          {errorsForm && errorsForm.product &&
            errorsForm.product.price?.type === "max" &&
            "Prix trop important"}
        </FormGroup>

        <FormGroup  style={{
            display: !newCollection ? "block" : "none" // toggle the visbility of an input
          }} >
            <Label for="collection_id">Collection</Label>
            <InputGroup>
              <Input
                type="select"
                {...register("product.collection_id", { required: true })}
                onChange={(e) => console.log(e.target.value)}
              >
                <option disabled selected value> {" "} -- Choisir une collection --{" "} </option>
                {Array.from(collectionList).map((a, i) => {
                  return <option value={a.collection_id}>{a.col_name}</option>;
                })}
                <option value={true}>nouvelle collection</option>
              </Input>
              <InputGroupAddon addonType="append">
                <Button onClick={addCollection}>Ajouter</Button>
              </InputGroupAddon>
            </InputGroup>
            {errorsForm && errorsForm.product &&
              errorsForm.product.collection_id?.type === "required" &&
              "Une collection est requise"}
          </FormGroup>
              {newCollection ? 
          <Card color="info">
            <CardTitle>
              Nouvelle Collection |{" "}
              <small onClick={addCollection}>Collection Existante</small>
            </CardTitle>
            <CardBody>
              <CollectionForm
                nextId ={nextCollectionId}
                errorsForm={errorsForm}
              />
            </CardBody>
          </Card>
: null }


        <FormGroup>
          <Label for="product_img">Image</Label>
          <Input
            type="file"
            name="p_img"
            id="product_img"
            {...register("product.img")}
          />
        </FormGroup>

        {newPerformance ? (
          <Card color="info">
            <CardTitle>
              Nouvelle Performance |{" "}
              <small onClick={addPerformance}>Performance Existante</small>
            </CardTitle>
            <CardBody>
              <PerformanceForm
                nextId ={nextPerformanceId}
                errorsForm={errorsForm}
                register={register}
              />
            </CardBody>
          </Card>
        ) : (
          <FormGroup>
            <Label for="product_perf">Performance</Label>
            <InputGroup>
              <Input
                type="select"
                name="product.performance_id"
                id="product_perf"
                {...register("product.performance_id", { required: true })}
              >
                <option disabled selected value>
                  {" "}
                  -- Choisir une performance --{" "}
                </option>

                {Array.from(performanceList).map((a, i) => {
                  return <option value={a.performance_id}>{a.spectre}</option>;
                })}
              </Input>
              <InputGroupAddon addonType="append">
                <Button onClick={addPerformance}>Ajouter</Button>
              </InputGroupAddon>
            </InputGroup>
            {errorsForm && errorsForm.product &&
              errorsForm.product.performance_id?.type === "required" &&
              "Une performance est requise"}
          </FormGroup>
        )}

        {newPackaging ? (
          <Card color="info">
            <CardTitle>
              Nouveau Packaging |{" "}
              <small onClick={addPackaging}>Packaging Existant</small>
            </CardTitle>
            <CardBody>
              <PackagingForm
               nextId ={nextPackagingId}
                errorsForm={errorsForm}
                register={register}
              />
            </CardBody>
          </Card>
        ) : (
          <FormGroup>
            <Label for="product_pack">Packaging</Label>
            <InputGroup>
              <Input
                type="select"
                name="p_pack"
                id="product_pack"
                {...register("product.packaging_id", { required: true })}
              >
                <option disabled selected value>
                  {" "}
                  -- Choisir un packaging --{" "}
                </option>

                {Array.from(packagingList).map((a, i) => {
                  return <option value={a.packaging_id}>{a.reference}</option>;
                })}
              </Input>
              <InputGroupAddon addonType="append">
                <Button onClick={addPackaging}>Ajouter</Button>
              </InputGroupAddon>
            </InputGroup>
            {errorsForm && errorsForm.product &&
              errorsForm.product.packaging_id?.type === "required" &&
              "Un packaging est requis"}
          </FormGroup>
        )}

        {newProperty ? (
          <Card color="info">
            <CardTitle>
              Nouvelle Propriété |{" "}
              <small onClick={addProperty}>Propriété Existante</small>
            </CardTitle>
            <CardBody>
              <PropertyForm
                nextId ={nextPropertyId}
                errorsForm={errorsForm}
                register={register}
              />
            </CardBody>
          </Card>
        ) : (
          <FormGroup>
            <Label for="product_prop">Propriétés</Label>
            <InputGroup>
              <Input
                type="select"
                name="p_prop"
                id="product_prop"
                {...register("product.property_id", { required: true })}
              >
                <option disabled selected value>
                  {" "}
                  -- Choisir une propriété --{" "}
                </option>

                {Array.from(propertyList).map((a, i) => {
                  return <option value={a.property_id}>{a.type}</option>;
                })}
              </Input>
              <InputGroupAddon addonType="append">
                <Button onClick={addProperty}>Ajouter</Button>
              </InputGroupAddon>
            </InputGroup>
            {errorsForm && errorsForm.product &&
              errorsForm.product.property_id?.type === "required" &&
              "Une propriété est requise"}
          </FormGroup>
        )}

        <FormGroup>
          <Label for="product_stock">Stock</Label>
          <Input
            name="p_stock"
            type="select"
            id="product_stock"
            {...register("product.stock")}
          >
            <option disabled selected value>
              {" "}
              -- Choisir une disponibilité --{" "}
            </option>
            <option>Disponible</option>
            <option>En cours de fabrication</option>
            <option>En rupture de stock</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="product_publish">Publication</Label>
          <CustomInput
            type="switch"
            name="p_publish"
            id="product_publish"
            {...register("product.product_publish")}
          />
        </FormGroup>
        <Button>Ajouter</Button>
      </Form>
    </FormProvider>
  );
}
