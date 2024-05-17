import React from 'react'

import { useDispatch, useSelector } from "react-redux";
import { setPageToRender } from '../../../../redux/slices/pageToRenderSlice';
import { GET_FORMULA_CUSTOMER, axiosInstance } from '../../../../config/api/api';
import { useQuery } from "@tanstack/react-query";

import Table from './table/Table'

export default function Record() {
  const dispatch = useDispatch();
  const pageControl = useSelector(
    (state) => state.reducerPageToRender.pageToRender
  );

  const existRecord = Object.keys(pageControl.record).length
  const [startingPoint, setStartingPoint] = React.useState(existRecord === 0 ? true : false)

  const query = useQuery({
    queryKey: ['id'],
    queryFn: async () => {
      const datas = await axiosInstance({
        url: GET_FORMULA_CUSTOMER + pageControl.record.id_clients,
      }).catch((err) => {
        console.log(err);
      });
      return datas.data;
    },
    enabled: false,
    gcTime: 1000,
  });

  React.useEffect(() => {
    if (existRecord !== 0) {
      query.refetch()
    }
  }, [pageControl.record])

  const createStartPoint = () => {
    const devData = []
    for (let i = 0; i < query.data.length; i++) {
      devData.push({ materialId: query.data[i].materialId, percentage: query.data[i].percentage });
    }
    dispatch(setPageToRender({starPoint: true, devData}))
  }
  
  
  return (
    <>
    {startingPoint &&
      <div className='d-flex justify-content-center mt-5'>
        <button type="button" className="btn btn-warning" onClick={()=>{setStartingPoint(!startingPoint)}}>Elegir punto de partida</button>
      </div>
    }

    {!startingPoint && existRecord === 0 &&
      <Table />
    }

    {existRecord !== 0 && query.data &&
      <div className='container mt-3'>
      <div className="row mt-5 align-items-center">
        <div className="col-6 text-center">
          <>
          <h6 className='text-primary fw-bold'>{pageControl.record.nombre}</h6>
          <h6 className='text-success fw-bold'>{pageControl.record.name}</h6>

          <table className='table table-hover'>
            <thead className='text-primary fw-bold'>
              <tr>
                <th>ID</th>
                <th>%</th>
              </tr>
            </thead>
            <tbody>
            {query.data.map((data, i)=>(
            <tr key={i} className='fw-bold'>
              <td>{data.materialId}</td>
              <td>{data.percentage}</td>
            </tr>
            ))
            }
            </tbody>
          </table>
          </> 
        </div>
        <div className="col-3 text-center">
            {!pageControl.starPoint ?
            <>
            <button  type="button" className="btn btn-success mb-5" onClick={createStartPoint}>Crear punto de partida</button>
            <button  type="button" className="btn btn-primary mt-5" onClick={()=>{dispatch(setPageToRender({record: {}}))}}>Buscar otra opción</button>
            </>
            :
            <button  type="button" className="btn btn-primary" onClick={()=>{dispatch(setPageToRender({starPoint: false, devData: []}))}}>Borrar punto de partida</button>
            }
        </div>
      </div>
      </div>
    }
    </>
  )
}
