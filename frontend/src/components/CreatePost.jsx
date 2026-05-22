import { useState } from "react";

import axios from "axios";

function CreatePost() {

  const [title, setTitle] = useState("");

  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "import.meta.env.VITE_API_URL/api/posts",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(response.data.message);

      setTitle("");
      setContent("");

    } catch (error) {

      console.log(error);

    }
  };

  return (
    <div className="card p-4 mb-4">

      <h3>Create Post</h3>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Post Title"
          className="form-control mb-3"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Post Content"
          className="form-control mb-3"
          rows="5"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>

        <button className="btn btn-primary">
          Create Post
        </button>

      </form>
    </div>
  );
}

export default CreatePost;