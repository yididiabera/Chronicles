import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/posts', {
          method: 'GET',
          credentials: 'include', // Ensures cookies are sent with the request
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setPosts(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center text-gray-200">Loading...</p>;
  if (error) return <p className="text-center text-red-300">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 text-white">
      <div className="container mx-auto p-4">
        <h1 className="text-5xl font-extrabold text-center mb-10 text-gradient bg-clip-text bg-gradient-to-r from-yellow-400 to-white">
          Welcome to Chronicles! 
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white text-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-transform transform hover:scale-105 duration-300 overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold truncate">{post.title}</h2>
                <p className="text-gray-600 mt-4">{post.content.slice(0, 100)}...</p>
                <Link
                  to={`/post/${post._id}`}
                  className="inline-block mt-6 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Homepage;
