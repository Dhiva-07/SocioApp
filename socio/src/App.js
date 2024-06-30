import Profile from "./components/Profile/Profile";
import Register from "./pages/home/Regsiter/Register";
import Home from "./pages/home/home";
import Login from "./pages/home/login/Login";
import  Search  from "./components/Search/Search";
import React from "react";
import { BrowserRouter as Router, Route, Routes , Navigate } from 'react-router-dom';
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
function App() {
  const { user } = useContext(AuthContext);
  return (
    <Router>
      <Routes>
        <Route
          exact path="/"
          element={user ? <Home /> : <Navigate to="/register" />}
        />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <Login />}
        />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
         <Route
          path="/profile/:username"
          element={<Profile />}
        />
        <Route 
        path="/search"
        element={<Search />} 
        />
      </Routes>
    </Router>
  );
}

export default App;
