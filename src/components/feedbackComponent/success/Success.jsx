import React from "react";
import "../styles.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setResetPageToRender } from "../../../redux/slices/pageToRenderSlice";
import { useQueryClient } from '@tanstack/react-query'
import { setResetFeedback, setFeedback } from "../../../redux/slices/feedbackSlice";

export default function Success() {
  const [timer, setTimer] = React.useState("0%");
  const pageControl = useSelector((state) => state.reducerPageToRender.pageToRender);
  const feedback = useSelector((state) => state.reducerFeedback.feedback)
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    dispatch(setFeedback({...feedback, itShows: false}));
  };

  const goHome = () => {
    dispatch(setResetFeedback());
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

      <div className="mt-5">
        {pageControl.page === "Dllo" ? (
          <button className="btn btn-warning" onClick={() => goBack()}>
            Volver a página anterior
          </button>
        ) : (
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
        )}
      </div>
    </div>
  );
}
