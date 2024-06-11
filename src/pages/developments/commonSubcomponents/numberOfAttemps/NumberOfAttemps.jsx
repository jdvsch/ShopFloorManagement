import React from 'react';
import useAskQuery from '../../../../hooks/useAskQuery'
import { axiosInstance, GET_MAX_ATTEMPTS_PD, GET_ATTEMPT_PD } from '../../../../config/api/api'
import { useSelector } from "react-redux";

export default function NumberOfAttemps() {
  const [attempts, setAttempts] = React.useState(null)
  const pageControl = useSelector((state) => state.reducerPageToRender.pageToRender);
  const query = useAskQuery({queryKey: ['attempt'], url: GET_MAX_ATTEMPTS_PD + pageControl.development.id_productDevelopment})

  const MultipleFetch = async() => {
    const promiseArray = []
    const dev = pageControl.data.id_developmentrequest
    query.data.map((data)=>{
      const attempt = data.attemps
      const paused = data.max
      promiseArray.push(axiosInstance.get(GET_ATTEMPT_PD + `${dev}/${attempt}/${paused}`))
    })
    const results = await Promise.all(promiseArray)
    setAttempts(results);
  }
  
  query?.data && attempts === null && MultipleFetch();

  return (
    <div className='container'>
      {attempts &&
        attempts.map((data, i)=>(
          <div key={i} className='mt-3'>
            <h3 className="fw-bold text-primary text-center">intento {data.data['0'].attemps}</h3>
            <table className="table table-hover">
              <thead>
                <tr className="text-center" >
                  <th>Posición</th>
                  <th>ID</th>
                  <th>%</th>
                </tr>
              </thead>
              <tbody>
                {data.data.map((data, i)=>(
                <tr key={i} className="text-center" >
                  <td>{i+1}</td>
                  <td>{data.material}</td>
                  <td>{data.percentage}</td>
                </tr>
                ))
                }
                {data.data['0'].note &&
                <tr>
                  <td colSpan='3'> <b>Nota al pausarse:</b> {data.data['0'].note}</td>
                </tr>
                }
              </tbody>
            </table>
          </div>
        ))
      }
    </div>
  )
}
