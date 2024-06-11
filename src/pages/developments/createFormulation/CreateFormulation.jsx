import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { setPageToRender } from "../../../redux/slices/pageToRenderSlice";
import { POST_PRODUCT_DEVELOPMENT, PUT_UPDATE_WO } from "../../../config/api/api";
import useAskMutation from "../../../hooks/useAskMutation";

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    React.useEffect(() => {
      if (pageControl.subpage === 'Ver OT' && pageControl.development.id_productDevelopment === '') {
        mutation.mutate({url: PUT_UPDATE_WO + pageControl.data.id_developmentrequest, method: 'put', data: { id_states: 2 }})
        mutation.mutate({url: POST_PRODUCT_DEVELOPMENT, method: 'post', data: {id_developmentrequest: pageControl.data.id_developmentrequest}})
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageControl]);

    const onError = () => {
      //setMutationFeedback({ success: "no", mutation })
    }

    const onSuccess = (data) => {
      if (data.request.responseURL.includes('nuevoPD')) {
        dispatch(setPageToRender({development:
          {...pageControl.development, id_productDevelopment: data.data.insertId}}))
      }
    }

    const mutation = useAskMutation({onError, onSuccess})
  
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
  