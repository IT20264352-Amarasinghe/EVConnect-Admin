
import axiosInstance from './axiosInstance';

export const getBookings = async () => {
    try {
        const response = await axiosInstance.get('/api/bookings');
        return response.data;
    } catch (error) {
        console.error('Error fetching chargers:', error);
        throw error;
    }
}