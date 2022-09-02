import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";

export default function PlaySinglePlayerGameButton({ handlePlayGame }) {
  return (
    <Grid item xs={12} md={12} lg={12} xl={12}>
      <Box textAlign="center">
        <Button variant="contained" onClick={handlePlayGame}>
          Play Game
        </Button>
      </Box>
    </Grid>
  );
}
