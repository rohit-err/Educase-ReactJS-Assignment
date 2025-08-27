import { create } from "zustand"
import axios from "axios"

const API_URL = "https://educase-reactjs-assignment-backend.onrender.com/api"
axios.defaults.withCredentials = true

const useAuthStore = create((set) => ({
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,


    signup: async (signupData) => {
        set({ isLoading: true })
        try {
            const res = await axios.post(`${API_URL}/signup`, signupData)
            set({ user: res.data.user, isAuthenticated: true, isLoading: false })
            return res.data
        } catch (error) {
            console.log(error)
            set({ error: error.response?.data?.message || "Error signing up", isLoading: false })
            throw error
        }
    },

    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null })
        try {
            const res = await axios.get(`${API_URL}/check-auth`)
            set({ user: res.data.userData, isAuthenticated: true, isCheckingAuth: false })
        } catch (error) {
            console.log(error)
            set({ error: null, isCheckingAuth: false, isAuthenticated: false })
        }
    },

    login: async (loginData) => {
        set({ isLoading: true, error: null })
        try {
            const res = await axios.post(`${API_URL}/login`, loginData)
            set({ user: res.data.user, isLoading: false, isAuthenticated: true })
            return res.data
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging user", isLoading: false })
            throw error
        }
    },

    logout: async () => {
        set({ error: null })
        try {
            const res = await axios.post(`${API_URL}/logout`)
            set({ user: null, isAuthenticated: false })
        } catch (error) {
            set({ error: error.response?.data?.message || "Error logging out" })
            throw error
        }
    },
}))

export default useAuthStore