import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-500 py-10">
      <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg border-2 border-gray-300">
        <h2 className="text-3xl font-bold text-center text-black mb-6">About Our Job Portal</h2>
        
        <p className="text-lg text-gray-700 mb-4">
          Welcome to our Job Portal, your one-stop solution for connecting recruiters and job seekers. Whether you're looking to find the perfect job or post opportunities to find the right talent, we provide an intuitive platform to cater to all your needs.
        </p>

        <h3 className="text-2xl font-semibold text-black mb-3">Key Features</h3>
        <ul className="list-disc list-inside text-gray-700 mb-6">
          <li>User and Recruiter-specific functionalities with role-based access control</li>
          <li>Search jobs by keyword, location, and category</li>
          <li>View detailed job descriptions and apply online</li>
          <li>Recruiters can post, edit, and manage jobs easily</li>
          <li>Applicant status management with 'accepted' and 'rejected' options</li>
          <li>Responsive and user-friendly interface with toast notifications</li>
        </ul>

        <h3 className="text-2xl font-semibold text-black mb-3">Technologies Used</h3>
        <ul className="list-disc list-inside text-gray-700">
          <li>Frontend: React, Redux Toolkit, Tailwind CSS</li>
          <li>Backend: Node.js, Express</li>
          <li>Database: MongoDB</li>
          <li>Authentication: Token-based with JWT</li>
        </ul>

        <p className="text-lg text-gray-700 mt-6">
          Our goal is to simplify the job search and hiring process, making it efficient for both job seekers and recruiters.
        </p>
      </div>
    </div>
  );
};

export default About;

