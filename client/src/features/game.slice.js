import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  singlePlayer: true,
  multiPlayer: false,
  singlePlayerSelectedWeapons: [],
  multiPlayerSelectedWeapons: [],
  selectWeaponModal: false,
  newGame: false,
  playAgainAgainstFriend: false,
  singlePlayerWinnerMessage: "",
  multiPlayerWinnerMessage: "",
  allPlayers: [],
  gameRequest: false,
  gameRequestAccepted: false,
  playerTurn: null,
  players: {},
  rejectGameRequest: false,
  multiplayerGameType: {},
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
    setSinglePlayerWeapons: (state, action) => {
      state.singlePlayerSelectedWeapons = action.payload;
    },
    setMultiPlayerWeapons: (state, action) => {
      state.multiPlayerSelectedWeapons = action.payload;
    },
    setSelectWeaponModal: (state, action) => {
      state.selectWeaponModal = action.payload;
    },
    setNewGame: (state, action) => {
      state.newGame = action.payload;
    },
    setMultiPlayerGameType: (state, action) => {
      state.multiplayerGameType = action.payload;
    },
    setMessageForMultiplayer: (state, action) => {
      console.log(action.payload);
      state.multiPlayerWinnerMessage =
        action.payload.player1Weapon === "rock" &&
        action.payload.player2Weapon === "scissors"
          ? "Player 1 wins - Rock breaks scissors"
          : action.payload.player1Weapon === "scissors" &&
            action.payload.player2Weapon === "rock"
          ? "Player 2 wins - Rock breaks scissors"
          : action.payload.player1Weapon === "paper" &&
            action.payload.player2Weapon === "rock"
          ? "Player 1 wins - Paper covers rock"
          : action.payload.player1Weapon === "rock" &&
            action.payload.player2Weapon === "paper"
          ? "Player 2 wins - Paper covers rock"
          : action.payload.player1Weapon === "paper" &&
            action.payload.player2Weapon === "scissors"
          ? "Player 1 wins - Scissors cut paper"
          : action.payload.player1Weapon === "scissors" &&
            action.payload.player2Weapon === "paper"
          ? "Player 2 wins - Scissors cut paper"
          : action.payload.action.payload.player1Weapon ===
            action.payload.player2Weapon
          ? "Tie!"
          : null;
    },
    setSinglePlayerWinnerMessage: (state, action) => {
      console.log(action.payload);
      state.singlePlayerWinnerMessage =
        action.payload.singlePlayerWeapon === "rock" &&
        action.payload.computerWeapon === "scissors"
          ? "You win - Rock breaks scissors"
          : action.payload.singlePlayerWeapon === "scissors" &&
            action.payload.computerWeapon === "rock"
          ? "You lose - Rock breaks scissors"
          : action.payload.singlePlayerWeapon === "paper" &&
            action.payload.computerWeapon === "rock"
          ? "You win - Paper covers rock"
          : action.payload.singlePlayerWeapon === "rock" &&
            action.payload.computerWeapon === "paper"
          ? "You lose - Paper covers rock"
          : action.payload.singlePlayerWeapon === "paper" &&
            action.payload.computerWeapon === "scissors"
          ? "You lose - Scissors cut paper"
          : action.payload.singlePlayerWeapon === "scissors" &&
            action.payload.computerWeapon === "paper"
          ? "You win - Scissors cut paper"
          : action.payload.singlePlayerWeapon === action.payload.computerWeapon
          ? "Tie!"
          : null;
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
    setNewMultiPlayerGame: (state, action) => {
      state.newMultiPlayerGame = action.payload;
    },
    setPlayerTurn: (state, action) => {
      state.playerTurn = action.payload;
    },
    setPlayers: (state, action) => {
      state.players = action.payload;
    },
    setPlayAgainAgainstFriend: (state, action) => {
      state.playAgainAgainstFriend = action.payload;
    },
    setRejectGameRequest: (state, action) => {
      state.rejectGameRequest = action.payload;
    },
    resetStore: () => initialState,
  },
});

export const playSinglePlayerGame = (state) => state.game.singlePlayer;
export const playMultiPlayerGame = (state) => state.game.multiPlayer;
export const getSinglePlayerWeapons = (state) =>
  state.game.singlePlayerSelectedWeapons;
export const getMultiPlayerWeapons = (state) =>
  state.game.multiPlayerSelectedWeapons;
export const getSelectWeaponModalStatus = (state) =>
  state.game.selectWeaponModal;
export const getNewGameStatus = (state) => state.game.newGame;
export const getGameRequest = (state) => state.game.gameRequest;
export const getAcceptedGameRequest = (state) => state.game.gameRequestAccepted;
export const getPlayerTurn = (state) => state.game.playerTurn;
export const getPlayers = (state) => state.game.players;
export const getSinglePlayerWinnerMessage = (state) =>
  state.game.singlePlayerWinnerMessage;
export const getMultiPlayerWinnerMessage = (state) =>
  state.game.multiPlayerWinnerMessage;
export const getAllPlayers = (state) => state.game.allPlayers;
export const getPlayAgainAgainstFriendStatus = (state) =>
  state.game.playAgainAgainstFriend;
export const getRejectGameRequestStatus = (state) =>
  state.game.rejectGameRequest;
export const getMultiplayerGameType = (state) => state.game.multiplayerGameType;

export const {
  setSinglePlayerGame,
  setMultiPlayerGame,
  setSinglePlayerWeapons,
  setMultiPlayerWeapons,
  setSinglePlayerWinnerMessage,
  setSelectWeaponModal,
  setNewGame,
  setMessageForMultiplayer,
  setAllPlayers,
  setGameRequest,
  setGameAccepted,
  setPlayer1Weapon,
  setPlayer2Weapon,
  setPlayerTurn,
  setPlayers,
  setPlayAgainAgainstFriend,
  resetStore,
  setRejectGameRequest,
  setMultiPlayerGameType,
} = gameSlice.actions;
export default gameSlice.reducer;
