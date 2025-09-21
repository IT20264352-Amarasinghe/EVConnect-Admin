
import axiosInstance from './axiosInstance';

export const getChargers = async () => {
    try {
        const response = await axiosInstance.get('/api/chargers');
        return response.data;
    } catch (error) {
        console.error('Error fetching chargers:', error);
        throw error;
    }
}

// Add a new charger
export const addCharger = async (charger) => {
    try {
        const response = await axiosInstance.post('/api/chargers', charger);
        return response.data;
    } catch (error) {
        console.error('Error adding charger:', error);
        throw error;
    }
};

