import {
  ButtonGroup,
  CardActions,
  Grid,
  Typography,
  Button,
  Dialog,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { deleteUserModalWindow } from "../../features/users.slice";

export default function DeleteUserModalWindow({ open }) {
  const dispatch = useDispatch();

  const cancelDeleteProfile = () => {
    dispatch(deleteUserModalWindow(false));
  };
  return (
    <Dialog open={open}>
      <span>
        <Typography
          variant="h4"
          style={{ marginTop: "20px", marginLeft: "50px", marginRight: "50px" }}
        >
          {" Sure you want to delete"}
        </Typography>
        <Typography variant="h4" style={{ textAlign: "center" }}>
          {"your profile?"}
        </Typography>
      </span>
      <CardActions style={{ marginTop: "20px" }}>
        <ButtonGroup fullWidth>
          <Button
            style={{
              marginRight: "5px",
              height: "50px",
              fontSize: "20px",
              textTransform: "none",
            }}
            variant="contained"
            color="error"
            onClick={() => alert("user profile deleted")}
          >
            Yes
          </Button>
          <Button
            style={{
              marginRight: "5px",
              fontSize: "20px",
              textTransform: "none",
            }}
            variant="contained"
            color="success"
            onClick={cancelDeleteProfile}
          >
            No
          </Button>
        </ButtonGroup>
      </CardActions>
    </Dialog>
  );
}
