import * as yup from 'yup';

export const schema = yup.object({
  username: yup.string()
    .required("Debe escribir tu usuario"),
  password: yup.string()
    .required("Debe escribir tu clave")
}).required();