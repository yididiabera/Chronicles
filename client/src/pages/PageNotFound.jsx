import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-yellow-100 text-gray-800">
      <div className="bg-yellow-500 text-white p-4 rounded-md shadow-lg">
        <h1 className="text-6xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Warning! The page you're looking for doesn't exist.</p>
        <Link
          to="/"
          className="px-4 py-2 bg-red-600 text-white rounded-md shadow-lg hover:bg-red-700 transition duration-300"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
