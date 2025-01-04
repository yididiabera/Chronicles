import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-purple-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300">
      <h1 className="text-6xl font-bold text-purple-600 dark:text-teal-400 mb-4">404</h1>
      <p className="text-xl mb-8">Oops! The page you're looking for doesn't exist.</p>
      <Link
        to="/"
        className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-lg hover:bg-purple-700 transition duration-300"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;