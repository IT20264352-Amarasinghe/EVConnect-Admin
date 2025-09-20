import axios from 'axios';
import { API_BASE_URL } from '../config/apiConfig';

export const login = async (credentials) => {
    const response = await axios.post(`${API_BASE_URL}/api/v1/public/login`, credentials);
    return response.data;
};