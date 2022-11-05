import dotenv from "dotenv";
dotenv.config();

const password =process.env.PASSWORD
const database = process.env.DATABASE



const config = {
  port: 5000,
  mongoUri: `mongodb+srv://aovcina:${password}@cluster0.hbhrs.mongodb.net/${database}?retryWrites=true&w=majority`,
  secret: "1232ndejncdndkjcn",
};

export default config;
