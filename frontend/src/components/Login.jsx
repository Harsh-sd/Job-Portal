import React from 'react'
import Input from './Input';
import Button from './Button';
import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {login} from"../store/authslice"
function Login() {
  const [email , setEmail]=useState("");
  const [password, setPassword]=useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate()
  const handleSubmit=async(e)=> {
    e.preventDefault();
  
    // The data to be sent to the API
    const formData = {
     email,
     password
     
   };
   try {
    // Send the data to your API endpoint using Axios
    const response = await axios.post('http://localhost:3000/login', formData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true // Include credentials if needed
    });

    // Log success or handle response
    console.log('Form submitted successfully:', response.data);
    dispatch(login(response.data))
    const { token } = response.data;
    
    // Save token to localStorage
    localStorage.setItem('authToken', token);
    navigate("/")

    // You can also show a success message or redirect the user
    alert('Login successful!');

  } catch (error) {
    // Handle errors here
    console.error('Error submitting form:', error);
    alert('Login failed. Please try again.');
  }
  }

  return (
    <div>
   
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
    </div>
  );
}

export default Login
