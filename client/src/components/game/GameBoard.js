import React, { useEffect } from "react";
import { useState } from "react";
import { Grid, Button, Typography, Dialog, DialogActions } from "@mui/material";
import Rock from "../../assets/weapons/rock.png";
import Paper from "../../assets/weapons/paper.png";
import Scissors from "../../assets/weapons/scissors.png";
import Weapons from "../game/Weapons";
import GameTabs from "../game/GameTabs";
import { useDispatch, useSelector } from "react-redux";
import {
  playSinglePlayerGame,
  playMultiPlayerGame,
  setSelectWeaponModal,
  getSinglePlayerWeapon,
  getComputerWeapon,
  setSinglePlayerWeapon,
  setComputerWeapon,
  getNewGameStatus,
  setNewGame,
  setAllPlayers,
  getGameRequest,
  setGameRequest,
  setGameAccepted,
  getAcceptedGameRequest,
} from "../../features/game.slice";
import { Box } from "@mui/system";
import SelectWeapon from "./SelectWeaponModal";
import AvailablePlayers from "./AvailablePlayers";
import { getLogInUserStatus } from "../../features/users.slice";

export default function GameBoard({ socket }) {
  const dispatch = useDispatch();
  const newGame = useSelector(getNewGameStatus);
  const allPlayers = useSelector((state) => state.game.allPlayers);
  const user = useSelector(getLogInUserStatus);
  const gameRequest = useSelector(getGameRequest);
  const [challenger, setChallenger] = useState(null);
  const [challengedPlayer, setChallengedPlayer] = useState(null);
  const gameRequestAccepted = useSelector(getAcceptedGameRequest);

  useEffect(() => {
    socket?.on("newPlayerAdded", (onlinePlayers) => {
      dispatch(setAllPlayers(onlinePlayers));
    });
    socket?.on("selectedPlayerGameRequest", (players) => {
      dispatch(setGameRequest(true));
      setChallengedPlayer(players[0]);
      setChallenger(players[1]);
      console.log(players);
    });
    socket?.on("gameRequestAccepted", (player) => {
      dispatch(setGameAccepted(true));
    });
  }, [socket, dispatch]);
  console.log(challengedPlayer, challenger);
  const weapons = [Rock, Paper, Scissors];

  const singlePlayerGame = useSelector(playSinglePlayerGame);
  const multiPlayerGame = useSelector(playMultiPlayerGame);

  const singlePlayerWeapon = useSelector(getSinglePlayerWeapon);
  const computerWeapon = useSelector(getComputerWeapon);

  const handlePlayGame = () => {
    dispatch(setSelectWeaponModal(true));
    setSinglePlayerWeapon(null);
    setComputerWeapon(null);
    dispatch(setNewGame(true));
  };

  const handlePlayAgainstFriend = () => {};

  const selectPlayer = (event) => {
    const players = {
      challenger:
        user.userData.user.firstName + " " + user.userData.user.lastName,
      challengedPlayer: event.target.value,
    };

    socket.emit("selectPlayer", players);
    console.log(
      user.userData.user.firstName + " " + user.userData.user.lastName
    );
  };

  const acceptGameRequest = () => {
    const players = {
      challengerId: challenger.socketId,
      challengedPlayer: challengedPlayer.name,
    };
    socket.emit("acceptGameRequest", players);
  };

  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      style={{ marginTop: "20px" }}
    >
      <GameTabs />
      <SelectWeapon />
      {singlePlayerGame && (
        <Grid item xs={12} md={12} lg={12} xl={12}>
          <Box textAlign="center">
            <Button variant="contained" onClick={handlePlayGame}>
              Play Game
            </Button>
          </Box>
        </Grid>
      )}
      {multiPlayerGame && (
        <>
          <AvailablePlayers
            selectPlayer={selectPlayer}
            players={allPlayers.filter(
              (player) => player.id !== user.userData.user._id
            )}
          />
          <Grid item xs={12} md={8} lg={8} xl={9}>
            <Box style={{ marginLeft: "20%" }}>
              <Button variant="contained" onClick={handlePlayAgainstFriend}>
                Play Against Friend
              </Button>
              <Button variant="contained" style={{ marginLeft: "20px" }}>
                Select Random Player
              </Button>
            </Box>
          </Grid>
        </>
      )}

      <Weapons
        weapon={
          singlePlayerWeapon === "paper"
            ? Paper
            : singlePlayerWeapon === "rock"
            ? Rock
            : singlePlayerWeapon === "scissors"
            ? Scissors
            : null
        }
      />
      <Weapons
        weapon={
          computerWeapon === "paper"
            ? Paper
            : computerWeapon === "rock"
            ? Rock
            : computerWeapon === "scissors"
            ? Scissors
            : null
        }
      />
      <Grid item xs={12} md={12} lg={12} xl={12}>
        {newGame ? null : (
          <Box>
            {singlePlayerWeapon === "rock" && computerWeapon === "scissors" ? (
              <Typography
                variant="h3"
                component="h5"
                style={{ textAlign: "center" }}
              >
                You win - Rock breaks scissors
              </Typography>
            ) : singlePlayerWeapon === "scissors" &&
              computerWeapon === "rock" ? (
              <Typography
                variant="h3"
                component="h5"
                style={{ textAlign: "center" }}
              >
                You lose - Rock breaks scissors
              </Typography>
            ) : singlePlayerWeapon === "paper" && computerWeapon === "rock" ? (
              <Typography
                variant="h3"
                component="h5"
                style={{ textAlign: "center" }}
              >
                You win - Scissors cut paper
              </Typography>
            ) : singlePlayerWeapon === "paper" &&
              computerWeapon === "scissors" ? (
              <Typography
                variant="h3"
                component="h5"
                style={{ textAlign: "center" }}
              >
                You lose - Scissors cut paper
              </Typography>
            ) : singlePlayerWeapon === "paper" && computerWeapon === "rock" ? (
              <Typography
                variant="h3"
                component="h5"
                style={{ textAlign: "center" }}
              >
                You win - Paper covers rock
              </Typography>
            ) : singlePlayerWeapon === "rock" && computerWeapon === "paper" ? (
              <Typography
                variant="h3"
                component="h5"
                style={{ textAlign: "center" }}
              >
                You lose - Paper covers rock
              </Typography>
            ) : (
              <Typography
                variant="h3"
                component="h5"
                style={{ textAlign: "center" }}
              >
                Tie!
              </Typography>
            )}
          </Box>
        )}
      </Grid>
      <Dialog open={gameRequest}>
        <Typography variant="p">{`Player  would like to play against you?`}</Typography>
        <DialogActions>
          <Button color="primary" onClick={acceptGameRequest}>
            Accept
          </Button>
          <Button>Reject</Button>
        </DialogActions>
      </Dialog>
      <Dialog open={gameRequestAccepted}>
        <Typography variant="p">{`Your game request was approved`}</Typography>
      </Dialog>
    </Grid>
  );
}
