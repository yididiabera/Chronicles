import React from 'react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-purple-200 dark:from-gray-800 dark:to-gray-900 text-gray-700 dark:text-gray-300">
      <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-purple-600 dark:text-teal-400 mb-4">About Chronicles</h1>
        <p className="text-lg mb-4">
          Welcome to Chronicles! We are dedicated to bringing you a world of insights and inspiration through our engaging blog posts. Our mission is to share knowledge, spark ideas, and foster a community of curious minds eager to learn and grow together.
        </p>
        <p className="text-lg mb-4">
          Our team of passionate writers and contributors work tirelessly to provide you with high-quality content that covers a wide range of topics. Whether you're looking for the latest trends, in-depth analysis, or just some light reading, Chronicles has something for everyone.
        </p>
        <p className="text-lg mb-4">
          We believe in the power of storytelling and the impact it can have on our lives. Through our blog, we aim to connect with our readers on a deeper level and create a space where ideas can flourish.
        </p>
        <p className="text-lg mb-4">
          Thank you for being a part of our journey. We hope you enjoy reading our posts as much as we enjoy creating them. If you have any questions, feedback, or suggestions, feel free to reach out to us.
        </p>
        <div className="flex justify-center mt-6">
          <a
            href="https://www.linkedin.com/in/yididia-abera-a78276266/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-purple-600 text-white rounded-md shadow-lg hover:bg-purple-700 transition duration-300"
          >
            Connect with us on LinkedIn
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
