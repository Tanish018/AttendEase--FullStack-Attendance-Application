import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isLogingIn: false,
  isVerifyingEmail: false,
  isLoading: false,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check")
      set({ authUser: res.data, isCheckingAuth: true })
    } catch (error) {
      set({ authUser: null })
    } finally {
      set({ isCheckingAuth: false, isCheckingAuth: false })
    }
  },

  signUp: async (data) => {
    set({ isSigningUp: true })
    try {
      const res = await axiosInstance.post("/auth/signup", data)
      set({ authUser: res.data })
      toast.success("Verification Email Sent !")
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
      console.error("Signup Error:", error.message)
    } finally {
      set({ isSigningUp: false })
    }
  },

  verifyEmail: async (code) => {
    set({ isVerifyingEmail: true })
    try {
      const res = await axiosInstance.post("/auth/verify-email", { code })

      if (!res.data.success) throw new Error(res.data.message || "Verification failed")

      set({ authUser: res.data.user })
      return true
    } catch (error) {
      console.error("Email Verification Error:", error.message)
      throw error
    } finally {
      set({ isVerifyingEmail: false })
    }
  },

  login: async (data) => {
    set({ isLogingIn: true })
    try {
      const res = await axiosInstance.post("/auth/login", data)
      set({ authUser: res.data })
      toast.success("Logged in successfully!")
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong")
      console.error("Login Error:", error.message)
    } finally {
      set({ isLogingIn: false })
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
    } catch (error) {
      console.log(error.response.data.message);
    }
  },

  forgotPassword: async (email) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post("/auth/forgot-password", { email });
      toast.success(res.data.message || "Password reset link sent to your email.");
      set({ isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.post(`/auth/reset-password/${token}`, { password });
      toast.success(res.data.message || "Password has been reset successfully.");
      set({ isLoading: false });
      return true;
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.response?.data?.message || "Something went wrong");
      throw error;
    }
  },
}))