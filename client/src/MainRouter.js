import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameBoard from "./components/game/GameBoard";
import NavBar from "./components/core/NavBar";
import LoginForm from "./components/users/Login";
import SignupForm from "./components/users/Signup";
import Home from "./components/core/Home";
import UserProfile from "./components/users/UserProfile";
import MyProjects from "./components/projects/MyProjects";
import { Container } from "@mui/system";
import { Grid } from "@mui/material";

export default function MainRouter({ socket }) {
  return (
    <Router>
      <NavBar socket={socket} />
      <LoginForm />
      <SignupForm />
      <Routes>
   
        <Route path="/" element={<Home />}></Route>
        <Route path="/game" element={<GameBoard socket={socket} />}></Route>
        <Route path="/profile" element={<UserProfile />}></Route>
        <Route path="/projects" element={<MyProjects />}></Route>
    
      </Routes>
    </Router>
  );
}
