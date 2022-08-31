import express from "express";
import authCtrl from "../controllers/auth.controller.js";
import _ from "lodash";

const router = express.Router();

router.post("/users/signUp", authCtrl.signupUser);
router.post("/users/logIn", authCtrl.loginUser);
router.post("/users/logOut", authCtrl.logOutUser);

export default router;
