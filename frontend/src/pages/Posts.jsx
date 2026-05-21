import { useEffect, useState } from "react";

import axios from "axios";

import CreatePost from "../components/CreatePost";

function Posts() {

  const [posts, setPosts] = useState([]);
  const [editingPost, setEditingPost] = useState(null);

const [updatedTitle, setUpdatedTitle] = useState("");

const [updatedContent, setUpdatedContent] = useState("");

  // Fetch posts

  useEffect(() => {

    const fetchPosts = async () => {

      try {

        const response = await axios.get(
          "http://localhost:5000/api/posts"
        );

        setPosts(response.data);

      } catch (error) {

        console.log(error);

      }
    };

    fetchPosts();

  }, []);

  // Delete post

  const deletePost = async (id) => {

    try {

      const token = localStorage.getItem("token");

      await axios.delete(
        `http://localhost:5000/api/posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Remove deleted post from UI

      setPosts(posts.filter((post) => post._id !== id));

      alert("Post deleted successfully");

    } catch (error) {

      console.log(error);

      alert("Failed to delete post");

    }
  };
  const startEditing = (post) => {

  setEditingPost(post._id);

  setUpdatedTitle(post.title);

  setUpdatedContent(post.content);
};
const updatePost = async (id) => {

  try {

    const token = localStorage.getItem("token");

    const response = await axios.put(
      `http://localhost:5000/api/posts/${id}`,
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
        post._id === id ? response.data.post : post
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

      <CreatePost />

      <h2 className="mb-4">All Posts</h2>

      {posts.map((post) => (

  <div key={post._id} className="card p-3 mb-3">

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
            setUpdatedContent(e.target.value)
          }
        ></textarea>

        <button
          className="btn btn-success me-2"
          onClick={() => updatePost(post._id)}
        >
          Save
        </button>

      </>

    ) : (

      <>
        <h4>{post.title}</h4>

        <p>{post.content}</p>

        <small>
          By {post.author?.username}
        </small>

        <div className="mt-3">

          <button
            className="btn btn-warning me-2"
            onClick={() => startEditing(post)}
          >
            Edit
          </button>

          <button
            className="btn btn-danger"
            onClick={() => deletePost(post._id)}
          >
            Delete
          </button>

        </div>
      </>

    )}

  </div>

))}

    </div>
  );
}

export default Posts;