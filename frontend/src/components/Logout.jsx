import React from 'react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from "../store/authslice"; // Adjust the path as needed
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

   // Conditionally render the component based on `isOpen`

  const handleLogout = async () => {
    console.log('Logout function triggered');
    try {
      // Make an API request to log out
      const token = localStorage.getItem('authToken');

      // Make sure the token is available
      if (!token) {
        console.error("No token available");
        alert("User is not authenticated!");
        return;
      }
      const response = await axios.post(`http://localhost:3000/logout`,{
        headers: {
               
          'Authorization': `${token}`
        },
        withCredentials: true
      
      });

      // Check response status
      if (response.status === 200) {
        console.log('Logout successful');
        // Dispatch Redux logout action
        dispatch(logoutAction());
        // Navigate to the login page
        navigate('/login');
      } else {
        console.error('Logout failed with status:', response.status);
        alert('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout request failed:', error);
      alert('Logout failed. Please try again.');
    }
  };

  const handleCancel = () => {
    
     navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
  <form className="bg-white   from-purple-500 to-pink-500 p-8 rounded-lg shadow-lg w-full max-w-md">
    <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-black py-4 px-6 rounded-t-lg">
      <h1 className="text-2xl font-bold mb-0 text-center">Do you want to logout?</h1>
    </div>
    <div className="p-6">
      <div className="flex justify-between">
        <button
          type="button"
          onClick={handleLogout}
          className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors"
        >
          Logout
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  </form>
</div>


  );
}

export default Logout;
