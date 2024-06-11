import { useDispatch, useSelector } from "react-redux";
import { setPageToRender } from "../../../../../redux/slices/pageToRenderSlice";
import { setFeedback } from "../../../../../redux/slices/feedbackSlice";
import {
  axiosInstance,
  POST_ATTEMPT_TIME,
  POST_ATTEMPT,
  PUT_UPDATE_DEVELOPMENT,
} from "../../../../../config/api/api";
import useAskMutation from "../../../../../hooks/useAskMutation";
import { useMultipleMutation } from "../../../../../hooks/useAskMutation";
import Loader from "../../../../../components/loader/Loader";

export default function ButtonAction() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.reducerUserState.userState.id_user);
  const pageControl = useSelector((state) => state.reducerPageToRender.pageToRender);
  const feedback = useSelector((state) => state.reducerFeedback.feedback)

  const checkingInputs = (accion) => {
    let alerta = [];

    if (
      (accion === "NewTry" || accion === "Aproved") &&
      pageControl.development.base_resin === ""
    ) {
      alerta.push(
        <p key={1}>
          Por favor diligecie la resina base del submenu:{" "}
          <strong>Varios</strong>
        </p>
      );
    }

    if (accion === "Aproved" && pageControl.development.dosing === "") {
      alerta.push(
        <p key={2}>
          Por favor diligecie la dosificacción del submenu:{" "}
          <strong>Varios</strong>
        </p>
      );
    }

    if (pageControl.development.scale === "") {
      alerta.push(
        <p key={3}>Por favor coloque un valor en la escala de trabajo (%)</p>
      );
    }

    if (pageControl.development.sum !== 100) {
      alerta.push(
        <p key={4}>
          La suma de los porcentajes es diferente de <strong>100%</strong>
        </p>
      );
    }

    for (let i = 0; i < pageControl.devData.length; i++) {
      if (pageControl.devData[i]["materialId"] === "") {
        alerta.push(
          <p key={'A'+i.toString()}>
            Verifique el valor del ID de la fila: <strong>{i}</strong>
          </p>
        );
      }
      if (pageControl.devData[i]["percentage"] === "") {
        alerta.push(
          <p key={'B'+i.toString()}>
            Verifique el valor del porcentaje de la fila: <strong>{i}</strong>
          </p>
        );
      }
    }
    return alerta;
  };

  const onError = () => {
    dispatch(setFeedback({
      ...feedback, 
      itShows: true, 
      success: false,
      children: [
      <p key={'err'}>
        Algo salió mal, es posible que exista un ingreso parcial de datos... antes de continuar 
        comuníquese con el área de sistemas. Dele al botón de cerrar y copie toda la información en 
        una hoja o realice pantallazos.
        </p>]
    }))
  }

  // new entry
  const onSuccessNewTry = () => {
    dispatch(setPageToRender({
      ...pageControl, 
      developmentStatus: 'NewTry', 
      development:{...pageControl.development, paused: 0}
    }))

    const newState = {itShows: true, success: true, addNewRecord: true}
    dispatch(setFeedback({...feedback, ...newState }))
  }

  // paused
  const onSuccessPaused = () => {
    dispatch(setPageToRender({
      ...pageControl, 
      developmentStatus: 'Paused'
    }))

    const newState = {itShows: true, success: true}
    dispatch(setFeedback({...feedback, ...newState }))
  }

  // new entry
  const addAttemptTime = useAskMutation({onError})
  const updateNote = useAskMutation({enabled: !!addAttemptTime.data, onError})
  const addAttempt = useMultipleMutation({enabled: !!updateNote.data, onError, onSuccess: onSuccessNewTry})

  // paused
  const addPausedAttemptTime = useAskMutation({onError})
  const updatePausedNote = useAskMutation({enabled: !!addPausedAttemptTime.data, onError})
  const addPausedAttempt = useMultipleMutation({enabled: !!updatePausedNote.data, onError, onSuccess: onSuccessPaused})

  const handleNewTry = () => {
    const alerta = checkingInputs("NewTry");
    if (alerta.length !== 0) {
      return dispatch(setFeedback({ itShows: true, children: alerta }));
    }

    // adicionando el tiempo que demoro hacer el intento
    let submitData = {
      id_developmentrequest: pageControl.data.id_developmentrequest,
      attemps: pageControl.development.attemps,
      f_inicial: pageControl.development.f_inicial,
      f_final: new Date()
    }
    addAttemptTime.mutate({url: POST_ATTEMPT_TIME, method: 'post', data: submitData})

    // actualizando las nota que esta en la vista de varios
    submitData = {
      note: pageControl.development.note
    }
    updateNote.mutate({url: PUT_UPDATE_DEVELOPMENT + pageControl.data.id_developmentrequest, method: 'put', data: submitData})

    // adicionando cada id del intento mas otros datos
    const idArray = []
    for (let i = 0; i < pageControl.devData.length; i++) {
      idArray.push(axiosInstance.post(POST_ATTEMPT,
        {
          id_developmentrequest: pageControl.data.id_developmentrequest,
          id_user: user,
          id_starpoint: pageControl.record.id_products,
          base_resin: pageControl.development.base_resin,
          dosing: pageControl.development.dosing,
          scale: pageControl.development.scale,
          attemps: pageControl.development.attemps,
          paused: pageControl.development.paused > 0 ? pageControl.development.paused +1 : 0,
          position:  i + 1,
          material:  pageControl.devData[i].materialId,
          percentage:  pageControl.devData[i].percentage
      })) 
    }
    addAttempt.mutate({data: idArray})
  };

  //
  const handlePause = () => {
    const alerta = checkingInputs("NewTry");
    if (alerta.length !== 0) {
      return dispatch(setFeedback({ itShows: true, children: alerta }));
    }

    // adicionando el tiempo que demoro hacer el intento
    let submitData = {
      id_developmentrequest: pageControl.data.id_developmentrequest,
      attemps: pageControl.development.attemps,
      f_inicial: pageControl.development.f_inicial,
      f_final: new Date()
    }
    addPausedAttemptTime.mutate({url: POST_ATTEMPT_TIME, method: 'post', data: submitData})

    // actualizando las nota que esta en la vista de varios
    submitData = {
      note: pageControl.development.note
    }
    updatePausedNote.mutate({url: PUT_UPDATE_DEVELOPMENT + pageControl.data.id_developmentrequest, method: 'put', data: submitData})

    // adicionando cada id del intento mas otros datos
    const idArray = []
    for (let i = 0; i < pageControl.devData.length; i++) {
      idArray.push(axiosInstance.post(POST_ATTEMPT,
        {
          id_developmentrequest: pageControl.data.id_developmentrequest,
          id_user: user,
          id_starpoint: pageControl.record.id_products,
          base_resin: pageControl.development.base_resin,
          dosing: pageControl.development.dosing,
          scale: pageControl.development.scale,
          attemps: pageControl.development.attemps,
          paused: pageControl.development.paused +1,
          position:  i + 1,
          material:  pageControl.devData[i].materialId,
          percentage:  pageControl.devData[i].percentage
      })) 
    }
    addPausedAttempt.mutate({data: idArray})
  };

  //
  const handleAproved = () => {
    const alerta = checkingInputs("Aproved");
    if (alerta.length !== 0) {
      return dispatch(setFeedback({ itShows: true, children: alerta }));
    }

    dispatch(setPageToRender({...pageControl, developmentStatus: 'Aproved'}))

    const newState = {itShows: true, success: undefined}
    dispatch(setFeedback({...feedback, ...newState }))
  };

  return (
    <>
      {
      addAttemptTime.isLoading || addAttemptTime.isFetching ||
      updateNote.isLoading || updateNote.isFetching ||
      addAttempt.isLoading || addAttempt.isFetching && 
      <Loader />
      }

      <div onClick={() => handleNewTry()} className="row m-5">
        <button
          type="button"
          className="btn btn-primary"
          disabled={
            addAttemptTime.isFetching ||
            updateNote.isFetching ||
            addAttempt.isFetching
          }
        >
          Nuevo intento
        </button>
      </div>
      <div onClick={() => handlePause()} className="row m-5">
        <button
          type="button"
          className="btn btn-warning"
          disabled={
            addAttemptTime.isFetching ||
            updateNote.isFetching ||
            addAttempt.isFetching
          }
        >
          Pausar desarrollo
        </button>
      </div>
      <div onClick={() => handleAproved()} className="row m-5">
        <button
          type="button"
          className="btn btn-success"
          disabled={
            addAttemptTime.isFetching ||
            updateNote.isFetching ||
            addAttempt.isFetching
          }
        >
          Desarrollo Aprobado
        </button>
      </div>
    </>
  );
}
