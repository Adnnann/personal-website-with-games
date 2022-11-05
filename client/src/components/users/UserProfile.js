import {
  Card,
  CardActions,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import userIcon from "../../assets/users/user_icon.png";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
export default function UserProfile() {
  return (
    <Grid container justifyContent={"center"} spacing={3} style={{marginTop:'200px'}} 
   
>
      <Grid item xs={12} md={4} lg={4} xl={3}>
        <Card style={{  borderRadius: "50px" }}>
          <CardActions>
            <span style={{ width: "100%" }}>
              <DeleteIcon
                fontSize="medium"
                style={{
                  float: "right",
                  marginRight: "20px",
                  marginLeft: "20px",
                }}
              />
              <EditIcon style={{ float: "right" }} fontSize="medium" />
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
    </Grid>
  );
}
