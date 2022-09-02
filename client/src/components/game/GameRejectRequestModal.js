import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { setRejectGameRequest } from "../../features/game.slice";

export default function RejectGameRequestModal({ gameRequest }) {
  const dispatch = useDispatch();
  return (
    <Dialog open={gameRequest}>
      <DialogTitle>
        <Typography variant="p">
          {`Your game request has been rejected`}
        </Typography>
      </DialogTitle>
      <DialogActions>
        <Button onClick={() => dispatch(setRejectGameRequest(false))}>
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}
