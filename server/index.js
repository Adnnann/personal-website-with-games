import app from "./src/app.js";
import { Server } from "socket.io";
import config from "./src/config/config.js";
import mongoose from "mongoose";

const io = new Server({
  cors: {
    origin: "*",
  },
});

const onlinePlayers = [];

const addNewPlayer = (playerData, socketId) => {
  const player = playerData;
  const playerSocketId = socketId;

  player["socketId"] = playerSocketId;
  onlinePlayers.push({ ...player });
  console.log(onlinePlayers);
};

io.on("connection", (socket) => {
  socket.on("newPlayer", (player) => {
    console.log(onlinePlayers);
    addNewPlayer(player, socket.id);
    io.sockets.emit("newPlayerAdded", onlinePlayers);
  });
});

const server = app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.log(`Server started at port ${config.port}`);
});

io.listen(server);

mongoose.connect(config.mongoUri, { useNewUrlParser: true });
