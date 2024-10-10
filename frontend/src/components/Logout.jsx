import React from 'react';
import { useDispatch } from 'react-redux';
import { logout as logoutAction } from "../store/authslice"; 
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    console.log('Logout function triggered');
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.error("No token available");
        toast.error("User is not authenticated!");
        return;
      }

      // Send the logout request to the backend
      const response = await axios.post(
        `http://localhost:3000/logout`,
        {},
        {
          headers: {
            'Authorization': `${token}`
          },
          withCredentials: true
        }
      );

      if (response.status === 200) {
        console.log('Logout successful');
        // Remove the token from localStorage
        localStorage.removeItem('authToken');
        
        // Dispatch the logout action to update the Redux state
        dispatch(logoutAction());

        // Display a success toast notification
        toast.success('Logout successful!');

        // Redirect to the login page
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        console.error('Logout failed with status:', response.status);
        toast.error('Logout failed. Please try again.');
      }
    } catch (error) {
      console.error('Logout request failed:', error);
      toast.error('Logout failed. Please try again.');
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  return (
    <div className="flex items-center justify-center min-h-screen  bg-gradient-to-r from-blue-500 to-purple-500 py-10">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md transition-transform transform hover:scale-105">
  <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-t-lg shadow-md">
    <h1 className="text-2xl font-bold mb-0 text-center">Do you want to logout?</h1>
  </div>
  <div className="p-4">
    <div className="flex justify-between">
      <button
        type="button"
        onClick={handleLogout}
        className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 transition-colors duration-200 shadow-lg transform hover:scale-105"
      >
        Logout
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors duration-200 shadow-lg transform hover:scale-105"
      >
        Cancel
      </button>
    </div>
  </div>
</form>

      <ToastContainer 
        position="top-right" 
        autoClose={3000} 
        hideProgressBar={false} 
        newestOnTop={false} 
        closeOnClick 
        rtl={false} 
        pauseOnFocusLoss 
        draggable 
        pauseOnHover 
        theme="light"
      />
    </div>
  );
}

export default Logout;
