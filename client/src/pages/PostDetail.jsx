import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Import useParams to get the post ID from the URL

const PostDetail = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setPost(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">{post.title}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-700">{post.content}</p>
      </div>
    </div>
  );
};

export default PostDetail;