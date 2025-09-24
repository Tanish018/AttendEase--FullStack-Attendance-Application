import { generateToken } from "../lib/utils.js"
import { sendComplainEmail, sendFeedbackEmail, sendPasswordResetEmail, sendPasswordResetSuccessEmail, sendVerificationEmail, sendWelcomeEmail } from "../mailtrap/emails.js"
import Student from "../models/student.model.js"
import User from "../models/user.model.js"
import bcrypt from 'bcryptjs'
import crypto from 'crypto'
import cloundinary from "../lib/cloudinary.js"
import ContactUs from "../models/contact.model.js"

export const signup = async (req, res) => {
  const { fullName, email, password } = req.body
  try {
    if (!fullName || !email || !password) {
      return res.status(400).json({ message: "Fill all the fields." })
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be atleast 6 characters long." })
    }
    const user = await User.findOne({ email })
    if (user) return res.status(400).json({ message: "Email already Registered." })

    // hash password :-
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = new User(
      {
        email,
        fullName,
        password: hashedPassword,
        verificationToken,
        verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000
      }
    )


    if (newUser) {
      // generate jwt token :-
      generateToken(newUser._id, res)
      await newUser.save();

      await sendVerificationEmail(newUser.email, verificationToken);

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        email: newUser.email,
        profilePic: newUser.profilePic,
      })
    } else {
      res.status(400).json({ message: "Invalid User Data" })
    }

  } catch (error) {
    console.log("Error in Signup Controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const verifyEmail = async (req, res) => {
  const { code } = req.body;
  try {
    const user = await User.findOne({ verificationToken: code, verificationTokenExpiresAt: { $gt: Date.now() } });
    if (!user) {
      return res.status(400).json({ success: false, message: "Invalid or expired verification code." });
    }

    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;
    await user.save();

    await sendWelcomeEmail(user.email, user.fullName);
    res.status(200).json({ success: true, message: "Email verified successfully.", user: { _id: user._id, password: undefined } });
  } catch (error) {
    console.log("Error in verifyEmail Controller:", error.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid Credentials" })
    }
    generateToken(user._id, res);
    res.status(201).json({
      _id: user._id,
      fullName: User.fullName,
      email: User.email,
      profilePic: User.profilePic,
    })
  } catch (error) {
    console.log("Error in Login Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 })
    res.status(201).json({ message: "Logged Out Successfully" })
  } catch (error) {
    console.log("Error in Logout Controller", error.message);
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const checkAuth = (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.log("Error in checkAuth controller", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiresAt = Date.now() + 3600000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpiresAt = resetTokenExpiresAt;

    await user.save();

    // send email:-
    await sendPasswordResetEmail(user.email, `${process.env.CLIENT_URL}/reset-password/${resetToken}`);
    res.status(200).json({ message: "Password reset email sent successfully" });

  } catch (error) {
    console.log("Error in forgotPassword controller ", error);
    res.status(400).json({ success: false, message: error.message });
  }
}

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpiresAt: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired password reset token" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpiresAt = undefined;

    await user.save();

    await sendPasswordResetSuccessEmail(user.email);
    res.status(200).json({ message: "Password reset successful" });

  } catch (error) {
    console.log("Error in resetPassword controller ", error);
    res.status(400).json({ success: false, message: error.message });
  }
}

export const addStudent = async (req, res) => {
  const { name, grade, section, rollNumber, dateOfBirth, contact, picture } = req.body
  try {
    if (!name || !grade || !section || !rollNumber || !dateOfBirth || !contact || !picture) {
      return res.status(400).json({ message: "Fill all the fields." })
    }

    if (rollNumber.length < 6) {
      return res.status(400).json({ message: "Enter Valid Roll Number." })
    }

    if (contact.length < 10) {
      return res.status(400).json({ message: "Enter Valid Mobile Number." })
    }

    const student = await User.findOne({ rollNumber })
    if (student) return res.status(400).json({ message: "Student already Registered." })

    let pictureUrl;
    if (picture) {
      // Upload Image to Cloudinary :-
      const uploadResponse = await cloundinary.uploader.upload(picture)
      pictureUrl = uploadResponse.secure_url
    }

    const newStudent = new Student(
      {
        name,
        grade,
        section,
        rollNumber,
        dateOfBirth,
        contact,
        picture: pictureUrl
      }
    )


    if (newStudent) {
      await newStudent.save();
      res.status(201).json({
        _id: newStudent._id,
        name: newStudent.name,
        grade: newStudent.grade,
        section: newStudent.section,
        rollNumber: newStudent.rollNumber,
        dateOfBirth: newStudent.dateOfBirth,
        contact: newStudent.contact,
        picture: newStudent.picture
      })
    } else {
      res.status(400).json({ message: "Invalid Student Data" })
    }

  } catch (error) {
    console.log("Error in addStudent Controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" })
  }
}

export const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch students" });
  }
}

export const contactus = async (req, res) => {
  const { name, email, isComplain, isFeedback, feedback } = req.body
  try {
    if (!name || !email || (!isComplain && !isFeedback) || !feedback) {
      return res.status(400).json({ message: "Fill all the fields." })
    }
    
    if(isComplain && isFeedback) {
      return res.status(400).json({ message: "Both Can't be true." })
    }

    if (feedback.length < 20) {
      return res.status(400).json({ message: "Feedback Should be of minimum 20 words." })
    }

    const msg = await User.findOne({ feedback })
    if (msg) return res.status(400).json({ message: "Feedback already Registered." })

    const newFeedback = new ContactUs(
      {
        name,
        email,
        isComplain,
        isFeedback,
        feedback
      }
    )

    if (newFeedback) {
      await newFeedback.save();

      if(newFeedback.isComplain) {
        await sendComplainEmail(newFeedback.email, newFeedback.name, newFeedback.feedback);
      }

      if(newFeedback.isFeedback) {
        await sendFeedbackEmail(newFeedback.email, newFeedback.name, newFeedback.feedback);
      }

      res.status(201).json({
        _id: newFeedback._id,
        name: newFeedback.name,
        email: newFeedback.email,
        isComplain: newFeedback.isComplain,
        isFeedback: newFeedback.isFeedback,
        feedback: newFeedback.feedback
      })
    } else {
      res.status(400).json({ message: "Invalid Data" })
    }

  } catch (error) {
    console.log("Error in ContactUs Controller: ", error.message);
    res.status(500).json({ message: "Internal Server Error" })
  }
}