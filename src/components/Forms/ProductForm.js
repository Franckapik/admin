import postData from "hooks/postData";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, Input } from "reactstrap";
import Cookies from 'js-cookie'
import { useEffect } from "react";

const ProductForm = ({productList, collectionList, packagingList, propertyList, performanceList}) => {

const { register, formState: { errors }, handleSubmit, reset } = useForm();

const handleRegistration = (data) => postData("/addProduct", data);

const handleError = (errors) => console.log("error", errors);

const defaultValue = {
    product_id : productList[productList.length -1].product_id + 1,
}


useEffect(() => {
    if (productList) {
      reset( defaultValue ); //considering values from props
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit(handleRegistration, handleError)}>
                <FormGroup>
                  <label className="form-control-label" htmlFor="example-text-input" > Id </label>
                  <Input name="id" defaultValue={defaultValue.product_id} id="example-text-input" type="number" disabled {...register("product_id")} />
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
              {Array.from(collectionList).map((a,i) => {
                    return <option value={a.collection_id}>{a.name}</option>
                  })} 
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
                {Array.from(performanceList).map((a,i) => {
                    return <option value={a.performance_id}>{a.spectre}</option>
                  })} 
                </Input>
                {errors.performance_id?.type === 'required' && "Une performance est requise"}

              </FormGroup>
              <FormGroup>
                <label htmlFor="exampleFormControlSelect1">Packaging</label>
                <Input id="exampleFormControlSelect1" type="select" {...register("packaging_id", { required: true})}>
                {Array.from(packagingList).map((a,i) => {
                    return <option value={a.packaging_id}>{a.reference}</option>
                  })} 
                </Input>
                {errors.packaging_id?.type === 'required' && "Un packaging est requis"}

              </FormGroup>
              <FormGroup>
                <label htmlFor="exampleFormControlSelect1">Propriétés</label>
                <Input id="exampleFormControlSelect1" type="select" {...register("property_id", { required: true})}>
                {Array.from(propertyList).map((a,i) => {
                    return <option value={a.property_id} >{a.type}</option>
                  })} 
                </Input>
                {errors.property_id?.type === 'required' && "Une propriété est requise"}

              </FormGroup>
              <FormGroup>
                  <label className="form-control-label" htmlFor="example-search-input" > Stock </label>
                  <Input defaultValue="disponible" id="example-search-input" type="text" {...register("stock")} />
                </FormGroup>
                <Button>Ajouter</Button>
              </Form>
  );
};

export default ProductForm;
