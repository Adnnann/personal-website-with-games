import React, { useEffect } from "react";
import { useState } from "react";
import {
  Dialog,
  TextField,
  Button,
  DialogActions,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useDispatch, useSelector } from "react-redux";
import {
  getRegisteredUserData,
  getSignUpFormStatus,
  getSignUpUserStatus,
  setRegisteredUserStatus,
  setSignUpFormStatus,
  setUserLoginFormStatus,
  signUpFormStatus,
  signUpUser,
} from "../../features/users.slice";
import CloseSharpIcon from "@mui/icons-material/CloseSharp";

const useStyles = makeStyles({
  textFields: {
    width: "280px",
    height: "60px",
    marginLeft: "50px !important",
    marginRight: "50px !important",
    marginBottom: "10px !important",
    display: "flex !important",
  },
  signUpButton: {
    width: "280px",
    height: "60px",
    margin: "0 auto !important",
    textTransform: "none !important",
    fontSize: "24px !important",
  },
  labels: {
    marginLeft: "50px !important",
  },
  title: {
    textAlign: "center",
    marginBottom: "30px !important",
    marginTop: "20px !important",
  },
  closeForm: {
    marginLeft: "auto",
    color: "red",
    cursor: "pointer",
  },
});

export default function SignupForm() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const signUpFormStatus = useSelector(getSignUpFormStatus);
  const user = useSelector(getSignUpUserStatus);

  useEffect(() => {
    if (user.signUpStatus === "fulfilled" && user.isRegistered) {
      console.log("yes");
      setTimeout(() => {
        dispatch(setRegisteredUserStatus("registered"));
        dispatch(setSignUpFormStatus(false));
        dispatch(setUserLoginFormStatus(true));
      }, 1000);
    }
  }, [user, dispatch]);

  const textFieldsTypes = ["text", "text", "text", "password"];
  const labels = ["First Name", "Last Name", "Email", "Password"];
  const textFieldsNames = ["firstName", "lastName", "email", "password"];

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (name) => (event) => {
    console.log(name);
    if (name === "firstName" || name === "lastName") {
      setUserData({
        ...userData,
        [name]:
          event.target.value.charAt(0).toUpperCase() +
          event.target.value.slice(1).toLowerCase(),
      });
    } else {
      setUserData({ ...userData, [name]: event.target.value });
    }
  };

  const registerUser = () => {
    dispatch(signUpUser(userData));
  };

  const cancel = () => {
    setUserData({ firstName: "", lastName: "", email: "", password: "" });
    dispatch(setSignUpFormStatus(false));
  };

  return (
    <div>
      <Dialog open={signUpFormStatus}>
        <CloseSharpIcon className={classes.closeForm} onClick={cancel} />
        <Typography variant="h4" className={classes.title}>
          Sign Up
        </Typography>

        {textFieldsTypes.map((type, index) => {
          return (
            <div key={index}>
              <span className={classes.labels}>{labels[index]}</span>
              <TextField
                type={type}
                value={userData[textFieldsNames[index]]}
                className={classes.textFields}
                onChange={handleChange(textFieldsNames[index])}
              />
            </div>
          );
        })}

        <DialogActions>
          <Button
            variant="contained"
            className={classes.signUpButton}
            onClick={registerUser}
          >
            Sign Up
          </Button>
        </DialogActions>
        <Typography
          component={"p"}
          style={{ textAlign: "center", color: "red" }}
        >
          {user.signUpStatus === "rejected" ? (
            user.error
          ) : user.signUpStatus === "pending" ? (
            "Loading..."
          ) : user.signUpStatus === "fulfilled" ? (
            <>
              <span>User registered successfully</span>
              <br />
              <span>You will be redirected to login page</span>
            </>
          ) : (
            ""
          )}
        </Typography>
      </Dialog>
    </div>
  );
}
