import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import AdbIcon from "@mui/icons-material/Adb";
import {
  getLogInUserStatus,
  logOutUser,
  setSignUpFormStatus,
  setUserLoginFormStatus,
} from "../../features/users.slice";
import { setNewGame } from "../../features/game.slice";

const loggedUserButtons = ["Users", "My Profile", "Game", "Logout"];
const notLoggedUserButtons = ["Login", "Register"];

const NavBar = ({ socket }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getLogInUserStatus);

  useEffect(() => {
    return () => {
      if (!user.isLogged && user.logInStatus === "") {
        navigate("/");
      }
    };
    console.log(socket);
  }, [user]);

  const redirectToUsers = () => {
    console.log("users");
  };

  const redirectToMyProfile = () => {};

  const redirectToGame = () => {
    dispatch(setNewGame(true));

    const player = {
      name: `${user.userData.user.firstName} ${user.userData.user.lastName}`,
      id: user.userData.user._id,
      isAvailable: true,
    };

    socket?.emit("newPlayer", player);
    console.log(socket);
    navigate("/game");
  };

  const redirectToLogin = () => {
    dispatch(setUserLoginFormStatus(true));
    dispatch(setSignUpFormStatus(false));
  };

  const redirectToSignUp = () => {
    dispatch(setSignUpFormStatus(true));
  };

  const logOut = () => {
    dispatch(logOutUser());
    window.localStorage.removeItem("user");
  };

  const handleClickForLoggedUser = [
    redirectToUsers,
    redirectToMyProfile,
    redirectToGame,
    logOut,
  ];

  const handleClickForUnregisteredUser = [redirectToLogin, redirectToSignUp];

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </Box>
          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {user.isLogged
              ? loggedUserButtons.map((page, index) => (
                  <Button
                    key={page}
                    onClick={handleClickForLoggedUser[index]}
                    sx={{
                      my: 2,
                      color: "white",
                      display: "block",
                      marginLeft: index === 3 ? "auto" : "",
                    }}
                  >
                    {page}
                  </Button>
                ))
              : notLoggedUserButtons.map((page, index) => (
                  <Button
                    key={page}
                    onClick={handleClickForUnregisteredUser[index]}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <IconButton sx={{ p: 0 }}>
              <Avatar />
            </IconButton>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
