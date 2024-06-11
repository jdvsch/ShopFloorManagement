import React from "react";
import "../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setResetPageToRender, setPageToRender } from "../../../redux/slices/pageToRenderSlice";
import { useQueryClient } from '@tanstack/react-query'
import { setResetFeedback, setFeedback } from "../../../redux/slices/feedbackSlice";

import useAskMutation from "../../../hooks/useAskMutation";
import { PUT_ATTEMPT_NOTE, PUT_UPDATE_WO } from "../../../config/api/api";

export default function Success() {
  const [timer, setTimer] = React.useState("0%");
  const pageControl = useSelector((state) => state.reducerPageToRender.pageToRender);
  const feedback = useSelector((state) => state.reducerFeedback.feedback)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const pauseNote = React.useRef(null);

  const mutation = useAskMutation({})

  React.useEffect(() => {
    setTimeout(() => {
      setTimer("50%");
    }, 1000);
  }, []);

  const queryClient = useQueryClient()

  const addNewRecord = () => {
    const queryName = feedback.queryName
    for (let i = 0; i < queryName.length; i++) {
      queryClient.removeQueries({ queryKey:[`${queryName[i]}`]})
    }

    const goto = pageControl.page;
    dispatch(setResetFeedback());
    dispatch(setResetPageToRender());
    navigate(`/${goto}`);
  };

  const goBack = () => {
    dispatch(setFeedback({
      ...feedback, 
      itShows: false
    }));

    dispatch(setPageToRender({
      ...pageControl,
      development: {
        ...pageControl.development, 
        attemps: pageControl.development.attemps + 1,
        f_inicial: new Date()
      }
    }));
  };

  const goHome = () => {
    if (pageControl.developmentStatus === "Paused") {
      const note = pauseNote.current.value
      const id1 = pageControl.data.id_developmentrequest //id_developmentrequest
      const id2= pageControl.development.attemps //attemps
      const id3 = pageControl.development.paused + 1 //paused
      mutation.mutate({url: PUT_ATTEMPT_NOTE + id1 + '/' + id2 + '/' + id3, method: 'put', data: {note}})
      mutation.mutate({url: PUT_UPDATE_WO + id1, method: 'put', data: { id_states: 3 }})
    }
    dispatch(setResetFeedback());
    dispatch(setResetPageToRender())
    navigate(`/dashboard`);
  };

  return (
    <div className="centerElementDiv">
      <div>
        {timer === "0%" && (
          <img
            src="./img/spinner_logo.png"
            alt="anquimico sas"
            className="successFecthDataLogo"
          />
        )}

        {timer !== "0%" && (
          <img
            src="./img/spinner_logo_gd.png"
            alt="anquimico sas"
            className="successFecthDataCheck"
          />
        )}
      </div>

      <div className="mt-2 text-center">
        {/* NewTry */}
        {pageControl.developmentStatus === "NewTry" &&
        <>
          <p>
          <strong>Se ingresó el intento número {pageControl.development.attemps} con éxito.</strong>
          </p>
          
          <button className="btn btn-warning" onClick={() => goBack()}>
            Volver al desarrollo
          </button>
        </>
        }

        {/* Paused */}
        {pageControl.developmentStatus === "Paused" &&
        <>
        <p>
          <strong>Se pausó el intento número {pageControl.development.attemps} con éxito.</strong>
        </p>
        <div className="col">
          <div className="row mb-3">
            <label className="mb-1" htmlFor="note">Nota recordatoria de la pausa</label>
            <textarea id="note" ref={pauseNote}></textarea>
          </div>

          <div>
          <button className="btn btn-warning" onClick={() => goHome()}>
            Añadir nota y salir
          </button>
          </div>
        </div>
        </>
        }

        {/* Aproved */}
        {pageControl.developmentStatus === "Aproved" &&
          <button className="btn btn-warning" onClick={() => goHome()}>
            Salir
          </button>
        }

        {/* Any other case */}
        {pageControl.developmentStatus === "" &&
          <div
          style={{ width: "50vw" }}
          className="mt-5 d-flex justify-content-around"
          >
            <button className="btn btn-warning" onClick={() => goHome()}>
              Ir al inicio
            </button>
            {feedback.addNewRecord && (
              <button
                className="btn btn-success"
                onClick={() => addNewRecord()}
              >
                Repetir acción
              </button>
            )}
          </div>
        }
      </div>
    </div>
  );
}
