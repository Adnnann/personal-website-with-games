import { configureStore } from "@reduxjs/toolkit";
import usersReducer from "../features/users.slice.js";
import gameReducer from "../features/game.slice.js";

export const store = configureStore({
  reducer: {
    users: usersReducer,
    game: gameReducer,
  },
});
