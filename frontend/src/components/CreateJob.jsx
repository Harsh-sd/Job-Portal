import React, { useState } from 'react';
import {useSelector ,useDispatch} from"react-redux"
import axios from 'axios';


const CreateJob = () => {

//Getting compId from redux
const compId=useSelector((state)=>state.comp.compId);
console.log('compId from Redux:', compId);
    const[title , setTitle]=useState("");
    const[description, setDescription]=useState("");
    const[requirements , setRequirements]=useState("");
    const[salary , setSalary]=useState("");
    const[jobType , setJobType]=useState("");
    const[positions , setPositions]=useState("");
    const[experience , setExperience]=useState("");
    
    
  

  const [loading, setLoading] = useState(false);
  


  

 
// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
 setLoading(true)
  const formData={
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

      // Make sure the token is available
      if (!token) {
        console.error("No token available");
        alert("User is not authenticated!");
        return;
      }
       // Log the token to verify its presence
    console.log("Token:", token);
    // Send the data to your API endpoint using Axios
    const response = await axios.post('http://localhost:3000/createjob', formData, {
      headers: {
        'Content-Type': 'application/json',
          'Authorization': `${token}`
      },
      withCredentials: true // Include credentials if needed
    });
    

    // Log success or handle response
    console.log('Form submitted successfully:', response.data);

    // You can also show a success message or redirect the user
    alert('job created successfully!');

  } catch (error) {
    // Handle errors here
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error response:', error.response.data);
      alert(`Error: ${error.response.data.message || 'Job creation failed. Please try again.'}`);
    } else if (error.request) {
      // The request was made but no response was received
      console.error('Error request:', error.request);
      alert('No response from server. Please check your connection.');
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error message:', error.message);
      alert('An unexpected error occurred. Please try again.');
    }
  }
  finally{
    setLoading(false)
  }
  };

  
     
 

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold text-center mb-6">Create a New Job</h2>
      
      <form onSubmit={ handleSubmit}>
        {/* Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="title">Job Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>
        
        {/* Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="description">Job Description</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        {/* Requirements */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="requirements">Requirements</label>
          <textarea
            id="requirements"
            name="requirements"
            value={requirements}
            onChange={(e)=>setRequirements(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        {/* Salary */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="salary">Salary</label>
          <input
            type="number"
            id="salary"
            name="salary"
            value={salary}
            onChange={(e)=>setSalary(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        {/* Job Type */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="jobType">Job Type</label>
          <input
            type="text"
            id="jobType"
            name="jobType"
            value={jobType}
            onChange={(e)=>setJobType(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        {/* Positions */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="positions">Positions</label>
          <input
            type="number"
            id="positions"
            name="positions"
            value={positions}
            onChange={(e)=>setPositions(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        {/* Experience */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1" htmlFor="experience">Experience Level</label>
          <input
            type="text"
            id="experience"
            name="experience"
            value={experience}
            onChange={(e)=>setExperience(e.target.value)}
            className="w-full border border-gray-300 p-2 rounded-md"
            required
          />
        </div>

        

        {/* Submit button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
            disabled={loading}
          >
            {!loading ?  'Create Job':'Submitting...' }
          </button>
        </div>
      </form>

    
    </div>
);
};

export default CreateJob;

