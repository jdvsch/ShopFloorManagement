import * as yup from "yup";

export const addData = yup
  .object({
    nombre: yup.string().uppercase().required("Debe diligenciar el campo"),
    zona: yup.string().required("Debe eligir una de las opciones"),
  })
  .required();

export const updateData = yup
  .object({
    nombre: yup.string().uppercase().required("Debe diligenciar el campo"),
    zona: yup.string().required("Debe eligir una de las opciones"),
    estado: yup.string().required("Debe eligir una de las opciones"),
  })
  .required();
