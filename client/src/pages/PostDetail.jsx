import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// CommentSection component
const CommentSection = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/comments/${postId}`, {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error(`Error fetching comments: ${response.statusText}`);
        }

        const data = await response.json();
        setComments(data);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchComments();
  }, [postId]);

  const handleAddComment = async (e) => {
    e.preventDefault();

    if (!newComment.trim()) {
      return alert('Comment content is required!');
    }

    try {
      const response = await fetch(`http://localhost:5000/api/comments/${postId}`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newComment }),
      });

      if (!response.ok) {
        throw new Error('Failed to add comment');
      }

      const addedComment = await response.json();
      setComments([...comments, addedComment]);
      setNewComment('');
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/comments/${commentId}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete comment');
      }

      setComments(comments.filter((comment) => comment._id !== commentId));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Comments</h2>
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="bg-gray-100 p-4 rounded-lg shadow">
            <p className="text-gray-800">{comment.content}</p>
            <p className="text-sm text-gray-500">- {comment.author?.name || 'Anonymous'}</p>
            <button
              onClick={() => handleDeleteComment(comment._id)}
              className="text-red-500 text-sm mt-2"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Add a Comment</h3>
        <form onSubmit={handleAddComment} className="flex flex-col space-y-4">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Write your comment here..."
            className="w-full p-2 border rounded shadow"
            rows="4"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
          >
            Submit Comment
          </button>
        </form>
      </div>
    </div>
  );
};

// PostDetail component
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
          credentials: 'include', // Include cookies
        });

        if (!response.ok) {
          throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const data = await response.json();
        setPost(data);
        setTitle(data.title); // Populate the form fields with post data
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
      setPost(data); // Update the post state with the updated data
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
      {isEditing ? (
        <div>
          <h2 className="text-2xl font-bold mb-4">Edit Post</h2>
          <form onSubmit={handleUpdatePost}>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 mb-4 border rounded"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={handleEditToggle}
              className="bg-gray-500 text-white px-4 py-2 rounded ml-2"
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
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
                <strong>Author:</strong> {post.authorName || 'Unknown'} ({post.authorEmail || 'N/A'})
              </p>
              <p className="text-sm text-gray-500">
                <strong>Published:</strong> {new Date(post.publishedDate).toLocaleDateString() || 'N/A'}
              </p>
            </div>
          </div>
          <div className="flex justify-center mt-4">
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
          </div>
        </div>
      )}
      <CommentSection postId={id} />
    </div>
  );
};

export default PostDetail;
