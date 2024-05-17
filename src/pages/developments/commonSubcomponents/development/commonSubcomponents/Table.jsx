import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageToRender } from "../../../../../redux/slices/pageToRenderSlice";

export default function Table() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );

  const handleChangeRowValue = (e, row) => {
    const { name, value } = e.target;
    const array = [];
    pageControl.devData.map((data)=>{
      array.push({ materialId: data.materialId, percentage: data.percentage })
    })

    array[row][name] = value.replace(/\s+/g, "").replace(/,/g, ".");
    dispatch(setPageToRender({devData: array}))
  };

  const removeRow = (row) => {
    const devData = pageControl.devData.slice();
    devData.splice(row, 1);
    dispatch(setPageToRender({devData}))
  };

  const getHundred = () => {
    const array = [];
    pageControl.devData.map((data)=>{
      array.push({ materialId: data.materialId, percentage: data.percentage })
    })

    let add = 0
    for (let i = 0; i < pageControl.devData.length -1; i++) {
      add +=  +pageControl.devData[i].percentage*1000
    }

    array[pageControl.devData.length -1].percentage = 100 - add/1000;
    dispatch(setPageToRender({devData: array}))
  }

  React.useEffect(() => {
    if (pageControl.devData.length === 0) {
      dispatch(setPageToRender({devData: [{ materialId: '', percentage: '' }, { materialId: '', percentage: '' }, { materialId: '', percentage: '' }, { materialId: '', percentage: '' }]}))
    }

    let add = 0
    for (let i = 0; i < pageControl.devData.length; i++) {
      add +=  +pageControl.devData[i].percentage*1000
    }
    dispatch(setPageToRender({development: {...pageControl.development, sum: add/1000}}))
  },[pageControl.devData])

  return (
    <div>
      <h4 className="fw-bold text-primary">
        Intento # {pageControl?.attemps || 1}
      </h4>
      <table className="table table-hover">
        <thead>
          <tr>
            <th>Fila</th>
            <th>ID</th>
            <th>{pageControl.development.sum + ' %'}</th>
            <th>En balanza</th>
          </tr>
        </thead>
        <tbody>
          {pageControl.devData.map((fila, index) => (
            <tr key={index}>
              <td>
                {pageControl.devData.length !== 1 ? (
                  <button
                    onClick={() => removeRow(index)}
                    type="button"
                    className="btn btn-light"
                  >
                    {index}
                  </button>
                ) : (
                  <span>{index}</span>
                )}
              </td>
              <td>
                <input
                  onChange={(e) => handleChangeRowValue(e, index)}
                  className="text-center border border-0"
                  id="materialId"
                  name="materialId"
                  type="text"
                  value={fila.materialId}
                />
              </td>
              <td>
                <input
                  onChange={(e) => handleChangeRowValue(e, index)}
                  className="text-center border border-0"
                  id="percentage"
                  name="percentage"
                  type="text"
                  value={fila.percentage}
                />
              </td>
              <td>
              {index !== pageControl.devData.length-1 ?
                  (pageControl.devData[index].percentage*0.01*parseFloat(pageControl.development.scale)).toFixed(3)
                  :
                  <button onClick={()=>getHundred(index)} type="button" className="btn btn-light">{(pageControl.devData[index].percentage*0.01*parseFloat(pageControl.development.scale)).toFixed(3)}</button>
                  }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
