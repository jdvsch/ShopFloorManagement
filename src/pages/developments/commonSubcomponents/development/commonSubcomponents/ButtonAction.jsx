import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageToRender } from "../../../../../redux/slices/pageToRenderSlice";
import { setFeedback } from "../../../../../redux/slices/feedbackSlice";
import {
  axiosInstance,
  POST_ATTEMPT_TIME,
  POST_ATTEMPT,
  PUT_UPDATE_DEVELOPMENT,
} from "../../../../../config/api/api";
import { useMutation } from "@tanstack/react-query";

import FeedbackComponent from "../../../../../components/feedbackComponent/FeedbackComponent";
import Feedback from "../../../../../components/feedback/Feedback";
import Loader from "../../../../../components/loader/Loader";

import useAskMutation from "../../../../../hooks/useAskMutation";

export default function ButtonAction() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );
  const [mutationFeedback, setMutationFeedback] = React.useState(false);
  const [feedbackComponent, setfeedbackComponent] = React.useState(false);

  
  const checkingInputs = (accion) => {
    let alerta = [];

    if (
      (accion === "NewTry" || accion === "Aproved") &&
      pageControl.development.base_resin === ""
    ) {
      alerta.push(
        <p>
          Por favor diligecie la resina base del submenu:{" "}
          <strong>Varios</strong>
        </p>
      );
    }

    if (accion === "Aproved" && pageControl.development.dosing === "") {
      alerta.push(
        <p>
          Por favor diligecie la dosificacción del submenu:{" "}
          <strong>Varios</strong>
        </p>
      );
    }

    if (pageControl.development.scale === "") {
      alerta.push(
        <p>Por favor coloque un valor en la escala de trabajo (%)</p>
      );
    }

    if (pageControl.development.sum !== 100) {
      alerta.push(
        <p>
          La suma de los porcentajes es diferente de <strong>100%</strong>
        </p>
      );
    }

    for (let i = 0; i < pageControl.devData.length; i++) {
      if (pageControl.devData[i]["materialId"] === "") {
        alerta.push(
          <p>
            Verifique el valor del ID de la fila: <strong>{i}</strong>
          </p>
        );
      }
      if (pageControl.devData[i]["percentage"] === "") {
        alerta.push(
          <p>
            Verifique el valor del porcentaje de la fila: <strong>{i}</strong>
          </p>
        );
      }
    }
    return alerta;
  };

  const mutations = useAskMutation({url: 'resinasbase', method: 'post', data: {}})


  const handleNewTry = () => {
    mutations.mutate()
    const alerta = checkingInputs("NewTry");
    if (alerta.length !== 0) {
      return dispatch(setFeedback({ itShows: true, children: alerta }));
    }

    mutation.mutate([POST_ATTEMPT_TIME, "post", { 
      id_developmentrequest: pageControl.data.id_developmentrequest, 
      attemps: pageControl.development.attemps, 
      f_inicial: pageControl.development.f_inicial, 
      f_final: new Date() 
    }]);

    mutation.mutate([POST_ATTEMPT, "post", { 
      id_developmentrequest: pageControl.data.id_developmentrequest, 
      attemps: pageControl.development.attemps, 
      f_inicial: pageControl.development.f_inicial, 
      f_final: new Date() 
    }]);

    // if (alerta.length === 0) {
    //   //array with all data to POST and PUT
    //   const arrayPOST = [];
    //   const arrayPUT = [];
    //   arrayPOST.push(addTime());
    //   arrayPOST.push(addID("newTry"));
    //   arrayPUT.push(updateNote());
    //   MCRUD(arrayPOST, null, arrayPUT, null, null, setFeedBackNewTry);
    // } else {
    //   setFeedbackError(alerta);
    //}
  };

  //
  const handlePause = () => {
    // const alerta = checkNewEntry();
    // if (alerta.length === 0) {
    //   //array with all data to POST and PUT
    //   const arrayPOST = [];
    //   const arrayPUT = [];
    //   arrayPOST.push(addTime());
    //   arrayPOST.push(addID("paused"));
    //   arrayPUT.push(updateState());
    //   arrayPUT.push(updateNote());
    //   MCRUD(arrayPOST, null, arrayPUT, null, null, setFeedBackPause);
    // } else {
    //   setFeedbackError(alerta);
    // }
  };

  //
  const handleAproved = () => {
    // const alerta = checkNewEntry("Aproved");
    // if (alerta.length === 0) {
    //   setFeedBackAproved(true);
    // } else {
    //   setFeedbackError(alerta);
    // }
  };

  const onSubmit = (formData) => {
    // const submitData = { ...formData };
    // delete submitData.name;
    // delete submitData.nombre;
    // if (type === "nuevaOC") {
    //   submitData.fecha_oc =
    //     new Date().getFullYear() +
    //     "-" +
    //     (new Date().getMonth() + 1) +
    //     "-" +
    //     new Date().getDate();
    //   mutation.mutate([POST_OC, "post", submitData]);
    // }
    // if (type === "editarOC") {
    //   delete submitData.statename;
    //   mutation.mutate([
    //     PUT_OC + defaultValues.id_purchaseorder,
    //     "put",
    //     submitData,
    //   ]);
    // }
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
      // if (false) {
      //   setMutationFeedback({
      //     success: "yes",
      //     mutation,
      //     queryName: ["editarOC"],
      //     addNewRecord: true,
      //   });
      // }
    },
  });

  return (
    <>
      {feedbackComponent && (
        <FeedbackComponent>
          <>si</>
        </FeedbackComponent>
      )}

      {mutationFeedback && (
        <Feedback
          mutationFeedback={mutationFeedback}
          setMutationFeedback={setMutationFeedback}
        />
      )}

      {mutation.isLoading || (mutation.isFetching && <Loader />)}

      {!mutationFeedback && <></>}

      <div onClick={() => handleNewTry()} className="row m-5">
        <button
          type="button"
          className="btn btn-primary"
          disabled={mutation.isFetching}
        >
          Nuevo intento
        </button>
      </div>
      <div onClick={() => handlePause()} className="row m-5">
        <button
          type="button"
          className="btn btn-warning"
          disabled={mutation.isFetching}
        >
          Pausar desarrollo
        </button>
      </div>
      <div onClick={() => handleAproved()} className="row m-5">
        <button
          type="button"
          className="btn btn-success"
          disabled={mutation.isFetching}
        >
          Desarrollo Aprobado
        </button>
      </div>
    </>
  );
}
