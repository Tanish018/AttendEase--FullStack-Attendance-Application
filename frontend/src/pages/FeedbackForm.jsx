import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Button from "../components/LoginButton";
import { Mail, MessageCircle, User } from "lucide-react";
import { useNavigate } from 'react-router-dom';
import { useContactUsStore } from "../store/useContactUsStore";
import toast from "react-hot-toast";

const FeedbackForm = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    isComplain: false,
    isFeedback: false,
    feedback: ""
  });

  const { addFeedback, isAddingFedback } = useContactUsStore();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      toast.error("Full name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    }
    if (!formData.isComplain && !formData.isFeedback) {
      toast.error("Please Fill all the Details");
      return false;
    }
    if (formData.isComplain && formData.isFeedback) {
      toast.error("Message should be either Complain or Feedback.");
      return false;
    }
    if (formData.feedback.trim().length < 20) {
      toast.error("Feedback/Complain must be at least 20 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    const success = validateForm();
    if (success) {
      await addFeedback(formData)
      setTimeout(() => {
        navigate('/')
      }, 3000);
      setFormData({
        name: "",
        email: "",
        isComplain: false,
        isFeedback: false,
        feedback: "",
      });
    }
  };

  return (
    <div className="flex items-center flex-col overflow-x-hidden min-h-screen bg-transparent">

      <Navbar />

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-xl rounded-2xl p-8 mt-20 w-full max-w-lg border"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>

        <div className="mb-4">
          <div className="flex items-center mb-2 gap-2">
            <User size={20} />
            <label className="font-medium">Name</label>
          </div>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-black transition-all duration-150 outline-none"
          />
        </div>

        <div className="mb-4">
          <div className="flex items-center mb-2 gap-2">
            <Mail size={20} />
            <label className="font-medium">Email</label>
          </div>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-black transition-all duration-150 outline-none"
          />
        </div>

        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isComplain"
              checked={formData.isComplain}
              onChange={handleChange}
            />
            Complain
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              name="isFeedback"
              checked={formData.isFeedback}
              onChange={handleChange}
            />
            Feedback
          </label>
        </div>

        <div className="mb-6">
          <div className="flex items-center mb-2 gap-2">
            <MessageCircle size={20} />
            <label className="font-medium">Message</label>
          </div>
          <textarea
            name="feedback"
            value={formData.feedback}
            onChange={handleChange}
            required
            rows="4"
            className="w-full border rounded-xl px-4 py-2 focus:ring-2 focus:ring-black transition-all duration-150 outline-none"
          />
        </div>

        <div className="w-full flex items-center justify-center">
          <Button text="Send Message" />
        </div>
      </form>
    </div>
  );
}

export default FeedbackForm;

