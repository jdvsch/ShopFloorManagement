import * as yup from 'yup';

export const schema = yup.object({
    fecha_requerida: 
        yup.date()
        .required("Debe diligenciar el campo")
        .typeError("Debe introducir una fecha"),
    monto_requerido: 
        yup.number()
        .positive("Solo debes ingresar números positivos")
        .integer("No introduzca punto o coma")
        .typeError("Debe introducir una cantidad"),
    oc_numero: 
        yup.string()
        .required("Debe eligir una de las opciones"),
    pedido: 
        yup.number()
        .positive("Solo debes ingresar números positivos")
        .integer("No introduzca punto o coma")
        .typeError("Debe introducir una cantidad"),
  }).required();