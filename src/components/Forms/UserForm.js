import postData from "hooks/postData";
import { useForm } from "react-hook-form";
import { Button, Form, FormGroup, Input } from "reactstrap";
import Cookies from 'js-cookie'
import { useEffect } from "react";

const UserForm = ({preloadValues}) => {

const { register, formState: { errors }, handleSubmit, reset } = useForm();

const handleRegistration = (data) => postData("/addCustomer", data);

const handleError = (errors) => console.log("error", errors);

const defaultValue = {
    user_id : preloadValues[preloadValues.length -1].user_id + 1,
    session_id : 'admin'+ Cookies.get('connect.sid')
}

useEffect(() => {
    if (preloadValues) {
      reset( defaultValue ); //considering values from props
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit(handleRegistration, handleError)}>
      <FormGroup>
        <label className="form-control-label" for="user_id">
          {" "}
          Id{" "}
        </label>
        <Input
          name="user_id"
          defaultValue={defaultValue.user_id}
          id="user_id"
          type="number"
          disabled
          {...register("user_id")}
        />
      </FormGroup>
      <FormGroup>
        <label className="form-control-label" for="session_id">
          {" "}
          Session Id{" "}
        </label>
        <Input
          defaultValue={defaultValue.session_id}
          name="session_id"
          id="c_session_id"
          type="text"
          disabled
          {...register("session_id")}
        />
      </FormGroup>
      <FormGroup>
        <label className="form-control-label" for="c_name">
          {" "}
          Nom{" "}
        </label>
        <Input
          defaultValue="Girard"
          id="c_name"
          type="text"
          {...register("name", { required: true, maxLength: 20 })}
        />
        {errors.name?.type === "required" && "Un nom est requis"}
        {errors.name?.type === "maxLength" && "Le nom est trop long"}
      </FormGroup>
      <FormGroup>
        <label className="form-control-label" for="c_firstname">
          {" "}
          Prénom{" "}
        </label>
        <Input
          defaultValue="Franck"
          id="c_firstname"
          type="text"
          {...register("firstname", { required: true, maxLength: 20 })}
        />
        {errors.name?.type === "required" && "Un prénom est requis"}
        {errors.name?.type === "maxLength" && "Le prénom est trop long"}
      </FormGroup>
      <FormGroup>
        <label className="form-control-label" for="c_address">
          {" "}
          Adresse{" "}
        </label>
        <Input
          defaultValue="1 rue des lilas"
          id="c_address"
          type="text"
          {...register("address", { required: true, maxLength: 150 })}
        />
        {errors.name?.type === "required" && "Une adresse est requise"}
        {errors.name?.type === "maxLength" && "L'adresse est trop longue"}
      </FormGroup>
      <FormGroup>
        <label className="form-control-label" for="c_postal">
          {" "}
          Postal{" "}
        </label>
        <Input
          defaultValue="35423"
          id="c_postal"
          type="text"
          {...register("postal", { required: true, maxLength: 5 })}
        />
        {errors.name?.type === "required" && "Un code postal est requis"}
        {errors.name?.type === "maxLength" && "Le code postal est trop long"}
      </FormGroup>
      <FormGroup>
        <label className="form-control-label" for="c_mail">
          {" "}
          Mail{" "}
        </label>
        <Input
          defaultValue="fanch44@hotmail.com"
          id="c_mail"
          type="text"
          {...register("mail", {
            required: true,
            pattern:
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
          })}
        />
        {errors.name?.type === "required" && "Une adresse mail est requise"}
        {errors.name?.type === "pattern" && "L'adresse mail est erronée"}
      </FormGroup>
      <FormGroup>
        <label className="form-control-label" for="c_city">
          {" "}
          City{" "}
        </label>
        <Input
          defaultValue="Rennes"
          id="c_city"
          type="text"
          {...register("city", { required: true, maxLength: 80 })}
        />
        {errors.name?.type === "required" && "Une ville est requise"}
        {errors.name?.type === "maxLength" && "Le nom de ville est trop long"}
      </FormGroup>
      <FormGroup>
        <label className="form-control-label" for="c_country">
          {" "}
          Pays{" "}
        </label>
        <Input
          defaultValue="Rennes"
          id="c_country"
          type="text"
          {...register("country", { required: true, maxLength: 20 })}
        />
        {errors.name?.type === "required" && "Un pays est requis"}
        {errors.name?.type === "maxLength" && "Le nom de pays est trop long"}
      </FormGroup>

      <Button>Ajouter</Button>
    </Form>
  );
};

export default UserForm;
