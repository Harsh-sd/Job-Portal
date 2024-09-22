import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'; 
import { setCompId } from '../store/compSlice';
const CompanyListPage = () => {
  const dispatch=useDispatch();
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const token = localStorage.getItem('authToken');
        console.log("Retrieved token:", token);
  
        if (!token) {
          console.error("No token available");
          alert("User is not authenticated!");
          return;
        }
  
        const response = await axios.get('http://localhost:3000/getAllCompanies', {
            
                headers: {
                 
                  'Authorization': `${token}`
                },
                withCredentials: true
              }
        );
  
        console.log("API response:", response.data);
        setCompanies(response.data.companies);
      } catch (error) {
        console.error('Error fetching companies:', error.response ? error.response.data : error.message);
      }
    };

    fetchCompanies();
  }, []);

  const handleCreateJob = (companyId) => {
    dispatch(setCompId(companyId));
    navigate(`/create-job/${companyId}`); // Pass companyId as a parameter in the URL
  };

  return (
  <div className="min-h-screen bg-gray-100 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Registered Companies</h2>
      
      {companies.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {companies.map((company) => (
            <div key={company._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              <div className="bg-blue-500 text-white p-4">
                <h3 className="text-xl font-bold mb-2">{company.name}</h3>
                <p className="text-md font-medium">{company.location}</p>
              </div>
              
              <div className="p-4">
                <a href={company.website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline block mb-2">
                  {company.website}
                </a>
                
                <button 
                  onClick={() => handleCreateJob(company._id)} 
                  className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-6 rounded-full hover:from-green-500 hover:to-blue-600 transition duration-300 shadow-md transform hover:scale-110"
                >
                  Create Job
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">{companies.length === 0 ? 'No companies registered yet.' : 'Loading companies...'}</p>
      )}
    </div>
  );
};

export default CompanyListPage;
