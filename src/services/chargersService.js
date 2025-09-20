
import axiosInstance from './axiosInstance';

export const createUser = async (userData) => {
    try {
        const response = await axiosInstance.post('/api/users', userData);
        return response.data;
    } catch (error) {
        console.error('Error creating user:', error);
        throw error;
    }
}

export const getChargers = async () => {
    try {
        const response = await axiosInstance.get('/api/chargers');
        return response.data;
    } catch (error) {
        console.error('Error fetching chargers:', error);
        throw error;
    }
}

export const deleteUser = async (userId) => {
    try {
        const response = await axiosInstance.delete(`/api/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
}
