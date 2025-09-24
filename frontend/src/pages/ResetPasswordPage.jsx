import { useState } from "react";
import { ArrowLeft, Eye, EyeOff, Loader, Mail, Lock, Loader2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import Navbar from "../components/Navbar";
import toast from "react-hot-toast";
import Button from "../components/LoginButton";

const ResetPasswordPage = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const { resetPassword, isLoading } = useAuthStore();

  const { token } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
      }
      await resetPassword(token, password);
      toast.success("Password reset Successfull. Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000)

    } catch (error) {
      console.error("Reset Password Error:", error.message);
      toast.error(error.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen overflow-hidden">
      <Navbar />

      <div className="flex flex-col items-center justify-center flex-1 text-black w-full px-4">
        <div className="w-full max-w-[500px] bg-opacity-50 backdrop-filter border border-black backdrop-blur-xl rounded-2xl shadow-xl p-10">
          <h2 className="text-3xl font-bold mb-10 text-center">Reset Password</h2>

          <form onSubmit={handleSubmit} className="space-y-6 w-full">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="New Password"
                className="w-full pl-10 py-4 font-semibold border border-black rounded-xl text-lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>

            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-base-content/40" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm New Password"
                className="w-full pl-10 py-4 font-semibold border border-black rounded-xl text-lg"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5 text-base-content/40" />
                ) : (
                  <Eye className="h-5 w-5 text-base-content/40" />
                )}
              </button>
            </div>

            <div className="w-full flex items-center justify-center">
              <Button
                text={
                  isLoading ? (
                    <div className="flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      <span>Resetting...</span>
                    </div>
                  ) : (
                    "Set New Password"
                  )
                }
                disabled={isLoading}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default ResetPasswordPage;