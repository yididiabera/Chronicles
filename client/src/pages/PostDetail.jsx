import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const PostDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
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

  const handleDeletePost = async () => {
    const authToken = localStorage.getItem("authToken");
    if (!authToken) {
      setError("Access token is missing.");
      return;
    }

    try {
      let response = await fetch(`http://localhost:5000/api/posts/${id}`, {
        method: "DELETE",
        credentials: "include",
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.status === 401) {
        const refreshToken = localStorage.getItem("refreshToken");
        const refreshResponse = await fetch(
          "http://localhost:5000/api/auth/refresh-token",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ refreshToken }),
          }
        );

        if (!refreshResponse.ok) {
          throw new Error("Failed to refresh token");
        }

        const refreshData = await refreshResponse.json();
        localStorage.setItem("authToken", refreshData.accessToken);

        response = await fetch(`http://localhost:5000/api/posts/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${refreshData.accessToken}`,
          },
        });
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || "Failed to delete post");
      }

      navigate("/");
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
          <img
            src={`http://localhost:5000/${post.imageUrl}`}
            alt={post.title}
            className="w-full h-auto mt-4"
          />
        )}
        {/* <p className="text-sm text-gray-500 mt-4">By: {post.authorName}</p>
        <p className="text-sm text-gray-500">{post.publishedDate}</p> */}
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
        <button
          onClick={() => navigate(`/post-editor/${id}`)}
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
      </div>
    </div>
  );
};

export default PostDetail;
