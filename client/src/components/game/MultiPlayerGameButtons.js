import { Button, Grid } from "@mui/material";
import { Box } from "@mui/system";

export default function MultiPlayerGameButtons({ handlePlayAgainstFriend }) {
  return (
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
  );
}
