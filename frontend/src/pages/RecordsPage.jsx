import React, { useEffect, useState, useMemo } from "react";
import { useStudentStore } from "../store/useStudentStore";
import { Loader, Search } from "lucide-react";
import HomeNavbar from "../components/HomeNavbar";
import { useAttendanceStore } from "../store/useAttendanceStore";

const RecordsPage = () => {
  const { students, fetchStudent, isLoading } = useStudentStore();
  const { attendanceData, fetchAttendanceData } = useAttendanceStore();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGrade, setSelectedGrade] = useState("");

  useEffect(() => {
    fetchStudent();
  }, [fetchStudent]);

  useEffect(() => {
    fetchAttendanceData();
  }, [fetchAttendanceData]);

  const aggregatedAttendance = useMemo(() => {
    const summary = {};

    attendanceData.forEach((record) => {
      const id = record.student;
      if (!summary[id]) {
        summary[id] = {
          presentdays: 0,
          totaldays: 0,
        };
      }
      summary[id].presentdays += record.presentdays || 0;
      summary[id].totaldays += record.totaldays || 0;
    });

    return summary;
  }, [attendanceData]);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.section.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesGrade = selectedGrade
      ? student.grade === selectedGrade
      : true;

    return matchesSearch && matchesGrade;
  });

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <HomeNavbar />

      <div className="min-h-screen p-8 w-[90%] mx-auto">
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-[50px] font-bold">Attendance Reports</h2>
          <p className="text-gray-500 text-center">
            Overview of students' attendance performance
          </p>
        </div>

        <div className="flex justify-center items-center w-full gap-4 mb-6 flex-wrap">
          <div className="relative w-[75vw] max-w-4xl">
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
                  <th className="px-6 py-3 text-left text-sm font-semibold">Picture</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Grade</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Section</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Roll Number</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Days Present</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Total Days</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold">Attendance %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredStudents.map((student) => {
                  const record = aggregatedAttendance[student._id] || {
                    presentdays: 0,
                    totaldays: 0,
                  };

                  const { presentdays, totaldays } = record;
                  const attendancePercentage = totaldays
                    ? ((presentdays / totaldays) * 100).toFixed(1)
                    : "0.0";

                  return (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <img
                          src={student.picture}
                          alt={student.name}
                          className="w-12 h-12 rounded-full object-cover border border-gray-300"
                        />
                      </td>

                      <td className="px-6 py-4 text-gray-900 font-medium">
                        {student.name}
                      </td>

                      <td className="px-6 py-4 text-gray-900">{student.grade}</td>

                      <td className="px-6 py-4 text-gray-900">{student.section}</td>

                      <td className="px-6 py-4 text-gray-900">{student.rollNumber}</td>

                      <td className="px-6 py-4 text-gray-900">{presentdays}</td>

                      <td className="px-6 py-4 text-gray-900">{totaldays}</td>

                      <td
                        className={`px-6 py-4 font-semibold ${
                          attendancePercentage >= 75
                            ? "text-green-600"
                            : attendancePercentage >= 50
                            ? "text-yellow-600"
                            : "text-red-600"
                        }`}
                      >
                        {attendancePercentage}%
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          !isLoading && (
            <div className="flex flex-col justify-center items-center text-gray-500 mt-12">
              <p>No Report Data found.</p>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default RecordsPage;