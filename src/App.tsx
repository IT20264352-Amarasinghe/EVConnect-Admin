import React, { Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { CSpinner, useColorModes } from '@coreui/react'
import './scss/style.scss'
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Containers
const DefaultLayout = React.lazy(() => import('./layouts/DefaultLayout.jsx'))

import Login from './Login';
import Dashboard from './pages/Dashboard.jsx'
import { ToastContainer } from 'react-toastify';
import RequireAuth from './auth/RequireAuth.jsx';
import AppLayout from './layouts/AppLayout.jsx';
import CreateUser from './pages/CreateUser.jsx';
import CreateRole from './pages/CreateRole.jsx';
import ViewRoles from './pages/ViewRoles.jsx';
import ViewUsers from './pages/ViewUsers.jsx'
import ViewPermissions from './pages/ViewPermissions.jsx';
import './App.css'

// function App() {
//   return (
//     <>
//       <ToastContainer />
//       <Router>
//         <Routes>
//           {/* public route */}
//           <Route path="/login" element={<Login />} />

//           {/* protected area */}
//           <Route element={<RequireAuth />}>
//             {/* layout with Topbar + Sidebar */}
//             <Route element={<AppLayout />}>
//               <Route path="/" element={<Dashboard />} />
//               <Route path="/dashboard" element={<Dashboard />} />
//               <Route path="/create-user" element={<CreateUser />} />
//               <Route path="/create-role" element={<CreateRole />} />
//               <Route path="/view-roles" element={<ViewRoles />} />
//               <Route path="/view-permissions" element={<ViewPermissions />} />
//               <Route path="/view-users" element={<ViewUsers />} />
//             </Route>
//           </Route>
//         </Routes>
//       </Router>
//     </>
//   )
// }
const App = () => {
  const { isColorModeSet, setColorMode } = useColorModes('coreui-free-react-admin-template-theme')
  const storedTheme = useSelector((state) => state.theme)

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.href.split('?')[1])
    const theme = urlParams.get('theme') && urlParams.get('theme').match(/^[A-Za-z0-9\s]+/)[0]
    if (theme) {
      setColorMode(theme)
    }

    if (isColorModeSet()) {
      return
    }

    setColorMode(storedTheme)
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <BrowserRouter>
      <Suspense
        fallback={
          <div className="pt-3 text-center">
            <CSpinner color="primary" variant="grow" />
          </div>
        }
      >
        <Routes>
          <Route exact path="/login" name="Login Page" element={<Login />} />
          <Route path="*" name="Home" element={<DefaultLayout />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
export default App
