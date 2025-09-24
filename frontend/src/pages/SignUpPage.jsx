import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import { Eye, EyeOff, Loader2, Lock, Mail, User } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore.js';
import toast from 'react-hot-toast';
import Button from '../components/LoginButton.jsx';

const SignUpPage = () => {

  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  const { signUp, isSigningUp } = useAuthStore();
  const navigate = useNavigate();

  const validateForm = () => {
    if (!formData.fullName.trim()) {
      toast.error("Full Name is required");
      return false;
    }
    if (!formData.email.trim()) {
      toast.error("Email is required");
      return false;
    } 
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (!formData.password) {
      toast.error("Password is required");
      return false;
    } 
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return false;
    } 
    return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = validateForm();
    if (success === true) {
      await signUp(formData)
      navigate('/verify-email')
    }
  }

  return (
    <div className='flex items-center flex-col overflow-x-hidden min-h-screen'>
      <Navbar />

      <div className="absolute inset-0 text-black flex items-center justify-center z-20 mt-40">
        <div className="flex flex-col justify-center items-center p-6 sm:p-12 bg-transparent backdrop-blur-[20px] border-1 border-black w-[600px] rounded-xl">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group mb-5">
                <div className="w-[120px] -mb-8 -mt-10 h-[120px] rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20">
                  <img src="/logo.png" width={140} alt="" />
                </div>
                <h1 className="text-3xl font-bold mt-2">Welcome</h1>
                <p className="text-base-content/60">Create your Account</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[20px] font-medium">Full Name</span>
                </label>
                <div className="relative">
                  <div className='flex items-center'>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-base-content/40" />
                    </div>
                    <input
                      type="text"
                      className={`input input-bordered w-full pl-10 py-[16px] font-semibold border border-black rounded-xl`}
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text text-[20px] font-medium">Email</span>
                </label>
                <div className="relative">
                  <div className='flex items-center'>
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-base-content/40" />
                    </div>
                    <input
                      type="email"
                      className={`input input-bordered w-full pl-10 py-[16px] font-semibold border border-black rounded-xl`}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-[20px]">Password</span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-base-content/40" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className={`input input-bordered w-full pl-10 py-[16px] font-semibold border border-black rounded-xl`}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-base-content/40" />
                    ) : (
                      <Eye className="h-5 w-5 text-base-content/40" />
                    )}
                  </button>
                </div>
              </div>

              <div className='w-full flex items-center justify-center'>
                <Button
                  text={
                    isSigningUp ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading...
                      </div>
                    ) : (
                      "Create Account"
                    )
                  }
                  disabled={isSigningUp}
                />
              </div>
            </form>

            <div className="text-center">
              <p className="text-base-content/60">
                Already have an account?{" "}
                <Link to="/login" className="link link-primary underline">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUpPage