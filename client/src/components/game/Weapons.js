import { Grid, Card, CardMedia, Button, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Rock from "../../assets/weapons/rock.png";
import Paper from "../../assets/weapons/paper.png";
import Scissors from "../../assets/weapons/scissors.png";
import { useDispatch, useSelector } from "react-redux";
import {
  playMultiPlayerGame,
  setSelectWeaponModal,
} from "../../features/game.slice";

const useStyles = makeStyles({
  weapons: {
    marginTop: "100px",
    marginLeft: "20px",
  },
});

export default function Weapons({ selectedWeapons }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const players = ["player1", "player2"];
  const multiPlayerGame = useSelector(playMultiPlayerGame);

  const handleNewMultiplayerGame = () => {
    dispatch(setSelectWeaponModal(true));
  };

  return (
    <>
      <Grid container spacing={3} justifyContent="center">
        {players.map((player, index) => {
          return (
            <Grid
              item
              key={index}
              xs={12}
              md={4}
              lg={4}
              xl={3}
              className={classes.weapons}
            >
              <CardMedia
                component={"img"}
                src={
                  selectedWeapons[index] === "paper"
                    ? Paper
                    : selectedWeapons[index] === "rock"
                    ? Rock
                    : selectedWeapons[index] === "scissors"
                    ? Scissors
                    : null
                }
                style={{
                  width: "320px",
                  height: "320px",
                  margin: "0 auto",
                  marginTop: "5%",
                }}
              />
            </Grid>
          );
        })}
      </Grid>
      {multiPlayerGame && (
        <Grid container justifyContent="center" spacing={2}>
          <Button
            variant="contained"
            style={{
              marginTop: "40px",
            }}
            onClick={handleNewMultiplayerGame}
          >
            Play Again
          </Button>
        </Grid>
      )}
    </>
  );
}
