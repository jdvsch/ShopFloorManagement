import React from "react";
import { useMutation } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { NewAjust, Other } from "./shema";
import useTextareaCounter from "../../../hooks/useTextareaCounter";
import {
  axiosInstance,
  Query,
  GET_NORMATIVE,
  GET_PORDUCT_TYPE,
  POST_NEW_WO,
  PUT_UPDATE_WO,
} from "../../../config/api/api";
import Feedback from "../../../components/feedback/Feedback";
import Loader from "../../../components/loader/Loader";
import { useSelector } from "react-redux";

export default function Worksheet({ type }) {
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );
  const userState = useSelector((state) => state.reducerUserState.userState);
  const [mutationFeedback, setMutationFeedback] = React.useState(false);
  const addData = {
    cant_muestra: 0,
    tiempo_ciclo: 0,
    dosificacion_cliente: 0,
    estimacion_cosumo: 0,
    precio_actual: 0,
    precio_objetivo: 0,
  };
  let defaultValues;

  if (type === "Nueva OT") {
    defaultValues = { ...pageControl.data, ...addData };
  }

  if (type === "Ajustar OT") {
    const data = { ...pageControl.data };
    if (!data.dllo_ajuste) data.dllo_ajuste = data.dllo_padre;
    defaultValues = { ...data, ...addData };
  }

  if (type === "Optimizar OT") {
    const data = { ...pageControl.data };
    delete data.dllo_padre;
    data.descripcion = `Favor optimizar el ${data.name}`;
    defaultValues = { ...data, ...addData };
  }

  if (type === "Muestra") {
    const data = { ...pageControl.data };
    data.descripcion = `Favor hacer muestra del ${data.name}.`;

    const newAddData = {...addData}
    delete newAddData.cant_muestra;
    defaultValues = { ...data, ...newAddData };
  }

  if (type === "Repetir muestra") {
    const data = { ...pageControl.data };
    data.descripcion = `Favor repetir muestra del ${data.name}.`;

    const newAddData = {...addData}
    delete newAddData.cant_muestra;
    defaultValues = { ...data, ...newAddData };
  }

  if (type ==="Reformulacion"){
    const data = { ...pageControl.data };
    data.descripcion = `Favor reformular el ${data.name}`;
    defaultValues = { ...data, ...addData };
  }

  if (type ==="Ver OT"){
    const data = { ...pageControl.data };
    data.f_requerida = data.f_requerida.substring(0,10);
    data.tecnico = data.firstName + ' ' + data.lastName;
    if (data.envia_estandar === 0) {
        delete data.envia_estandar;
        delete data.devolver_estandar;
    }
    defaultValues = { ...data, ...addData };
  }

  if (type==="Editar OT"){
    const data = { ...pageControl.data };
    data.editado = 'E';
    data.f_requerida = data.f_requerida.substring(0,10);
    if (data.envia_estandar === 0) {
        delete data.envia_estandar;
        delete data.devolver_estandar;
        delete data.firstName;
        delete data.lastName;
        delete data.statename;
    }
    defaultValues = { ...data, ...addData };
}

  let schema;
  if (
    type === "Nueva OT" ||
    type === "Ajustar OT" ||
    type === "Editar OT" ||
    type === "AllowEdit OT" ||
    type === "Optimizar OT"
  ) {
    schema = NewAjust;
  } else {
    schema = Other;
  }

  const normative = Query({ key: ["normative"], url: GET_NORMATIVE });
  const productType = Query({ key: ["productType"], url: GET_PORDUCT_TYPE });

  if (type === "editarOC") {
    /* empty */
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const NORMA = parseInt(watch("id_normative"));
  const ESTANDAR = watch("envia_estandar");
  const SOLO_MUESTRAR = watch("solo_cotizacion");

  const textarea1 = useTextareaCounter(
    defaultValues.descripcion ? defaultValues.descripcion.length : 0
  );
  const textarea2 = useTextareaCounter(
    defaultValues.consideracion_importante
      ? defaultValues.consideracion_importante.length
      : 0
  );
  const textarea3 = useTextareaCounter(0);

  const onSubmit = (formData) => {
    const submitData = { ...formData };
    submitData.f_ingreso =
      new Date().getFullYear() +
      "-" +
      (new Date().getMonth() + 1) +
      "-" +
      new Date().getDate() +
      " " +
      new Date().getHours() +
      ":" +
      new Date().getMinutes() +
      ":" +
      new Date().getSeconds();

    delete submitData.estado;
    delete submitData.id_user;
    delete submitData.nombre;
    delete submitData.zona;
    delete submitData.tecnico;
    delete submitData.is_potentialclient;
    delete submitData.name;

    if (type === "Nueva OT" || type === "Optimizar OT" || type === "Muestra" || type === "Repetir muestra" || type === "Reformulacion") {
      mutation.mutate([POST_NEW_WO, "post", submitData]);
    }

    if (type === "Ajustar OT") {
      submitData.ajuste_num = submitData.ajuste_num + 1;
      const id = submitData.dllo_padre;
      delete submitData.dllo_padre;
      mutation.mutate([PUT_UPDATE_WO + id, "put", { id_states: 5 }]);
      mutation.mutate([POST_NEW_WO, "post", submitData]);
    }
    
  };

  const mutation = useMutation({
    mutationFn: async (SETUP) => {
      const data = await axiosInstance({
        url: SETUP[0],
        method: SETUP[1],
        data: SETUP[2],
      }).catch(() => {
        throw new Error("Un error a ocurrido");
      });
      return data;
    },
    enabled: false,
    onError: () => {
      setMutationFeedback({ success: "no", mutation });
    },
    onSuccess: () => {
      if (type === "Nueva OT") {
        setMutationFeedback({
          success: "yes",
          mutation,
          queryName: ["Nueva OT"],
          addNewRecord: true,
        });
      }

      if (type === "Ajustar OT") {
        setMutationFeedback({
          success: "yes",
          mutation,
          queryName: ["Ajustar OT"],
          addNewRecord: true,
        });
      }

      if (type === "Optimizar OT") {
        setMutationFeedback({
          success: "yes",
          mutation,
          queryName: ["Optimizar OT"],
          addNewRecord: true,
        });
      }

      if (type === "Muestra") {
        setMutationFeedback({
          success: "yes",
          mutation,
          queryName: ["Muestra"],
          addNewRecord: true,
        });
      }

      if (type === "Repetir muestra") {
        setMutationFeedback({
          success: "yes",
          mutation,
          queryName: ["Repetir muestra"],
          addNewRecord: true,
        });
      }

      if (type === "Reformulacion") {
        setMutationFeedback({
          success: "yes",
          mutation,
          queryName: ["Reformulacion"],
          addNewRecord: true,
        });
      }
    },
  });

  return (
    <>
      {mutationFeedback && (
        <Feedback
          mutationFeedback={mutationFeedback}
          setMutationFeedback={setMutationFeedback}
        />
      )}

      {mutation.isLoading || (mutation.isFetching && <Loader />)}

      {!mutationFeedback && normative.data && productType.data && (
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row border border-4 my-2">
              <div className="col-3 border text-center">
                <img
                  src="/img/full_logo.png"
                  width="120"
                  alt="Anquimico SAS"
                ></img>
              </div>
              <div className="col-6 border">
                <div className="text-center">Formato</div>
                <div className="text-center fw-bold mt-3">
                  SOLICITUD DE TRABAJO DEL LABORATORIO
                </div>
              </div>
              <div className="col-3">
                <div className="row">
                  <div className="col text-center border">Fecha</div>
                  <div className="col text-center border">01-jun-2022</div>
                </div>
                <div className="row">
                  <div className="col text-center border">Versión</div>
                  <div className="col text-center registerborder">3</div>
                </div>
                <div className="row">
                  <div className="col text-center border">Páginas</div>
                  <div className="col text-center border">1 de 1</div>
                </div>
              </div>

              <div className="row mt-2">
                <label htmlFor="id" className="col-form-label col-2">
                  Solicitud
                </label>
                <div className="col-1" id="id">
                  {defaultValues.id_developmentrequest
                    ? defaultValues.id_developmentrequest
                    : "xxx"}
                </div>
                <label htmlFor="f_ingreso" className="col-form-label col-2">
                  Fecha de solicitud
                </label>
                <input
                  readOnly
                  {...register("f_ingreso")}
                  defaultValue={new Date()}
                  type="text"
                  id="f_ingreso"
                  className="form-control col"
                />
              </div>

              <div className="row mt-2">
                <div className="col-2">Cliente</div>
                <div className="col">
                  <input
                    readOnly
                    {...register("nombre")}
                    type="text"
                    id="nombre"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-2">Zona</div>
                <div className="col">
                  <input
                    readOnly
                    {...register("zona")}
                    type="text"
                    id="zona"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-2">Técnico vendedor</div>
                <div className="col">
                  <input
                    readOnly
                    {...register("tecnico")}
                    defaultValue={
                      userState.firstName + " " + userState.lastName
                    }
                    type="text"
                    id="tecnico"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row my-2">
                <div className="col bg-warning text-center fw-bold">
                  TIPO DE SOLICITUD
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-1">Tipo</div>
                <div className="col-3">
                  <input
                    readOnly
                    {...register("tipo")}
                    defaultValue={type}
                    type="text"
                    id="tipo"
                    className="form-control"
                  />
                </div>
                {type === "Ajustar OT" && (
                  <>
                    <div className="col-2">OT a ajustar</div>
                    <div className="col-2">
                      <input
                        readOnly
                        {...register("dllo_ajuste")}
                        type="text"
                        id="dllo_ajuste"
                        className="form-control"
                      />
                    </div>
                    <div className="col-3">Número de ajustes</div>
                    <div className="col-1">
                      <input
                        readOnly
                        {...register("ajuste_num")}
                        type="text"
                        id="ajuste_num"
                        className="form-control"
                      />
                    </div>
                  </>
                )}
              </div>

              <div className="row mt-2">
                <div className="col-3 text-center">Solo cotización</div>
                <div className="col-3 text-center">
                  Revisión de precio antes de muestra
                </div>
                <div className="col-3 text-center">Cotización más muestra</div>
                <div className="col-3 text-center">
                  Cantidad de muestra requerida (gramos)
                </div>
              </div>

              <div className="row">
                <div className="row">
                  <div className="col-3 form-check form-switch d-flex justify-content-center">
                    <input
                      {...register("solo_cotizacion")}
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="solo_cotizacion"
                      disabled={
                        type === "Muestra" ||
                        type === "Repetir muestra" ||
                        type === "Reformulacion"
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="col-3 form-check form-switch d-flex justify-content-center">
                    <input
                      {...register("revision_precio")}
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="revision_precio"
                      disabled={
                        type === "Muestra" ||
                        type === "Repetir muestra" ||
                        type === "Reformulacion"
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="col-3 form-check form-switch d-flex justify-content-center">
                    <input
                      {...register("cotizacion_muestra")}
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="cotizacion_muestra"
                      disabled={
                        type === "Muestra" ||
                        type === "Repetir muestra" ||
                        type === "Reformulacion"
                          ? true
                          : false
                      }
                    />
                  </div>
                  <div className="col-3">
                    <input
                      {...register("cant_muestra")}
                      type="text"
                      id="cant_muestra"
                      className="form-control"
                      disabled={
                        type === "Reformulacion" || SOLO_MUESTRAR ? true : false
                      }
                    />
                  </div>
                </div>
                <div className="row">
                  <div className="col-9">
                    <p className="bg-danger text-center text-white mt-1">
                      {errors.checkboxGroupTipo?.message}
                    </p>
                  </div>
                  <div className="col-3">
                    <p className="bg-danger text-center text-white mt-1">
                      {errors.cant_muestra?.message}
                    </p>
                  </div>
                </div>
              </div>

              <div className="row mt-2"></div>

              <div className="row my-2">
                <div className="col bg-warning text-center fw-bold">
                  DESCRIPCIÓN DEL TRABAJO DE LABORATORIO SOLICITADO
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-3 text-center">
                  Tipo de presentación del desarrollo
                </div>
                <div className="col-3">
                  <select
                    {...register("id_producttype")}
                    id="id_producttype"
                    className="form-select"
                    aria-label="Default select example"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  >
                    <option defaultValue></option>
                    {productType.data.map((idproductype) => (
                      <option
                        key={idproductype.id_producttype}
                        value={idproductype.id_producttype}
                      >
                        {idproductype.ptype}
                      </option>
                    ))}
                  </select>
                  <p className="bg-danger text-center text-white mt-1">
                    {errors.id_producttype?.message}
                  </p>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <textarea
                    {...register("descripcion")}
                    id="descripcion"
                    className="form-control"
                    rows="3"
                    onChange={textarea1.total}
                  />
                  <p className="bg-danger text-center text-white mt-1">
                    {errors.descripcion?.message}
                  </p>
                  <div className="form-text">
                    {" "}
                    <span>{textarea1.counter}/255 caracteres</span>{" "}
                    <span className="bg-danger text-center text-white">
                      {textarea1.counter > 255 &&
                        "No debe de exceder de 255 caracteres"}{" "}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row my-2">
                <div className="col bg-warning text-center fw-bold">
                  PROCESO
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-3">Fecha requerida</div>
                <div className="col-3 text-center">
                  Envía material para ensayo
                </div>
                <div className="col-3 text-center">Envía estándar</div>
                {ESTANDAR && (
                  <div className="col-3 text-center">Devolver estándar</div>
                )}
              </div>

              <div className="row mt-2">
                <div className="col-3">
                  <input
                    {...register("f_requerida")}
                    type="date"
                    id="f_requerida"
                    className="form-control"
                  />
                  <p className="bg-danger text-center text-white mt-1">
                    {errors.f_requerida?.message}
                  </p>
                </div>
                <div className="col-3 form-check form-switch d-flex justify-content-center">
                  <input
                    {...register("material_ensayo")}
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="material_ensayo"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                </div>
                <div className="col-3 form-check form-switch d-flex justify-content-center">
                  <input
                    {...register("envia_estandar")}
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="envia_estandar"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                </div>
                {ESTANDAR && (
                  <div className="col-3 form-check form-switch d-flex justify-content-center">
                    <input
                      {...register("devolver_estandar")}
                      className="form-check-input"
                      type="checkbox"
                      role="switch"
                      id="devolver_estandar"
                    />
                  </div>
                )}
              </div>

              <div className="row my-2">
                <div className="col text-center">Inyección</div>
                <div className="col form-check form-switch d-flex justify-content-center">
                  <input
                    {...register("inyeccion")}
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="inyeccion"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                </div>
                <div className="col text-center">Extrusión</div>
                <div className="col form-check form-switch d-flex justify-content-center">
                  <input
                    {...register("extrusion")}
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="extrusion"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                </div>
                <div className="col text-center">Soplado</div>
                <div className="col form-check form-switch d-flex justify-content-center">
                  <input
                    {...register("soplado")}
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="soplado"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                </div>
                <div className="col text-center">Rotomoldeo</div>
                <div className="col form-check form-switch d-flex justify-content-center">
                  <input
                    {...register("rotomoldeo")}
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="rotomoldeo"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                </div>
                <div className="col text-center">Termoformado</div>
                <div className="col form-check form-switch d-flex justify-content-center">
                  <input
                    {...register("termoformado")}
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="termoformado"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                </div>
                <div className="bg-danger text-center text-white mt-1">
                  {errors.checkboxGroupProceso?.message}
                </div>
              </div>

              <div className="row my-2">
                <div className="col bg-warning text-center fw-bold">
                  DESCRIPCIÓN DEL PROCESO
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-2 text-center">Temperatura máxima</div>
                <div className="col">
                  <input
                    {...register("temp_max")}
                    type="text"
                    id="temp_max"
                    className="form-control"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                  <p className="bg-danger text-center text-white mt-1">
                    {errors.temp_max?.message}
                  </p>
                </div>
                <div className="col-2 text-center">Tiempo de ciclo</div>
                <div className="col">
                  <input
                    {...register("tiempo_ciclo")}
                    type="text"
                    id="tiempo_ciclo"
                    className="form-control"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                  <p className="bg-danger text-center text-white mt-1">
                    {errors.tiempo_ciclo?.message}
                  </p>
                </div>
                <div className="col-2 text-center">Dosificación (g/Kg)</div>
                <div className="col">
                  <input
                    {...register("dosificacion_cliente")}
                    type="text"
                    id="dosificacion_cliente"
                    className="form-control"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                  <p className="bg-danger text-center text-white mt-1">
                    {errors.dosificacion_cliente?.message}
                  </p>
                </div>
                <div className="col-2 text-center">Colda caliente</div>
                <div className="col form-check form-switch d-flex justify-content-center">
                  <input
                    {...register("colada_caliente")}
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="colada_caliente"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-2 text-center">Resina de aplicación</div>
                <div className="col">
                  <input
                    {...register("resina_aplicacion")}
                    type="text"
                    id="resina_aplicacion"
                    className="form-control fw-bolder text-uppercase"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                  <p className="bg-danger text-center text-white mt-1">
                    {errors.resina_aplicacion?.message}
                  </p>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-2 text-center">
                  Aplicación final del producto
                </div>
                <div className="col">
                  <input
                    {...register("aplicacion_producto")}
                    type="text"
                    id="aplicacion_producto"
                    className="form-control"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                  <p className="bg-danger text-center text-white mt-1">
                    {errors.aplicacion_producto?.message}
                  </p>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-2 text-center">Otras especificaciones</div>
                <div className="col">
                  <input
                    {...register("otra_especificacion")}
                    type="text"
                    id="otra_especificacion"
                    className="form-control"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                  <p className="bg-danger text-center text-white mt-1">
                    {errors.otra_especificacion?.message}
                  </p>
                </div>
              </div>

              <div className="row my-2">
                <div className="col bg-warning text-center fw-bold">
                  NORMATIVIDAD REQUERIDA
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-1 text-center">Norma</div>
                <div className="col-3">
                  <select
                    {...register("id_normative")}
                    id="id_normative"
                    className="form-select"
                    aria-label="Default select example"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  >
                    <option defaultValue></option>
                    {normative.data.map((idNormativa) => (
                      <option key={idNormativa.id} value={idNormativa.id}>
                        {idNormativa.norma}
                      </option>
                    ))}
                  </select>
                  <p className="bg-danger text-center text-white mt-1">
                    {errors.id_normative?.message}
                  </p>
                </div>
                {NORMA === 1 && (
                  <>
                    <div className="col-1 text-center">Cuál?</div>
                    <div className="col-7">
                      <input
                        {...register("otra")}
                        type="text"
                        id="otra"
                        className="form-control"
                      />
                      <p className="bg-danger text-center text-white mt-1">
                        {errors.otra?.message}
                      </p>
                    </div>
                  </>
                )}
              </div>

              <div className="row my-2">
                <div className="col bg-warning text-center fw-bold">
                  INFORMACIÓN ADICIONAL
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-3 text-center">
                  Estimación consumo mes Kg/mes
                </div>
                <div className="col">
                  <input
                    {...register("estimacion_cosumo")}
                    type="text"
                    id="estimacion_cosumo"
                    className="form-control"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                  <p className="bg-danger text-center text-white mt-1">
                    {errors.estimacion_cosumo?.message}
                  </p>
                </div>
                <div className="col-2 text-center">Precio actual</div>
                <div className="col">
                  <input
                    {...register("precio_actual")}
                    type="text"
                    id="precio_actual"
                    className="form-control"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                  <p className="bg-danger text-center text-white mt-1">
                    {errors.precio_actual?.message}
                  </p>
                </div>
                <div className="col-2 text-center">Precio objetivo</div>
                <div className="col">
                  <input
                    {...register("precio_objetivo")}
                    type="text"
                    id="precio_objetivo"
                    className="form-control"
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                  <p className="bg-danger text-center text-white mt-1">
                    {errors.precio_objetivo?.message}
                  </p>
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-8">
                  Consideraciones importantes, como: proveedor, problemas,
                  características técnicas, etc.
                </div>
              </div>

              <div className="row mt-2">
                <div className="col">
                  <textarea
                    {...register("consideracion_importante")}
                    id="consideracion_importante"
                    className="form-control"
                    rows="3"
                    onChange={textarea2.total}
                    disabled={
                      type === "Muestra" ||
                      type === "Repetir muestra" ||
                      type === "Reformulacion"
                        ? true
                        : false
                    }
                  />
                  <p className="bg-danger text-center text-white mt-1">
                    {errors.consideracion_importante?.message}
                  </p>
                  <div className="form-text">
                    {" "}
                    <span>{textarea2.counter}/255 caracteres</span>{" "}
                    <span className="bg-danger text-center text-white">
                      {textarea2.counter > 255 &&
                        "No debe de exceder de 255 caracteres"}{" "}
                    </span>
                  </div>
                </div>
              </div>

              <div className="row my-2">
                <div className="col bg-info text-center fw-bold">
                  PARA USO EXCLUSVO DEL DEPARTAMENTO DE CALIDAD Y DESARROLLO
                </div>
              </div>

              <div className="row mt-2">
                <div className="col-2 text-center">
                  Consecutivo del desarrollo
                </div>
                <div className="col">
                  <input
                    readOnly
                    type="text"
                    id="id_productdevelopment"
                    className="form-control"
                  />
                </div>
              </div>

              <div className="row my-2">
                <div className="col-2 text-center">Dosificación sugerida</div>
                <div className="col-2">
                  <input
                    readOnly
                    type="text"
                    id="dosificacion_cliente"
                    className="form-control"
                  />
                </div>
                <div className="col-2 text-center">Fecha de entrega</div>
                <div className="col">
                  <input
                    readOnly
                    type="text"
                    id="f_elaboracion"
                    className="form-control"
                  />
                </div>
              </div>
            </div>

            {type !== "Ver OT" && type !== "AllowEdit OT" && (
              <div className="text-primary fw-bold fs-3">
                Certifico que la información aquí escrita corresponde a la
                realidad
              </div>
            )}

            {type === "Editar OT" && (
              <>
                <div className="row my-2">
                  <div className="col text-light bg-secondary text-center fw-bold">
                    NOTA ACLARATORIA DEL MOTIVO DE LA EDICIÓN DE LA OT
                  </div>
                </div>

                <div className="row mt-2">
                  <div className="col">
                    <textarea
                      {...register("nota_edicion")}
                      id="nota_edicion"
                      className="form-control"
                      rows="3"
                      onChange={textarea3.total}
                    />
                    <p className="bg-danger text-center text-white mt-1">
                      {errors.nota_edicion?.message}
                    </p>
                    <div className="form-text">
                      {" "}
                      <span>{textarea3.counter}/255 caracteres</span>{" "}
                      <span className="bg-danger text-center text-white">
                        {textarea3.counter > 255 &&
                          "No debe de exceder de 255 caracteres"}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </>
            )}

            {type === "AllowEdit OT" ? (
              <button className="btn btn-success my-3" type="submit">
                Permitir su edición
              </button>
            ) : (
              type !== "Ver OT" && (
                <button className="btn btn-success my-3" type="submit">
                  Enviar información
                </button>
              )
            )}
          </form>
        </div>
      )}
    </>
  );
}
