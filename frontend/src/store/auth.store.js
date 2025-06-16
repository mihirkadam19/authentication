import {create} from 'zustand';
import { axiosInstance } from '../utils/axios';

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,

    signup: async (email, password, name) => {
        set({isLoading: true, error: null})
        try{
            const response = await axiosInstance.post("/signup", {email, password, name});
            set({ user:response.data.user, isAuthenticated: true, isLoading: false});
        } catch(error) {
            set({ error: error.response.data.message || "Error signing up", isLoading: false});
            throw error
        }
        
    },

    login: async (email, password) => {
        set({isLoading: true, error:null});

        try{
            const response = await axiosInstance.post("/login", {email, password});
            set({user: response.data.user, isAuthenticated: true, isLoading: false});
        } catch(error){
            set({ error: error.response.data.message || "Error Logging in", isLoading: false});
            throw error
        }
    }
}))
