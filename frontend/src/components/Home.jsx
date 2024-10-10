import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
  // State to manage search inputs
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');
  const [jobs, setJobs] = useState([]);

  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('authToken');
      console.log("Retrieved token:", token);

      if (!token) {
        console.error("No token available");
        alert("User is not authenticated!");
        return;
      }

      // Construct the query parameters
      const params = {};
      if (searchTerm) params.title = searchTerm;
      if (location) params.location = location;
      if (category) params.jobType = category;

      console.log('Search Parameters:', params);

      // Call your backend API to fetch search results
      const response = await axios.get('http://localhost:3000/getjobbyquery', {
        headers: {
          'Authorization': `${token}`, // Use Bearer token if your API expects it
        },
        withCredentials: true,
        params // Pass query parameters to your backend
      });

      setJobs(response.data.jobs); // Update the jobs state with the fetched data
      console.log('Fetched Jobs:', response.data.jobs);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-5">
      {/* Welcome Message */}
      <h1 className="text-4xl font-bold text-white mb-8 text-center">
        Find Your Dream Job
      </h1>

      {/* Search Bar Container */}
      <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg border-2 border-gray-300">
        {/* Keyword Search */}
        <input
          type="text"
          placeholder="Search jobs by keyword..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full border border-gray-300 p-2 mb-4 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-600 text-black"
        />

        {/* Location Search */}
        <select
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Location</option>
          <option value="New Delhi">New Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Noida">Noida</option>
          <option value="Gurugram">Gurugram</option>
          {/* Add more locations as needed */}
        </select>

        {/* Job Category Dropdown */}
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 mb-4 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select Job Category</option>
          <option value="IT">IT</option>
          <option value="Marketing">Marketing</option>
          <option value="Finance">Finance</option>
          <option value="Sales">Sales</option>
          {/* Add more categories as needed */}
        </select>

        {/* Search Button */}
        <button
          onClick={handleSearch}
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
        >
          Search Jobs
        </button>
      </div>

      {/* Job Listings */}
      <div className="mt-8 w-full max-w-4xl">
        <div className="bg-white p-6 rounded-lg shadow-md">
          {jobs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div
                  key={job._id}
                  className="p-4 border rounded-lg shadow hover:shadow-lg transition-shadow duration-300 bg-gradient-to-r from-green-400 to-blue-500"
                >
                  <h2 className="text-lg font-bold mb-2 text-white">{job.title}</h2>
                  <p className="text-gray-200 mb-1">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="text-gray-200 mb-1">
                    <strong>Category:</strong> {job.jobType}
                  </p>
                  <p className="text-gray-200 mb-3">
                    <strong>Company:</strong> {job.company.name}
                  </p>
                  <Link
                    to={`/getjobbyid/${job._id}`}
                    className="w-full bg-white text-blue-500 py-2 px-4 rounded-md hover:bg-gray-100 transition-colors text-center block"
                  >
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center bg-gradient-to-r from-green-400 to-blue-400 text-white font-semibold p-4 rounded-md shadow-md">
              Provide me a better search to reach out.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
