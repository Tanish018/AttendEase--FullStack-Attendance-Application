import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
    },
    isComplain: {
      type: Boolean,
      default: false
    },
    isFeedback: {
      type: Boolean,
      default: false
    },
    feedback: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const ContactUs = mongoose.model("Contact", contactSchema);
export default ContactUs;