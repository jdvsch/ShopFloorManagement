import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setPageToRender } from "../../../redux/slices/pageToRenderSlice";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance, POST_PRODUCT_DEVELOPMENT, PUT_UPDATE_WO } from "../../../config/api/api";

import Cleaning from "../commonSubcomponents/cleaning/Cleaning";
import Development from "../commonSubcomponents/development/Development";
import NumberOfAttemps from "../commonSubcomponents/numberOfAttemps/NumberOfAttemps";
import Record from "../commonSubcomponents/record/Record";
import Submenu from "../commonSubcomponents/submenu/Submenu";
import TableDevelopment from "../commonSubcomponents/tableDevelopment/TableDevelopment";
import Worksheet from "../../workOrders/commonSubcomponents/Worksheet";


export default function CreateFormulation() {
    const dispatch = useDispatch();
    const pageControl = useSelector(
      (state) => state.reducerPageToRender.pageToRender
    );
  
    React.useEffect(() => {
      pageControl.page !== "crearFormulacion" &&
        dispatch(setPageToRender({ page: "crearFormulacion", data: [], subpage:'table' }));
    }, []);


    React.useEffect(() => {
      if (pageControl.subpage === 'Ver OT' && pageControl.development.id_productDevelopment === '') {
      mutation.mutate([PUT_UPDATE_WO + pageControl.data.id_developmentrequest, "put", { id_states: 2 }]);
        mutation.mutate([POST_PRODUCT_DEVELOPMENT, "post", {id_developmentrequest: pageControl.data.id_developmentrequest}]);
      }
    }, [pageControl]);



    const mutation = useMutation({
      mutationFn: async (SETUP) => {
        const data = await axiosInstance({
          url: SETUP[0],
          method: SETUP[1],
          data: SETUP[2],
          enabled: SETUP[3]
        }).catch(() => {
          throw new Error("Un error a ocurrido");
        });
        return data;
      },
      enabled: false,
      onError: () => {
        // setMutationFeedback({ success: "no", mutation });
      },
      onSuccess: (data, SETUP) => {
        if (data.request.responseURL.includes('nuevoPD')) {
          dispatch(setPageToRender({development:
            {...pageControl.development, id_productDevelopment: data.data.insertId}}))
        }
      },
    });
  
    return (
      <>  
        {pageControl.subpage === 'table' && <TableDevelopment type="create" />}

        {pageControl.subpage !== "table" && <Submenu /> }

        {pageControl.subpage === 'Ver OT' && <Worksheet type="Ver OT" />}

        {pageControl.subpage === 'Historial' && <Record />}

        {pageControl.subpage === 'Limpieza' && <Cleaning />}

        {pageControl.subpage === 'Intentos' && <NumberOfAttemps />}

        {pageControl.subpage === 'Dllo' && <Development />}
      </>
    );
  }
  