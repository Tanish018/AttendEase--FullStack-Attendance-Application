import mongoose from 'mongoose'
import Student from '../models/student.model.js';
import Attendance from '../models/attendance.model.js';

export const saveAttendance = async (req, res) => {
  try {
    const { date, attendance } = req.body;

    const normalizedDate = new Date(date);
    normalizedDate.setUTCHours(0, 0, 0, 0);

    const operations = attendance.map((record) => ({
      updateOne: {
        filter: { student: record.studentId, date: normalizedDate },
        update: { $set: { status: record.status } },
        upsert: true,
      },
    }));

    await Attendance.bulkWrite(operations);

    for (const record of attendance) {
      const studentId = record.studentId;

      const stats = await Attendance.aggregate([
        {
          $match: { student: new mongoose.Types.ObjectId(studentId) },
        },
        {
          $group: {
            _id: "$status",
            count: { $sum: 1 },
          },
        },
      ]);

      let presentDays = 0;
      let absentDays = 0;

      stats.forEach((stat) => {
        if (stat._id === "Present") presentDays = stat.count;
        if (stat._id === "Absent") absentDays = stat.count;
      });

      const totalDays = presentDays + absentDays;

      await Attendance.updateOne(
        { student: studentId, date: normalizedDate },
        { $set: { totaldays: totalDays, presentdays: presentDays, absentdays: absentDays } }
      );
    }

    res.json({ message: "Attendance and stats saved successfully!" });
  } catch (error) {
    console.error("Error saving attendance:", error);
    res.status(500).json({ message: "Failed to save attendance." });
  }
};

export const getRecords = async (req, res) => {
  try {
    const attendance = await Attendance.find();
    res.status(200).json(attendance);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch attendance." });
  }
}