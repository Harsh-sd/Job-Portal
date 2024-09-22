import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ApplyJob = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          console.error("No token available");
          alert("User is not authenticated!");
          return;
        }
        console.log("Token:", token); 
        const response = await axios.get(`http://localhost:3000/getjobbyid/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        setJob(response.data.findjob);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [id]);

  const handleApply = async () => {
    try {
      const token = localStorage.getItem('authToken');
      
        if (!token) {
          console.error("No token available");
          alert("User is not authenticated!");
          return;
        }
        console.log("Token:", token); 
      const response = await axios.post(`http://localhost:3000/applyjob/${id}`, {}, {
        headers: {
          'Authorization': `${token}`,
        },
      });
      alert(response.data.message);
      console.log("applied successfully");
    } catch (err) {
      alert(err.response ? err.response.data.message : 'Error applying for the job');
    }
  };

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">{job.title}</h2>
      <p className="mb-4">{job.description}</p>
      <p className="mb-4"><strong>Salary:</strong> {job.salary}</p>
      <p className="mb-4"><strong>Job Type:</strong> {job.jobType}</p>
      {/* Add more job details as needed */}
      <button
        onClick={handleApply}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Apply for Job
      </button>
    </div>
  );
};

export default ApplyJob;
