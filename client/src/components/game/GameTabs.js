import * as React from "react";
import Box from "@mui/material/Box";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useDispatch, useSelector } from "react-redux";
import {
  playMultiPlayerGame,
  playSinglePlayerGame,
  setMultiPlayerGame,
  setSinglePlayerGame,
} from "../../features/game.slice";

export default function GameTabs() {
  const dispatch = useDispatch();

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSinglePlayerGame = () => {
    dispatch(setSinglePlayerGame(true));
    dispatch(setMultiPlayerGame(false));
  };

  const handleMultiPlayerGame = () => {
    dispatch(setSinglePlayerGame(false));
    dispatch(setMultiPlayerGame(true));
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Single Player" onClick={handleSinglePlayerGame} />
        <Tab label="Multiplayer" onClick={handleMultiPlayerGame} />
      </Tabs>
    </Box>
  );
}
