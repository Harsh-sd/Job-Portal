import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Applicants = () => {
  const { id } = useParams(); // Get the job ID from the URL
  const [applicants, setApplicants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchApplicants = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get(`http://localhost:3000/job/${id}/applicants`, {
          headers: {
            'Authorization': `${token}`,
          },
        });
        setApplicants(response.data.applicants);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error fetching applicants');
      } finally {
        setLoading(false);
      }
    };

    fetchApplicants();
  }, [id]);

  const updateStatus = async (applicationId, status) => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.post(
        `http://localhost:3000/updatestatus/${applicationId}`,
        { status },
        {
          headers: {
            'Authorization': `${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Update the local state to reflect the status change
      setApplicants((prevApplicants) =>
        prevApplicants.map((applicant) =>
          applicant._id === applicationId
            ? { ...applicant, status: response.data.application.status }
            : applicant
        )
      );
    } catch (err) {
      setError(err.response ? err.response.data.message : 'Error updating status');
    }
  };

  if (loading) return <p>Loading applicants...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 py-10">
      <h2 className="text-3xl font-bold text-center mb-8">Applicants</h2>
      
      {applicants.length === 0 ? (
        <p className="text-center text-gray-600">No applicants found for this job.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {applicants.map((applicant) => (
            <div key={applicant._id} className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
              {/* Applicant details */}
              <div className="bg-blue-500 text-white p-4">
                <h1 className="text-xl font-bold mb-2">Name: {applicant.user.fullName}</h1>
                <p className="text-md font-medium">Status: {applicant.status}</p>
              </div>

              <div className="p-6">
                <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-gray-200 pb-2">Applicant Information</h2>

                <p className="mb-2">
                  <span className="font-medium text-gray-600">Email:</span> 
                  <span className="text-gray-800"> {applicant.user.email}</span>
                </p>

                <p className="mb-2">
                  <span className="font-medium text-gray-600">Phone Number:</span> 
                  <span className="text-gray-800"> {applicant.user.phoneNumber}</span>
                </p>

                {applicant.status === 'pending' && (
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => updateStatus(applicant._id, 'accepted')}
                      className="w-full bg-gradient-to-r from-green-400 to-blue-500 text-white py-2 px-4 rounded-lg shadow-md hover:from-green-500 hover:to-blue-600 transition duration-300 transform hover:scale-105"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => updateStatus(applicant._id, 'rejected')}
                      className="w-full bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition duration-300 transform hover:scale-105"
                    >
                      Reject
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Applicants;
