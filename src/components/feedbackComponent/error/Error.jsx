import React from "react";
import "../styles.css";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setResetFeedback, setFeedback } from "../../../redux/slices/feedbackSlice";

export default function Error() {
  const [timer, setTimer] = React.useState("0%");
  const pageControl = useSelector((state) => state.reducerPageToRender.pageToRender);
  const feedback = useSelector((state) => state.reducerFeedback.feedback)
  const dispatch = useDispatch()

  const navigate = useNavigate();

  React.useEffect(() => {
    setTimeout(() => {
      setTimer("50%");
    }, 1000);
  }, []);

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
            src="./img/spinner_logo_wg.png"
            alt="anquimico sas"
            className="successFecthDataCheck"
          />
        )}
      </div>

      {pageControl.page === "Dllo" ? (
        <span className="mt-1" style={{ width: "50%" }}>
          Los datos de tu desarrollo no se han perdido, intenta nuevamente el
          envío de los datos o vuelve a la página anterior y copialos en un
          lugar seguro
        </span>
      ) : (
        <div className="mt-1" style={{ width: "50%" }}>
          <p>
            Los datos ingresados no se han perdido, puedes volver a la página
            anterior y volver a intertar guardar los datos o 
            copialos en un lugar seguro.
          </p>
        </div>
      )}

      <div
        style={{ width: "100%" }}
        className="mt-5 d-flex justify-content-around"
      >
        <button className="btn btn-warning" onClick={() => goBack()}>
          Volver a página anterior
        </button>
        <button className="btn btn-success" onClick={() => goHome()}>
          Ir al inicio
        </button>
      </div>
    </div>
  );
}
