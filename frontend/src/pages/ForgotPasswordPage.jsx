import { useState } from "react";
import { ArrowLeft, Loader, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Navbar from "../components/Navbar";
import Button from "../components/LoginButton";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { isLoading, forgotPassword } = useAuthStore();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <div className="flex items-center flex-col overflow-hidden min-h-screen">
      <Navbar />

      <div className="relative z-30 flex flex-col items-center justify-center w-full">
        <div className="mt-40 flex items-center justify-center flex-col px-8 py-6 max-w-[600px] w-full bg-opacity-50 backdrop-filter border border-black backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">

          <h2 className="text-3xl font-bold mb-6 text-center text-black">
            Forgot Password
          </h2>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center w-full">
              <p className="text-black font-semibold mb-6 text-center">
                Enter your email address and we'll send you a link to reset your password.
              </p>

              <div className="form-control mb-5 text-black w-full max-w-md">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-black" />
                  </div>
                  <input
                    type="email"
                    className="input text-[18px] input-bordered w-full max-w-md pl-10 py-[16px] font-semibold border border-black rounded-xl"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <Button
                text={
                  isLoading ? (
                    <Loader className="size-6 animate-spin mx-auto" />
                  ) : (
                    "Send Reset Link"
                  )
                }
                disabled={isLoading}
              />
            </form>
          ) : (
            <div className="text-center">
              <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <p className="text-black mb-6">
                If an account exists for {email}, you will receive a password reset link shortly.
              </p>
            </div>
          )}

          <Link to="/login" className="mt-4">
            <Button text="Back to Login" />
          </Link>
        </div>
      </div>
    </div>
  );
};
export default ForgotPasswordPage;