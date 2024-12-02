import express from "express";
import { isAuth } from "../middlewares/IsAuth.js";
import {
  addCard,
  deleteCard,
  updateCard,
} from "../controllers/cardControllers.js";

const router = express.Router();

router.post("/boards/:boardId/lists/:listId/cards", isAuth, addCard);
router.delete(
  "/boards/:boardId/lists/:listId/cards/:cardId",
  isAuth,
  deleteCard
);
router.put("/boards/:boardId/lists/:listId/cards/:cardId", isAuth, updateCard);

export default router;
