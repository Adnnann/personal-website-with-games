import { Checkbox, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function AvailablePlayers({ players, selectPlayer }) {
  return (
    <Grid item xs={12} md={4} lg={4} xl={3}>
      <Box>
        {players.map((player, index) => (
          <span key={player.name} style={{ display: "flex" }}>
            <Checkbox onClick={selectPlayer} value={player.name} />

            <p>{player.name}</p>
          </span>
        ))}
      </Box>
    </Grid>
  );
}
