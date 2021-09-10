import { useFormContext } from "react-hook-form";
import { FormGroup, Input, Label } from "reactstrap";

export const PerformanceForm = ({ nextId, errorsForm }) => {

  const { register } = useFormContext();
  return (
    <>
      <FormGroup>
        <Label for="perf_ident">Identifiant Performance</Label>
        <Input
          name="perf_id_id"
          id="perf_ident"
          type="text"
          placeholder={nextId}
          disabled
        >
        </Input>
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
