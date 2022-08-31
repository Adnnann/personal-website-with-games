import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import GameBoard from "./components/game/GameBoard";
import NavBar from "./components/core/NavBar";
import LoginForm from "./components/users/Login";
import SignupForm from "./components/users/Signup";
import Home from "./components/core/Home";
import { getLogInUserStatus } from "./features/users.slice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function MainRouter({ socket }) {
  return (
    <Router>
      <NavBar socket={socket} />
      <LoginForm />
      <SignupForm />
      <Routes>
        <Route path="/" element={<Home />}></Route>

        <Route path="/game" element={<GameBoard socket={socket} />}></Route>
      </Routes>
    </Router>
  );
}
