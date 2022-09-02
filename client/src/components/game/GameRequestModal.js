import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function GameRequestModal({ gameRequest, acceptGameRequest }) {
  return (
    <Dialog open={gameRequest}>
      <DialogTitle>
        <Typography variant="p">{`Player  would like to play against you?`}</Typography>
      </DialogTitle>
      <DialogActions>
        <Button color="primary" onClick={acceptGameRequest}>
          Accept
        </Button>
        <Button>Reject</Button>
      </DialogActions>
    </Dialog>
  );
}
