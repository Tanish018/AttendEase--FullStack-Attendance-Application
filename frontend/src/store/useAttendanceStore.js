import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAttendanceStore = create((set) => ({
  attendanceData: [],
  stats: null,
  isLoading: false,

  fetchAttendanceData: async () => {
    set({ isLoading: true });
    try {
    const res = await axiosInstance.get("/attendance/getRecords");
      set({ attendanceData: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch attendnace");
    } finally {
      set({ isLoading: false });
    }
  },

  saveAttendance: async (date, attendance) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post("/attendance", { date, attendance });
      toast.success("Attendance saved successfully!");
    } catch (error) {
      toast.error("Failed to save attendance");
    } finally {
      set({ isLoading: false });
    }
  },
}));