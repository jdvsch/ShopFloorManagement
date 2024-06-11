import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPageToRender } from "../../../../redux/slices/pageToRenderSlice";
import useTextareaCounter from "../../../../hooks/useTextareaCounter";
import { setFeedback } from "../../../../redux/slices/feedbackSlice";
import useAskMutation, {
  useMultipleMutation,
} from "../../../../hooks/useAskMutation";
import {
  axiosInstance,
  POST_NEW_PRODUCT,
  POST_NEW_PROMAT,
} from "../../../../config/api/api";
import Loader from "../../../../components/loader/Loader";

// eslint-disable-next-line react/prop-types
export default function ProductForm({ type }) {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );
  const feedback = useSelector((state) => state.reducerFeedback.feedback);

  const insertRow = React.useRef(null);
  const textarea = useTextareaCounter(0);

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

  const onSuccess = () => {
    const newState = { itShows: true, success: true, addNewRecord: true };
    dispatch(setFeedback({ ...feedback, ...newState }));
  };

  const addNewProduct = useAskMutation({ onError });

  console.log(addNewProduct?.data?.data);

  const addProductMaterials = useMultipleMutation({ onError, onSuccess });

  const add = (data, limit, subdata) => {
    let suma = 0;
    for (let i = 0; i < limit; i++) {
      suma += parseFloat(data[i][subdata] * 1000);
    }
    return dispatch(
      setPageToRender({
        submitData: { ...pageControl.submitData, porce: suma / 1000 },
      })
    );
  };

  React.useEffect(() => {
    dispatch(
      setPageToRender({
        submitData: {
          porce: 0,
          note: "",
          selectTypeFormula: 0,
          productName: "",
        },
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleInputChange = (type, e) => {
    if (type === "note") {
      textarea.total(e);
      dispatch(
        setPageToRender({
          submitData: { ...pageControl.submitData, note: e.target.value },
        })
      );
    }

    if (type === "selectType") {
      dispatch(
        setPageToRender({
          submitData: {
            ...pageControl.submitData,
            selectTypeFormula: e.target.value,
          },
        })
      );
    }

    if (type === "productName") {
      dispatch(
        setPageToRender({
          submitData: {
            ...pageControl.submitData,
            productName: e.target.value,
          },
        })
      );
    }
  };

  const handleChangeRowValue = (e, row) => {
    const { name, value } = e.target;
    const array = [];
    pageControl.devData.map((data) => {
      array.push({ materialId: data.materialId, percentage: data.percentage });
    });

    array[row][name] = value.replace(/\s+/g, "").replace(/,/g, ".");
    dispatch(setPageToRender({ devData: array }));

    add(array, array.length, "percentage");
  };

  const removeRow = (row) => {
    const devData = pageControl.devData.slice();
    devData.splice(row, 1);
    dispatch(setPageToRender({ devData }));
  };

  const addNewRow = () => {
    if (insertRow.current.value) {
      const array = pageControl.devData.slice();
      array.splice(insertRow.current.value.replace(/\D+/g, ""), 0, {
        materialId: "",
        percentage: "",
      });
      dispatch(setPageToRender({ devData: array }));
    } else {
      const array = pageControl.devData.slice();
      array.splice(0, 0, { materialId: "", percentage: "" });
      dispatch(setPageToRender({ devData: array }));
    }
  };

  //check fields ID and % for new try and pause before update
  const checkNewEntry = () => {
    let alerta = [];

    if (
      pageControl.submitData.selectTypeFormula === "0" &&
      (type === "Crear Prod" || type === "Editar Prod")
    ) {
      alerta.push(<p key={1}>Por favor elija el tipo de fórmula</p>);
    }

    if (pageControl.submitData.porce !== 100) {
      alerta.push(
        <p key={2}>La suma de los porcentajes es diferente de 100%</p>
      );
    }

    if (type === "Crear Prod" && pageControl.submitData.productName === "") {
      alerta.push(<p key={3}>Debe darle nombre a la fórmula</p>);
    }

    for (let i = 0; i < pageControl.devData.length; i++) {
      if (pageControl.devData[i]["materialId"] === "") {
        alerta.push(
          <p key={"A" + i.toString()}>
            Verifique el valor del ID de la fila: <strong>{i}</strong>
          </p>
        );
      }
      if (pageControl.devData[i]["percentage"] === "") {
        alerta.push(
          <p key={"B" + i.toString()}>
            Verifique el valor del porcentaje de la fila: <strong>{i}</strong>
          </p>
        );
      }
    }
    return alerta;
  };

  const applyChanges = (e) => {
    console.log(e);
    const alerta = checkNewEntry();
    if (alerta.length !== 0) {
      alerta.unshift(
        <p key={0}>
          <b>Se encontraron los siguientes errores:</b>
        </p>
      );
      return dispatch(setFeedback({ itShows: true, children: alerta }));
    }

    if (e === "crearFormula") {
      const data = 
        {
          name: pageControl.submitData.productName
            .replace(/\s+/g, " ")
            .trim()
            .toUpperCase(),
          ofimatica: 0,
          state: "ACTIVE",
          createdAt: new Date(),
          updatedAt: new Date(),
          type: pageControl.submitData.selectTypeFormula,
          options: '',
          id_client: pageControl.data.id_clients,
        }

      console.log(data);

      //addNewProduct.mutate({ url: POST_NEW_PRODUCT, method: "post", data });
    }
  };

  React.useEffect(() => {
    const submitData = [];
    if (addNewProduct?.data) {
      for (let i = 0; i < pageControl.devData.length; i++) {
        submitData.push(
          axiosInstance.post(POST_NEW_PROMAT, {
            positionInProduct: i + 1,
            materialId: pageControl.devData[i].materialId,
            percentage: pageControl.devData[i].percentage,
            createdAt: new Date(),
            updatedAt: new Date(),
            //productId: addNewProduct.data[0].data.insertId,
            weighingMachineId: 1,
            secondaryLimitScale: 50,
            secondarylimitScaleUnitId: 2,
            secondaryWeighingMachineId: 2,
          })
        );
      }

      //addProductMaterials.mutate({ data: submitData });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [addNewProduct?.data]);

  const disabled = addNewProduct.isLoading ||
    addNewProduct.isFetching ||
    addProductMaterials.isLoading ||
    addProductMaterials.isFetching;

  return (
    <>
      {disabled && <Loader />}

      {!disabled && (
        <div className="container mt-3">
          <div className="row mt-5">
            <div className="col-3 text-center">
              <label htmlFor="fila" className="col-form-label">
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

              {type !== "Crear Inter" && (
                <>
                  <label className="mt-4" htmlFor="type">
                    Tipo de fórmula
                  </label>
                  <select
                    onChange={(e) => handleInputChange("selectType", e)}
                    defaultValue={pageControl.submitData.selectTypeFormula}
                    disabled={type === "Editar Inter" ? true : false}
                    id="type"
                    className="mb-3 form-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue value="0"></option>
                    <option value="1">Original</option>
                    <option value="2">Variante</option>
                    {type === "Editar Inter" && (
                      <option value="3">Premezcla</option>
                    )}
                  </select>
                  {pageControl.submitData.selectTypeFormula === "2" && (
                    <>
                      <textarea
                        defaultValue={pageControl.submitData.note}
                        onChange={(e) => handleInputChange("note", e)}
                        id="note"
                        className="form-control"
                        rows="3"
                      />
                      <p className="form-text text-start">
                        {" "}
                        <span>{textarea.counter}/255 caracteres</span>{" "}
                        <span className="bg-danger text-center text-white">
                          {textarea.counter > 255 &&
                            "No debe de exceder de 255 caracteres"}{" "}
                        </span>
                      </p>
                    </>
                  )}

                  {(type === "Editar Prod" || type === "Editar Inter") && (
                    <>
                      <label htmlFor="ofima" className="col-form-label mt-2">
                        Ofimática
                      </label>
                      <div className="col">
                        <input
                          type="text"
                          id="ofima"
                          className="form-control text-center"
                        />
                      </div>

                      <label className="mt-4" htmlFor="state">
                        Estado
                      </label>
                      <select
                        id="state"
                        className="mb-3 form-select"
                        aria-label="Default select example"
                      >
                        <option value="ACTIVE">Activo</option>
                        <option value="INACTIVE">Inactivo</option>
                      </select>
                    </>
                  )}
                </>
              )}
            </div>

            <div className="col-6 text-center justify-content-center">
              {type !== "Crear Inter" && (
                <>
                  <h5 className="fw-bold text-primary text-center">
                    Nombre del cliente
                  </h5>
                  <p>{pageControl.data.nombre}</p>
                </>
              )}

              <h5 className="fw-bold text-primary text-center">
                {type === "Crear Prod" || type === "Editar Prod"
                  ? "Nombre de la fórmula"
                  : "Nombre del producto intermedio"}
              </h5>
              <input
                defaultValue={pageControl.submitData.productName}
                onChange={(e) => handleInputChange("productName", e)}
                disabled={type === "Editar Inter" ? true : false}
                className="form-control text-center"
                type="text"
              ></input>
              <table className="table table-hover mt-4">
                <thead>
                  <tr>
                    <th>Fila</th>
                    <th>ID</th>
                    <th>
                      <b>{pageControl.submitData.porce} %</b>
                    </th>
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="col-3 text-center">
              {type === "Crear Prod" ? (
                <>
                  <button
                    onClick={() => applyChanges("crearFormula")}
                    type="button"
                    className="btn btn-success m-5"
                  >
                    Crear fórmula
                  </button>
                </>
              ) : type === "Editar Prod" ? (
                <>
                  <button
                    //onClick={() => handlecliente()}
                    type="button"
                    className="btn btn-warning m-5"
                  >
                    Cambiar cliente
                  </button>
                  <button
                    //onClick={() => handleNewFormula()}
                    type="button"
                    className="btn btn-success m-5"
                  >
                    Aplicar cambios
                  </button>
                </>
              ) : type === "Crear Inter" ? (
                <>
                  <button
                    //onClick={() => handleNewIntermedio()}
                    type="button"
                    className="btn btn-success m-5"
                  >
                    Crear P. intermendio
                  </button>
                </>
              ) : (
                <>
                  <button
                    //onClick={() => handleNewIntermedio()}
                    type="button"
                    className="btn btn-success m-5"
                  >
                    Aplicar cambios
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
