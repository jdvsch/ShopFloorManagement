import React, { useEffect } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import LogIn from './pages/logIn/LogIn'
import PrivateNavbar from './components/navbar/privateNavbar/PrivateNavbar.jsx'
import ProtectedRoute from './config/protectedRoute/ProtectedRoute.jsx'
import PublicNavbar from './components/navbar/publicNavbar/PublicNavbar.jsx'


import NewPurchaseOrder from './pages/purchaseOrder/newPurchaseOrder/NewPurchaseOrder.jsx'
import EditPurchaseOrder from './pages/purchaseOrder/editPurchaseOrder/EditPurchaseOrder.jsx'
import Feedback from './components/feedback/Feedback.jsx'


export default function App() {
  const userSesion = useSelector((state) => state.reducerUserState.userState)
  const pageControl = useSelector((state) => state.reducerPageToRender.pageToRender)
  const [listPageToRender, setListPageToRender] = React.useState(['dashboard','nuevaOC', 'editarOC'])

  const ProtectedRouteOptions = {
    dashboard: <Route key={'dashboard'} path='/dashboard' element={<Dashboard />} />,
    nuevaOC: <Route key={'nuevaOC'} path='/nuevaOC' element={<NewPurchaseOrder />} />,
    editarOC: <Route key={'editarOC'} path='/editarOC' element={<EditPurchaseOrder />} />,
  }

  // useEffect(() => {
  //   if (userSesion.login) {
  //     const list = ['dashboard']
  //     for (let i = 0; i < userSesion.menu.length; i++) {
  //       for (let j = 0; j < userSesion.menu[i].submenu.length; j++) {
  //         userSesion.menu[i].submenu[j].to !== '/' &&
  //         list.push(userSesion.menu[i].submenu[j].to)
  //       }
  //     }
  //     setListPageToRender(list)
  //   }
  // }, [userSesion.login])


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
