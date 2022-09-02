import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Grid } from "@mui/material";
import Weapons from "../game/Weapons";
import GameTabs from "../game/GameTabs";
import { getLogInUserStatus } from "../../features/users.slice";
import {
  playSinglePlayerGame,
  playMultiPlayerGame,
  setSelectWeaponModal,
  setNewGame,
  setAllPlayers,
  getGameRequest,
  setGameRequest,
  setGameAccepted,
  setPlayerTurn,
  setPlayers,
  setMessageForMultiplayer,
  getMultiPlayerWinnerMessage,
  getSinglePlayerWinnerMessage,
  getSinglePlayerWeapons,
  getMultiPlayerWeapons,
  setMultiPlayerWeapons,
  setPlayAgainAgainstFriend,
  setRejectGameRequest,
  getRejectGameRequestStatus,
  getMultiplayerGameType,
  setMultiPlayerGameType,
} from "../../features/game.slice";
import SelectWeapon from "./SelectWeaponModal";
import AvailablePlayers from "./AvailablePlayers";
import PlaySinglePlayerGameButton from "./PlaySinglePlayerButton";
import MultiPlayerGameButtons from "./MultiPlayerGameButtons";
import GameRequestModal from "./GameRequestModal";
import SinglePlayerWinnerMessage from "./SinglePlayerWinnerMessage";
import MultiPlayerWinnerMessage from "./MultiPlayerWinnerMessage";
import { makeStyles } from "@mui/styles";
import RejectGameRequestModal from "./GameRejectRequestModal";

const useStyles = makeStyles({
  gameBoardContainer: {
    marginTop: "20px !important",
  },
});

export default function GameBoard({ socket }) {
  const dispatch = useDispatch();
  const classes = useStyles();
  const allPlayers = useSelector((state) => state.game.allPlayers);
  const user = useSelector(getLogInUserStatus);
  const gameRequest = useSelector(getGameRequest);
  const [challenger, setChallenger] = useState(null);
  const [challengedPlayer, setChallengedPlayer] = useState(null);

  const singlePlayerWinnerMessage = useSelector(getSinglePlayerWinnerMessage);
  const multiPlayerMessage = useSelector(getMultiPlayerWinnerMessage);

  const singlePlayerWeapons = useSelector(getSinglePlayerWeapons);
  const multiPlayerWeapons = useSelector(getMultiPlayerWeapons);

  const rejectGameRequestStatus = useSelector(getRejectGameRequestStatus);

  const multiplayerGameType = useSelector(getMultiplayerGameType);
  useEffect(() => {
    socket?.on("newPlayerAdded", (onlinePlayers) => {
      dispatch(setAllPlayers(onlinePlayers));
    });
    socket?.on("selectedPlayerGameRequest", (players) => {
      dispatch(setGameRequest(true));
      setChallengedPlayer(players[0]);
      setChallenger(players[1]);
    });
    socket?.on("gameRequestAccepted", (players) => {
      dispatch(setGameAccepted(true));
      socket.emit("player1Turn", players);
    });
    socket?.on("gameRequestRejected", (players) => {
      dispatch(setGameAccepted(false));
      dispatch(setRejectGameRequest(true));
    });
    socket?.on("availablePlayers", (availablePlayers) => {
      dispatch(setAllPlayers(availablePlayers));
    });
    socket?.on("player1Turn", (players) => {
      dispatch(setSelectWeaponModal(true));
      dispatch(setPlayerTurn("player1"));
      dispatch(setPlayers(players));
    });
    socket?.on("player2Turn", (players) => {
      dispatch(setPlayers(players));
      dispatch(setPlayerTurn("player2"));
      dispatch(setSelectWeaponModal(true));
    });
    socket?.on("endGame", (players) => {
      const weapons = {
        player1Weapon: players.player1Weapon,
        player2Weapon: players.player2Weapon,
      };
      dispatch(
        setMultiPlayerWeapons([players.player1Weapon, players.player2Weapon])
      );
      dispatch(setMessageForMultiplayer(weapons));
      dispatch(setPlayAgainAgainstFriend(true));
    });
  }, [socket, dispatch]);

  const singlePlayerGame = useSelector(playSinglePlayerGame);
  const multiPlayerGame = useSelector(playMultiPlayerGame);

  const handlePlayGame = () => {
    dispatch(setSelectWeaponModal(true));
    dispatch(setNewGame(true));
  };

  const handlePlayAgainstFriend = () => {
    const multiplayerGame = {
      againstFriend: true,
      againstRandomPlayer: false,
    };

    dispatch(setMultiPlayerGameType(multiplayerGame));
  };

  const selectPlayer = (event) => {
    const players = {
      challenger:
        user.userData.user.firstName + " " + user.userData.user.lastName,
      challengedPlayer: event.target.value,
    };
    socket.emit("selectPlayer", players);
  };

  const acceptGameRequest = () => {
    const players = {
      challengerId: challenger.socketId,
      challengedPlayerId: challengedPlayer.socketId,
    };
    socket.emit("acceptGameRequest", players);
    dispatch(setGameRequest(false));
  };

  const rejectGameRequest = () => {
    const players = {
      challengerId: challenger.socketId,
      challengedPlayerId: challengedPlayer.socketId,
    };
    socket.emit("rejectGameRequest", players);
    dispatch(setGameRequest(false));
  };

  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      className={classes.gameBoardContainer}
    >
      <GameTabs />
      <SelectWeapon singlePlayer={singlePlayerGame} socket={socket} />
      {singlePlayerGame && (
        <>
          <SelectWeapon singlePlayer={singlePlayerGame} socket={socket} />
          <PlaySinglePlayerGameButton handlePlayGame={handlePlayGame} />
          <Weapons selectedWeapons={singlePlayerWeapons} />
        </>
      )}
      {multiPlayerGame && (
        <>
          <Grid item xs={12} md={4} lg={4} xl={3}>
            {user?.userData?.user && multiplayerGameType.againstFriend ? (
              <AvailablePlayers
                selectPlayer={selectPlayer}
                players={allPlayers.filter(
                  (player) => player.id !== user.userData.user._id
                )}
              />
            ) : null}
          </Grid>
          <MultiPlayerGameButtons
            handlePlayAgainstFriend={handlePlayAgainstFriend}
          />
          <Weapons socket={socket} selectedWeapons={multiPlayerWeapons} />
        </>
      )}

      <Grid item xs={12} md={12} lg={12} xl={12}>
        {singlePlayerGame && (
          <SinglePlayerWinnerMessage
            winnerMessage={singlePlayerWinnerMessage}
          />
        )}
        {multiPlayerGame && (
          <MultiPlayerWinnerMessage
            multiPlayerWinnerMessage={multiPlayerMessage}
          />
        )}
      </Grid>
      <GameRequestModal
        gameRequest={gameRequest}
        acceptGameRequest={acceptGameRequest}
        rejectGameRequest={rejectGameRequest}
      />
      <RejectGameRequestModal gameRequest={rejectGameRequestStatus} />
    </Grid>
  );
}
