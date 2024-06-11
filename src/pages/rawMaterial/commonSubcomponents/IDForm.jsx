import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./shema";
import useTextareaCounter from "../../../hooks/useTextareaCounter";
import {
  GET_ID_NORMATIVE,
  GET_ID_TYPE,
  GET_ID_INFO,
  POST_CREATE_ID,
  PUT_UPDATE_ID,
} from "../../../config/api/api";
import useAskMutation from "../../../hooks/useAskMutation";
import useAskQuery from "../../../hooks/useAskQuery";
import FeedbackComponent from "../../../components/feedbackComponent/FeedbackComponent";
import Loader from "../../../components/loader/Loader";
import { useSelector, useDispatch } from "react-redux";
import { setFeedback } from "../../../redux/slices/feedbackSlice";

// eslint-disable-next-line react/prop-types
export default function IDForm({ type }) {
  const pageControl = useSelector((state) => state.reducerPageToRender.pageToRender);
  const feedback = useSelector((state) => state.reducerFeedback.feedback)
  const dispatch = useDispatch()

  const idNormative = useAskQuery({
    queryKey: ["idNormative"],
    url: GET_ID_NORMATIVE,
  });
  const idType = useAskQuery({ queryKey: ["idType"], url: GET_ID_TYPE });

  const onError = () => {
    dispatch(setFeedback({...feedback, itShows: true, success: false}))
  };

  const onSuccess = () => {
    if (type === "Crear ID") {
      const newState = {itShows: true, success: true, addNewRecord: false}
      dispatch(setFeedback({...feedback, ...newState }))
    }

    if (type === "Editar ID") {
      const newState = {itShows: true, success: true, addNewRecord: true, queryName: ['Editar ID']}
      dispatch(setFeedback({...feedback, ...newState }))
    }
  };

  const mutation = useAskMutation({ onError, onSuccess })

  let defaultValues;

  if (type === "Ver ID" || type === "Editar ID") {
    defaultValues = { ...pageControl.data };
  }

  if (type === "Crear ID") {
    defaultValues = {
      id: "",
      notWeigh: "YES",
      state: "ACTIVE",
      note: "",
      contratype: "",
      type: "",
      temperature: "",
      norm: "",
      lightFastness: "",
      weatherFastness: "",
      migrationFastness: "",
      ofimatica: "",
      color: "",
    };
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const textarea1 = useTextareaCounter(
    defaultValues.note ? defaultValues.note.length : 0
  );

  const checkID = (e) => {
    if (
      type === "Crear ID" &&
      e.target.value !== "" &&
      Number.isInteger(+e.target.value)
    ) {
      fetch(GET_ID_INFO + e.target.value)
        .then((res) => res.json())
        .then((data) => {
          if (data.length > 0) {
            alert("este ID ya existe");
          }
        })
        .catch(() => console.log("error"));
    } else {
      alert("solo ingrese números");
    }
  };

  const onSubmit = (formData) => {
    const submitData = { ...formData };

    if (type === "Crear ID") {
      const newdata = { ...submitData, name: `${"ID" + submitData.id}` };

      mutation.mutate({ url: POST_CREATE_ID, method: "post", data: newdata });
    }

    if (type === "Editar ID") {
      const ID = submitData.id;

      mutation.mutate({
        url: PUT_UPDATE_ID + ID,
        method: "put",
        data: submitData,
      });
    }
  };

  return (
    <>
      {feedback.itShows &&
        <FeedbackComponent></FeedbackComponent>
      }

      {(mutation.isLoading || mutation.isFetching) && <Loader />}

      {!feedback.itShows && idNormative.data && idType.data && (
        <div className="container">
          <h3 className="text-primary fw-bold text-center">{type}</h3>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col">
                <label htmlFor="id" className="col-form-label fw-bold">
                  ID
                </label>
                <input
                  {...register("id")}
                  onBlur={(e) => checkID(e)}
                  disabled={type === "Crear ID" ? false : true}
                  type="text"
                  id="id"
                  className="form-control"
                />
                <p className="bg-danger text-center text-white mt-1">
                  {errors.id?.message}
                </p>
              </div>

              <div className="col">
                <label htmlFor="contratype" className="col-form-label fw-bold">
                  Contratipo
                </label>
                <input
                  {...register("contratype")}
                  type="text"
                  id="contratype"
                  className="form-control"
                />
                <p className="bg-danger text-center text-white mt-1">
                  {errors.contratype?.message}
                </p>
              </div>

              <div className="col">
                <label htmlFor="color" className="col-form-label fw-bold">
                  Color
                </label>
                <input
                  {...register("color")}
                  type="text"
                  id="color"
                  className="form-control"
                />
                <p className="bg-danger text-center text-white mt-1">
                  {errors.color?.message}
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label
                  htmlFor="migrationFastness"
                  className="col-form-label fw-bold"
                >
                  Resisetencia a la migración
                </label>
                <input
                  {...register("migrationFastness")}
                  type="text"
                  id="migrationFastness"
                  className="form-control"
                />
                <p className="bg-danger text-center text-white mt-1">
                  {errors.migrationFastness?.message}
                </p>
              </div>

              <div className="col">
                <label
                  htmlFor="lightFastness"
                  className="col-form-label fw-bold"
                >
                  Resisetencia a la luz
                </label>
                <input
                  {...register("lightFastness")}
                  type="text"
                  id="lightFastness"
                  className="form-control"
                />
                <p className="bg-danger text-center text-white mt-1">
                  {errors.lightFastness?.message}
                </p>
              </div>

              <div className="col">
                <label
                  htmlFor="weatherFastness"
                  className="col-form-label fw-bold"
                >
                  Resisetencia a la interperie
                </label>
                <input
                  {...register("weatherFastness")}
                  type="text"
                  id="weatherFastness"
                  className="form-control"
                />
                <p className="bg-danger text-center text-white mt-1">
                  {errors.weatherFastness?.message}
                </p>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="temperature" className="col-form-label fw-bold">
                  Temperatura máxima
                </label>
                <input
                  {...register("temperature")}
                  type="text"
                  id="temperature"
                  className="form-control"
                />
                <p className="bg-danger text-center text-white mt-1">
                  {errors.temperature?.message}
                </p>
              </div>

              <div className="col">
                <label htmlFor="norm" className="col-form-label fw-bold">
                  Norma
                </label>
                <select
                  {...register("norm")}
                  id="norm"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option defaultValue></option>
                  {idNormative.data.map((idNormativa) => (
                    <option key={idNormativa.id} value={idNormativa.id}>
                      {idNormativa.norma}
                    </option>
                  ))}
                </select>
                <p className="bg-danger text-center text-white mt-1">
                  {errors.norm?.message}
                </p>
              </div>

              <div className="col">
                <label htmlFor="type" className="col-form-label fw-bold">
                  Tipo
                </label>
                <select
                  {...register("type")}
                  id="type"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option defaultValue></option>
                  {idType.data.map((idtype) => (
                    <option
                      key={idtype.id_materialtype}
                      value={idtype.id_materialtype}
                    >
                      {idtype.type}
                    </option>
                  ))}
                </select>
                <p className="bg-danger text-center text-white mt-1">
                  {errors.type?.message}
                </p>
              </div>
            </div>

            <div className="row">
              <label htmlFor="note" className="col-form-label fw-bold">
                Nota
              </label>
              <div className="col">
                <textarea
                  {...register("note")}
                  id="note"
                  className="form-control"
                  rows="2"
                  onChange={textarea1.total}
                />
                <p className="bg-danger text-center text-white mt-1">
                  {errors.note?.message}
                </p>
                <div className="form-text">
                  {" "}
                  <span>{textarea1.counter}/255 caracteres</span>{" "}
                  <span className="bg-danger text-center text-white">
                    {textarea1.counter > 255 &&
                      "No debe de exceder de 255 caracteres"}{" "}
                  </span>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col">
                <label htmlFor="notWeigh" className="col-form-label fw-bold">
                  Se pesa en mezcla?
                </label>
                <select
                  {...register("notWeigh")}
                  id="notWeigh"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="YES" defaultValue>
                    Si
                  </option>
                  <option value="NO">No</option>
                </select>
                <p className="bg-danger text-center text-white">
                  {errors.notWeigh?.message}
                </p>
              </div>

              <div className="col">
                <label htmlFor="state" className="col-form-label fw-bold">
                  Estado
                </label>
                <select
                  {...register("state")}
                  id="state"
                  className="form-select"
                  aria-label="Default select example"
                >
                  <option value="ACTIVE" defaultValue>
                    Activo
                  </option>
                  <option value="INACTIVE">Inactivo</option>
                </select>
                <p className="bg-danger text-center text-white mt-1">
                  {errors.state?.message}
                </p>
              </div>
              <div className="col">
                <label htmlFor="ofimatica" className="col-form-label fw-bold">
                  Ofimática
                </label>
                <input
                  {...register("ofimatica")}
                  type="text"
                  id="ofimatica"
                  className="form-control"
                />
                <p className="bg-danger text-center text-white mt-1">
                  {errors.ofimatica?.message}
                </p>
              </div>
            </div>

            {type !== "Ver ID" && (
              <button className="btn btn-success mb-2" type="submit">
                {type === "Crear ID" ? "Ingresar" : "Editar ID"}
              </button>
            )}
          </form>
        </div>
      )}
    </>
  );
}
