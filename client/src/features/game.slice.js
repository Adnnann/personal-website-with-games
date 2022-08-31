import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singlePlayer: true,
  multiPlayer: false,
  weapon: null,
  computerWeapon: null,
  selectWeaponModal: false,
  newGame: false,
  message: "",
  allPlayers: [],
  gameRequest: false,
  gameRequestAccepted: false,
};

const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    setSinglePlayerGame: (state, action) => {
      state.singlePlayer = action.payload;
    },
    setMultiPlayerGame: (state, action) => {
      state.multiPlayer = action.payload;
    },
    setSinglePlayerWeapon: (state, action) => {
      state.weapon = action.payload;
    },
    setComputerWeapon: (state, action) => {
      state.computerWeapon = action.payload;
    },
    setSelectWeaponModal: (state, action) => {
      state.selectWeaponModal = action.payload;
    },
    setNewGame: (state, action) => {
      state.newGame = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setAllPlayers: (state, action) => {
      state.allPlayers = action.payload;
    },
    setGameRequest: (state, action) => {
      state.gameRequest = action.payload;
    },
    setGameAccepted: (state, action) => {
      state.gameRequestAccepted = action.payload;
    },
  },
});

export const playSinglePlayerGame = (state) => state.game.singlePlayer;
export const playMultiPlayerGame = (state) => state.game.multiPlayer;
export const getSinglePlayerWeapon = (state) => state.game.weapon;
export const getComputerWeapon = (state) => state.game.computerWeapon;
export const getSelectWeaponModalStatus = (state) =>
  state.game.selectWeaponModal;
export const getNewGameStatus = (state) => state.game.newGame;
export const getGameRequest = (state) => state.game.gameRequest;
export const getAcceptedGameRequest = (state) => state.game.gameRequestAccepted;

export const {
  setSinglePlayerGame,
  setMultiPlayerGame,
  setSinglePlayerWeapon,
  setComputerWeapon,
  setSelectWeaponModal,
  setNewGame,
  setMessage,
  setAllPlayers,
  setGameRequest,
  setGameAccepted,
} = gameSlice.actions;
export default gameSlice.reducer;
