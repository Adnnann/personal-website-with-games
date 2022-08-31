import * as React from "react";
import Dialog from "@mui/material/Dialog";
import { Card, CardMedia, Grid, Typography } from "@mui/material";
import Rock from "../../assets/weapons/rock.png";
import Paper from "../../assets/weapons/paper.png";
import Scissors from "../../assets/weapons/scissors.png";
import { useDispatch, useSelector } from "react-redux";
import {
  getSelectWeaponModalStatus,
  setComputerWeapon,
  setNewGame,
  setSelectWeaponModal,
  setSinglePlayerWeapon,
} from "../../features/game.slice";

export default function SelectWeapon() {
  const dispatch = useDispatch();
  const selectWeaponModalStatus = useSelector(getSelectWeaponModalStatus);
  const weapons = [Rock, Paper, Scissors];
  const selectWeapon = ["rock", "paper", "scissors"];

  const handleWeapon = (index) => {
    dispatch(setNewGame(false));
    dispatch(setSinglePlayerWeapon(selectWeapon[index]));
    dispatch(setComputerWeapon(selectWeapon[Math.floor(Math.random() * 3)]));
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
                  onClick={() => handleWeapon(index)}
                />
              </Card>
            </Grid>
          );
        })}
      </Grid>
    </Dialog>
  );
}
