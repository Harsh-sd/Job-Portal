import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditJob = () => {
  const compId = useSelector((state) => state.comp.compId);
  console.log('compId from Redux:', compId);

  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState('');
  const [positions, setPositions] = useState('');
  const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:3000/getjobbyid/${id}`, {
          headers: {
            Authorization: `${token}`,
          },
        });

        const job = response.data.findjob || {};
        setTitle(job.title || '');
        setDescription(job.description || '');
        setRequirements(job.requirements || '');
        setSalary(job.salary || '');
        setJobType(job.jobType || '');
        setPositions(job.positions || '');
        setExperience(job.experience || '');
      } catch (error) {
        console.error('Error fetching job data:', error);
        setError('Error fetching job data. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const jobData = {
      title,
      description,
      requirements,
      salary,
      jobType,
      positions,
      experience,
      compId
    };

    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.put(`http://localhost:3000/editjob/${id}`, jobData, {
        headers: {
          Authorization: `${token}`,
        },
      });

      alert('Job updated successfully!');
      console.log('Updated job:', response.data);
      navigate('/jobs'); // Redirect to job listing or another relevant page
    } catch (error) {
      console.error('Error updating job:', error);
      setError('Failed to update job. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div>Loading job data...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 py-10">
      <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg rounded-lg border-2 border-gray-300 my-10">
        <h2 className="font-bold text-xl text-black text-center mb-5">Edit Job</h2>
        
        {error && <div className="text-red-500 text-center mb-4">{error}</div>} {/* Display error message */}

        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div className="my-2">
            <label className="block font-medium text-white" htmlFor="title">Job Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)} // Update title state
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
              placeholder="Job Title"
              required
            />
          </div>

          {/* Description */}
          <div className="my-2">
            <label className="block font-medium text-white" htmlFor="description">Job Description</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)} // Update description state
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
              placeholder="Job Description"
              required
            />
          </div>

          {/* Requirements */}
          <div className="my-2">
            <label className="block font-medium text-white" htmlFor="requirements">Requirements</label>
            <textarea
              id="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)} // Update requirements state
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
              placeholder="Job Requirements"
              required
            />
          </div>

          {/* Salary */}
          <div className="my-2">
            <label className="block font-medium text-white" htmlFor="salary">Salary</label>
            <input
              type="number"
              id="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)} // Update salary state
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
              placeholder="Salary"
              required
            />
          </div>

          {/* Job Type */}
          <div className="my-2">
            <label className="block font-medium text-white" htmlFor="jobType">Job Type</label>
            <input
              type="text"
              id="jobType"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)} // Update jobType state
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
              placeholder="Job Type"
              required
            />
          </div>

          {/* Positions */}
          <div className="my-2">
            <label className="block font-medium text-white" htmlFor="positions">Positions</label>
            <input
              type="number"
              id="positions"
              value={positions}
              onChange={(e) => setPositions(e.target.value)} // Update positions state
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
              placeholder="Positions"
              required
            />
          </div>

          {/* Experience */}
          <div className="my-2">
            <label className="block font-medium text-white" htmlFor="experience">Experience Level</label>
            <input
              type="text"
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)} // Update experience state
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
              placeholder="Experience Level"
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            disabled={isSubmitting}
          >
            {!isSubmitting ? 'Update Job' : 'Updating...'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditJob;
