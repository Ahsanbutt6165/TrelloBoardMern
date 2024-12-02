import express from "express";
import {
  loginUser,
  logOutUser,
  myProfile,
  registerUser,
} from "../controllers/userControllers.js";
import { isAuth } from "../middlewares/IsAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/myprofile", isAuth, myProfile);
router.get("/logout", isAuth, logOutUser);

export default router;
