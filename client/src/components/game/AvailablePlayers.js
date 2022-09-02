import { Checkbox, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function AvailablePlayers({ players, selectPlayer }) {
  return (
    <Box>
      {players.map((player, index) => (
        <span key={player.name} style={{ display: "flex" }}>
          <Checkbox
            onClick={selectPlayer}
            value={player.name}
            disabled={!player.isAvailable}
          />

          <p>{player.name}</p>
        </span>
      ))}
    </Box>
  );
}
