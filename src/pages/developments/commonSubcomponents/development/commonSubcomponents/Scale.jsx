import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageToRender } from "../../../../../redux/slices/pageToRenderSlice";

export default function Scale() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );

  const insertRow = React.useRef(null);  

  const addNewRow = ()=>{
    if (insertRow.current.value) {
      const array = pageControl.devData.slice();
      array.splice(insertRow.current.value.replace(/\D+/g, ''), 0, { materialId: '', percentage: '' });
      dispatch(setPageToRender({devData: array}));
      } else {
        const array = pageControl.devData.slice();
        array.splice(0, 0, { materialId: '', percentage: '' });
        dispatch(setPageToRender({devData: array}));
      }
    }

  return (
    <>
      <label htmlFor="escala" className="col-form-label">
        Escala de trabajo ( % )
      </label>
      <input
        onBlur={(e) => {
          dispatch(
            setPageToRender({
              development: {
                ...pageControl.development,
                scale: e.target.value.replace(/\D+/g, ''),
              },
            })
          );
        }}
        defaultValue={pageControl.development.scale}
        type="text"
        className="form-control text-center"
        placeholder="por ejemplo 50"
      />

      <label htmlFor="fila" className="col-form-label mt-5">
        La fila nueva quedará en la posición:
      </label>
      <div className="row">
        <div className="col">
          <button
            onClick={addNewRow}
            type="button"
            className="btn btn-primary"
          >
            Insertar
          </button>
        </div>
        <div className="col">
          <input
            ref={insertRow}
            type="text"
            id="fila"
            className="form-control text-center"
          />
        </div>
      </div>

      <div className="row mt-5">
        <div>
          <button
            onClick={() => window.open(URL, '_blank')}
            type="button"
            className="btn btn-primary"
          >
            Ver ID
          </button>
        </div>
      </div>
    </>
  );
}
