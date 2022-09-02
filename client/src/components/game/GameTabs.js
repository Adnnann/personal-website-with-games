import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  setMultiPlayerGame,
  setSinglePlayerGame,
} from "../../features/game.slice";
import { Box, Tabs, Tab } from "@mui/material";

export default function GameTabs() {
  const dispatch = useDispatch();
  const [value, setValue] = useState(0);

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
