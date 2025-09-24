import React, { useEffect } from 'react'
import Button from './LoginButton'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../store/useAuthStore'

const Navbar = () => {

  const { authUser, checkAuth, logout } = useAuthStore()

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <div className='flex mx-auto items-center z-50 border rounded-full px-10 py-5 -pl-3 border-black justify-between w-[80%] h-[90px] mt-10 p-4 bg-white bg-opacity-50 backdrop-blur-xl'>
      <div className="left">
        <h1 className='text-[25px] font-semibold flex items-center gap-1 justify-center'>
          <img src="/logo.png" width={80} alt="" />
          {authUser ? <Link to={"/home"}>AttendEase</Link> : <Link to={"/"}>AttendEase</Link>}
        </h1>
      </div>

      <div className="mid flex items-center justify-center gap-10 text-lg font-medium">
        <ul className="flex gap-10">
          <li className="relative group cursor-pointer">
            {authUser ? <Link to={"/home"}>Home</Link> : <Link to={"/"}>Home</Link>}
            <span className="absolute left-0 bottom-0 h-[2px] w-full scale-x-0 bg-black origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </li>
          <li className="relative group cursor-pointer">
            About Us
            <span className="absolute left-0 bottom-0 h-[2px] w-full scale-x-0 bg-black origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </li>
          <li className="relative group cursor-pointer">
            <Link to={"/contactus"}>Contact Us</Link>
            <span className="absolute left-0 bottom-0 h-[2px] w-full scale-x-0 bg-black origin-center transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
          </li>
        </ul>
      </div>

      <div className="right flex gap-5">
        {authUser ? (
          <Link to="/logout" onClick={logout}><Button text="Logout"/></Link>
        ) : (
          <>
            <Link to="/login"><Button text="Login" /></Link>
            <Link to="/signup"><Button text="Signup" /></Link>
          </>
        )}
      </div>
    </div>
  )
}

export default Navbar