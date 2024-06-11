import React from "react";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import { useDispatch, useSelector } from "react-redux";
import useAskMutation, {
  useMultipleMutation,
} from "../../../../../hooks/useAskMutation";
import { setFeedback } from "../../../../../redux/slices/feedbackSlice";
import { setPageToRender } from "../../../../../redux/slices/pageToRenderSlice";

import {
  axiosInstance,
  POST_ATTEMPT_TIME,
  POST_ATTEMPT,
  PUT_UPDATE_DEVELOPMENT,
  PUT_UPDATE_WO,
  POST_NEW_PRODUCT,
  POST_NEW_PROMAT,
  GET_FORMULA_ATTEMPT,
} from "../../../../../config/api/api";
import Loader from "../../../../../components/loader/Loader";
import FeedbackComponent from "../../../../../components/feedbackComponent/FeedbackComponent";

export default function NameProduct() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );
  const user = useSelector((state) => state.reducerUserState.userState.id_user);
  const feedback = useSelector((state) => state.reducerFeedback.feedback);

  const schema = yup
    .object({
      intento: yup
        .number()
        .positive("Solo debes ingresar números positivos")
        .max(
          pageControl.development.attemps,
          "Este número no puede ser mayor al máx. de intentos"
        )
        .integer("No introduzca punto o coma")
        .transform((value, originalValue) =>
          /\s/.test(originalValue) ? NaN : value
        )
        .typeError("Debe introducir una cantidad"),
      nombre: yup.string().required("Debe diligenciar el campo"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    // defaultValues: {intento:universalData[4]['attemps']},
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const onError = () => {
    dispatch(
      setFeedback({
        ...feedback,
        itShows: true,
        success: false,
        children: [
          <p key={"err"}>
            Algo salió mal, es posible que exista un ingreso parcial de datos...
            antes de continuar comuníquese con el área de sistemas. Dele al
            botón de cerrar y copie toda la información en una hoja o realice
            pantallazos.
          </p>,
        ],
      })
    );
  };

  // aproved
  const onSuccessAproved = () => {
    const newState = { itShows: true, success: true };
    dispatch(setFeedback({ ...feedback, ...newState }));
  };

  // aproved formData.intento === pageControl.development.attemps
  const aprovedAttempt = useMultipleMutation({
    enabled: true,
    onError,
  });

  const aprovedAttempt2 = useMultipleMutation({
    enabled: true,
    onError,
    onSuccess: onSuccessAproved,
  });

    // aproved formData.intento !== pageControl.development.attemps
    const aprovedDiferent = useMultipleMutation({
      enabled: true,
      onError,
    });
  
    const aprovedDiferent2 = useMultipleMutation({
      enabled: true,
      onError,
      onSuccess: onSuccessAproved,
    });

  // searching an expecific attempt
  const query = useAskMutation({});

  // record the fimal formula
  React.useEffect(() => {
    if (aprovedAttempt?.data) {
      const submitData2 = [];
      // creando la data para la tabla productmaterials
      for (let i = 0; i < pageControl.devData.length; i++) {
        submitData2.push(
          axiosInstance.post(POST_NEW_PROMAT, {
            positionInProduct: i + 1,
            materialId: pageControl.devData[i].materialId,
            percentage: pageControl.devData[i].percentage,
            createdAt: new Date(),
            updatedAt: new Date(),
            productId: aprovedAttempt.data[0].data.insertId,
            weighingMachineId: 1,
            secondaryLimitScale: 50,
            secondarylimitScaleUnitId: 2,
            secondaryWeighingMachineId: 2,
          })
        );
      }
      aprovedAttempt2.mutate({ data: submitData2 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aprovedAttempt?.data]);

  // record the fimal formula
  React.useEffect(() => {
    if (query?.data && aprovedDiferent?.data) {
      const submitData2 = [];
      // creando la data para la tabla productmaterials
      for (let i = 0; i < query.data.data.length; i++) {
        submitData2.push(
          axiosInstance.post(POST_NEW_PROMAT, {
            positionInProduct: i + 1,
            materialId: query.data.data[i].materialId,
            percentage: query.data.data[i].percentage,
            createdAt: new Date(),
            updatedAt: new Date(),
            productId: aprovedDiferent.data[0].data.insertId,
            weighingMachineId: 1,
            secondaryLimitScale: 50,
            secondarylimitScaleUnitId: 2,
            secondaryWeighingMachineId: 2,
          })
        );
      }
      aprovedDiferent2.mutate({ data: submitData2 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query?.data, aprovedDiferent?.data]);

  const onSubmit = (formData) => {
    dispatch(
      setPageToRender({
        ...pageControl,
        submitData: {
          name: formData.nombre.replace(/\s+/g, " ").trim().toUpperCase(),
          attempt_approved: formData.intento,
        },
      })
    );

    const submitData = [];

    // crear el nuevo producto
    submitData.push(
      axiosInstance.post(POST_NEW_PRODUCT, {
        name: formData.nombre.replace(/\s+/g, " ").trim().toUpperCase(),
        ofimatica: 0,
        state: "INACTIVE",
        createdAt: new Date(),
        updatedAt: new Date(),
        type: 1,
        id_client: pageControl.record.id_clients,
        id_developmentrequest: pageControl.data.id_developmentrequest,
      })
    );

    // adicionando el tiempo que demoro hacer el intento
    submitData.push(
      axiosInstance.post(POST_ATTEMPT_TIME, {
        id_developmentrequest: pageControl.data.id_developmentrequest,
        attemps: pageControl.development.attemps,
        f_inicial: pageControl.development.f_inicial,
        f_final: new Date(),
      })
    );

    // actualizando las nota que esta en la vista de varios
    submitData.push(
      axiosInstance.put(
        PUT_UPDATE_DEVELOPMENT + pageControl.data.id_developmentrequest,
        {
          note: pageControl.development.note,
          attempt_approved: formData.intento,
        }
      )
    );

    // actualizando las nota que esta en la vista de varios
    submitData.push(
      axiosInstance.put(
        PUT_UPDATE_WO + pageControl.data.id_developmentrequest,
        {
          id_states: 4,
        }
      )
    );

    // adicionando cada id del intento mas otros datos
    for (let i = 0; i < pageControl.devData.length; i++) {
      submitData.push(
        axiosInstance.post(POST_ATTEMPT, {
          id_developmentrequest: pageControl.data.id_developmentrequest,
          id_user: user,
          id_starpoint: pageControl.record.id_products,
          base_resin: pageControl.development.base_resin,
          dosing: pageControl.development.dosing,
          scale: pageControl.development.scale,
          attemps: pageControl.development.attemps,
          paused:
            pageControl.development.paused > 0
              ? pageControl.development.paused + 1
              : 0,
          position: i + 1,
          material: pageControl.devData[i].materialId,
          percentage: pageControl.devData[i].percentage,
        })
      );
    }

    if (formData.intento === pageControl.development.attemps) {
      aprovedAttempt.mutate({ data: submitData });
    } else {
      const d = pageControl.data.id_developmentrequest;
      const a = formData.intento;
      query.mutate({ url: GET_FORMULA_ATTEMPT + d + "/" + a, method: "get" });
      aprovedDiferent.mutate({ data: submitData });
    }
  };

  const disabled =
    aprovedAttempt.isLoading ||
    aprovedAttempt.isFetching ||
    aprovedAttempt2.isLoading ||
    aprovedAttempt2.isFetching;

  return (
    <>
      {feedback.itShows && <FeedbackComponent></FeedbackComponent>}

      {disabled && !feedback.itShows ? (
        <Loader />
      ) : (
        <div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h3 className="fw-bold text-primary text-center">
              Creación de fórmula nueva
            </h3>

            <label htmlFor="intento" className="col-form-label">
              Número de desarrollo aprovado
            </label>
            <div className="col-3 mt-3">
              <input
                defaultValue={pageControl.development.attemps}
                {...register("intento")}
                type="text"
                id="intento"
                className="form-control text-center"
              />
              <p className="bg-danger text-center text-white mt-1">
                {errors.intento?.message}
              </p>
            </div>

            <div className="col mt-3">
              <label htmlFor="nombre" className="col-form-label">
                Nombre del producto
              </label>
              <input
                {...register("nombre")}
                type="text"
                id="nombre"
                className="form-control text-center"
              />
              <p className="bg-danger text-center text-white mt-1">
                {errors.nombre?.message}
              </p>
            </div>

            <div className="d-flex justify-content-between">
              <button
                type="submit"
                className="btn btn-success mt-5"
                disabled={disabled}
              >
                Proceder con el registro
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
