import { Card, CardActions, CardMedia, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import userIcon from "../../assets/users/user_icon.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteUserModalWindow,
  getDeleteUserModalStatus,
} from "../../features/users.slice";
import DeleteUserModalWindow from "./DeleteUserModalWindow";

const useStyles = makeStyles({
  card: {
    borderRadius: "50px",
  },
  editIcon: {
    cursor: "pointer",
    float: "right",
    marginRight: "20px",
    marginLeft: "20px",
  },
  deleteIcon: {
    cursor: "pointer",
    float: "right",
  },
});

export default function UserProfile() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const deleteUserModalWindowStatus = useSelector(getDeleteUserModalStatus);

  const deleteProfile = () => {
    dispatch(deleteUserModalWindow(true));
  };

  return (
    <Grid container justifyContent={"center"} spacing={3} style={{marginTop:'200px'}} 
   
>
      <Grid item xs={12} md={4} lg={4} xl={3}>
        <Card style={{ marginTop: "150px" }}>
          <CardActions>
            <span style={{ width: "100%" }}>
              <DeleteIcon
                fontSize="medium"
                className={classes.deleteIcon}
                onClick={deleteProfile}
              />
              <EditIcon className={classes.editIcon} fontSize="medium" />
            </span>
          </CardActions>

          <Typography variant={"h4"} style={{ textAlign: "center" }}>
            Adnan Ovcina
          </Typography>

          <CardMedia
            component="img"
            src={userIcon}
            style={{
              width: "120px",
              margin: "0 auto",
              borderRadius: "300px",
              marginTop: "50px",
            }}
          ></CardMedia>
          <Typography
            component="p"
            style={{ textAlign: "center", marginTop: "30px" }}
          >
            Date of registration: 19/07/2022
          </Typography>
        </Card>
      </Grid>
      <DeleteUserModalWindow open={deleteUserModalWindowStatus} />
    </Grid>
  );
}
