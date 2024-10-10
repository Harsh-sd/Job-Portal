import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';

function Job() {
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          alert("User is not authenticated!");
          return;
        }
        const response = await axios.get(`http://localhost:3000/getjobbyid/${id}`, {
          headers: {
            'Authorization': `${token}`,
          },
          withCredentials: true
        });
        setJob(response.data.findjob);
      } catch (error) {
        console.error('Error fetching job details:', error);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (!job) {
    return <div>Loading job details...</div>;
  }

  return (
    <div className="min-h-screen  bg-gradient-to-r from-green-400 to-blue-500 py-10 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col">
        <div className="bg-blue-500 text-white p-4">
          <h1 className="text-3xl font-bold mb-2 text-center">{job.title}</h1>
          <h3 className="text-2xl font-bold mb-2 ">{job.description}</h3>
        </div>
        
        <div className="p-2 flex-grow">
          <p className="text-gray-900 mb-1"><strong>Company:</strong> {job.company.name}</p>
          <p className="text-gray-900 mb-1"><strong>Location:</strong> {job.location}</p>
          <p className="text-gray-900 mb-1"><strong>Salary:</strong> ${job.salary}</p>
          <p className="text-gray-900 mb-1"><strong>Job Type:</strong> {job.jobType}</p>
          <p className="text-gray-900 mb-1"><strong>Positions:</strong> {job.positions}</p>
          <p className="text-gray-900 mb-1"><strong>Experience Level:</strong> {job.experienceLevel}</p>
        </div>
        
        {/* it will takes me toApplyJob.jsx component */}
        <Link
          to={`/applyjob/${job._id}`}
          className="inline-block bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-6 rounded-full hover:from-green-500 hover:to-blue-600 transition duration-300 shadow-md transform hover:scale-110 mb-2 mx-auto"
        >
          Apply Now
        </Link>
      </div>
    </div>
  );
}

export default Job;
