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

  if (loading) return <p>Loading applicants...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-4">Applicants</h2>
    {applicants.length === 0 ? (
      <p className="text-gray-600">No applicants found for this job.</p>
    ) : (
      <ul>
        {applicants.map((applicant) => (
          <li key={applicant._id} className="mb-6 p-4 bg-gray-100 rounded-md shadow-sm">
            <div className="mb-2">
              <p className="text-lg font-semibold text-gray-700">
                <strong>Name:</strong> {applicant.user.fullName}
              </p>
            </div>
            <div className="text-gray-600 mb-1">
              <p><strong>Email:</strong> {applicant.user.email}</p>
              <p><strong>Phone Number:</strong> {applicant.user.phoneNumber}</p>
            </div>
            <div className="mt-2">
              <p className="text-sm text-blue-600">
                <strong>Status:</strong> {applicant.status}
              </p>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
  )  
};

export default Applicants;
