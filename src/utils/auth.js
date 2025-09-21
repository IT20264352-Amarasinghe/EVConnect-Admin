import { jwtDecode } from "jwt-decode";

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    if (!token) return false;

    try {
        const decoded = jwtDecode(token);
        if (decoded.exp * 1000 < Date.now()) {
            // Token expired
            localStorage.removeItem("token");
            return false;
        }
        return true;
    } catch (error) {
        return false;
    }
};