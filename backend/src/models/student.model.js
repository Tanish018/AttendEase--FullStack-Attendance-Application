import mongoose from 'mongoose'

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    grade: {
      type: String,
      required: true
    },
    section: {
      type: String,
      required: true
    },
    rollNumber: {
      type: String,
      required: true,
      unique: true
    },
    dateOfBirth: {
      type: Date,
      required: true
    },
    contact: {
      type: String,
      required: true
    },
    picture: {
      type: String,
      unique: true,
      default: ""
    }
  },
  { timestamps:true }
)

const Student = mongoose.model("Student", studentSchema)
export default Student;