import { Typography } from "@mui/material";
import { Box } from "@mui/system";

export default function MultiPlayerWinnerMessage({ multiPlayerWinnerMessage }) {
  return (
    <Box>
      <Typography variant="h3" component="h5" style={{ textAlign: "center" }}>
        {multiPlayerWinnerMessage}
      </Typography>
    </Box>
  );
}
