import { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { FormGroup, Input, Label } from "reactstrap";

export const CollectionForm = ({ nextId, errorsForm }) => {
  const { register, setValue, unregister, reset } = useFormContext();

  useEffect(() => {

     setValue('collection.collection_id', nextId)
     setValue('product.collection_id', nextId)

     return () => {
      unregister("collection");
      unregister("product.collection_id");
    }
    
   }, [])
   

  return (
    <>
      <FormGroup>
        <Label for="collection_name">Identifiant Collection</Label>
        <Input
          name="col_id"
          id="collection_name"
          type="text"
          placeholder={nextId}
          
        >
        </Input>
      </FormGroup>
      <FormGroup>
        <Label for="collection_name">Nom</Label>
        <Input
          name="c_name"
          id="collection_name"
          {...register("collection.col_name", { required: true })}
        ></Input>
        {errorsForm && errorsForm.collection &&
          errorsForm.collection.col_name?.type === "required" &&
          "Un nom est requis"}
        {errorsForm && errorsForm.collection &&
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
