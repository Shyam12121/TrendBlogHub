import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-[70vh] flex items-center justify-center py-16 px-4">
      <div className="max-w-2xl w-full text-center">

        {/* 404 Number */}
        <h1 className="text-[100px] sm:text-[140px] md:text-[160px] font-black leading-none bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent select-none mb-4">
          404
        </h1>

        {/* Heading */}
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-base sm:text-lg leading-relaxed max-w-xl mx-auto mb-8">
          The page you're looking for doesn't exist, has been removed, or is temporarily unavailable.
          Let's get you back on track.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium shadow-md hover:shadow-lg w-full sm:w-auto justify-center"
          >
            <FiHome className="w-5 h-5" />
            Go Back Home
          </Link>

          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-all duration-300 font-medium shadow-sm hover:shadow-md w-full sm:w-auto justify-center"
          >
            <FiArrowLeft className="w-5 h-5" />
            Go Back
          </button>
        </div>

        {/* Suggestions */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-5">
            You might be looking for
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link to="/" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition">
              🏠 Home
            </Link>
            <Link to="/categories" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition">
              📂 Categories
            </Link>
            <Link to="/topics" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition">
              🔥 Popular Topics
            </Link>
            <Link to="/publishers" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition">
              ✍️ Publishers
            </Link>
            <Link to="/contact-us" className="px-4 py-2 bg-white border border-gray-200 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200 transition">
              📞 Contact
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFound;