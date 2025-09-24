import React, { useEffect, useState, useMemo } from "react";
import { useStudentStore } from "../store/useStudentStore";
import { Link } from "react-router-dom";
import { Loader, Plus, Search } from "lucide-react";
import Button from '../components/LoginButton.jsx';
import HomeNavbar from "../components/HomeNavbar.jsx";

const StudentsPage = () => {
  const { students, fetchStudent, isLoading } = useStudentStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  const filteredStudents = useMemo(() => {
    return students.filter((student) => {
      const matchesSearch =
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.section.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesGrade =
        selectedGrade === "" || student.grade === selectedGrade;

      return matchesSearch && matchesGrade;
    });
  }, [students, searchTerm, selectedGrade]);

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <HomeNavbar />

      <div className="min-h-screen p-8 bg-transparent w-[90%] mx-auto">
        <div className="flex flex-col lg:flex-col lg:items-center lg:justify-between mb-8 gap-6">
          <div className="flex flex-col items-center lg:items-start gap-3">
            <h2 className="text-[40px] lg:text-[50px] font-bold">Students</h2>
            <Link to={"/students/addstudent"}>
              <Button
                text={
                  <div className="flex items-center gap-3 justify-center">
                    <Plus className="h-5 w-5" /> Add Student
                  </div>
                }
              />
            </Link>
          </div>

          <div className="flex justify-center items-center w-full gap-4 flex-wrap">
            <div className="relative w-[80vw] max-w-[800px]">
              <input
                type="text"
                placeholder="Search by name, roll, or section"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full border rounded-lg px-10 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
              />
              <Search className="absolute top-2.5 left-3 text-gray-400 h-5 w-5" />
            </div>

            <select
              value={selectedGrade}
              onChange={(e) => setSelectedGrade(e.target.value)}
              className="border rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black transition-all duration-200"
            >
              <option value="">All Grades</option>
              {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={`${i + 1}`}>
                  Grade {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        {isLoading && (
          <div className="flex justify-center items-center h-40">
            <Loader className="w-10 h-10 animate-spin text-black" />
          </div>
        )}

        {!isLoading && filteredStudents.length > 0 ? (
          <div className="overflow-x-auto rounded-lg shadow">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Picture
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Grade
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Section
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Roll Number
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    DOB
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">
                    Contact
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      {student.picture ? (
                        <img
                          src={student.picture}
                          alt={student.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                          <span className="text-gray-500 text-sm">N/A</span>
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-900">{student.name}</td>
                    <td className="px-6 py-4 text-gray-900">{student.grade}</td>
                    <td className="px-6 py-4 text-gray-900">{student.section}</td>
                    <td className="px-6 py-4 text-gray-900">{student.rollNumber}</td>
                    <td className="px-6 py-4 text-gray-900">
                      {new Date(student.dateOfBirth).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-gray-900">{student.contact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          !isLoading && (
            <div className="flex flex-col justify-center items-center text-gray-500 mt-12">
              <p>No students found. Please add some students.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default StudentsPage;
