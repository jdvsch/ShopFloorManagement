import React from "react";
import { useMutation } from "@tanstack/react-query";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { addData, updateData } from "./shema";
import {
  axiosInstance,
  Query,
  GET_ZONA,
  POST_NEW_PC,
  PUT_CLIENTS,
} from "../../../config/api/api";
import Feedback from "../../../components/feedback/Feedback";
import Loader from "../../../components/loader/Loader";
import { useSelector } from "react-redux";

export default function ClientForm({ type }) {
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );
  const userState = useSelector((state) => state.reducerUserState.userState);
  const [mutationFeedback, setMutationFeedback] = React.useState(false);
  const defaultValues = { ...pageControl.data };

  const query = Query({ key: ["zona"], url: GET_ZONA });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: "onBlur",
    resolver: yupResolver(type === "NewPC" ? addData : updateData),
  });

  const onSubmit = (formData) => {
    if (type === "NewPC") {
      const submitData = {
        ...formData,
        id_user: userState.id_user,
        is_potentialclient: "Y",
      };
      mutation.mutate([POST_NEW_PC, "post", submitData]);
    }

    if (type !== "NewPC") {
      const submitData = { ...formData };
      mutation.mutate([
        PUT_CLIENTS + pageControl.data.id_clients,
        "put",
        submitData,
      ]);
    }
  };

  const mutation = useMutation({
    mutationFn: async (SETUP) => {
      const data = await axiosInstance({
        url: SETUP[0],
        method: SETUP[1],
        data: SETUP[2],
      }).catch(() => {
        throw new Error("Un error a ocurrido");
      });
      return data;
    },
    enabled: false,
    onError: () => {
      setMutationFeedback({ success: "no", mutation });
    },
    onSuccess: () => {
      if (type === "NewPC") {
        setMutationFeedback({
          success: "yes",
          mutation,
          queryName: [],
          addNewRecord: false,
        });
      }

      if (type !== "NewPC") {
        setMutationFeedback({
          success: "yes",
          mutation,
          queryName: [],
          addNewRecord: false,
        });
      }
    },
  });

  return (
    <>
      {mutationFeedback && (
        <Feedback
          mutationFeedback={mutationFeedback}
          setMutationFeedback={setMutationFeedback}
        />
      )}

      {mutation.isLoading || (mutation.isFetching && <Loader />)}

      {!mutationFeedback && query.data && (
        <div className="container">
          <h2 className="text-primary fw-bold text-center">
            {type === "NewPC"
              ? "Crear cliente potencial"
              : type === "EditPC"
              ? "Editar cliente potencial"
              : "Editar cliente"}
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <label htmlFor="nombre" className="col-form-label">
                Nombre del cliente
              </label>
              <input
                {...register("nombre")}
                type="text"
                id="nombre"
                className="form-control"
              />
              <p className="bg-danger text-center text-white mt-1">
                {errors.nombre?.message}
              </p>

              <label htmlFor="zona" className="col-form-label">
                Zona de ubicación
              </label>
              <select
                {...register("zona")}
                id="zona"
                className="form-select"
                aria-label="Default select example"
              >
                <option></option>
                {query.data.map((zona) => {
                  return (
                    <option key={zona.zona} value={zona.zona}>
                      {zona.zona}
                    </option>
                  );
                })}
              </select>
              <p className="bg-danger text-center text-white mt-1">
                {errors.zona?.message}
              </p>

              {type !== "NewPC" && (
                <>
                  <label htmlFor="estado" className="col-form-label">
                    Estado
                  </label>
                  <select
                    {...register("estado")}
                    id="estado"
                    className="form-select"
                    aria-label="Default select example"
                  >
                    <option defaultValue></option>
                    <option value="ACTIVE">ACTIVO</option>
                    <option value="INACTIVE">INACTIVO</option>
                  </select>
                  <p className="bg-danger text-center text-white mt-1">
                    {errors.estado?.message}
                  </p>

                  {type !== "EditClient" && (
                    <>
                      <label
                        htmlFor="is_potentialclient"
                        className="col-form-label"
                      >
                        Pasarlo de cliente potencial a cliente?
                      </label>
                      <select
                        {...register("is_potentialclient")}
                        id="is_potentialclient"
                        className="form-select mb-2"
                        aria-label="Default select example"
                      >
                        <option defaultValue></option>
                        <option value="N">Si</option>
                      </select>
                    </>
                  )}
                </>
              )}
            </div>

            <button className="btn btn-success" type="submit">
              {type === "NewPC" ? "Ingresar" : "Actualizar datos"}
            </button>
          </form>
        </div>
      )}
    </>
  );
}
