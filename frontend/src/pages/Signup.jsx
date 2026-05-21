import { useState } from "react";

import axios from "axios";

function Signup() {

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {

    setFormData({
      ...formData,

      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        formData
      );

      alert(response.data.message);

      setFormData({
        username: "",
        email: "",
        password: "",
      });

      window.location.href = "/login";

    } catch (error) {

      alert(error.response.data.message);

    }
  };

  return (
    <div className="container mt-5">

      <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>

        <h2 className="text-center mb-4">Signup</h2>

        <form onSubmit={handleSubmit} autoComplete="off">

          <input
            type="text"
            name="username"
            placeholder="Username"
            className="form-control mb-3"
            onChange={handleChange}
            autoComplete="off"
            value={formData.username}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            onChange={handleChange}
            autoComplete="off"
            value={formData.email}
          />

          <div className="input-group mb-3">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="form-control"
              onChange={handleChange}
              autoComplete="new-password"
              value={formData.password}
            />

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() =>
                setShowPassword(!showPassword)
              }
            >
              {showPassword ? "🙈" : "👁"}
            </button>

          </div>

          <button className="btn btn-primary w-100">
            Signup
          </button>

        </form>

      </div>
    </div>
  );
}

export default Signup;