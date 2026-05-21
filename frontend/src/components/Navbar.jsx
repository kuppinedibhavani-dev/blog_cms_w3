import { Link } from "react-router-dom";

import { useContext } from "react";

import { ThemeContext } from "../context/theme";

function Navbar() {

  const token = localStorage.getItem("token");

  const { darkMode, toggleTheme } = useContext(ThemeContext);

  const logout = () => {

    localStorage.removeItem("token");

    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand-lg">

      <div className="container">

        <Link className="navbar-brand" to="/">
          Blog CMS
        </Link>

        <div>

          <button
            className="btn btn-secondary me-2"
            onClick={toggleTheme}
          >
            {darkMode ? "☀ Light" : "🌙 Dark"}
          </button>

          <Link className="btn btn-light me-2" to="/">
            Home
          </Link>

          {!token && (
            <>
              <Link className="btn btn-warning me-2" to="/signup">
                Signup
              </Link>

              <Link className="btn btn-info me-2" to="/login">
                Login
              </Link>
            </>
          )}

          {token && (
            <>
              <Link className="btn btn-success me-2" to="/posts">
                Posts
              </Link>

              <button
                className="btn btn-danger"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}

        </div>
      </div>
    </nav>
  );
}

export default Navbar;