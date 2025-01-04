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

        console.log('Response status:', response.status); // Debugging

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        console.log('Fetched data:', data); // Debugging
        setPosts(data);
        setLoading(false);
      } catch (err) {
        console.error('Fetch error:', err); // Debugging
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">Homepage</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div key={post._id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
            <h2 className="text-2xl font-semibold text-blue-600">{post.title}</h2>
            <p className="text-gray-700 mt-2">{post.content.slice(0, 100)}...</p>
          
             {/* Link to PostDetail page */}
            <Link to={`/post/${post._id}`} className="text-blue-500 hover:underline mt-4 inline-block">
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
