import * as yup from "yup";

export const schema = yup.object({
  id:
      yup.number()
      .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value))
      .positive("Solo debes ingresar números positivos")
      .integer("No introduzca punto o coma")
      .typeError("Debe introducir un número de ID"),
  migrationFastness:
      yup.number()
      .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value))
      .positive("Solo debes ingresar números positivos")
      .integer("No introduzca punto o coma")
      .typeError("Debe introducir una cantidad"),
  lightFastness:
      yup.number()
      .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value))
      .positive("Solo debes ingresar números positivos")
      .integer("No introduzca punto o coma")
      .typeError("Debe introducir una cantidad"),
  weatherFastness:
      yup.number()
      .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value))
      .positive("Solo debes ingresar números positivos")
      .integer("No introduzca punto o coma")
      .typeError("Debe introducir una cantidad"),
  temperature:
      yup.number()
      .transform((value, originalValue) => (/\s/.test(originalValue) ? NaN : value))
      .positive("Solo debes ingresar números positivos")
      .integer("No introduzca punto o coma")
      .typeError("Debe introducir una cantidad"),
  norm: yup.string()
      .required("Debe diligenciar el campo"),
type: yup.string()
      .required("Debe diligenciar el campo"),
}).required();
