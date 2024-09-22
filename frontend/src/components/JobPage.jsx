import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const JobPage = () => {
  const [jobs, setJobs] = useState([]); // Jobs should remain an array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log("Retrieved token:", token);

        if (!token) {
          console.error("No token available");
          alert("User is not authenticated!");
          return;
        }

        const response = await axios.get(`http://localhost:3000/getjob`, {
          headers: {
            'Authorization': `${token}`, // Use Bearer token if your API expects it
          },
          withCredentials: true
        });

        if (response.data.jobs && response.data.jobs.length > 0) {
          setJobs(response.data.jobs); // Set the jobs array correctly
        } else {
          setError("No jobs found for this user.");
        }

      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading jobs....</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
    <h2 className="text-3xl font-bold text-center mb-8">Job Listings</h2>
    
    {jobs.length > 0 ? (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {jobs.map((job) => (
          <div key={job._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            {/* Job role section */}
            <div className="bg-blue-500 text-white p-4">
              <h1 className="text-xl font-bold mb-2">Job Role: {job.title}</h1>
              <p className="text-md font-medium">Job Type: {job.jobType}</p>
            </div>
  
            {/* Company details */}
            <div className="p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Company Information</h2>
  
              <p className="mb-2">
                <span className="font-medium text-gray-600">Company Name:</span> 
                <span className="text-gray-800"> {job.company?.name}</span>
              </p>
  
              <p className="mb-2">
                <span className="font-medium text-gray-600">Positions Available:</span> 
                <span className="text-gray-800"> {job.positions}</span>
              </p>
  
              <p className="mb-4">
                <span className="font-medium text-gray-600">Salary:</span> 
                <span className="text-gray-800"> {job.salary}</span>
              </p>
  
              {/* Buttons */}
              <div className="flex space-x-4 mt-6">
                <Link to={`/editjob/${job._id}`}>
                  <button className="bg-blue-500 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-600 transition duration-300">
                    Edit Job
                  </button>
                </Link>
                <Link to={`/job/${job._id}/applicants`}>
                  <button className="bg-green-500 text-white py-2 px-4 rounded-lg shadow hover:bg-green-600 transition duration-300">
                    View Applicants
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-center text-gray-600">No jobs found.</p>
    )}
  </div>
  
  
  )
};

export default JobPage;
