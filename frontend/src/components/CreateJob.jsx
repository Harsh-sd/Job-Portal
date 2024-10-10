import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';

const CreateJob = () => {
  // Getting compId from redux
  const compId = useSelector((state) => state.comp.compId);
  console.log('compId from Redux:', compId);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [requirements, setRequirements] = useState('');
  const [salary, setSalary] = useState('');
  const [jobType, setJobType] = useState('');
  const [positions, setPositions] = useState('');
  const [experience, setExperience] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      title,
      description,
      requirements,
      salary,
      jobType,
      positions,
      experience,
      compId,
    };

    try {
      const token = localStorage.getItem('authToken');

      if (!token) {
        console.error('No token available');
        alert('User is not authenticated!');
        return;
      }

      console.log('Token:', token);

      const response = await axios.post('http://localhost:3000/createjob', formData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${token}`,
        },
        withCredentials: true,
      });

      console.log('Form submitted successfully:', response.data);
      alert('Job created successfully!');
    } catch (error) {
      if (error.response) {
        console.error('Error response:', error.response.data);
        alert(`Error: ${error.response.data.message || 'Job creation failed. Please try again.'}`);
      } else if (error.request) {
        console.error('Error request:', error.request);
        alert('No response from server. Please check your connection.');
      } else {
        console.error('Error message:', error.message);
        alert('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 py-10">
      <div className="max-w-lg mx-auto p-6 bg-gradient-to-r from-blue-500 to-purple-500 shadow-lg rounded-lg border-2 border-gray-300 my-10">
        <form className="w-full" onSubmit={handleSubmit}>
          <h2 className="font-bold text-xl text-black text-center mb-5">!! Create Job Here !!</h2>

          <div className="my-2">
            <label htmlFor="title" className="block font-medium text-white">
              Job Title
            </label>
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
              placeholder="Job Title"
              required
            />
          </div>

          <div className="my-2">
            <label htmlFor="description" className="block font-medium text-white">
              Job Description
            </label>
            <textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
              placeholder="Job Description"
              required
            />
          </div>

          <div className="my-2">
            <label htmlFor="requirements" className="block font-medium text-white">
              Requirements
            </label>
            <textarea
              name="requirements"
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
              placeholder="Job Requirements"
              required
            />
          </div>

          <div className="my-2">
            <label htmlFor="salary" className="block font-medium text-white">
              Salary
            </label>
            <input
              type="number"
              name="salary"
              value={salary}
              onChange={(e) => setSalary(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
              placeholder="Salary"
              required
            />
          </div>

          <div className="my-2">
            <label htmlFor="jobType" className="block font-medium text-white">
              Job Type
            </label>
            <input
              type="text"
              name="jobType"
              value={jobType}
              onChange={(e) => setJobType(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
              placeholder="Job Type"
              required
            />
          </div>

          <div className="my-2">
            <label htmlFor="positions" className="block font-medium text-white">
              Positions
            </label>
            <input
              type="number"
              name="positions"
              value={positions}
              onChange={(e) => setPositions(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
              placeholder="Positions"
              required
            />
          </div>

          <div className="my-2">
            <label htmlFor="experience" className="block font-medium text-white">
              Experience Level
            </label>
            <input
              type="text"
              name="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-black text-black"
              placeholder="Experience Level"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
            disabled={loading}
          >
            {!loading ? 'Create Job' : 'Submitting...'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
