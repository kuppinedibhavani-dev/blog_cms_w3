import { useEffect, useState } from "react";

import axios from "axios";

import CreatePost from "../components/CreatePost";

import { Link } from "react-router-dom";

function Posts() {

  const [posts, setPosts] = useState([]);

  const [editingPost, setEditingPost] = useState(null);

  const [updatedTitle, setUpdatedTitle] = useState("");

  const [updatedContent, setUpdatedContent] = useState("");

  // Fetch Posts

  const fetchPosts = async () => {

    try {

      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/posts`
      );

      setPosts(response.data);

    } catch (error) {

      console.log(error);

    }
  };

  // Load Posts

 useEffect(() => {

  const loadPosts = async () => {

    await fetchPosts();

  };

  loadPosts();

}, []);
  // Delete Post

  const deletePost = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts(
        posts.filter((post) => post._id !== id)
      );

      alert("Post deleted successfully");

    } catch (error) {

      console.log(error);

      alert("Failed to delete post");

    }
  };

  // Start Editing

  const startEditing = (post) => {

    setEditingPost(post._id);

    setUpdatedTitle(post.title);

    setUpdatedContent(post.content);
  };

  // Update Post

  const updatePost = async (id) => {

    try {

      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${import.meta.env.VITE_API_URL}/api/posts/${id}`,
        {
          title: updatedTitle,
          content: updatedContent,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setPosts(
        posts.map((post) =>
          post._id === id
            ? response.data.post
            : post
        )
      );

      setEditingPost(null);

      alert("Post updated successfully");

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="container mt-5">

      {/* Create Post */}

      <CreatePost />

      {/* Posts Title */}

      <h2 className="mb-4">All Posts</h2>

      {/* Empty State */}

      {posts.length === 0 ? (

        <h4>No Posts Available</h4>

      ) : (

        posts.map((post) => (

          <div
            key={post._id}
            className="card p-3 mb-3"
          >

            {editingPost === post._id ? (

              <>
                <input
                  type="text"
                  className="form-control mb-2"
                  value={updatedTitle}
                  onChange={(e) =>
                    setUpdatedTitle(e.target.value)
                  }
                />

                <textarea
                  className="form-control mb-2"
                  rows="4"
                  value={updatedContent}
                  onChange={(e) =>
                    setUpdatedContent(
                      e.target.value
                    )
                  }
                ></textarea>

                <button
                  className="btn btn-success"
                  onClick={() =>
                    updatePost(post._id)
                  }
                >
                  Save
                </button>

              </>

            ) : (

              <>
                {/* Clickable Title */}

                <Link
                  to={`/posts/${post._id}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <h4>{post.title}</h4>
                </Link>

                <p>{post.content}</p>

                <small>
                  By {post.author?.username}
                </small>

                <div className="mt-3">

                  <button
                    className="btn btn-warning me-2"
                    onClick={() =>
                      startEditing(post)
                    }
                  >
                    Edit
                  </button>

                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      deletePost(post._id)
                    }
                  >
                    Delete
                  </button>

                </div>

              </>

            )}

          </div>

        ))

      )}

    </div>
  );
}

export default Posts;