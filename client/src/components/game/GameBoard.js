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
  setMultiPlayerSelectWeapon,
  getPlayer1Weapon,
  getPlayer2Weapon,
  setPlayerTurn,
  getPlayerTurn,
  setPlayers,
  setPlayer1Weapon,
  setPlayer2Weapon,
} from "../../features/game.slice";
import { Box } from "@mui/system";
import SelectWeapon from "./SelectWeaponModal";
import AvailablePlayers from "./AvailablePlayers";
import { getLogInUserStatus } from "../../features/users.slice";

export default function GameBoard({ socket, singlePlayer }) {
  const dispatch = useDispatch();
  const newGame = useSelector(getNewGameStatus);
  const allPlayers = useSelector((state) => state.game.allPlayers);
  const user = useSelector(getLogInUserStatus);
  const gameRequest = useSelector(getGameRequest);
  const [challenger, setChallenger] = useState(null);
  const [challengedPlayer, setChallengedPlayer] = useState(null);
  const gameRequestAccepted = useSelector(getAcceptedGameRequest);
  const player1Weapon = useSelector(getPlayer1Weapon);
  const player2Weapon = useSelector(getPlayer2Weapon);

  console.log(player1Weapon);

  const playerTurn = useSelector(getPlayerTurn);

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
      dispatch(setPlayer1Weapon(players.player1Weapon));
      dispatch(setPlayer2Weapon(players.player2Weapon));
    });
  }, [socket, dispatch]);

  console.log(challengedPlayer);

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
  };

  const acceptGameRequest = () => {
    const players = {
      challengerId: challenger.socketId,
      challengedPlayerId: challengedPlayer.socketId,
    };
    socket.emit("acceptGameRequest", players);
    dispatch(setGameRequest(false));
  };

  const handleNewMultiplayerGame = () => {
    dispatch(setSelectWeaponModal(true));
  };

  return (
    <Grid
      container
      justifyContent="center"
      spacing={2}
      style={{ marginTop: "20px" }}
    >
      <GameTabs />
      <SelectWeapon singlePlayer={singlePlayerGame} socket={socket} />
      {singlePlayerGame && (
        <>
          <SelectWeapon singlePlayer={singlePlayerGame} socket={socket} />
          <Grid item xs={12} md={12} lg={12} xl={12}>
            <Box textAlign="center">
              <Button variant="contained" onClick={handlePlayGame}>
                Play Game
              </Button>
            </Box>
          </Grid>
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
        </>
      )}
      {multiPlayerGame && (
        <>
          {user?.userData?.user ? (
            <AvailablePlayers
              selectPlayer={selectPlayer}
              players={allPlayers.filter(
                (player) => player.id !== user.userData.user._id
              )}
            />
          ) : null}
          <Grid item xs={12} md={8} lg={8} xl={9}>
            <Box style={{ marginLeft: "20%" }}>
              <Button variant="contained" onClick={handlePlayAgainstFriend}>
                Play Against Friend
              </Button>
              <Button variant="contained" style={{ marginLeft: "20px" }}>
                Select Random Player
              </Button>
              <Button
                variant="contained"
                style={{ marginLeft: "20px" }}
                onClick={handleNewMultiplayerGame}
              >
                Play Again
              </Button>
            </Box>
          </Grid>

          <Weapons
            weapon={
              player1Weapon === "paper"
                ? Paper
                : player1Weapon === "rock"
                ? Rock
                : player1Weapon === "scissors"
                ? Scissors
                : null
            }
          />
          <Weapons
            weapon={
              player2Weapon === "paper"
                ? Paper
                : player2Weapon === "rock"
                ? Rock
                : player2Weapon === "scissors"
                ? Scissors
                : null
            }
          />
        </>
      )}

      <Grid item xs={12} md={12} lg={12} xl={12}>
        {singlePlayerGame ? null : (
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
            ) : singlePlayerWeapon === computerWeapon ? (
              <Typography
                variant="h3"
                component="h5"
                style={{ textAlign: "center" }}
              >
                Tie!
              </Typography>
            ) : null}

            {multiPlayerGame ? (
              player1Weapon === "rock" && player2Weapon === "scissors" ? (
                <Typography
                  variant="h3"
                  component="h5"
                  style={{ textAlign: "center" }}
                >
                  Player 1 wins - Rock breaks scissors
                </Typography>
              ) : player1Weapon === "scissors" && player2Weapon === "rock" ? (
                <Typography
                  variant="h3"
                  component="h5"
                  style={{ textAlign: "center" }}
                >
                  Player 2 wins - Rock breaks scissors
                </Typography>
              ) : player1Weapon === "paper" && player2Weapon === "rock" ? (
                <Typography
                  variant="h3"
                  component="h5"
                  style={{ textAlign: "center" }}
                >
                  Player 1 wins - Scissors cut paper
                </Typography>
              ) : player1Weapon === "paper" && player2Weapon === "scissors" ? (
                <Typography
                  variant="h3"
                  component="h5"
                  style={{ textAlign: "center" }}
                >
                  Player 2 wins - Scissors cut paper
                </Typography>
              ) : player1Weapon === "paper" && player2Weapon === "rock" ? (
                <Typography
                  variant="h3"
                  component="h5"
                  style={{ textAlign: "center" }}
                >
                  Player 1 wins - Paper covers rock
                </Typography>
              ) : player1Weapon === "rock" && player2Weapon === "paper" ? (
                <Typography
                  variant="h3"
                  component="h5"
                  style={{ textAlign: "center" }}
                >
                  Player 2 wins - Paper covers rock
                </Typography>
              ) : player1Weapon === player2Weapon ? (
                <Typography
                  variant="h3"
                  component="h5"
                  style={{ textAlign: "center" }}
                >
                  Tie!
                </Typography>
              ) : null
            ) : null}
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
    </Grid>
  );
}
