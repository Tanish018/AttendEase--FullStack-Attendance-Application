import React, { useEffect, useState } from "react";
import { useStudentStore } from "../store/useStudentStore";
import { useAttendanceStore } from "../store/useAttendanceStore";
import { Loader, Loader2, UserCheck, UserX } from "lucide-react";
import HomeNavbar from "../components/HomeNavbar";
import Button from "../components/LoginButton";

const TakeAttendancePage = () => {
  const { students, fetchStudent, isLoading: studentLoading } = useStudentStore();
  const { saveAttendance, isLoading: attendanceLoading } = useAttendanceStore();

  const [selectedGrade, setSelectedGrade] = useState("");
  const [attendance, setAttendance] = useState({});
  const [studentsByGrade, setStudentsByGrade] = useState([]);

  // Fixed date: today
  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (selectedGrade) {
      fetchStudent();
    }
  }, [selectedGrade, fetchStudent]);

  useEffect(() => {
    if (selectedGrade && students.length > 0) {
      setStudentsByGrade(students.filter((s) => s.grade === selectedGrade));
    }
  }, [selectedGrade, students]);

  const handleAttendanceChange = (id, status) => {
    setAttendance((prev) => ({ ...prev, [id]: status }));
  };

  const handleSubmitAttendance = async () => {
    if (!selectedGrade) {
      alert("Please select a grade first!");
      return;
    }

    const markedAttendance = studentsByGrade.map((student) => ({
      studentId: student._id,
      status: attendance[student._id] || "Absent",
    }));

    try {
      await saveAttendance(todayDate, markedAttendance);
      setAttendance({});
    } catch (err) {
      console.error("Error saving attendance:", err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-transparent">
      <HomeNavbar />

      <div className="min-h-screen p-8 w-[90%] mx-auto">
        {/* Header */}
        <div className="flex flex-col items-center mb-10">
          <h2 className="text-[50px] font-bold">Take Attendance</h2>
          <p className="text-gray-500 text-center">
            Mark daily attendance for each student
          </p>
          <p className="mt-2 text-lg font-semibold">
            Date: <span className="text-gray-700">{todayDate}</span>
          </p>
        </div>

        {/* Grade Selection */}
        <div className="flex justify-center mb-6">
          <select
            value={selectedGrade}
            onChange={(e) => setSelectedGrade(e.target.value)}
            className="border rounded-lg px-4 py-2 text-lg focus:outline-none focus:ring-2 focus:ring-black"
          >
            <option value="">Select Grade</option>
            {Array.from({ length: 12 }, (_, i) => (
              <option key={i + 1} value={`${i + 1}`}>
                Grade {i + 1}
              </option>
            ))}
          </select>
        </div>

        {(studentLoading) && (
          <div className="flex justify-center items-center h-40">
            <Loader className="w-10 h-10 animate-spin text-black" />
          </div>
        )}

        {!studentLoading && selectedGrade && studentsByGrade.length > 0 && (
          <>
            <div className="overflow-x-auto rounded-lg shadow">
              <table className="min-w-full bg-white mt-5">
                <thead className="bg-gray-100 text-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Picture</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Grade</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Section</th>
                    <th className="px-6 py-3 text-left text-sm font-semibold">Roll Number</th>
                    <th className="px-6 py-3 text-center text-sm font-semibold">Attendance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {studentsByGrade.map((student) => (
                    <tr key={student._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4">
                        <img
                          src={student.picture || "https://via.placeholder.com/50"}
                          alt={student.name}
                          className="w-12 h-12 rounded-full object-cover border border-gray-300"
                        />
                      </td>
                      <td className="px-6 py-4 text-gray-900 font-medium">{student.name}</td>
                      <td className="px-6 py-4 text-gray-900">{student.grade}</td>
                      <td className="px-6 py-4 text-gray-900">{student.section}</td>
                      <td className="px-6 py-4 text-gray-900">{student.rollNumber}</td>
                      <td className="px-6 py-4 text-center flex justify-center gap-2">
                        <button
                          onClick={() => handleAttendanceChange(student._id, "Present")}
                          className={`flex items-center gap-1 px-3 py-1 rounded ${attendance[student._id] === "Present"
                            ? "bg-green-500 text-white"
                            : "bg-gray-200"
                            }`}
                        >
                          <UserCheck className="h-4 w-4" /> Present
                        </button>
                        <button
                          onClick={() => handleAttendanceChange(student._id, "Absent")}
                          className={`flex items-center gap-1 px-3 py-1 rounded ${attendance[student._id] === "Absent"
                            ? "bg-red-500 text-white"
                            : "bg-gray-200"
                            }`}
                        >
                          <UserX className="h-4 w-4" /> Absent
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-6 z-40">
              <button onClick={handleSubmitAttendance} className="w-full md:w-auto">
                <Button
                  text={
                    attendanceLoading ? (
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Loading...
                      </div>
                    ) : (
                      "Submit Attendance"
                    )
                  }
                  disabled={attendanceLoading}
                />
              </button>
            </div>
          </>
        )}

        {selectedGrade && !studentLoading && studentsByGrade.length === 0 && (
          <div className="flex flex-col justify-center items-center text-gray-500 mt-12">
            <p>No students found for Grade {selectedGrade}.</p>
          </div>
        )}

        {!selectedGrade && (
          <div className="flex flex-col justify-center items-center text-gray-500 mt-12">
            <p>Select a grade to view students.</p>
          </div>
        )}
      </div>
    </div >
  );
};

export default TakeAttendancePage;
