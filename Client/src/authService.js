import axios from 'axios';

const API_URL = 'http://localhost:8000/'; // sau adresa backend-ului tău

// Funcție pentru înregistrarea utilizatorului
export const register = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/register`, userData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Funcție pentru autentificarea utilizatorului
export const login = async (credentials) => {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Funcție pentru deconectarea utilizatorului
export const logout = async () => {
    try {
        const response = await axios.post(`${API_URL}/logout`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

// Funcție pentru a obține profilul utilizatorului autentificat
export const getProfile = async () => {
    try {
        const response = await axios.get(`${API_URL}/profile`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
