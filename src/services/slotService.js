import axiosInstance from './axiosInstance';

// Get slots by chargerId
export const getSlotsByCharger = async (chargerId) => {
    try {
        const response = await axiosInstance.get(`/api/slots/${chargerId}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching slots:", error);
        throw error;
    }
};

// Add a new slot
export const addSlot = async (slot) => {
    try {
        const response = await axiosInstance.post("/api/slots", slot);
        return response.data;
    } catch (error) {
        console.error("Error adding slot:", error);
        throw error;
    }
};
