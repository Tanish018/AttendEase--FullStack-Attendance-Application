import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { useAuthStore } from "../store/useAuthStore";
import Button from "../components/LoginButton";

const VerifyPage = () => {

  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputRefs = useRef([]);
  const navigate = useNavigate();
  const isLoading = false;

  const { isVerifying, verifyEmail } = useAuthStore();

  const handleChange = (index, value) => {
    const newCode = [...code];

    // Handle pasted content
    if (value.length > 1) {
      const pastedCode = value.split("").slice(0, 6);
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      // Focus on the last non-empty input or the first empty one
      const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
      const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
      inputRefs.current[focusIndex].focus();
    } else {
      newCode[index] = value;
      setCode(newCode);

      // Move focus to the next input field if value is entered
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const verificationCode = code.join("");
    try {
      const res = await verifyEmail(verificationCode);
      if (res) {
        navigate("/home");
        toast.success("Email verified successfully!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed. Please try again.");
    }
  }


  // Auto-Submit :-
  useEffect(() => {
    if (code.every((digit) => digit !== '')) {
      handleSubmit(new Event('submit'));
    }
  }, [code])

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  }

  return (
    <div className="flex items-center flex-col overflow-hidden min-h-screen">
      <Navbar />

      <div className="relative z-30 flex items-center justify-center w-full">
        <div className="mt-50 max-w-md w-full bg-opacity-50 backdrop-filter border border-black backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-transparent bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-full max-w-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-black">
              Verify Your Email
            </h2>
            <p className="text-center text-black font-semibold mb-6">
              Enter the 6-digit code sent to your email address.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex justify-between">
                {code.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => (inputRefs.current[index] = el)}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-12 h-12 text-center text-2xl font-bold bg-white text-black border-2 border-black rounded-lg focus:border-black focus:outline-none"
                  />
                ))}
              </div>

              <div className="w-full flex items-center justify-center">
                <Button
                  text={isVerifying ? "Verifying..." : "Verify Email"}
                  disabled={isVerifying || code.some((digit) => !digit)}
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );

}

export default VerifyPage