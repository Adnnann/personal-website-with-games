import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import moment from "moment";

export default function Project({
  image,
  name,
  date,
  description,
  linkToRepo,
  topics,
}) {
  return (
    <Grid item xs={12} md={6} lg={6} xl={4}>
      <Card
        style={{
          height: "680px",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <a href={linkToRepo} target="_blank" rel="noreferrer">
          <CardMedia component="img" src={image} />
        </a>

        <CardActions style={{ textAlign: "center" }}>
          <div style={{ width: "100%" }}>
            <a
              href={linkToRepo}
              target={"_blank"}
              style={{
                textDecoration: "none",
                fontSize: "24px",
                color: "black",
                cursor: "pointer",
              }}
            >
              <Typography variant="h3" style={{ height: "120px" }}>
                {name}
              </Typography>
            </a>
          </div>
        </CardActions>
        <div>
          <Typography variant="h6">{description}</Typography>
          <Typography variant="caption">
            Created at: {moment(date).format("LLL")}
          </Typography>
          <br />
          <CardContent style={{ textAlign: "center" }}>
            <Typography variant="caption">
              {topics.map((topic, index) => {
                return topic + " | ";
              })}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </Grid>
  );
}
