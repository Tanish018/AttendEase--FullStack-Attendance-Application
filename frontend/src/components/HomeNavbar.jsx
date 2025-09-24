import React from "react";
import { Users, LayoutDashboard, Camera, User, ClipboardList } from "lucide-react";
import { Link } from 'react-router-dom'
import Button from "./LoginButton";
import { useAuthStore } from "../store/useAuthStore";

const HomeNavbar = () => {

  const { logout, authUser } = useAuthStore()

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-md">
      <div className="flex items-center">
        <Link to={"/home"} className="flex items-center">
          <div className="rounded-full">
            <img src="/logo.png" width={90} alt="" />
          </div>
          <div>
            <h1 className="text-lg font-bold">AttendEase</h1>
            <p className="text-sm text-gray-500">Smart Attendance System</p>
          </div>
        </Link>
      </div>

      <nav className="flex items-center gap-4">
        <button className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200">
          <Link to={"/home"} className="flex items-center gap-2">
            <LayoutDashboard className="h-5 w-5 text-gray-700" />
            <span className="text-gray-800 font-medium">Dashboard</span>
          </Link>
        </button>

        <button className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200">
          <Link to={"/attendance"} className="flex items-center gap-2">
            <Camera className="h-5 w-5 text-gray-700" />
            <span className="text-gray-800 font-medium">Take Attendance</span>
          </Link>
        </button>

        <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200">
          <Link to={"/students"} className="flex items-center gap-2">
            <User className="h-5 w-5 text-gray-700" />
            <span className="text-gray-800 font-medium">Students</span>
          </Link>
        </button>

        <button className="flex items-center cursor-pointer gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition duration-200">
          <Link to={"/records"} className="flex items-center gap-2">
            <ClipboardList className="h-5 w-5 text-gray-700" />
            <span className="text-gray-800 font-medium">Records</span>
          </Link>
        </button>
      </nav>

      <div  className="flex items-center justify-center gap-3">
        <button className="bg-[#ebebeb] px-5 py-[14px] rounded-full cursor-pointer">Welcome, {authUser.fullName}</button>
        <Link to="/logout" onClick={logout}><Button text="Logout" /></Link>
      </div>
    </header>
  );
};

export default HomeNavbar;