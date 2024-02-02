import { Link } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux'

import { Query, GET_PRIVATE_NAVBAR } from '../../../config/api/api'
import { setResetUserState } from "../../../redux/slices/userStateSlice";

export default function PrivateNavbar() {
  const userSesion = useSelector((state) => state.reducerUserState.userState)
  const dispatch = useDispatch()
  const {query} = Query({key: ['menu'], url: GET_PRIVATE_NAVBAR + userSesion.id_user})
 
  const handleLogout = () =>{
    dispatch(setResetUserState())
  }

  return (
    <>
    {query.data &&
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">

        {/* logo y boton menu en pantallas pequeñas */}
        <Link className="nav-link active" to='/dashboard'>
          <img src="/img/logo.png" width="25" alt='anquimico SAS'></img>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {query.data &&
              query.data.map((data,index)=>(
                <li key={index} className="nav-item dropdown">
                  {data.used === 'YES' &&
                    <Link className="nav-link dropdown-toggle" to='/' id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    {data.title}
                    </Link>
                  }                  
                  <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                    {
                      JSON.parse(data.submenu).sub.map((sdata,index)=>(
                        <li key={index}>
                        {sdata.used === 'YES' ?
                          sdata.title === "hr" ? 
                          <hr className={sdata.hide ? "visually-hidden":"dropdown-divider"}/>
                          : 
                          <Link className={sdata.hide ? "visually-hidden":"dropdown-item"} target={sdata.new_target ? "_blanck" : "_self"} to={sdata.components}>{sdata.title}</Link>
                        :
                        <Link className={sdata.hide ? "visually-hidden":"dropdown-item disabled"} to={sdata.components}>{sdata.title}</Link>    
                        }
                        </li>
                      ))
                    }
                  </ul>
                </li>
              ))
            }
          </ul>
          <form className="d-flex">
            <button className="btn btn-outline-success" type="submit" onClick={()=>handleLogout()}>LogOut</button>
          </form>
        </div>
      </div>
    </nav>
    }
    </>
  )
}
