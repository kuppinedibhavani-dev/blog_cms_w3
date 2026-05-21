import { Link } from "react-router-dom";

function Home() {

  const token = localStorage.getItem("token");

  return (
    <div>

      {/* Hero Section */}

      <div
        className="text-center text-white d-flex align-items-center"
        style={{
          height: "90vh",
          background:
            "linear-gradient(to right, #141e30, #243b55)",
        }}
      >

        <div className="container">

          <h1
            className="fw-bold mb-4"
            style={{ fontSize: "4rem" }}
          >
            Welcome to Blog CMS
          </h1>

          <p
            className="lead mb-4"
            style={{ fontSize: "1.3rem" }}
          >
            Create, Manage and Share Blogs using
            MERN Stack Technology
          </p>

          {!token ? (
            <>
              <Link
                to="/signup"
                className="btn btn-warning btn-lg me-3"
              >
                Get Started
              </Link>

              <Link
                to="/login"
                className="btn btn-outline-light btn-lg"
              >
                Login
              </Link>
            </>
          ) : (
            <Link
              to="/posts"
              className="btn btn-success btn-lg"
            >
              Go To Posts
            </Link>
          )}
        </div>
      </div>

      {/* Features Section */}

      <div className="container py-5">

        <h2 className="text-center fw-bold mb-5">
          Features
        </h2>

        <div className="row">

          <div className="col-md-4 mb-4">

            <div className="card shadow-lg border-0 h-100">

              <div className="card-body text-center">

                <h3 className="mb-3">🔐 Authentication</h3>

                <p>
                  Secure JWT authentication system
                  with protected routes.
                </p>

              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">

            <div className="card shadow-lg border-0 h-100">

              <div className="card-body text-center">

                <h3 className="mb-3">📝 Blog Management</h3>

                <p>
                  Create, edit and delete blog posts
                  easily using modern UI.
                </p>

              </div>
            </div>
          </div>

          <div className="col-md-4 mb-4">

            <div className="card shadow-lg border-0 h-100">

              <div className="card-body text-center">

                <h3 className="mb-3">🌙 Dark Mode</h3>

                <p>
                  Toggle between light and dark mode
                  for better user experience.
                </p>

              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Footer */}

      <footer
        className="text-center text-white py-4"
        style={{
          backgroundColor: "#141e30",
        }}
      >

        <p className="mb-0">
          © 2026 Blog CMS | MERN Stack Project
        </p>

      </footer>

    </div>
  );
}

export default Home;