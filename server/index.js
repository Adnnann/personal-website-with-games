import app from "./src/app.js";
import { Server } from "socket.io";
import config from "./src/config/config.js";
import mongoose from "mongoose";

const io = new Server({
  cors: {
    origin: "*",
  },
});

let onlinePlayers = [];

const addNewPlayer = (playerData, socketId) => {
  const player = playerData;
  const playerSocketId = socketId;

  player["socketId"] = playerSocketId;
  onlinePlayers.push({ ...player });
};

io.on("connection", (socket) => {
  socket.on("newPlayer", (player) => {
    addNewPlayer(player, socket.id);
    io.sockets.emit("newPlayerAdded", onlinePlayers);
  });
  socket.on("selectPlayer", (players) => {
    console.log("Players", players);
    const challengedPlayer = onlinePlayers.filter(
      (item) => item.name === players.challengedPlayer
    );
    const challenger = onlinePlayers.filter(
      (item) => item.name === players.challenger
    );

    const opponents = [{ ...challengedPlayer[0] }, { ...challenger[0] }];

    socket
      .to(challengedPlayer[0].socketId)
      .emit("selectedPlayerGameRequest", opponents);
  });
  socket.on("acceptGameRequest", (players) => {
    socket
      .to(players.challengerId)
      .emit("gameRequestAccepted", players.challengedPlayer);
  });
  socket.on("disconnect", () => {
    onlinePlayers = [];
  });
});

const server = app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.log(`Server started at port ${config.port}`);
});

io.listen(server);

mongoose.connect(config.mongoUri, { useNewUrlParser: true });
