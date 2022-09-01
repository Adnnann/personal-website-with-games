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
let games = [];

const addNewPlayer = (playerData, socketId) => {
  const player = playerData;
  const playerSocketId = socketId;

  player["isAvailable"] = true;
  player["socketId"] = playerSocketId;
  onlinePlayers.push({ ...player });
};

io.on("connection", (socket) => {
  socket.on("newPlayer", (player) => {
    addNewPlayer(player, socket.id);
    io.sockets.emit("newPlayerAdded", onlinePlayers);
  });
  socket.on("selectPlayer", (players) => {
    games.push(`game-${games.length}`);
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
    const availablePlayers = [];
    onlinePlayers.forEach((item) => {
      if (
        item.socketId == players.challengedPlayerId ||
        item.socketId == players.challengerId
      ) {
        item.isAvailable = false;
      }
      availablePlayers.push({ ...item });
    });

    io.emit("availablePlayers", availablePlayers);
    socket.join(`game-${games.length}`);
    socket.to(players.challengerId).emit("gameRequestAccepted", players);
  });
  socket.on("player1Turn", (players) => {
    io.to(players.challengerId).emit("player1Turn", players);
  });

  socket.on("player2Turn", (players) => {
    io.to(players.challengedPlayerId).emit("player2Turn", players);
  });

  socket.on("endGame", (players) => {
    io.to("game-" + games.length).emit("endGame", players);
  });

  socket.on("disconnect", () => {
    onlinePlayers = [];
    games = [];
  });
});

const server = app.listen(config.port, (err) => {
  if (err) console.log(err);
  console.log(`Server started at port ${config.port}`);
});

io.listen(server);

mongoose.connect(config.mongoUri, { useNewUrlParser: true });
