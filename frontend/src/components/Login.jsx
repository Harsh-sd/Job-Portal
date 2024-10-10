import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from "../store/authslice";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password
    };

    try {
      const response = await axios.post('http://localhost:3000/login', formData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true 
      });

      console.log('Form submitted successfully:', response.data);
      dispatch(login(response.data));
      const { token } = response.data;
      
      localStorage.setItem('authToken', token);

      // Display success toast notification
      toast.success('Login successful!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      // Add delay before navigating to ensure toast appears
      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (error) {
      console.error('Error submitting form:', error);
      const errorMessage = error.response && error.response.data && error.response.data.message
                          ? error.response.data.message
                          : 'Login failed. Please try again.';
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <div className="min-h-screen  bg-gradient-to-r from-blue-500 to-purple-500 py-10">
      <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg rounded-lg border-2 border-gray-300 my-10">
        <form className="w-full" onSubmit={handleSubmit}>
          <h1 className="font-bold text-xl text-black text-center mb-5">!! Login Here !!</h1>

          <div className="my-2">
            <label htmlFor="email" className="block font-medium text-white">Email:</label>
            <input
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="sharma@gmail.com"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
            />
          </div>

          <div className="my-2">
            <label htmlFor="password" className="block font-medium text-white">Password:</label>
            <input
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="sh@gmail.com"
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
            />
          </div>

          <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
            Login
          </button>
        </form>
      </div>

      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
    </div>
  );
}

export default Login;
