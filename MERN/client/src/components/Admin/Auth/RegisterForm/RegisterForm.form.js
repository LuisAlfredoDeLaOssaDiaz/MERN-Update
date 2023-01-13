import * as Yup from "yup";

export function initialValues() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
    conditionsAccepted: false,
  };
}

export function validationSchema() {
  return Yup.object({
    email: Yup.string()
      .email("Email no es valido")
      .required("Campo obligatorio."),
    password: Yup.string().required("Campo obligatorio"),
    repeatPassword: Yup.string()
      .required("Campo obligatorio")
      .oneOf([Yup.ref("password")], "Las contraseñas deben ser iguales"),
      conditionsAccepted: Yup.bool().isTrue(true)
  });
}
