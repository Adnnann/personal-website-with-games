import express, { application } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import authRoutes from "../src/routes/auth.routes.js";
import passport from "passport";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
app.use(helmet());
app.use(passport.initialize());
app.use(cookieParser());

app.use(authRoutes);

export default app;
