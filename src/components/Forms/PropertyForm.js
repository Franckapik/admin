import { useFormContext } from "react-hook-form";
import { FormGroup, Input, Label } from "reactstrap";

export const PropertyForm = ({ propertyList, errorsForm }) => {

  const { register } = useFormContext();
  return (
    <>
      <FormGroup>
        <label className="form-control-label" htmlFor="prop_id">
          {" "}
          Id{" "}
        </label>
        <Input
          name="prop_i"
          id="prop_id"
          type="number"
          placeholder={propertyList[propertyList.length - 1].property_id + 1}
          disabled
          {...register("property.property_id")} />
      </FormGroup>
      <FormGroup>
        <Label for="property_depth">Profondeur</Label>
        <Input
          type="number"
          id="property_depth"
          {...register("property.depth", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="property_length">Longueur</Label>
        <Input
          type="number"
          id="property_length"
          {...register("property.length", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="property_weight">Poids</Label>
        <Input
          type="number"
          id="property_weight"
          {...register("property.weight", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="property_width">Largeur</Label>
        <Input
          type="number"
          id="property_width"
          {...register("property.width", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="property_width_cel">Largeur des cellules</Label>
        <Input
          type="number"
          id="property_width_cel"
          {...register("property.width_cel", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="property_area">Aire</Label>
        <Input
          type="number"
          id="property_area"
          {...register("property.area", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="property_part_nb">Nombre de pièces</Label>
        <Input
          type="number"
          id="property_part_nb"
          {...register("property.part_nb", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="property_cel_nb">Nombre de cellules</Label>
        <Input
          type="number"
          id="property_cel_nb"
          {...register("property.cel_nb", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="property_paint">Peinture ?</Label>
        <Input
          type="number"
          id="property_paint"
          {...register("property.paint", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="property_wood">Matière</Label>
        <Input
          type="number"
          id="property_wood"
          {...register("property.wood", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="property_finish">Finition</Label>
        <Input
          type="number"
          id="property_finish"
          {...register("property.finish", { required: true })}
        ></Input>
      </FormGroup>

    </>
  );
};
