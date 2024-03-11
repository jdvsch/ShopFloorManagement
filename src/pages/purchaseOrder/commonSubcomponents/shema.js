import * as yup from "yup";

export const schema = yup
  .object({
    fecha_requerida: yup
      .date()
      .required("Debe diligenciar el campo")
      .typeError("Debe introducir una fecha"),
    monto_requerido: yup
      .number()
      .positive("Solo debes ingresar números positivos")
      .integer("No introduzca punto o coma")
      .typeError("Debe introducir una cantidad"),
    oc_numero: yup.string().required("Debe eligir una de las opciones"),
    pedido: yup
      .number()
      .positive("Solo debes ingresar números positivos")
      .integer("No introduzca punto o coma")
      .typeError("Debe introducir una cantidad"),
    factura: yup.string().notRequired(),
    fecha_despacho: yup.string().notRequired(),
    fecha_fabricacion: yup.string().notRequired(),
    fecha_oc: yup.string().notRequired(),
    fecha_real_entrega: yup.string().notRequired(),
    monto_despachado: yup.string().notRequired(),
    nota: yup.string().notRequired(),
    statename: yup.string().notRequired(),
  })
  .required();
