import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  registerUser: {
    status: "pending",
    error: null,
    userData: {},
  },
  logInUser: {
    logInStatus: "",
    error: null,
    userData: {},
    isLogged: false,
  },
  logOutUser: {
    logOutStatus: "",
  },
  logInUserFormStatus: false,
  signUpFormStatus: false,
  deleteUserModalWindow: false,
};

export const signUpUser = createAsyncThunk(
  "/users/registerUser",
  async (userData, { rejectWithValue }) => {
    console.log(userData);
    try {
      const response = await axios.post("/users/signUp", userData, {
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.data?.error) {
        return rejectWithValue(response.data.error);
      } else {
        return response.data;
      }
    } catch (error) {
      return error;
    }
  }
);

export const logInUser = createAsyncThunk(
  "/users/logInUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/logIn", user, {
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.data?.error) {
        return rejectWithValue(response.data.error);
      } else {
        return response.data;
      }
    } catch (error) {
      return error;
    }
  }
);

export const logOutUser = createAsyncThunk(
  "/users/logOutUser",
  async (user, { rejectWithValue }) => {
    try {
      const response = await axios.post("/users/logOut", user, {
        header: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      if (response.data?.error) {
        return rejectWithValue(response.data.error);
      } else {
        return response.data;
      }
    } catch (error) {
      return error;
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setSignUpFormStatus: (state, action) => {
      state.signUpFormStatus = action.payload;
    },
    setUserLoginFormStatus: (state, action) => {
      state.logInUserFormStatus = action.payload;
    },
    setRegisteredUserStatus: (state, action) => {
      state.registerUser.status = action.payload;
    },
    setLogInUserStatus: (state, action) => {
      state.logInUser.status = action.payload;
    },
    setRememberedUserLoginStatus: (state, action) => {
      state.logInUser.isLogged = action.payload;
    },
    deleteUserModalWindow: (state, action) => {
      state.deleteUserModalWindow = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(signUpUser.pending, (state, { payload }) => {
        return {
          ...state,
          registerUser: {
            isRegistered: false,
            signUpStatus: "pending",
            error: null,
            userData: {},
          },
        };
      })
      .addCase(signUpUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          registerUser: {
            isRegistered: true,
            signUpStatus: "fulfilled",
            error: null,
            userData: payload,
          },
        };
      })
      .addCase(signUpUser.rejected, (state, { payload }) => {
        return {
          ...state,
          registerUser: {
            isRegistered: false,
            signUpStatus: "rejected",
            error: payload,
            userData: {},
          },
        };
      })
      .addCase(logInUser.pending, (state, { payload }) => {
        return {
          ...state,
          logInUser: {
            isLogged: false,
            logInStatus: "pending",
            error: null,
            userData: {},
          },
        };
      })
      .addCase(logInUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          logInUser: {
            isLogged: true,
            logInStatus: "fulfilled",
            error: null,
            userData: payload,
          },
        };
      })
      .addCase(logInUser.rejected, (state, { payload }) => {
        return {
          ...state,
          logInUser: {
            isLogged: false,
            logInStatus: "rejected",
            error: payload,
            userData: {},
          },
        };
      })
      .addCase(logOutUser.fulfilled, (state, { payload }) => {
        return {
          ...state,
          logInUser: {
            isLogged: false,
            logInStatus: "",
            error: null,
            userData: {},
          },
          logOutStatus: {
            logOutStatus: payload,
            logInUser: {
              isLogged: false,
            },
          },
        };
      });
  },
});

export const getSignUpFormStatus = (state) => state.users.signUpFormStatus;
export const getSignUpUserStatus = (state) => state.users.registerUser;
export const getLoginUserFormStatus = (state) =>
  state.users.logInUserFormStatus;
export const getLogInUserStatus = (state) => state.users.logInUser;
export const getDeleteUserModalStatus = (state) =>
  state.users.deleteUserModalWindow;

export const {
  setSignUpFormStatus,
  setUserLoginFormStatus,
  setRegisteredUserStatus,
  setLogInUserStatus,
  setRememberedUserLoginStatus,
  deleteUserModalWindow,
} = usersSlice.actions;
export default usersSlice.reducer;
