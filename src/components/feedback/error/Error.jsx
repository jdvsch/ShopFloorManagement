import React from 'react'
import "../styles.css";
import { useSelector } from 'react-redux'
import Loader from '../../loader/Loader';

export default function Error({query}) {
  const [timer, setTimer] = React.useState("0%")
  const pageControl = useSelector((state) => state.reducerPageToRender.pageToRender)

  React.useEffect(() => {
    setTimeout(() => {
      setTimer("50%");
    }, 1000);
  }, []);

  const tryFecthAgain = () => {
    query.refetch();
  }
  
  const goBack = () => {
    console.log('back');
    
  } 

  return (
    <>
      {query.isLoading || query.isFetching &&
        <Loader/>
      }

      {!query.isLoading || !query.isFetching &&
        <div className="centerElementDiv">
          <div>
          {timer === "0%" && (
            <img
              src="./img/spinner_logo.png"
              alt="anquimico sas"
              className="successFecthDataLogo"
            />
          )}
    
          {timer !== "0%" && (
            <img
            src="./img/spinner_logo_wg.png"
            alt="anquimico sas"
            className="successFecthDataCheck"
          />
          )}
          </div>
    
          {pageControl.page === 'Dllo' ?
            <span className='mt-1' style={{width: '50%'}}>
              Los datos de tu desarrollo no se han perdido, intenta nuevamente el envío de los datos
              o vuelve a la página anterior y copialos en un lugar seguro
            </span> :
            <div className='mt-1' style={{width: '50%'}}>
              <p>Algo salió mal, puedes:</p>
              <p>salir de esta página, seleccionando cualquier opción del menu</p>
              <p>intentar nuevamente el envío de los datos</p>
              <p>volver a la página anterior y copiar la información en un lugar seguro</p>
            </div>
          }
    
          <div style={{width: '100%'}} className="mt-5 d-flex justify-content-around">
            <button className="btn btn-warning" onClick={()=> goBack()}>Volver a página anterior</button>
            <button className="btn btn-danger" onClick={()=> tryFecthAgain()}>Intentarlo de nuevo</button>
          </div>
        </div>
      }
    </>
  );
}

