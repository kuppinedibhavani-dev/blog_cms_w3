import { useState } from "react";
import axios from "axios";

function Login() {
    

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
        "http://localhost:5000/api/auth/login",
        formData
      );

      localStorage.setItem("token", response.data.token);

      alert("Login Successful");

      window.location.href = "/";

    } catch (error) {

      alert(error.response.data.message);

    }
  };

  return (
    <div className="container mt-5">

      <div className="card p-4 mx-auto" style={{ maxWidth: "400px" }}>

        <h2 className="text-center mb-4">Login</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="email"
            name="email"
            placeholder="Email"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            className="form-control mb-3"
            onChange={handleChange}
          />

          <button className="btn btn-success w-100">
            Login
          </button>

        </form>
      </div>
    </div>
  );
}

export default Login;