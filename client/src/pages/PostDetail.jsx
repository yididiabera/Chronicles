import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
          method: 'GET',
          credentials: 'include', // Cookies included
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setPost(data);
        setTitle(data.title);
        setContent(data.content);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    const updatedPost = { title, content };

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'PUT',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPost),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to update post');
      }

      const data = await response.json();
      setPost(data);
      setIsEditing(false);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to delete post');
      }

      navigate('/');
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-center mb-8">{post.title}</h1>
      <div className="bg-white rounded-lg shadow-md p-6">
        <p className="text-gray-700">{post.content}</p>
        {post.imageUrl && (
          <div className="flex justify-center items-center max-w-lg max-h-64 mx-auto mt-4 overflow-hidden">
            <img
              src={`http://localhost:5000/${post.imageUrl}`}
              alt={post.title}
              className="w-full h-auto object-contain"
            />
          </div>
        )}
        <div className="mt-4">
          <p className="text-sm text-gray-500">
            <strong>Author:</strong> {post.authorName || "Unknown"} ({post.authorEmail || "N/A"})
          </p>
          <p className="text-sm text-gray-500">
            <strong>Published:</strong> {new Date(post.publishedDate).toLocaleDateString() || "N/A"}
          </p>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        {isEditing ? (
          <form onSubmit={handleUpdatePost} className="w-full max-w-lg">
            <div className="mb-4">
              <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content</label>
              <textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                rows="5"
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={handleEditToggle}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <>
            <button
              onClick={handleEditToggle}
              className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
            >
              Edit Post
            </button>
            <button
              onClick={handleDeletePost}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete Post
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PostDetail;
