import { useFormContext } from "react-hook-form";
import { FormGroup, Input, Label } from "reactstrap";

export const CollectionForm = ({ collectionList, errorsForm }) => {

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
          placeholder={collectionList[collectionList.length - 1].collection_id + 1}
          disabled
          {...register("collection.collection_id")} />
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
          {...register("collection.desc")} />
      </FormGroup>
      <FormGroup>
        <Label for="collection_folder">Nom de dossier</Label>

        <Input
          name="c_folder"
          id="collection_folder"
          type="text"
          {...register("collection.folder")} />
      </FormGroup>
    </>
  );
};
