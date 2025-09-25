import React from 'react'

const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const ViewPermissions = React.lazy(() => import('./pages/ViewPermissions'))
const ViewUsers = React.lazy(() => import('./pages/ViewUsers'))
const ViewChargers = React.lazy(() => import('./pages/ViewChargers'))
const ViewSlots = React.lazy(() => import('./pages/ViewSlots'))
const ViewBookings = React.lazy(() => import('./pages/ViewBookings'))


const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/view-chargers', name: 'ViewChargers', element: ViewChargers },
  { path: '/view-permissions', name: 'ViewPermissions', element: ViewPermissions },
  { path: '/view-users', name: 'ViewUsers', element: ViewUsers },
  { path: '/view-bookings', name: 'ViewBookings', element: ViewBookings },
  { path: '/slots/:chargerId', name: 'ViewSlots', element: ViewSlots }
]

export default routes
