import axiosInstance from './axiosInstance';
export const getPermissions = async () => {
    try {
        const response = await axiosInstance.get('/api/permissions');
        return response.data;
    } catch (error) {
        console.error('Error fetching permissions:', error);
        throw error;
    }
}