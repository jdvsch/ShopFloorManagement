import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import Home from './pages/home/Home'
import Dashboard from './pages/dashboard/Dashboard.jsx'
import LogIn from './pages/logIn/LogIn'
import PrivateNavbar from './components/navbar/privateNavbar/PrivateNavbar.jsx'
import ProtectedRoute from './config/protectedRoute/ProtectedRoute.jsx'
import PublicNavbar from './components/navbar/publicNavbar/PublicNavbar.jsx'


export default function App() {
  const userSesion = useSelector((state) => state.reducerUserState.userState)

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
            <Route path='/dashboard' element={<Dashboard/>}></Route>
          {/* {accessPermits.menuOptions.map(data => ProtectedRouteOptions[data])} */}
          </Route>

        </Routes>
    </BrowserRouter>
  )
}
