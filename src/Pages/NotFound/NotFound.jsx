import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiSearch, FiArrowLeft } from 'react-icons/fi';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-[75vh] flex items-center justify-center px-4 py-16 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-2xl w-full text-center">

        {/* BIG 404 */}
        <div className="relative mb-8">
          <h1 className="text-[140px] sm:text-[180px] font-black leading-none bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent select-none">
            404
          </h1>
          <div className="absolute inset-0 flex items-center justify-center opacity-10">
            <span className="text-[200px]">🔍</span>
          </div>
        </div>

        {/* HEADING */}
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
          Oops! Page Not Found
        </h2>

        {/* DESCRIPTION */}
        <p className="text-gray-600 text-base sm:text-lg mb-8 max-w-md mx-auto leading-relaxed">
          The page you're looking for doesn't exist, has been removed, or is temporarily unavailable. 
          Let's get you back on track.
        </p>

        {/* BUTTONS */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-10">
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

        {/* SUGGESTIONS */}
        <div className="border-t border-gray-200 pt-8">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            You might be looking for
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <Link to="/" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition">
              🏠 Home
            </Link>
            <Link to="/categories" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition">
              📂 Categories
            </Link>
            <Link to="/topics" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition">
              🔥 Popular Topics
            </Link>
            <Link to="/publishers" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition">
              ✍️ Publishers
            </Link>
            <Link to="/contact-us" className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-blue-100 hover:text-blue-700 transition">
              📞 Contact
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NotFound;