import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { Button, Card, CardMedia, Grid, Typography } from "@mui/material";
import Rock from "../../assets/weapons/rock.png";
import Paper from "../../assets/weapons/paper.png";
import Scissors from "../../assets/weapons/scissors.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getPlayers,
  getPlayerTurn,
  getSelectWeaponModalStatus,
  playMultiPlayerGame,
  setNewGame,
  setSelectWeaponModal,
  setSinglePlayerWeapons,
  setSinglePlayerWinnerMessage,
} from "../../features/game.slice";

export default function SelectWeapon({ singlePlayer, socket }) {
  const dispatch = useDispatch();
  const selectWeaponModalStatus = useSelector(getSelectWeaponModalStatus);
  const weapons = [Rock, Paper, Scissors];
  const selectWeapon = ["rock", "paper", "scissors"];
  const bothPlayers = useSelector(getPlayers);
  const playerTurn = useSelector(getPlayerTurn);

  const handleSinglePlayerWeaponSelection = (index) => {
    const selectedWeapons = {
      singlePlayerWeapon: selectWeapon[index],
      computerWeapon: selectWeapon[Math.floor(Math.random() * weapons.length)],
    };

    dispatch(setNewGame(false));
    dispatch(
      setSinglePlayerWeapons([
        selectedWeapons.singlePlayerWeapon,
        selectedWeapons.computerWeapon,
      ])
    );
    dispatch(setSinglePlayerWinnerMessage(selectedWeapons));
    dispatch(setSelectWeaponModal(false));
  };

  const handleMultiPlayerWeaponSelection = (index) => {
    dispatch(setNewGame(false));

    const players = {
      ...bothPlayers,
      player1Weapon:
        playerTurn === "player1"
          ? selectWeapon[index]
          : bothPlayers.player1Weapon,
      player2Weapon: playerTurn === "player2" ? selectWeapon[index] : "",
    };

    playerTurn === "player1"
      ? socket?.emit("player2Turn", players)
      : socket.emit("endGame", players);
    dispatch(setSelectWeaponModal(false));
  };

  return (
    <Dialog maxWidth="lg" open={selectWeaponModalStatus}>
      <Typography variant="h4" gutterBottom style={{ textAlign: "center" }}>
        Select Your Weapon
      </Typography>
      <Grid container spacing={1}>
        {weapons.map((weapon, index) => {
          return (
            <Grid item xs={12} md={4} lg={4} xl={4} key={weapon}>
              <Card>
                <CardMedia
                  style={{ height: "220px", width: "220px" }}
                  component={"img"}
                  src={weapon}
                  onClick={() =>
                    singlePlayer
                      ? handleSinglePlayerWeaponSelection(index)
                      : handleMultiPlayerWeaponSelection(index)
                  }
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Dialog>
  );
}
