import postData from "hooks/postData";
import { FormProvider, useForm, useFormContext } from "react-hook-form";
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
  });
  
  const register = methods.register;
 
  const [errorsForm, setErrors] = useState();

  const handleRegistration = (data) => postData("/addProduct", data);

  const handleError = (errors) => {
    console.log(errors);
    setErrors(errors);
  };

  const [newCollection, addCollection] = useToggle();

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
      <FormGroup>
        <Label for="product_perf">Performance</Label>
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
        {errorsForm &&
          errorsForm.product.performance_id?.type === "required" &&
          "Une performance est requise"}
      </FormGroup>
      <FormGroup>
        <Label for="product_pack">Packaging</Label>
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
        {errorsForm &&
          errorsForm.product.packaging_id?.type === "required" &&
          "Un packaging est requis"}
      </FormGroup>
      <FormGroup>
        <Label for="product_prop">Propriétés</Label>
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
        {errorsForm &&
          errorsForm.product.property_id?.type === "required" &&
          "Une propriété est requise"}
      </FormGroup>
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

const CollectionForm = ({ collectionList, errorsForm }) => {

  const { register } = useFormContext();
  return (
    <>
      <FormGroup>
        <label className="form-control-label" htmlFor="example-text-input">
          {" "}
          Id{" "}
        </label>
        <Input
          name="col_id"
          id="example-text-input"
          type="number"
          placeholder={
            collectionList[collectionList.length - 1].collection_id + 1
          }
          disabled
          {...register("collection_id")}
        />
      </FormGroup>
      <FormGroup>
        <Label for="collection_name">Nom</Label>
        <Input
          name="c_name"
          id="collection_name"
          {...register("collection.col_name", { required: true })}
        ></Input>
        {errorsForm &&
          errorsForm.collection.col_name?.type === "required" &&
          "Un nom est requis"}
        {errorsForm &&
          errorsForm.collection.col_name?.type === "maxLength" &&
          "Le nom est trop long"}
      </FormGroup>
      <FormGroup>
        <Label for="collection_desc">Description</Label>
        <Input
          name="c_desc"
          id="collection_desc"
          rows="3"
          {...register("collection.desc")}
        />
      </FormGroup>
      <FormGroup>
        <Label for="collection_folder">Nom de dossier</Label>

        <Input
          name="c_folder"
          id="collection_folder"
          type="text"
          {...register("collection.folder")}
        />
      </FormGroup>
    </>
  );
};
