import React, { useState } from 'react';
import axios from "axios"
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

 function Signup() {
  const navigate=useNavigate()
  const [fullName , setFullName]=useState("");
  const [email , setEmail]=useState("");
  const [phoneNumber , setPhoneNumber]=useState("");
  const [password , setPassword]=useState("");
  const [role, setRole] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
  
   // The data to be sent to the API
   const formData = {
    fullName,
    email,
    phoneNumber,
    password,
    role
  };

  try {
    // Send the data to your API endpoint using Axios
    const response = await axios.post('http://localhost:3000/signup', formData, {
      headers: {
        'Content-Type': 'application/json'
      },
      withCredentials: true // Include credentials if needed
    });
     // Log the response to check the structure
     console.log('Signup response:', response.data);

     // Ensure that the role is stored in localStorage
     localStorage.setItem('userRole', response.data.User.role);
    toast.success('Signup successful!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    
    // Log success or handle response
    console.log('Form submitted successfully:', response.data);
navigate("/login")
    // You can also show a success message or redirect the user
   // alert('Signup successful!');

  } catch (error) {
    const errorMessage = error.response && error.response.data && error.response.data.message 
    ? error.response.data.message 
    : 'Signup failed. Please try again.';

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
    // Handle errors here
    console.error('Error submitting form:', error);
    alert('Signup failed. Please try again.');
  }
};
  return (
    <div className="min-h-screen  bg-gradient-to-r from-blue-500 to-purple-500 py-10">
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg rounded-lg border-2 border-gray-300 my-10">
      <form className="w-full" onSubmit={handleSubmit}>
        <h1 className="font-bold text-xl text-black text-center mb-5">!! Signup Here !!</h1>
  
        <div className="my-2">
          <label htmlFor="fullname" className="block font-medium text-white">Full Name:</label>
          <input
            type="text"
            name="fullname"
            value={fullName}
            placeholder="Sharma"
            onChange={(e) => setFullName(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
          />
        </div>
        
        <div className="my-2">
          <label htmlFor="email" className="block font-medium text-white">Email:</label>
          <input
            type="email"
            name="email"
            value={email}
            placeholder="sharma@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
          />
        </div>
        
        <div className="my-2">
          <label htmlFor="phoneNumber" className="block font-medium text-white">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={phoneNumber}
            placeholder="8080808080"
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
          />
        </div>
        
        <div className="my-2">
          <label htmlFor="password" className="block font-medium text-white">Password:</label>
          <input
            type="password"
            name="password"
            value={password}
            placeholder="sh@123"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
          />
        </div>
        
        <div>
          <label className="block mb-4 text-sm font-medium text-white">Role</label>
          <div className="space-y-2">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="role"
                checked={role === 'student'}
                onChange={() => setRole('student')}
                className="form-radio"
              />
              <span className="ml-2 text-white">Student</span>
            </label>
  
            <label className="inline-flex items-center ml-4">
              <input
                type="radio"
                name="role"
                checked={role === 'recruiter'}
                onChange={() => setRole('recruiter')}
                className="form-radio"
              />
              <span className="ml-2 text-white">Recruiter</span>
            </label>
          </div>
        </div>
  
        <button type="submit" className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
          Sign Up
        </button>
        <ToastContainer />
      </form>
    </div>
 
    </div>
  
  );
}

export default Signup;
