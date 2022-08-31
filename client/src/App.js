import React, { useEffect, useState } from "react";
import "./App.css";
import MainRouter from "./MainRouter";
import { io } from "socket.io-client";
import { useDispatch } from "react-redux";
import { setRememberedUserLoginStatus } from "./features/users.slice";

function App() {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    setSocket(
      io("http://localhost:3000", {
        reconnection: true,
        reconnectionDelay: 1000,
        reconnectionDelayMax: 5000,
        reconnectionAttempts: 5,
      })
    );

    const userIsRemembered = window.localStorage.getItem("user");

    if (userIsRemembered !== null) {
      dispatch(setRememberedUserLoginStatus(true));
    }
  }, []);

  return <MainRouter socket={socket} />;
}

export default App;
