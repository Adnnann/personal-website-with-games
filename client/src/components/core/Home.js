import { Card, CardMedia, Grid, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import HomePageImg from "../../assets/images/homePage.jpeg";

const useStyles = makeStyles({
  container: {
    paddingTop: "150px",
  },
  title: {
    marginBottom: "30px !important",
    textAlign: "center",
  },
});

export default function Home() {
  const classes = useStyles();
  return (
    <Grid
      container
      justifyContent={"center"}
      spacing={3}
      className={classes.container}
    >
      <Grid item xs={12} md={8} lg={8} xl={6}>
        <Card>
          <Typography variant="h3" className={classes.title}>
            Welcome to my page
          </Typography>
          <CardMedia component={"img"} src={HomePageImg} />
        </Card>
      </Grid>
    </Grid>
  );
}
