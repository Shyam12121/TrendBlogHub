import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 bg-gray-50">
      <h1 className="text-9xl font-extrabold text-blue-600">404</h1>
      <h2 className="text-3xl font-semibold mt-4 mb-2 text-gray-800">Page Not Found</h2>
      <p className="text-gray-600 mb-8 max-w-md">
        Oops! The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition duration-300 font-medium"
      >
        ← Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;