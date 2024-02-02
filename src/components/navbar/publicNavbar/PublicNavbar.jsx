import { Link } from "react-router-dom";

export default function PublicNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-ligth bg-ligth">
      <div className="container-fluid">
        <Link className="nav-link active" to='/'>
          <img src="/img/logo.png" width="25" alt='Anquimico SAS'></img>
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item dropdown">
              <Link className="nav-link dropdown-toggle" to='/' id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Opción #1
              </Link>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><Link className="dropdown-item" to='/'>Próximanete</Link></li>
              </ul>
            </li>
          </ul>
          
          <form className="d-flex">
          <Link to='/Login'><button className="btn btn-outline-success">Login</button></Link>
          </form>
        </div>
      </div>
    </nav>
  )
}
