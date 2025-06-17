import {create} from 'zustand';
import { axiosInstance } from '../utils/axios';

export const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    isCheckingAuth: true,

    checkAuth: async() => {
        set({isCheckingAuth: true})
        try{
            const response = await axiosInstance.get("/check-auth");
            set({ user: response.data.user, isAuthenticated: true, isCheckingAuth: false});
        } catch(error){
            set({ isCheckingAuth: false});
        }
    },

    signup: async (email, password, name) => {
        set({isLoading: true})
        try{
            const response = await axiosInstance.post("/signup", {email, password, name});
            set({ user:response.data.user, isAuthenticated: true, isLoading: false});
        } catch(error) {
            set({ isLoading: false});
            throw error
        }
        
    },

    login: async (email, password) => {
        set({isLoading: true, error:null});

        try{
            const response = await axiosInstance.post("/login", {email, password});
            set({user: response.data.user, isAuthenticated: true, isLoading: false});
        } catch(error){
            set({ isLoading: false});
            throw error
        }
    },

    logout: async () => {
        set({isLoading: true});

        try{
            await axiosInstance.post("/logout")
            set({user: null, isAuthenticated: false, isLoading: false});
        } catch(error) {
            set({ isLoading: false});
            throw error;
        }
    },

    verifyEmail: async(code, id) => {
        set({isLoading: true})
        try{
            const response = await axiosInstance.post("/verify-email", { code, id });
            set({ user: response.data.user, isAuthenticated: true, isLoading: false });
        } catch(error){
            set({isLoading: false });
            throw error;
        }
    },

    forgotPassword: async(email) => {
        set({isLoading: true});
        try{
            const response = await axiosInstance.post("/forgot-password", {email});
            set({ isLoading:false})
        } catch(error){
            set({isLoading: false});
            throw error;
        }
    },

    resetPassword: async(password, token) => {
        set({isLoading: true});
        try{
            const response = await axiosInstance.post(`/reset-password/${token}`, {password});
            set({ isLoading:false})
        } catch(error){
            set({isLoading: false});
            throw error;
        }
    }
}))
