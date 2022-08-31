import { Card, CardMedia, Typography } from "@mui/material";
import React from "react";
import HomePageImg from "../../assets/images/homePage.jpeg";
export default function Home() {
  return (
    <Card style={{ width: "40%", margin: "0 auto", marginTop: "80px" }}>
      <Typography variant="h3" style={{ textAlign: "center" }}>
        Welcome to my page
      </Typography>
      <CardMedia component={"img"} src={HomePageImg} />
    </Card>
  );
}
