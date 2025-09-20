import { Navigate, Outlet } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

/**
 * Parent route wrapper:
 *   - If a valid token exists → render nested routes (Outlet).
 *   - If not → push user back to "/" (Login).
 */
const RequireAuth = () => {
    const token = localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" replace />;
    }

    try {
        const decoded = jwtDecode(token); // requires 'jwt-decode' library
        const currentTime = Math.floor(Date.now() / 1000); // current time in seconds

        if (decoded.exp < currentTime) {
            localStorage.removeItem('token'); // Optional: clear the token
            return <Navigate to="/login" replace />;
        }

        return <Outlet />;
    } catch (error) {
        // If token is invalid or decoding fails
        console.log(error);
        localStorage.removeItem('token');
        return <Navigate to="/login" replace />;
    }
};

export default RequireAuth;