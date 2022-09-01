import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singlePlayer: true,
  multiPlayer: false,
  weapon: "singlePlayerWeapon",
  computerWeapon: "computerWeapon",
  selectWeaponModal: false,
  newGame: false,
  message: "",
  allPlayers: [],
  gameRequest: false,
  gameRequestAccepted: false,
  player1Weapon: "player1Weapon",
  player2Weapon: "player2Weapon",
  playerTurn: null,
  players: {},
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
    setPlayer1Weapon: (state, action) => {
      state.player1Weapon = action.payload;
    },
    setPlayer2Weapon: (state, action) => {
      state.player2Weapon = action.payload;
    },
    setNewMultiPlayerGame: (state, action) => {
      state.newMultiPlayerGame = action.payload;
    },
    setPlayerTurn: (state, action) => {
      state.playerTurn = action.payload;
    },
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    resetStore: () => initialState,
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
export const getPlayer1Weapon = (state) => state.game.player1Weapon;
export const getPlayer2Weapon = (state) => state.game.player2Weapon;
export const getPlayerTurn = (state) => state.game.playerTurn;
export const getPlayers = (state) => state.game.players;

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
  setPlayer1Weapon,
  setPlayer2Weapon,
  setPlayerTurn,
  setPlayers,
  resetStore,
} = gameSlice.actions;
export default gameSlice.reducer;
