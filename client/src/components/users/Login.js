import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dialog,
  TextField,
  Button,
  DialogActions,
  Typography,
  Checkbox,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getLoginUserFormStatus,
  getLogInUserStatus,
  logInUser,
  setLogInUserStatus,
  setRememberedUserLoginStatus,
  setUserLoginFormStatus,
} from "../../features/users.slice";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

const useStyles = makeStyles({
  textFields: {
    width: "280px",
    height: "60px",
    marginLeft: "50px !important",
    marginRight: "50px !important",
    marginBottom: "5px !important",
  },
  logInButton: {
    width: "160px",
    height: "60px",
    margin: "0 auto !important",
    textTransform: "none !important",
    fontSize: "20px !important",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px !important",
    marginTop: "20px !important",
  },
  logInStatus: {
    textAlign: "center",
    marginTop: "10px",
  },
  closeForm: {
    marginLeft: "auto",
    color: "red",
    cursor: "pointer",
  },
});

export default function LoginForm() {
  const classes = useStyles();
  const userLoginFormStatus = useSelector(getLoginUserFormStatus);
  const dispatch = useDispatch();
  const user = useSelector(getLogInUserStatus);

  useEffect(() => {
    const userIsRemembered = window.localStorage.getItem("user");

    if (userIsRemembered !== null) {
      dispatch(setRememberedUserLoginStatus(true));
      dispatch(setUserLoginFormStatus(false));
    }

    if (user.logInStatus === "fulfilled" && user.isLogged) {
      userLoginData.remember &&
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            token: user.userData.token,
            date: Date.now(),
          })
        );

      setTimeout(() => {
        dispatch(setLogInUserStatus("logged"));
        dispatch(setUserLoginFormStatus(false));
      }, 2000);
    }
  }, [user, dispatch]);

  const [userLoginData, setUserLoginData] = useState({});

  const handleChange = (name) => (event) => {
    setUserLoginData({ ...userLoginData, [name]: event.target.value });
  };
  const handleSubmit = () => {
    dispatch(logInUser(userLoginData));
  };

  const handleCheckBox = (event) => {
    setUserLoginData({
      ...userLoginData,
      remember: event.target.checked,
    });
  };

  const cancel = () => {
    dispatch(setUserLoginFormStatus(false));
  };

  return (
    <div>
      <Dialog open={userLoginFormStatus}>
        <CloseSharpIcon className={classes.closeForm} onClick={cancel} />
        <Typography variant="h4" className={classes.title}>
          Sign In
        </Typography>
        <TextField
          type="text"
          label="Email"
          className={classes.textFields}
          onChange={handleChange("email")}
        />
        <br />
        <br />
        <TextField
          type="password"
          label="Password"
          className={classes.textFields}
          onChange={handleChange("password")}
        />

        <DialogActions>
          <Button
            variant="contained"
            className={classes.logInButton}
            onClick={handleSubmit}
          >
            Log In
          </Button>
        </DialogActions>
        <Typography
          component={"p"}
          style={{
            color: user.logInStatus === "fulfilled" ? "green" : "red",
          }}
          className={classes.logInStatus}
        >
          {user.logInStatus === "rejected" ? (
            user.error
          ) : user.logInStatus === "pending" ? (
            "Loading..."
          ) : user.logInStatus === "fulfilled" ? (
            <>
              <span>You have logged in successfully</span>
            </>
          ) : (
            ""
          )}
        </Typography>
        <span style={{ margin: "0 auto" }}>
          Remember me
          <Checkbox onChange={handleCheckBox} />
        </span>
      </Dialog>
    </div>
  );
}
