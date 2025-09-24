import { create } from 'zustand';
import { axiosInstance } from '../lib/axios';
import toast from 'react-hot-toast';

export const useStudentStore = create((set) => ({
  students: [],
  authStudent: null,
  isAddingStudent: false,
  isLoading: false,

  addStudent: async (data, authUser) => {
    set({ isAddingStudent: true });
    try {
      if (!authUser) {
        toast.error("User is not authenticated!");
        return false;
      }
      const res = await axiosInstance.post("/student/addStudent", data);
      set({ authStudent: res.data });
      toast.success("Student Added!");
      return true;
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("Error while adding Student:", error.message);
      return false;
    } finally {
      set({ isAddingStudent: false });
    }
  },

  fetchStudent: async () => {
    set({ isLoading: true })
    try {
      const res = await axiosInstance.get("/student/getAllStudents");
      set({ students: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch students");
    } finally {
      set({ isLoading: false });
    }
  },
}));