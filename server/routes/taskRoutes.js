import express from "express";

import {
  addList,
  deleteList,
  updateList,
} from "../controllers/listController.js";
import { isAuth } from "../middlewares/IsAuth.js";

const router = express.Router();

router.post("/boards/:boardId/addtask", isAuth, addList);
router.delete("/boards/:boardId/lists/:listId", isAuth, deleteList);
router.put("/boards/:boardId/lists/:listId", isAuth, updateList);

export default router;
