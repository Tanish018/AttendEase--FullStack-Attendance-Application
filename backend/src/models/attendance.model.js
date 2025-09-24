import mongoose from 'mongoose'

const attendanceSchema = new mongoose.Schema(
  {
    student: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["Present", "Absent"],
      required: true,
    },
    totaldays: {
      type: Number,
      default: 0,
    },
    presentdays: {
      type: Number,
      default: 0,
    },
    absentdays: {
      type: Number,
      default: 0,
    },
  }, { timestamps: true }
);

attendanceSchema.index({ student: 1, date: 1 }, { unique: true });

const Attendance = mongoose.model("Attendance", attendanceSchema)
export default Attendance;