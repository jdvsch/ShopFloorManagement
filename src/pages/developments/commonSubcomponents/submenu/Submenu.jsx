import { useDispatch, useSelector } from "react-redux";
import { setPageToRender } from "../../../../redux/slices/pageToRenderSlice";

export default function Submenu() {
    const dispatch = useDispatch();
    const pageControl = useSelector(
      (state) => state.reducerPageToRender.pageToRender
    );

  return (
        <div className='d-flex justify-content-evenly mt-2'>
          <button 
            onClick={()=> dispatch(setPageToRender({ subpage:'Ver OT' }))}  
            type="button" 
            className={pageControl.subpage ==="Ver OT"?"btn btn-info":"btn btn-light"}>
              Ver OT
          </button>

          <button 
            onClick={()=> dispatch(setPageToRender({ subpage:'Historial' }))}  
            type="button" 
            className={pageControl.subpage ==="Historial"?"btn btn-info":"btn btn-light"}>
              Formulas Anquímico
          </button>
          
          <button 
            onClick={()=> dispatch(setPageToRender({ subpage:'Limpieza' }))}  
            type="button" 
            className={pageControl.subpage ==="Limpieza"?"btn btn-info":"btn btn-light"}>
              Varios
          </button>

          {pageControl.development.attemps > 1 &&
            <button 
              onClick={()=> dispatch(setPageToRender({ subpage:'Intentos' }))}  
              type="button" 
              className={pageControl.subpage ==="Intentos"?"btn btn-info":"btn btn-light"}>
                Ver intentos
            </button>
          }
          <button 
            onClick={()=> dispatch(setPageToRender({ subpage:'Dllo' }))}  
            type="button" 
            className={pageControl.subpage ==="Dllo"?"btn btn-info":"btn btn-light"} >
              Desarrollar color
          </button>
        </div>
  )
}
