import React, { useEffect, useState } from 'react';
import { useParams  , useNavigate} from 'react-router-dom';
import axios from 'axios';
 

const ApplyJob = () => {
  const { id } = useParams(); 
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
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
            'Authorization': ` ${token}`,
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
      console.log("Applied successfully");
      setTimeout(() => {
        navigate('/'); 
      }, 2000);
    } catch (err) {
      alert(err.response ? err.response.data.message : 'Error applying for the job');
    }
  };

  if (loading) return <p>Loading job details...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen  bg-gradient-to-r from-green-400 to-blue-500 py-10 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 flex flex-col">
        <div className="bg-blue-500 text-white p-4">
          <h1 className="text-2xl font-bold mb-2 text-center">{job.title}</h1>
          <h3 className="text-2xl font-bold mb-2 text-center">{job.description}</h3>
        </div>
        
        <div className="p-6 flex-grow">
          <p className="text-gray-900 mb-1"><strong>Company:</strong> {job.company.name}</p>
          <p className="text-gray-900 mb-1"><strong>Salary:</strong> ${job.salary}</p>
          <p className="text-gray-900 mb-1"><strong>Job Type:</strong> {job.jobType}</p>
          <p className="text-gray-900 mb-1"><strong>Positions:</strong> {job.positions}</p>
          <p className="text-gray-900 mb-1"><strong>Experience Level:</strong> {job.experienceLevel}</p>
        </div>
        
        <div className="flex justify-around mb-4">
          {/* Apply Button */}
          <button
            onClick={handleApply}
            className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-6 rounded-full hover:from-green-500 hover:to-blue-600 transition duration-300 shadow-md transform hover:scale-110"
          >
            Apply
          </button>

          {/* Cancel Button */}
          <button
            onClick={() => navigate('/')} // Navigate to Home
            className="bg-red-500 text-white py-2 px-6 rounded-full hover:bg-red-600 transition duration-300 shadow-md transform hover:scale-110"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplyJob;
