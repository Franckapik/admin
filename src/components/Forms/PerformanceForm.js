import { useFormContext } from "react-hook-form";
import { FormGroup, Input, Label } from "reactstrap";

export const PerformanceForm = ({ performanceList, errorsForm }) => {

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
          placeholder={performanceList[performanceList.length - 1].performance_id + 1}
          disabled
          {...register("performance.performance_id")} />
      </FormGroup>
      <FormGroup>
        <Label for="performance_desc">Description</Label>
        <Input
          type="text"
          id="performance_desc"
          {...register("performance.desc", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="performance_freq_min">Frequence minimum</Label>
        <Input
          type="number"
          id="performance_freq_min"
          {...register("performance.freq_min", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="performance_freq_max">Frequence maximum</Label>
        <Input
          type="number"
          id="performance_freq_max"
          {...register("performance.freq_max", { required: true })}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label for="performance_spectre">Profondeur</Label>
        <Input
          type="number"
          id="performance_spectre"
          {...register("performance.spectre", { required: true })}
        ></Input>
      </FormGroup>
      

    </>
  );
};
