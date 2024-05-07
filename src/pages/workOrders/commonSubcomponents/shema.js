import * as yup from "yup";

export const NewAjust = yup
  .object({
    checkboxGroupTipo: yup
      .boolean()
      .when(["solo_cotizacion", "revision_precio", "cotizacion_muestra"], {
        is: false,
        then: (schema) => schema.required("Debe escoger al menos una opción"),
      })
      .when(["solo_cotizacion", "revision_precio"], {
        is: true,
        then: (schema) => schema.required("Sólo puede escoger uno a la vez"),
      })
      .when(["solo_cotizacion", "cotizacion_muestra"], {
        is: true,
        then: (schema) => schema.required("Sólo puede escoger uno a la vez"),
      })
      .when(["cotizacion_muestra", "revision_precio"], {
        is: true,
        then: (schema) => schema.required("Sólo puede escoger uno a la vez"),
      }),
    cant_muestra: yup.number().when("solo_cotizacion", {
      is: false, // alternatively: (val) => val == true
      then: (schema) =>
        schema
          .min(0, "El mínimo valor el cero")
          .integer("No introduzca punto o coma")
          .transform((value, originalValue) =>
            /\s/.test(originalValue) ? NaN : value
          )
          .typeError("Debe introducir una cantidad"),
      otherwise: (schema) => schema.optional(),
    }),
    id_producttype: yup.string().required("Debe diligenciar el campo"),
    descripcion: yup.string().required("Debe diligenciar el campo"),
    checkboxGroupProceso: yup
      .boolean()
      .when(
        ["inyeccion", "extrusion", "soplado", "rotomoldeo", "termoformado"],
        {
          is: false, // alternatively: (inyeccion, extrusion) => isBig && isSpecial
          then: (schema) => schema.required("Debe escoger al menos una opción"),
        }
      ),
    f_requerida: yup
      .date()
      .min(
        new Date() + 1,
        "La fecha no puede ser igual o inferior a la fecha actual"
      )
      .required("Debe diligenciar el campo"),
    temp_max: yup
      .number()
      .positive("Solo debes ingresar números positivos")
      .integer("No introduzca punto o coma")
      .transform((value, originalValue) =>
        /\s/.test(originalValue) ? NaN : value
      )
      .typeError("Debe introducir una cantidad"),
    tiempo_ciclo: yup
      .number()
      .integer("No introduzca punto o coma")
      .transform((value, originalValue) =>
        /\s/.test(originalValue) ? NaN : value
      )
      .typeError("Debe introducir una cantidad"),
    dosificacion_cliente: yup
      .number()
      .integer("No introduzca punto o coma")
      .transform((value, originalValue) =>
        /\s/.test(originalValue) ? NaN : value
      )
      .typeError("Debe introducir una cantidad"),
    resina_aplicacion: yup.string().required("Debe diligenciar el campo"),
    aplicacion_producto: yup.string().required("Debe diligenciar el campo"),
    otra_especificacion: yup.string().required("Debe diligenciar el campo"),
    id_normative: yup.string().required("Debe diligenciar el campo"),
    otra: yup.string().when("id_normative", {
      is: "1", // alternatively: (val) => val == true
      then: (schema) => schema.required("Debe diligenciar el campo"),
      otherwise: (schema) =>
        schema.transform((currentValue) => (currentValue = "")),
    }),
    estimacion_cosumo: yup
      .number()
      .integer("No introduzca punto o coma")
      .transform((value, originalValue) =>
        /\s/.test(originalValue) ? NaN : value
      )
      .typeError("Debe introducir una cantidad"),
    precio_actual: yup
      .number()
      .integer("No introduzca punto o coma")
      .transform((value, originalValue) =>
        /\s/.test(originalValue) ? NaN : value
      )
      .typeError("Debe introducir una cantidad"),
    precio_objetivo: yup
      .number()
      .integer("No introduzca punto o coma")
      .transform((value, originalValue) =>
        /\s/.test(originalValue) ? NaN : value
      )
      .typeError("Debe introducir una cantidad"),
    consideracion_importante: yup
      .string()
      .required("Debe diligenciar el campo"),
    nota_edicion: yup.string().when("TIPO", {
      is: "Editar OT", // alternatively: (val) => val == true
      then: (schema) => schema.required("Debe diligenciar el campo"),
    }),
  })
  .required();

export const Other = yup
  .object({
    cant_muestra: yup
      .number()
      .min(0, "El mínimo valor el cero")
      .integer("No introduzca punto o coma")
      .transform((value, originalValue) =>
        /\s/.test(originalValue) ? NaN : value
      )
      .typeError("Debe introducir una cantidad"),
    descripcion: yup.string().required("Debe diligenciar el campo"),
    f_requerida: yup
      .date()
      .min(
        new Date() + 1,
        "La fecha no puede ser igual o inferior a la fecha actual"
      )
      .required("Debe diligenciar el campo"),
  })
  .required();
