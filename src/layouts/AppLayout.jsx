import { Outlet, useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import Sidebar from '../components/Sidebar';
import Breadcrumbs from '../components/Breadcrumbs';

const AppLayout = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login', { replace: true });
    };

    return (
        <div style={{ minHeight: '100vh', paddingTop: 60 }}>
            {/* shared header */}
            <Topbar onLogout={handleLogout} />

            {/* shared body */}
            <div style={{ display: 'flex', height: 'calc(100vh - 60px)' }}>
                <Sidebar />
                {/* no prop drilling needed */}
                <main style={{ flex: 1, padding: 20, overflowY: 'auto' }}>
                    <Breadcrumbs />
                    <Outlet />                          {/* child pages appear here */}
                </main>
            </div>
        </div>
    );
};

export default AppLayout;
