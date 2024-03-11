import React from "react";
import { useQuery, useMutation } from '@tanstack/react-query'
import axios from 'axios'

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./shema";
import useTextareaCounter from "../../../hooks/useTextareaCounter";
import { axiosInstance, POST_OC, PUT_OC } from "../../../config/api/api";
import { Query } from "../../../config/api/api";
import Feedback from "../../../components/feedback/Feedback";
import Loader from "../../../components/loader/Loader";
import { DateTime } from "luxon"
import { useDispatch, useSelector } from 'react-redux'
import { setPageToRender } from '../../../redux/slices/pageToRenderSlice';

export default function POForm({ type }) {
  const pageControl = useSelector((state) => state.reducerPageToRender.pageToRender)
  const dispatch = useDispatch()
  const defaultValues = pageControl.data


  const {
    register,
    handleSubmit,
    formState:{ errors }, getValues
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const TA = useTextareaCounter(defaultValues.nota ? defaultValues.nota.length : 0);

  const onSubmit = (formData) => {
    const submitData = {...formData}
    delete submitData.name
    delete submitData.nombre

    console.log(getValues());

    dispatch(setPageToRender({data: formData, submitData}))
    mutation.mutate()
    // query.refetch(submitData)
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const data = await axios({
        url: 'http://localhost:9010/api/ingresarOC',
        method: "post",
        data: pageControl.submitData,
      }).catch(
        err => {
          console.log(err)
        }
      )
      return data
    },
    enabled: false,
    onError: () => {
      console.log("err")
    },
    onSuccess: () => {
      console.log("bn")
    },
  })


  const  query = useQuery({
    queryKey: ['prueba'],
    queryFn: async () => {
      const datas = await axios({
        url: 'http://localhost:9010/api/ingresarOC',
        method: "post",
        data: pageControl.submitData,
      }).catch(
        err => {
          console.log(err)
        }
      )
      console.log('axios');
      return datas
    },
    enabled: false
  })

  // console.log(query);
  console.log(mutation.isError);
  console.log(mutation.error);
  console.log(mutation.failureCount);

  const feedback = type === "nuevaOC"
  ? { query, queryName: ['nuevaOC', "createOC"], addNewRecord: "yes" }
  : { query, queryName: ['editarOC', "editOC"], addNewRecord: "yes" }

  return (
    <div>
      {query.data && (
        <Feedback {...feedback} />
      )}

      {query.isLoading || (query.isFetching && <Loader />)}

      {query.data === undefined && (
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
                  {...register("fecha_requerida")}
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
                  {...register("monto_requerido", {valueAsNumber: true})}
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
                  {...register("pedido", {valueAsNumber: true})}
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
                      {...register("monto_despachado", {valueAsNumber: true})}
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

                  {!POdata.fecha_fabricacion ? (
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
              disabled={query.isLoading || query.isFetching}
            >
              {type === "nuevaOC" ? "Ingresar OC" : "Actualizar OC"}
            </button>
          </form>
        </>
      )}
    </div>
  );
}
