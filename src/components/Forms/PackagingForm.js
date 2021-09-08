import { useFormContext } from "react-hook-form";
import { FormGroup, Input, Label } from "reactstrap";

export const PackagingForm = ({ packagingList, errorsForm }) => {

  const { register } = useFormContext();
  return (
    <>
      <FormGroup>
        <label className="form-control-label" htmlFor="example-text-input">
          {" "}
          Id{" "}
        </label>
        <Input
          name="pack_id"
          type="number"
          placeholder={packagingList[packagingList.length - 1].packaging_id + 1}
          disabled
          {...register("packaging.packaging_id")} />
      </FormGroup>
      <FormGroup>
        <Label for="packaging_length">Longueur</Label>
        <Input
          type="number"
          id="packaging_length"
          {...register("packaging.length", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="packaging_width">Largueur</Label>
        <Input
          type="number"
          id="packaging_width"
          {...register("packaging.width", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="packaging_weight">Poids</Label>
        <Input
          type="number"
          id="packaging_weight"
          {...register("packaging.weight", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="packaging_depth">Profondeur</Label>
        <Input
          type="number"
          id="packaging_depth"
          {...register("packaging.depth", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="packaging_price">Prix</Label>
        <Input
          type="number"
          id="packaging_price"
          {...register("packaging.price", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="packaging_unit">Unités</Label>
        <Input
          type="number"
          id="packaging_unit"
          {...register("packaging.unit", { required: true })}
        ></Input>
      </FormGroup>

    </>
  );
};
