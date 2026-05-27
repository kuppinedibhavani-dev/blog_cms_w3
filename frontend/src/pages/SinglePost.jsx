import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";

import axios from "axios";

function SinglePost() {

  const { id } = useParams();

  const [post, setPost] = useState(null);

  const [comments, setComments] = useState([]);

  const [commentText, setCommentText] = useState("");

  // Fetch Single Post

  const fetchPost = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts/${id}`
      );

      const foundPost = response.data.find(
        (p) => p._id === id
      );

      setPost(foundPost);

    } catch (error) {

      console.log(error);

    }
  };

  // Fetch Comments

  const fetchComments = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/comments/${id}`
      );

      setComments(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // Add Comment

  const addComment = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/comments/${id}`,
        {
          content: commentText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComments([
        response.data,
        ...comments,
      ]);

      setCommentText("");

    } catch (error) {

      console.log(error);

    }
  };

  // useEffect AFTER functions

 useEffect(() => {

  const loadData = async () => {

    await fetchPost();

    await fetchComments();

  };

  loadData();
// eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  if (!post) {
    return (
      <h2 className="text-center mt-5">
        Loading...
      </h2>
    );
  }

  return (
    <div className="container mt-5">

      {/* Post */}

      <div className="card p-4 mb-5">

        <h1>{post.title}</h1>

        <p className="mt-3">{post.content}</p>

        <small>
          By {post.author?.username}
        </small>

      </div>

      {/* Comment Form */}

      <div className="card p-4 mb-4">

        <h3>Add Comment</h3>

        <form onSubmit={addComment}>

          <textarea
            className="form-control mb-3"
            rows="4"
            placeholder="Write comment..."
            value={commentText}
            onChange={(e) =>
              setCommentText(e.target.value)
            }
          ></textarea>

          <button className="btn btn-primary">
            Comment
          </button>

        </form>

      </div>

      {/* Comments */}

      <h3 className="mb-4">Comments</h3>

      {comments.map((comment) => (

        <div
          key={comment._id}
          className="card p-3 mb-3"
        >

          <p>{comment.content}</p>

          <small>
            By {comment.user?.username}
          </small>

        </div>

      ))}

    </div>
  );
}

export default SinglePost;