import { COMPLAINT_REGISTRATION_EMAIL_TEMPLATE, FEEDBACK_ACKNOWLEDGEMENT_EMAIL_TEMPLATE, PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplates.js"
import transporter from "./mailtrap.config.js"

export const sendVerificationEmail = async (email, verificationToken) => {
  const recipient = [{ email }]
  try {
    const res = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", verificationToken)
    })

    console.log("Verification email sent successfully:", res);
  } catch (error) {
    console.error("Error sending verification email:", error);
    throw new Error("Failed to send verification email: " + error.message);
  }
}

export const sendWelcomeEmail = async (email, fullName) => {
  const recipient = [{ email }]
  try {
    const res = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Welcome to AttendEads",
      html: WELCOME_EMAIL_TEMPLATE.replace("{username}", fullName)
    })

    console.log("Welcome email sent successfully:", res);
  } catch (error) {
    console.error("Error sending welcome email:", error);
    throw new Error("Failed to send welcome email: " + error.message);
  }
}

export const sendPasswordResetEmail = async (email, resetURL) => {
  const recipient = [{ email }]
  try {
    const res = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password Reset Email",
      html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", resetURL)
    })
    console.log("Password Reset E-mail sent successfully:", res);
    
  } catch (error) {
    console.error("Error sending password reset email:", error);
    throw new Error("Failed to send password reset email: " + error.message);
  }
}

export const sendPasswordResetSuccessEmail = async (email) => {
  const recipient = [{ email }]
  try {
    const res = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password Reset Success Email",
      html: PASSWORD_RESET_SUCCESS_TEMPLATE
    })
    console.log("Password Reset Success E-mail sent successfully:", res);
    
  } catch (error) {
    console.error("Error sending password reset success email:", error);
    throw new Error("Failed to send password reset success email: " + error.message);
  }
}

export const sendComplainEmail = async (email, name, feedback) => {
  const recipient = [{ email }]
  try {
    const res = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Your Complain has been Registered",
      html: COMPLAINT_REGISTRATION_EMAIL_TEMPLATE.replace("{userName}", name).replace("{complaintMessage}", feedback).replace("{complaintDate}", new Date().toLocaleDateString())
    })

    console.log("Complain email sent successfully:", res);
  } catch (error) {
    console.error("Error sending complain email:", error);
    throw new Error("Failed to send complain email: " + error.message);
  }
}

export const sendFeedbackEmail = async (email, name, feedback) => {
  const recipient = [{ email }]
  try {
    const res = await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Your Feedback has been Received",
      html: FEEDBACK_ACKNOWLEDGEMENT_EMAIL_TEMPLATE.replace("{userName}", name).replace("{feedbackMessage}", feedback).replace("{feedbackDate}", new Date().toLocaleDateString())
    })

    console.log("Feedback email sent successfully:", res);
  } catch (error) {
    console.error("Error sending feedback email:", error);
    throw new Error("Failed to send feedback email: " + error.message);
  }
}