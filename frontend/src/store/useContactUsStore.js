import { create } from 'zustand'
import { axiosInstance } from '../lib/axios'
import toast from 'react-hot-toast'

export const useContactUsStore = create((set) => ({
  feedbackData: null,
  isAddingFeedback: false,
  isLoading: false,

  addFeedback: async(data) => {
    set({ isAddingFeedback: true })
    try {
      const res = await axiosInstance.post("/feedback/contactus", data)
      set({ feedbackData: res.data })
      if (data.isComplain) toast.success("Ticket Raised. Our team will contact you soon. !")
      if (data.isFeedback) toast.success("Thanks for your Feedback. !")
    } catch (error) {
      console.error(error.response?.data?.message || "Something went wrong")
      console.error("Error while adding Student :", error.message)
    } finally {
      set({ isAddingFeedback: false })
    }
  }
}))