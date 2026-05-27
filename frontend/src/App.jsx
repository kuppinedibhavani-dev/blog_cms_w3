import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Posts from "./pages/Posts";
import ProtectedRoute from "./components/ProtectedRoute";
import SinglePost from "./pages/SinglePost";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/login" element={<Login />} />

        <Route path="/posts" element={<ProtectedRoute>
          <Route path="/posts/:id" element={
             <ProtectedRoute>
                <SinglePost />
             </ProtectedRoute>
  }
/>
         <Posts />
        </ProtectedRoute>
  }
/>

      </Routes>

    </BrowserRouter>
  );
}

export default App;