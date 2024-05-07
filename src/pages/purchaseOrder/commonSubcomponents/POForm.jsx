import React from "react";
import { useMutation } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./shema";
import useTextareaCounter from "../../../hooks/useTextareaCounter";
import { axiosInstance, POST_OC, PUT_OC } from "../../../config/api/api";
import Feedback from "../../../components/feedback/Feedback";
import Loader from "../../../components/loader/Loader";
import { useSelector } from "react-redux";

export default function POForm({ type }) {
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );
  const [mutationFeedback, setMutationFeedback] = React.useState(false);
  const defaultValues = { ...pageControl.data };

  if (type === "editarOC") {
    if (
      defaultValues.fecha_requerida !== null &&
      defaultValues.fecha_requerida.length > 10
    ) {
      defaultValues["fecha_requerida"] =
        defaultValues.fecha_requerida.substring(0, 10);
    }
    if (defaultValues.fecha_oc !== null && defaultValues.fecha_oc.length > 10) {
      defaultValues["fecha_oc"] = defaultValues.fecha_oc.substring(0, 10);
    }
    if (
      defaultValues.fecha_real_entrega !== null &&
      defaultValues.fecha_real_entrega.length > 10
    ) {
      defaultValues["fecha_real_entrega"] =
        defaultValues.fecha_real_entrega.substring(0, 10);
    }
    if (
      defaultValues.fecha_despacho !== null &&
      defaultValues.fecha_despacho.length > 10
    ) {
      defaultValues["fecha_despacho"] = defaultValues.fecha_despacho.substring(
        0,
        10
      );
    }
    if (
      defaultValues.fecha_fabricacion !== null &&
      defaultValues.fecha_fabricacion.length > 10
    ) {
      defaultValues["fecha_fabricacion"] =
        defaultValues.fecha_fabricacion.substring(0, 10);
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const TA = useTextareaCounter(
    defaultValues.nota ? defaultValues.nota.length : 0
  );

  const onSubmit = (formData) => {
    const submitData = { ...formData };
    delete submitData.name;
    delete submitData.nombre;

    if (type === "nuevaOC") {
      submitData.fecha_oc =
        new Date().getFullYear() +
        "-" +
        (new Date().getMonth() + 1) +
        "-" +
        new Date().getDate();
      mutation.mutate([POST_OC, "post", submitData]);
    }

    if (type === "editarOC") {
      delete submitData.statename;
      mutation.mutate([
        PUT_OC + defaultValues.id_purchaseorder,
        "put",
        submitData,
      ]);
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
      if (type === "nuevaOC") {
        setMutationFeedback({
          success: "yes",
          mutation,
          queryName: ["nuevaOC"],
          addNewRecord: true,
        });
      }

      if (type === "editarOC") {
        setMutationFeedback({
          success: "yes",
          mutation,
          queryName: ["editarOC"],
          addNewRecord: true,
        });
      }
    },
  });

  return (
    <div>
      {mutationFeedback && (
        <Feedback
          mutationFeedback={mutationFeedback}
          setMutationFeedback={setMutationFeedback}
        />
      )}

      {mutation.isLoading || (mutation.isFetching && <Loader />)}

      {!mutationFeedback && (
        <>
          <h5 className="text-primary fw-bold text-center">
            {type === "nuevaOC"
              ? "Ingresar una órden de compra"
              : "Editar una orden de compra"}
          </h5>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <label htmlFor="nombre" className="col-form-label">
                Cliente
              </label>
              <input
                readOnly
                {...register("nombre")}
                type="text"
                id="nombre"
                className="form-control form-control-sm"
              />
            </div>

            <div className="row">
              <label htmlFor="name" className="col-form-label">
                Referencia
              </label>
              <input
                readOnly
                {...register("name")}
                type="text"
                id="name"
                className="form-control form-control-sm"
              />
            </div>

            <div className="row">
              <div className="col-md-3">
                <label htmlFor="fecha_requerida" className="col-form-label">
                  Fecha requerida
                </label>
                <input
                  {...register("fecha_requerida", { valueAsDate: true })}
                  type="date"
                  id="fecha_requerida"
                  className="form-control form-control-sm"
                />
                <p className="text-danger fs-6 text">
                  {errors.fecha_requerida?.message}
                </p>
              </div>

              <div className="col-md-3">
                <label htmlFor="monto_requerido" className="col-form-label">
                  Cantidad requerida (Kg)
                </label>
                <input
                  {...register("monto_requerido", { valueAsNumber: true })}
                  type="text"
                  id="monto_requerido"
                  className="form-control form-control-sm"
                />
                <p className="text-danger">{errors.monto_requerido?.message}</p>
              </div>

              <div className="col-md-3">
                <label htmlFor="oc_numero" className="col-form-label">
                  Orden de compra
                </label>
                <input
                  {...register("oc_numero")}
                  type="text"
                  id="oc_numero"
                  className="form-control form-control-sm"
                />
                <p className="text-danger">{errors.oc_numero?.message}</p>
              </div>

              <div className="col-md-3">
                <label htmlFor="pedido" className="col-form-label">
                  Pedido (ofimática)
                </label>
                <input
                  {...register("pedido", { valueAsNumber: true })}
                  type="text"
                  id="pedido"
                  className="form-control form-control-sm"
                />
                <p className="text-danger">{errors.pedido?.message}</p>
              </div>
            </div>

            <div className="row">
              <label htmlFor="nota" className="col-form-label">
                Nota
              </label>
              <textarea
                {...register("nota")}
                id="nota"
                className="form-control form-control-sm"
                rows="2"
                onChange={TA.total}
              />
              <div className="form-text">
                {" "}
                <span>{TA.counter}/255 caracteres</span>{" "}
                <span className="bg-danger text-center text-white">
                  {TA.counter > 255 && "No debe de exceder de 255 caracteres"}{" "}
                </span>
              </div>
            </div>

            {type === "editarOC" && (
              <>
                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="factura" className="col-form-label">
                      Factura
                    </label>
                    <input
                      {...register("factura")}
                      type="text"
                      id="factura"
                      className="form-control form-control-sm"
                    />
                  </div>

                  <div className="col-md-3">
                    <label
                      htmlFor="monto_despachado"
                      className="col-form-label"
                    >
                      Cantidad despachada
                    </label>
                    <input
                      {...register("monto_despachado", { valueAsNumber: true })}
                      type="text"
                      id="monto_despachado"
                      className="form-control form-control-sm"
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="transportador" className="col-form-label">
                      Transportador
                    </label>
                    <input
                      {...register("transportador")}
                      type="text"
                      id="transportador"
                      className="form-control form-control-sm"
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="remesa" className="col-form-label">
                      Remesa
                    </label>
                    <input
                      {...register("remesa")}
                      type="text"
                      id="remesa"
                      className="form-control form-control-sm"
                    />
                  </div>
                </div>

                <div className="row">
                  <div className="col-md-3">
                    <label htmlFor="fecha_oc" className="col-form-label">
                      Fecha ingreso
                    </label>
                    <input
                      readOnly
                      {...register("fecha_oc")}
                      type="date"
                      id="fecha_oc"
                      className="form-control form-control-sm"
                    />
                  </div>

                  <div className="col-md-3">
                    <label htmlFor="fecha_despacho" className="col-form-label">
                      Fecha de despacho
                    </label>
                    <input
                      {...register("fecha_despacho")}
                      type="date"
                      id="fecha_despacho"
                      className="form-control form-control-sm"
                    />
                  </div>

                  <div className="col-md-3">
                    <label
                      htmlFor="fecha_real_entrega"
                      className="col-form-label"
                    >
                      Fecha real entrega
                    </label>
                    <input
                      {...register("fecha_real_entrega")}
                      type="date"
                      id="fecha_real_entrega"
                      className="form-control form-control-sm"
                    />
                  </div>

                  {!defaultValues.fecha_fabricacion ? (
                    <div className="col-md-3">
                      <label htmlFor="statename" className="col-form-label">
                        Estado
                      </label>
                      <input
                        readOnly
                        {...register("statename")}
                        type="text"
                        id="statename"
                        className="form-control form-control-sm"
                      />
                    </div>
                  ) : (
                    <div className="col-md-3">
                      <label
                        htmlFor="fecha_fabricacion"
                        className="col-form-label"
                      >
                        Fecha de fabricación
                      </label>
                      <input
                        readOnly
                        {...register("fecha_fabricacion")}
                        type="date"
                        id="fecha_fabricacion"
                        className="form-control form-control-sm"
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            <button
              className="btn btn-sm btn-success my-3"
              type="submit"
              disabled={mutation.isLoading || mutation.isFetching}
            >
              {type === "nuevaOC" ? "Ingresar OC" : "Actualizar OC"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
