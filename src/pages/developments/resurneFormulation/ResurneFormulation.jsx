import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import { setPageToRender } from "../../../redux/slices/pageToRenderSlice";
import { GET_FORMULA_ATTEMPT_PAUSED, GET_PD, GET_RECORD, PUT_UPDATE_WO } from "../../../config/api/api";
import useAskMutation from "../../../hooks/useAskMutation";

import Cleaning from "../commonSubcomponents/cleaning/Cleaning";
import Development from "../commonSubcomponents/development/Development";
import NumberOfAttemps from "../commonSubcomponents/numberOfAttemps/NumberOfAttemps";
import Record from "../commonSubcomponents/record/Record";
import Submenu from "../commonSubcomponents/submenu/Submenu";
import TableDevelopment from "../commonSubcomponents/tableDevelopment/TableDevelopment";
import Worksheet from "../../workOrders/commonSubcomponents/Worksheet";

export default function ResurneFormulation() {
    const dispatch = useDispatch();
    const pageControl = useSelector(
      (state) => state.reducerPageToRender.pageToRender
    );
  
    React.useEffect(() => {
        pageControl.page !== "resumeFormulacion" &&
        dispatch(setPageToRender({ page: "resumeFormulacion", data: [], subpage:'table' }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    React.useEffect(() => {
        if (pageControl.data.length !== 0) {
            getLastAttempt.mutate({
                url: GET_FORMULA_ATTEMPT_PAUSED + pageControl.data.id_developmentrequest, 
                method: 'get'
            })

            getProductDevelompment.mutate({
                url: GET_PD + pageControl.data.id_developmentrequest, 
                method: 'get'
            })
            
            mutation.mutate({url: PUT_UPDATE_WO + pageControl.data.id_developmentrequest, method: 'put', data: { id_states: 2 }})
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pageControl.data]);

    React.useEffect(() => {
        if (getLastAttempt.data?.data) {
            console.log(getLastAttempt.data?.data);
        }

        if (getRecord.data?.data[0].id_clients) {
            const id_clients = getRecord.data?.data[0].id_clients
            const nombre = getRecord.data?.data[0].id_clients
            const id_products = getRecord.data?.data[0].id_clients
            const name = getRecord.data?.data[0].id_clients

            dispatch(setPageToRender({ 
                ...pageControl,
                record:{id_clients, nombre, id_products, name},
                starPoint:true
            }))
        } 

        if (getLastAttempt.data?.data && 
            getProductDevelompment.data?.data && 
            pageControl.devData.length === 0) {
            
            const devData = []
            let sum = 0
            getLastAttempt.data.data.map((data)=>{
                devData.push({
                    materialId:data.material,
                    percentage:data.percentage
                })
                sum = sum + data.percentage
        })

            const attemps = getLastAttempt.data.data[0].attemps
            const paused = getLastAttempt.data.data[0].paused
            const scale = getLastAttempt.data.data[0].scale
            const base_resin = getLastAttempt.data.data[0].base_resin
            const dosing = getLastAttempt.data.data[0].dosing === 0 ? '' : getLastAttempt.data.data[0].dosing
            const id_productDevelopment = getProductDevelompment.data.data[0].id_productdevelopment
            const note = getProductDevelompment.data.data[0].note

            console.log(getLastAttempt.data.data[0].id_starpoint);

            getRecord.mutate({
                url: GET_RECORD + getLastAttempt.data.data[0].id_starpoint, 
                method: 'get'
            })

            dispatch(setPageToRender({ 
                ...pageControl,
                development: {
                    ...pageControl.development,
                    sum, attemps, paused, scale, base_resin, dosing, id_productDevelopment, note
                },
                devData,
                record:{"id_clients":12,"nombre":"COLPLAST S.A.S","id_products":2,"name":"COLORAN LQ GRIS 203AR-10C"},
                starPoint:true
            }))
        }
    });

    const onError = () => {
      //setMutationFeedback({ success: "no", mutation })
    }

    const onSuccess = (data) => {
      if (data.request.responseURL.includes('nuevoPD')) {
        dispatch(setPageToRender({development:
          {...pageControl.development, id_productDevelopment: data.data.insertId}}))
      }
    }
    
    const getLastAttempt = useAskMutation({})
    const getProductDevelompment = useAskMutation({})
    const getRecord = useAskMutation({})
    const mutation = useAskMutation({onError, onSuccess})


    return (
      <>  
        {pageControl.subpage === 'table' && <TableDevelopment type="resume" />}

        {pageControl.subpage !== "table" && <Submenu /> }

        {pageControl.subpage === 'Ver OT' && <Worksheet type="Ver OT" />}

        {pageControl.subpage === 'Historial' && <Record />}

        {pageControl.subpage === 'Limpieza' && <Cleaning />}

        {pageControl.subpage === 'Intentos' && <NumberOfAttemps />}

        {pageControl.subpage === 'Dllo' && <Development />}
      </>
    );
  }
  