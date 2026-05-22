import { useState } from "react";

import axios from "axios";

function Login() {

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
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
        "import.meta.env.VITE_API_URL/api/auth/login",
        formData
      );

      localStorage.setItem("token", response.data.token);

      alert("Login Successful");

      // Clear form

      setFormData({
        email: "",
        password: "",
      });

      window.location.href = "/";

    } catch (error) {

      alert(error.response.data.message);

    }
  };

  return (
    <div className="container mt-5">

      <div
        className="card p-4 mx-auto"
        style={{ maxWidth: "400px" }}
      >

        <h2 className="text-center mb-4">
          Login
        </h2>

        <form
          onSubmit={handleSubmit}
          autoComplete="off"
        >

          {/* Fake hidden fields */}

          <input
            type="text"
            style={{ display: "none" }}
          />

          <input
            type="password"
            style={{ display: "none" }}
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            value={formData.email}
            onChange={handleChange}
            autoComplete="new-email"
          />

          <div className="input-group mb-3">

            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              autoComplete="new-password"
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

          <button className="btn btn-success w-100">
            Login
          </button>

        </form>

      </div>
    </div>
  );
}

export default Login;