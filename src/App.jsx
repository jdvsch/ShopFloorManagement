import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import AdjustWO from './pages/workOrders/adjustWO/AdjustWO.jsx'
import Home from './pages/home/Home'
import ConsultWO from './pages/workOrders/consultWO/ConsultWO.jsx'
import CreateFormulation from './pages/developments/createFormulation/CreateFormulation.jsx'
import CreateID from './pages/rawMaterial/createID/CreateID.jsx'
import CreatePC from './pages/clients/createPC/CreatePC.jsx'
import CreateProduct from './pages/developments/createProduct/CreateProduct.jsx'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import EditID from './pages/rawMaterial/editID/EditID.jsx'
import EditClient from './pages/clients/editClient/EditClient.jsx'
import EditPC from './pages/clients/editPC/EditPC.jsx'
import EditPurchaseOrder from './pages/purchaseOrder/editPurchaseOrder/EditPurchaseOrder.jsx'
import EditWO from './pages/workOrders/editWO/EditWO.jsx'
import LogIn from './pages/logIn/LogIn'
import NewPurchaseOrder from './pages/purchaseOrder/newPurchaseOrder/NewPurchaseOrder.jsx'
import NewWO from './pages/workOrders/newWO/NewWO.jsx'
import OnlySample from './pages/workOrders/onlySample/onlySample.jsx'
import OptimizeWO from './pages/workOrders/optimizeWO/OptimizeWO.jsx'
import PrivateNavbar from './components/navbar/privateNavbar/PrivateNavbar.jsx'
import ProtectedRoute from './config/protectedRoute/ProtectedRoute.jsx'
import PublicNavbar from './components/navbar/publicNavbar/PublicNavbar.jsx'
import Reformulation from './pages/workOrders/reformulation/Reformulation.jsx'
import RepeatSample from './pages/workOrders/repeatSample/RepeatSample.jsx'
import ResurneFormulation from './pages/developments/resurneFormulation/ResurneFormulation.jsx'
import WatchID from './pages/rawMaterial/watchID/WatchID.jsx'

export default function App() {
  const userSesion = useSelector((state) => state.reducerUserState.userState)
  const pageControl = useSelector((state) => state.reducerPageToRender.pageToRender)
  const [listPageToRender, setListPageToRender] = React.useState([
    'dashboard',
    'nuevaOC', 'editarOC',
    'nuevoCP', 'editarCP','editarCliente',
    'nuevaOT', 'ajustarOT', 'optimizarOT', 'soloMuestra', 'repetirMuestra', 'reformulacion', 'consultarOT', 'editarOT',
    'verID', 'crearID', 'editarID',
    'crearFormulacion', 'retomarFormulación', 'crearProducto', 'crearPI',
    'crearMuestra', 'retomarMuestra',
    'cancelarFormulacion', 'permitirEOT', 'editarProducto', 'editarPI', 'estadoSolicitud', 
    'liberarOP', 'verOP', 'liberarOtros', 'verOtros',
    'cambiarClave', 'crearUsurio', 'editarUsuario'
  ])

  // const listPageToRender = JSON.parse(userSesion.listPageToRender)

  const ProtectedRouteOptions = {
    dashboard: <Route key={'dashboard'} path='/dashboard' element={<Dashboard />} />,
    
    nuevaOC: <Route key={'nuevaOC'} path='/nuevaOC' element={<NewPurchaseOrder />} />,
    editarOC: <Route key={'editarOC'} path='/editarOC' element={<EditPurchaseOrder />} />,

    nuevoCP: <Route key={'nuevoCP'} path='/nuevoCP' element={<CreatePC />} />,
    editarCP: <Route key={'editarCP'} path='/editarCP' element={<EditPC />} />,
    editarCliente: <Route key={'editarCliente'} path='/editarCliente' element={<EditClient />} />,

    nuevaOT: <Route key={'nuevaOT'} path='/nuevaOT' element={<NewWO />} />,
    ajustarOT: <Route key={'ajustarOT'} path='/ajustarOT' element={<AdjustWO/>} />,
    optimizarOT: <Route key={'optimizarOT'} path='/optimizarOT' element={<OptimizeWO/>} />,
    soloMuestra: <Route key={'soloMuestra'} path='/soloMuestra' element={<OnlySample/>} />,
    repetirMuestra: <Route key={'repetirMuestra'} path='/repetirMuestra' element={<RepeatSample/>} />,
    reformulacion: <Route key={'reformulacion'} path='/reformulacion' element={<Reformulation/>} />,
    consultarOT: <Route key={'consultarOT'} path='/consultarOT' element={<ConsultWO/>} />,
    editarOT: <Route key={'editarOT'} path='/editarOT' element={<EditWO/>} />,

    verID: <Route key={'verID'} path='/verID' element={<WatchID/>} />,
    crearID: <Route key={'crearID'} path='/crearID' element={<CreateID/>} />,
    editarID: <Route key={'editarID'} path='/editarID' element={<EditID/>} />,

    crearFormulacion: <Route key={'crearFormulacion'} path='/crearFormulacion' element={<CreateFormulation/>} />,
    retomarFormulación: <Route key={'retomarFormulación'} path='/retomarFormulación' element={<ResurneFormulation/>} />,
    crearProducto: <Route key={'crearProducto'} path='/crearProducto' element={<CreateProduct/>} />,
    crearPI: <Route key={''} path='/' element={<></>} />,
    
    crearMuestra: <Route key={''} path='/' element={<></>} />,
    retomarMuestra: <Route key={''} path='/' element={<></>} />,
    cancelarFormulacion: <Route key={''} path='/' element={<></>} />,
    permitirEOT: <Route key={''} path='/' element={<></>} />,
    editarProducto: <Route key={''} path='/' element={<></>} />,
    editarPI: <Route key={''} path='/' element={<></>} />,
    estadoSolicitud: <Route key={''} path='/' element={<></>} />,
    liberarOP: <Route key={''} path='/' element={<></>} />,
    verOP: <Route key={''} path='/' element={<></>} />,
    liberarOtros: <Route key={''} path='/' element={<></>} />,
    verOtros: <Route key={''} path='/' element={<></>} />,
    cambiarClave: <Route key={''} path='/' element={<></>} />,
    crearUsurio: <Route key={''} path='/' element={<></>} />,
    editarUsuario: <Route key={''} path='/' element={<></>} />
  }

  return (
    <BrowserRouter>

      {userSesion.login
        ? <PrivateNavbar />
        : <PublicNavbar/>
      }

      <Routes>
        <Route path="/"
          element={userSesion.login
            ? <Navigate to={'/dashboard'} replace />
            : <Home />}
        />

          <Route path="/login"
            element={userSesion.login
              ? <Navigate to={'/dashboard'} replace />
              : <LogIn />}
          />

          <Route path="*"
            element={userSesion.login
              ? <Navigate to={'/dashboard'} replace />
              : <Navigate to={'/'} replace />}
          />

          <Route element={<ProtectedRoute isActivate={userSesion.login} />}>
            {listPageToRender.map(data => ProtectedRouteOptions[data])}
          </Route>

        </Routes>
    </BrowserRouter>
  )
}
