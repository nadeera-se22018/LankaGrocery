import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,

    login: async (email, password) => {
        try {
            const { data } = await axios.post('/api/users/login', { email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            set({ userInfo: data });
            return data;
        } catch (error) {
            throw error.response?.data?.message || 'Could not login';
        }
    },

    register: async (name, email, password) => {
        try {
            const { data } = await axios.post('/api/users', { name, email, password });
            localStorage.setItem('userInfo', JSON.stringify(data));
            set({ userInfo: data });
            return data;
        } catch (error) {
            throw error.response?.data?.message || 'Could not register';
        }
    },

    updateProfile: async (userData) => {
        try {
            const { data } = await axios.put('/api/users/profile', userData);
            localStorage.setItem('userInfo', JSON.stringify(data));
            set({ userInfo: data });
            return data;
        } catch (error) {
            throw error.response?.data?.message || 'Could not update.';
        }
    },

    logout: () => {
        localStorage.removeItem('userInfo');
        set({ userInfo: null });
    }
}));

export default useAuthStore;