import { Grid, Card, CardMedia } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  weapons: {
    marginTop: "100px",
    marginLeft: "20px",
  },
});

export default function Weapons({ weapon }) {
  const classes = useStyles();
  return (
    <Grid item xs={12} md={4} lg={4} xl={3} className={classes.weapons}>
      <Card>
        <CardMedia
          component={"img"}
          src={weapon}
          style={{ width: "320px", height: "320px" }}
        />
      </Card>
    </Grid>
  );
}
