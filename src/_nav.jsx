import React from 'react'
import CIcon from '@coreui/icons-react'
import {
    cilDrop,
    cilPencil,
} from '@coreui/icons'
import { CNavItem } from '@coreui/react'

const _nav = [
    {
        component: CNavItem,
        name: 'View Chargers',
        to: '/view-chargers',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'View Bookings',
        to: '/view-bookings',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    },
    {
        component: CNavItem,
        name: 'View Users',
        to: '/view-users',
        icon: <CIcon icon={cilDrop} customClassName="nav-icon" />,
    },
    // {
    //     component: CNavItem,
    //     name: 'Create Users',
    //     to: '/create-user',
    //     icon: <CIcon icon={cilPencil} customClassName="nav-icon" />,
    // },

]

export default _nav
