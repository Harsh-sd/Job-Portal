import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setCompId } from '../store/compSlice'; // Import your action

const RegisterAndUpdateCompany = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [website, setWebsite] = useState('');
  const [loading, setLoading] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false); // Track if the company is registered
  const [companyDetails, setCompanyDetails] = useState(null); // Store the registered company details

  // Handle Register Company
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');

      // Make sure the token is available
      if (!token) {
        console.error("No token available");
        alert("User is not authenticated!");
        return;
      }

      // Register the company
      const response = await axios.post('http://localhost:3000/register', {
        name,
        description,
        location,
        website
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });

      console.log({ name, description, location, website });

      if (response.data && response.data.company && response.data.company.id) {
        const { id } = response.data.company;
        dispatch(setCompId(id)); // Store the company ID in Redux
        setIsRegistered(true); // Mark the company as registered
        setCompanyDetails(response.data.company); // Store the registered company details
        alert('Company created successfully!');
      } else {
        throw new Error('Unexpected response structure');
      }

    } catch (error) {
      console.error('Error registering company:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  // Handle Update Company
  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.error("No token available");
        alert("User is not authenticated!");
        return;
      }

      // Update the company
      const response = await axios.post('http://localhost:3000/updatecompany', {
        name,
        description,
        location,
        website
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        withCredentials: true
      });

      console.log({ name, description, location, website });

      if (response.data && response.data.savecompany) {
        dispatch(setCompId(companyId)); // Dispatch the company ID on update
        alert('Company updated successfully!');
      } else {
        throw new Error('Unexpected response structure');
      }

    } catch (error) {
      console.error('Error updating company:', error.response ? error.response.data : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg rounded-lg border-2 border-gray-300 mt-8 mb-8">
    <h2 className="text-2xl font-bold text-center mb-6 text-black">
      {isRegistered ? 'Update Company Details' : 'Register a New Company'}
    </h2>
  
    <form onSubmit={isRegistered ? handleUpdate : handleRegister}>
      {/* Company Name */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-white" htmlFor="name">Company Name</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter company name"
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
          required
        />
      </div>
  
      {/* Description */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-white" htmlFor="description">Description</label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter company description"
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black  text-black"
          required
        />
      </div>
  
      {/* Location */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-white" htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter company location"
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black  text-black"
          required
        />
      </div>
  
      {/* Website */}
      <div className="mb-4">
        <label className="block text-sm font-medium mb-1 text-white" htmlFor="website">Website</label>
        <input
          type="url"
          id="website"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          placeholder="Enter company website"
          className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black  text-black"
          required
        />
      </div>
  
      {/* Submit Button */}
      <div className="flex justify-center">
        <button
          type="submit"
          className={`px-4 py-2 rounded-md text-white ${loading ? 'bg-gray-400' : 'bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 transition-colors duration-300'} `}
          disabled={loading}
        >
          {loading ? (isRegistered ? 'Updating...' : 'Registering...') : (isRegistered ? 'Update Company' : 'Register Company')}
        </button>
      </div>
    </form>
  
    {/* Show Update Button after registering */}
    {isRegistered && (
      <div className="flex justify-center mt-6">
        <button
          onClick={() => {
            setName(companyDetails.name);
            setDescription(companyDetails.description);
            setLocation(companyDetails.location);
            setWebsite(companyDetails.website);
          }}
          className="px-4 py-2 bg-gradient-to-r from-green-400 to-blue-500 text-white rounded-md hover:from-green-500 hover:to-blue-600 transition-colors duration-300"
        >
          Edit Company
        </button>
      </div>
    )}
  </div>
  
  )
};

export default RegisterAndUpdateCompany;
