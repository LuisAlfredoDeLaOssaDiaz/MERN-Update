import * as Yup from "yup";

export function initialValues() {
    return {
        avatar: "",
        fileAvatar: null,
        firstname: "",
        lastname: "",
        email: "",
        role: "",
        password: "",
    };
}

export function validationSchema() {
    return Yup.object({
        firstname: Yup.string().required(true),
        lastname: Yup.string().required(true),
        email: Yup.string().required(true).email(true),
        role: Yup.string().required(true),
        password: Yup.string().required(true)
    });
}