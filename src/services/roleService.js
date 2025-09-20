import axiosInstance from './axiosInstance';
export const createRole = async (roleName) => {
    try {
        const role = { name: roleName };
        const response = await axiosInstance.post('/api/roles', role)
        return response.data;
    } catch (error) {
        console.error('Error creating role:', error);
        throw error;
    }
}

export const getRoles = async () => {
    try {
        const response = await axiosInstance('/api/roles');
        return response.data;
    } catch (error) {
        console.error('Error fetching roles:', error);
        throw error;
    }
}