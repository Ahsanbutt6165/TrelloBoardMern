import express from "express";
import {
  allBoards,
  createBoard,
  deleteBoard,
  getUserTotalBoards,
  singleBoard,
  updateBoard,
  // singleBoard,
  // updateBoard,
} from "../controllers/boardController.js";
import { isAuth } from "../middlewares/IsAuth.js";

const router = express.Router();

router.post("/createboard", isAuth, createBoard);
router.get("/allboards", isAuth, allBoards);
router.get("/totalboards", isAuth, getUserTotalBoards);
router.get("/singleboard/:boardId", isAuth, singleBoard);
router.delete("/boards/:id", isAuth, deleteBoard);
router.put("/boards/:id", updateBoard);

export default router;
