import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState({ title: "", content: "", imageUrl: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
          method: "GET",
          credentials: "include",
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

  const handleUpdatePost = async (e) => {
    e.preventDefault();

    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("Access token is missing.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "PUT",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(post),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to update post");
      }

      navigate(`/post/${id}`);
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
      <form onSubmit={handleUpdatePost}>
        <input
          type="text"
          value={post.title}
          onChange={(e) => setPost({ ...post, title: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          required
        />
        <textarea
          value={post.content}
          onChange={(e) => setPost({ ...post, content: e.target.value })}
          className="w-full p-2 mb-4 border rounded"
          rows="5"
          required
        />
        <input
          type="file"
          onChange={(e) =>
            setPost({ ...post, imageUrl: e.target.files[0] }) // Handle image upload
          }
          className="block w-full mb-4"
        />
        <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded">
          Save Changes
        </button>
        <button
          type="button"
          onClick={() => navigate(`/post/${id}`)}
          className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default PostEditor;
