import React from "react";
import { GET_RESINS } from "../../../../../config/api/api";
import useAskQuery from "../../../../../hooks/useAskQuery";
import { useDispatch, useSelector } from "react-redux";
import { setPageToRender } from "../../../../../redux/slices/pageToRenderSlice";
import useTextareaCounter from "../../../../../hooks/useTextareaCounter";

export default function Resins() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );

  const scaleError = React.useRef("");

  const textarea1 = useTextareaCounter(
    pageControl.development.note ? pageControl.development.note.length : 0
  );

  const resins = useAskQuery({queryKey: ['resinas'], url: GET_RESINS})

  const handleDosing = (e) => {
    const value = e.target.value.replace(/,/g, ".").trim();

    if (isNaN(value)) {
      scaleError.current.innerHTML = "El valor debe ser un número";
    } else {
      scaleError.current.innerHTML = "";
    }
  };


  return (
    <>
    {resins.data &&
    <>
      <label className="mt-3" htmlFor="resin">
        Resina base
      </label>
      <select
        defaultValue={pageControl.development.base_resin}
        className="form-select"
        id="resin"
        onBlur={(e) => {
          dispatch(
            setPageToRender({
              development: {
                ...pageControl.development,
                base_resin: e.target.value,
              },
            })
          );
        }}
      >
        <option></option>
        {resins.data.map((data) => (
          <option key={data.id} value={data.id}>
            {data.name + " - " + data.base_resin}
          </option>
        ))}
      </select>

      <label className="mt-5" htmlFor="dosificacion">
        Dosificación (g/Kg)
      </label>
      <input
        defaultValue={pageControl.development.dosing}
        onChange={(e) => handleDosing(e)}
        onBlur={(e) => {
          dispatch(
            setPageToRender({
              development: {
                ...pageControl.development,
                dosing: e.target.value,
              },
            })
          );
        }}
        className="form-control"
        type="text"
        name="docificacion"
        id="docificacion"
      />
      <p className="bg-danger text-center text-white mt-1" ref={scaleError}></p>

      <label className="mt-5" htmlFor="dosificacion">
        Notas del desarrollo
      </label>
      <textarea
        defaultValue={pageControl.development.note}
        onChange={(e) => textarea1.total(e)}
        id="note"
        className="form-control"
        rows="4"
        onBlur={(e) => {
            dispatch(
              setPageToRender({
                development: {
                  ...pageControl.development,
                  note: e.target.value,
                },
              })
            );
          }}
      />
      <p className="form-text">
        {" "}
        <span>{textarea1.counter}/255 caracteres</span>{' '}
          <span className="bg-danger text-center text-white">
          {textarea1.counter > 255 &&
          'No debe de exceder de 255 caracteres'}{' '} 
          </span>
      </p>
    </>
    }
    </>
  );
}
