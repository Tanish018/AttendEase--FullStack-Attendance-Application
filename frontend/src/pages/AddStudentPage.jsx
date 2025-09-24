import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "../components/HomeNavbar";
import toast from "react-hot-toast";
import { useStudentStore } from "../store/useStudentStore";
import { useAuthStore } from "../store/useAuthStore";

const AddStudentPage = () => {
  const { isAddingStudent, addStudent } = useStudentStore();
  const { authUser } = useAuthStore(); // ✅ SAFE to call here

  const navigate = useNavigate();
  const [studentData, setStudentData] = useState({
    name: "",
    grade: "",
    section: "",
    rollNumber: "",
    dateOfBirth: "",
    contact: "",
    picture: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudentData({ ...studentData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!authUser) {
      toast.error("You must be logged in to add a student");
      return;
    }

    const res = await addStudent(studentData, authUser);
    if (res) navigate("/students");
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <HomeNavbar />

      <main className="flex-1 p-8 w-[90%] mx-auto mt-5">
        <div className="flex items-center w-full justify-center">
          <h2 className="text-[50px] font-bold mb-6">Add Student</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-lg p-6 space-y-4 max-w-lg mx-auto"
        >
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={studentData.name}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium">Grade</label>
              <input
                type="text"
                name="grade"
                value={studentData.grade}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Section</label>
              <input
                type="text"
                name="section"
                value={studentData.section}
                onChange={handleChange}
                className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={studentData.rollNumber}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={studentData.dateOfBirth}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Contact</label>
            <input
              type="text"
              name="contact"
              value={studentData.contact}
              onChange={handleChange}
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Picture URL</label>
            <input
              type="url"
              name="picture"
              value={studentData.picture}
              onChange={handleChange}
              placeholder="https://example.com/photo.jpg"
              className="mt-1 w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
            />
          </div>

          <div className="flex justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate("/students")}
              className="w-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-lg transition-all cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isAddingStudent}
              className="w-1/2 bg-black hover:bg-white text-white hover:text-black hover:ring-2 cursor-pointer py-2 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed duration-150"
            >
              {isAddingStudent ? "Adding..." : "Add Student"}
            </button>
          </div>
        </form>
      </main>
    </div>
  );
};

export default AddStudentPage;
