import { useState } from 'react';
import Navbar from './components/Navbar';
import Button from './components/GetStartedButton';
import { Zap, Target, Headphones, ArrowRight } from "lucide-react";
import AttendanceComparison from './sections/Difference';
import ProcessFlow from './sections/ProcessFlow';
import SecuritySection from './sections/DataSecure';
import Testimonials from './sections/Testimonials';
import FAQ from './sections/FAQs';
import { Link } from 'react-router-dom'
import Footer from './components/Footer';
import TextType from './components/TextType';
import CountUp from './components/CountUp';
import ScrollFade from './components/ScrollFade';
import { Routes, Route, Navigate } from 'react-router-dom'
import FeedbackForm from './pages/FeedbackForm';
import { Toaster } from 'react-hot-toast';
import { useAuthStore } from './store/useAuthStore';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import SignUpPage from './pages/SignUpPage';
import VerifyPage from './pages/VerifyPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import StudentsPage from './pages/StudentsPage';
import AddStudentPage from './pages/AddStudentPage';
import ReportsPage from './pages/RecordsPage';
import RecordsPage from './pages/RecordsPage';
import TakeAttendancePage from './pages/AttendancePage';

function App() {

  const { authUser, checkAuth, isCheckingAuth, isVerifyingEmail } = useAuthStore()

  return (
    <>
      <Routes>
        <Route
          path='/'
          element={
            <div className="flex flex-col items-center justify-center min-h-screen w-screen overflow-x-hidden">
              <Navbar />

              <div className="flex items-center justify-center w-full min-h-screen -mt-[10vh]">
                <div className="flex absolute left-0 flex-col ml-[12vw] h-full items-start justify-center w-1/2">
                  <h1 className="text-[62px] font-medium">
                    <TextType
                      text={["Fast. Accurate. Seamless.", "Smart. Reliable. Next-Gen."]}
                      typingSpeed={75}
                      pauseDuration={1500}
                      showCursor={true}
                      cursorCharacter="|"
                    />
                  </h1>
                  <p className="w-[700px] mb-10 mt-5">
                    Say goodbye to roll calls. AttendEase makes attendance fast, accurate, and effortless.
                  </p>
                  <Link to={"/login"}><Button text="Get Started" /></Link>

                  <div className='flex items-center justify-center mt-20 gap-10'>
                    <div className="rounded-2xl w-[10vw] cursor-pointer shadow-lg border border-gray-200 bg-white/60 backdrop-blur-md p-6 flex flex-col items-center space-y-3 hover:scale-105 transition-transform">
                      <Zap className="w-8 h-8 text-yellow-500" />
                      <h2 className="text-2xl font-bold text-gray-900">
                        <CountUp
                          from={0}
                          to={98}
                          separator=","
                          direction="up"
                          duration={1}
                          className="count-up-text"
                        />%
                      </h2>
                      <p className="text-sm text-gray-600">Faster than Roll Calls</p>
                    </div>

                    <div className="rounded-2xl w-[10vw] cursor-pointer shadow-lg border border-gray-200 bg-white/60 backdrop-blur-md p-6 flex flex-col items-center space-y-3 hover:scale-105 transition-transform">
                      <Target className="w-8 h-8 text-green-500" />
                      <h2 className="text-2xl font-bold text-gray-900">
                        <CountUp
                          from={0}
                          to={99.99}
                          separator=","
                          direction="up"
                          duration={1}
                          className="count-up-text"
                        />%
                      </h2>
                      <p className="text-sm text-gray-600">Accuracy Rate</p>
                    </div>

                    <div className="rounded-2xl w-[10vw] cursor-pointer shadow-lg border border-gray-200 bg-white/60 backdrop-blur-md p-6 flex flex-col items-center space-y-3 hover:scale-105 transition-transform">
                      <Headphones className="w-8 h-8 text-blue-500" />
                      <h2 className="text-2xl font-bold text-gray-900">
                        <CountUp
                          from={0}
                          to={24}
                          separator=","
                          direction="up"
                          duration={1}
                          className="count-up-text"
                        />/<CountUp
                          from={0}
                          to={7}
                          separator=","
                          direction="up"
                          duration={1}
                          className="count-up-text"
                        />
                      </h2>
                      <p className="text-sm text-gray-600">Support</p>
                    </div>
                    <div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center w-[50%] -mt-10 h-[92vh] ml-[45vw]">
                  <img src="/landingImg.jpg" className='rounded-xl cursor-pointer hover:scale-105 transition-all duration-300' width={650} alt="" />
                </div>

              </div>

              <section className="py-12 w-full -mt-[180px]">
                <div className="max-w-6xl mx-auto text-center">
                  <p className="text-sm font-medium text-gray-600 mb-5">
                    Trusted by leading educational institutions
                  </p>

                  <div className="flex flex-wrap justify-center items-center gap-x-10 gap-y-4 text-gray-500 font-medium">
                    <span>Harvard University</span>
                    <span>Stanford University</span>
                    <span>MIT</span>
                    <span>Oxford University</span>
                    <span>Cambridge University</span>
                  </div>
                </div>
              </section>

              <ScrollFade>
                <div className='w-full h-screen'>
                  <AttendanceComparison />
                </div>
              </ScrollFade>

              <ScrollFade>
                <div className='w-full h-screen'>
                  <ProcessFlow />
                </div>
              </ScrollFade>

              <ScrollFade>
                <div className='w-full h-screen'>
                  <SecuritySection />
                </div>
              </ScrollFade>

              <ScrollFade>
                <div className='w-full h-screen'>
                  <Testimonials />
                </div>
              </ScrollFade>

              <ScrollFade>
                <div className='w-full h-screen'>
                  <FAQ />
                </div>
              </ScrollFade>

              <ScrollFade>
                <section id='contactUs' className='w-full h-[50vh] flex items-center justify-center text-gray-800'>
                  <div className='flex bg-white flex-col items-center border border-gray-500 shadow-md w-[40vw] rounded-2xl gap-4 py-10 px-15 cursor-pointer hover:scale-105 transition-all duration-150'>
                    <h1 className='text-[30px] font-bold'>Still Have Qustions or Feedback for Us ?</h1>
                    <p className='text-[20px]'>Don't worry we are here for you 24/7.</p>
                    <Link to={"/contactus"}><p className='flex items-center justify-center text-gray-800 hover:underline gap-2'>Reach Us <ArrowRight width={16} /></p></Link>
                  </div>
                </section>
              </ScrollFade>

              <div className='w-full mt-20'>
                <Footer />
              </div>
            </div>
          }
        />
        <Route path='/contactus' element={<FeedbackForm />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/home" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/home" />} />
        <Route path="/verify-email" element={authUser ? <VerifyPage /> : <Navigate to="/" />}/>
        <Route path="/forgot-password" element={!authUser ? <ForgotPasswordPage /> : <Navigate to="/home" />}/>
        <Route path='/reset-password/:token' element={!authUser ? <ResetPasswordPage /> : <Navigate to="/home" />}/>
        <Route path="/logout" element={<Navigate to="/" />} />
        <Route path="/home" element={!authUser ? <Navigate to="/" />: <HomePage />} />
        <Route path="/students" element={!authUser ? <Navigate to="/" />: <StudentsPage />} />  
        <Route path="/students/addstudent" element={!authUser ? <Navigate to="/" />: <AddStudentPage />} />
        <Route path="/records" element={!authUser ? <Navigate to="/" />: <RecordsPage />} />
        <Route path="/attendance" element={!authUser ? <Navigate to="/" />: <TakeAttendancePage />} />
      </Routes>

      <Toaster
        position="bottom-right"
        reverseOrder={false}
      />
    </>
  );
}

export default App;