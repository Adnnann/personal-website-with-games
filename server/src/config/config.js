import dotenv from "dotenv";

dotenv.config();

const config = {
  port: 5000,
  mongoUri: "mongodb://localhost:27017/socialNetwork",
  secret: "1232ndejncdndkjcn",
};

export default config;
