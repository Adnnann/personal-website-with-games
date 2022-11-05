import { ClassNames } from "@emotion/react";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import moment from "moment";

const useStyles = makeStyles({
  title: {
    textDecoration: "none",
    fontSize: "24px",
    color: "black",
    cursor: "pointer",
    margin: "0 auto",
  },
  image: {
    height: "60%",
    width: "60%",
    margin: "0 auto",
  },
});

export default function Project({
  image,
  name,
  date,
  description,
  linkToRepo,
  topics,
}) {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={6} lg={6} xl={4}>
      <Card
        style={{
          height: "480px",
        }}
      >
        <a href={linkToRepo} target="_blank" rel="noreferrer">
          <CardMedia component="img" src={image} className={classes.image} />
        </a>

        <CardActions>
          <a
            href={linkToRepo}
            rel="noreferrer"
            target={"_blank"}
            className={classes.title}
          >
            <Typography variant="h3">{name}</Typography>
          </a>
        </CardActions>
<<<<<<< HEAD

        <CardContent style={{ textAlign: "center" }}>
          <Typography variant="caption">
            {topics.map((topic, index) => {
              return topic + " | ";
            })}
          </Typography>
        </CardContent>
        <CardContent style={{ textAlign: "right" }}>
          <Typography variant="caption" style={{ textAlign: "right" }}>
=======
        <div>
          <Typography variant="h6" style={{marginLeft:'5px'}}>{description}</Typography>
          <Typography variant="caption" style={{marginLeft:'5px'}}>
>>>>>>> 0967332fc525bc93880ebd8b8956684b91bf7db9
            Created at: {moment(date).format("LLL")}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
}
