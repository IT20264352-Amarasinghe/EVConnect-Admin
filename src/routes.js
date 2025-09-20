import React from 'react'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const CreateUser = React.lazy(() => import('./pages/CreateUser'))
const CreateRole = React.lazy(() => import('./pages/CreateRole'))
const ViewRoles = React.lazy(() => import('./pages/ViewRoles'))
const ViewPermissions = React.lazy(() => import('./pages/ViewPermissions'))
const ViewUsers = React.lazy(() => import('./pages/ViewUsers'))
const ViewChargers = React.lazy(() => import('./pages/ViewChargers'))
const ViewSlots = React.lazy(() => import('./pages/ViewSlots'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/create-user', name: 'CreateUser', element: CreateUser },
  { path: '/view-chargers', name: 'ViewChargers', element: ViewChargers },
  { path: '/create-role', name: 'CreateRole', element: CreateRole },
  { path: '/view-roles', name: 'ViewRole', element: ViewRoles },
  { path: '/view-permissions', name: 'ViewPermissions', element: ViewPermissions },
  { path: '/view-users', name: 'ViewUsers', element: ViewUsers },
  { path: '/slots/:chargerId', name: 'ViewSlots', element: ViewSlots }
]

export default routes
