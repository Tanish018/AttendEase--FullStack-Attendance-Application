import React from "react";
import { Users, UserCheck, UserX, Clock, LayoutDashboard, Camera, User, ClipboardList, BarChart } from "lucide-react";
import HomeNavbar from "../components/HomeNavbar";
import { useStudentStore } from "../store/useStudentStore";

const HomePage = () => {

  const { students } = useStudentStore();

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <HomeNavbar />

      <main className="flex-1 p-8 flex flex-col w-[90%] mx-auto">
        <div>
          <h2 className="text-2xl font-bold">Attendance Dashboard</h2>
          <p className="text-gray-500">
            Overview for Friday, September 5th, 2025
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6 flex-grow">
          <div className="bg-white p-6 rounded-xl hover:bg-gray-50 ring-1 shadow hover:shadow-xl transition duration-300 cursor-pointer flex flex-col justify-between items-start">
            <div className="flex justify-between w-full">
              <div>
                <p className="text-3xl font-bold">{students.length}</p>
                <p className="text-gray-500 text-sm">Active enrolled students</p>
              </div>
              <Users className="h-12 w-12 text-gray-400" />
            </div>
            <p className="mt-4 text-gray-400 text-xs">
              Total students currently enrolled
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:bg-gray-50 ring-1 hover:shadow-xl transition duration-300 cursor-pointer flex flex-col justify-between items-start">
            <div className="flex justify-between w-full">
              <div>
                <p className="text-3xl font-bold">0</p>
                <p className="text-gray-500 text-sm">0% attendance rate</p>
              </div>
              <UserCheck className="h-12 w-12 text-green-400" />
            </div>
            <p className="mt-4 text-gray-400 text-xs">
              Attendance percentage for today
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:bg-gray-50 ring-1 hover:shadow-xl transition duration-300 cursor-pointer flex flex-col justify-between items-start">
            <div className="flex justify-between w-full">
              <div>
                <p className="text-3xl font-bold">0</p>
                <p className="text-gray-500 text-sm">Students not present</p>
              </div>
              <UserX className="h-12 w-12 text-red-400" />
            </div>
            <p className="mt-4 text-gray-400 text-xs">
              Students yet to be marked present
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow hover:bg-gray-50 ring-1 hover:shadow-xl transition duration-300 cursor-pointer flex flex-col justify-between items-start">
            <div className="flex justify-between w-full">
              <div>
                <p className="text-3xl font-bold">0</p>
                <p className="text-gray-500 text-sm">Students marked late</p>
              </div>
              <Clock className="h-12 w-12 text-yellow-400" />
            </div>
            <p className="mt-4 text-gray-400 text-xs">
              Late arrivals recorded today
            </p>
          </div>
        </div>

        {/* Today's Attendance */}
        <div className="bg-white rounded-xl shadow hover:bg-gray-50 ring-1 hover:shadow-lg transition duration-300 mt-8 flex-grow flex flex-col">
          <div className="p-6 flex-1 flex flex-col">
            <h3 className="font-bold text-lg mb-4">Today's Attendance</h3>
            <div className="flex flex-1 flex-col items-center justify-center text-gray-400">
              <UserCheck className="h-12 w-12 mb-2" />
              <p>No attendance recorded yet today</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
