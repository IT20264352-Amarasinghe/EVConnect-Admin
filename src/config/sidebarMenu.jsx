import { FaHome, FaUserPlus } from "react-icons/fa";

export const MENU = [
    { key: 'home', label: 'Home', icon: <FaHome />, path: '/' },

    {
        key: 'users',
        label: 'Users',
        icon: <FaUserPlus />,
        children: [
            { key: 'createUser', label: 'Create User', path: '/create-user' },
            { key: 'viewUsers', label: 'View Users', path: '/view-users' },
        ],
    },

    {
        key: 'roles',
        label: 'Roles',
        icon: <FaUserPlus />,
        children: [
            { key: 'createRole', label: 'Create Role', path: '/create-role' },
            { key: 'viewRoles', label: 'View Roles', path: '/view-roles' },
        ],
    },
    {
        key: 'permissions',
        label: 'Permissions',
        icon: <FaUserPlus />,
        children: [
            { key: 'viewpermissions', label: 'View Permissions', path: '/view-permissions' },
        ],
    }
];
