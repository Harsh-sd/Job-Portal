import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem('authToken');

        if (!token) {
          setError("User is not authenticated!");
          setLoading(false);
          return;
        }

        const response = await axios.get('http://localhost:3000/getjob', {
          headers: {
            'Authorization': `${token}`
          },
          withCredentials: true // Include credentials if needed
        });

        setJobs(response.data.jobs); // Correct property name here
      } catch (error) {
        console.error('Error fetching jobs:', error);
        setError('Failed to load jobs. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []); // Empty dependency array means this effect runs once on mount

  if (loading) return <p>Loading...</p>;

  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gray-100 py-10">
    <h2 className="text-3xl font-bold text-center mb-8">Job Listings</h2>
    
    {jobs.length === 0 ? (
      <p className="text-white text-center">No jobs available.</p>
    ) : (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {jobs.map(job => (
          <div key={job._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
            <div className="bg-blue-500 text-white p-4">
              <h1 className="text-xl font-bold mb-2">{job.title}</h1>
              <p className="text-md font-medium"> {job.description}</p>
            </div>
            
            
            
            
            <p className="text-gray-900 mb-1"><strong>Company:</strong> {job.company.name}</p>
            <p className="text-gray-900 mb-1"><strong>Salary:</strong> ${job.salary}</p>
            <p className="text-gray-900 mb-1"><strong>Job Type:</strong> {job.jobType}</p>
            <p className="text-gray-900 mb-1"><strong>Positions:</strong> {job.positions}</p>
            <p className="text-gray-900 mb-4"><strong>Experience Level:</strong> {job.experienceLevel}</p>
            
            {/* Apply Button */}
            <Link to={`/applyjob/${job._id}`} className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-6 rounded-full hover:from-green-500 hover:to-blue-600 transition duration-300 shadow-md transform hover:scale-110">
              Apply Now
            </Link>
          </div>
        ))}
      </div>
    )}
  </div>
  
  
  )
};

export default JobList;
