import React from "react";

import { DateTime } from "luxon";
import { useDispatch, useSelector } from "react-redux";
import { setPageToRender } from "../../../../../redux/slices/pageToRenderSlice";
import useAskMutation from "../../../../../hooks/useAskMutation";
import { POST_CLEANING_TIME } from "../../../../../config/api/api";

export default function Times() {
  const dispatch = useDispatch();
  const pageControl = useSelector((state) => state.reducerPageToRender.pageToRender);


  const f_inicial = React.useRef("");
  const f_final = React.useRef("");
  const dateError = React.useRef("");

  const onError = () => {
    // dispatch(setFeedback({...feedback, itShows: true, success: false}))
  }

  const mutation = useAskMutation({onError})

  const handleTiempo = () => {
    if (
      f_inicial.current.value >= f_final.current.value ||
      !f_inicial.current.value ||
      !f_final.current.value
    ) {
      dateError.current.innerHTML = `Error en las fechas, verifique que esten correctas.`;
    } else {
      dateError.current.innerHTML = ``;

      var times = pageControl.development.times.slice();

      times.push({ f_inicial: f_inicial.current.value, f_final: f_final.current.value });

      const submitData = {
        id_productdevelopment: pageControl.data.id_developmentrequest, 
        f_inicial: f_inicial.current.value, 
        f_final: f_final.current.value
      }

      mutation.mutate({url: POST_CLEANING_TIME, method: 'post', data: submitData})

      dispatch(
        setPageToRender({
          development: {
            ...pageControl.development,
            times
          },
        })
      );
    }
  };

  return (
    <>
      <h4 className="text-primary fw-bold text-center">Tiempos de limpieza</h4>

      <div className="row d-flex justify-content-center mt-3">
        <div className="col-4">
          <h5 className="text-center">Fecha y hora inicial</h5>
          <input
            ref={f_inicial}
            className="form-control"
            type="datetime-local"
          />
        </div>

        <div className="col-4">
          <h5 className="text-center">Fecha y hora final</h5>
          <input ref={f_final} className="form-control" type="datetime-local" />
        </div>
        <div className="col-2 d-flex align-items-end">
          <button className="btn btn-success" onClick={handleTiempo}>
            Añadir
          </button>
        </div>
      </div>

      <div className="col-10">
        <p
          className="bg-danger text-center text-white mt-1"
          ref={dateError}
        ></p>
      </div>

      <div className="row mt-5">
        <h4 className="text-primary fw-bold text-center">Tiempos ingresados</h4>
        {pageControl.development?.times !== undefined 
        ? 
          <table className="table table-hover text-center">
            <thead className="text-primary fw-bold">
              <tr>
                <th>Hora inicial</th>
                <th>Hora final</th>
              </tr>
            </thead>

            <tbody>
            {pageControl.development.times.map((data, i) => (
              <tr key={i} className="fw-bold">
                <td>
                  {DateTime.fromISO(data.f_inicial)
                    .setLocale("sp")
                    .toLocaleString(DateTime.DATETIME_MED)}
                </td>
                <td>
                  {DateTime.fromISO(data.f_final)
                    .setLocale("sp")
                    .toLocaleString(DateTime.DATETIME_MED)}
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        :
          <h3 className="text-danger fw-bold text-center">
          No se ha ingresado tiempo de limpieza!!!
          </h3>
        }
      </div>
    </>
  );
}
