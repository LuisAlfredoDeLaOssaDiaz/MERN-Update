import React, { useState } from "react";
import { Form } from "semantic-ui-react";
import { useFormik } from "formik";
import { initialValues, validationSchema } from "./LoginForm.form";
import "./LoginForm.sass";
import { Auth } from "../../../../api";
import { useAuth } from "../../../../hooks";

const authController = new Auth();

export function LoginForm() {
  const { login } = useAuth();
  const [error, setError] = useState("");

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
        // setError("");
      try {
        const response_ = await authController.login(formValue);
        const { msg: response } = response_;
        
        authController.setAccessToken(response.access)
        authController.setRefreshToken(response.refresh)
        
        login(response.access); 
        setError(response ? "OK" : null);

      } catch (error) {
        setError("Error del servidor.");
      }
    },
  });

  return (
    <Form className="login-form" onSubmit={formik.handleSubmit}>
      <Form.Input
        name="email"
        placeholder="Correo electronico"
        autoFocus
        onChange={formik.handleChange}
        value={formik.values.email}
        error={formik.errors.email}
      />
      <Form.Input
        name="password"
        type="password"
        placeholder="Contraseña"
        onChange={formik.handleChange}
        value={formik.values.password}
        error={formik.errors.email}
      />

      <Form.Button type="submit" primary fluid loading={formik.isSubmitting}>
        Entrar
      </Form.Button>

      <p className="login-form__error">{error}</p>
    </Form>
  );
}
