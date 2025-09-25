
import axiosInstance from './axiosInstance';

export const getUsers = async () => {
    try {
        const response = await axiosInstance.get('/api/users/customers');
        return response.data;
    } catch (error) {
        console.error('Error fetching users:', error);
        throw error;
    }
}

