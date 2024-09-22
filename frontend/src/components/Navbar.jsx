import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Navbar = () => {
  const isAuthenticated=useSelector((state)=>state.auth.status)
  return (
    <nav className="bg-gray-800 p-4">
      <div className='flex items-center justify-between mx-auto  h-16'>
      <div>
      <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
      </div>
      <div className='flex items-center gap-12'>
      <ul className="flex space-x-12 text-white">
        <li>
          <Link to="/" className="hover:text-gray-400">Home</Link>
        </li>
        <li>
          <Link to="/about" className="hover:text-gray-400">About</Link>
        </li>
        <li>
          <Link to="/jobspage" className="hover:text-gray-400">Job Details</Link>
        </li>
       
        <li>
          <Link to="/all-jobs" className="hover:text-gray-400">All Jobs</Link>
        </li>
        <li>
          <Link to="/create-job" className="hover:text-gray-400">Create Job</Link>
        </li>
        <li>
          <Link to="/register-company" className="hover:text-gray-400">Register Company</Link>
        </li>
        <li>
          <Link to="/company-list" className="hover:text-gray-400">registered Company</Link>
        </li>
       
        {!isAuthenticated && (
          <>
             <li>
          <Link to="/signup" className="hover:text-gray-400">Sign Up</Link>
        </li>
        <li>
          <Link to="/login" className="hover:text-gray-400">Login</Link>
        </li>
          </>
        )}

        {/* Show logout link only if user is authenticated */}
        {isAuthenticated && (
         <li>
         <Link to="/logout" className="hover:text-gray-400">Logout</Link>
       </li>
        )}
      </ul>
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
