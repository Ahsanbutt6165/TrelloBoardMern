import { Board } from "../models/BoardModel.js";
import { Task } from "../models/TaskModel.js";
import TryCatch from "../utils/TryCatch.js";

export const addList = TryCatch(async (req, res) => {
  const { title, description } = req.body;
  const { boardId } = req.params;
  if (!title) {
    return res
      .status(400)
      .json({ error: "Task title and description are required" });
  }

  const board = await Board.findById(boardId);
  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }
  if (String(board.Creater) !== String(req.user.id)) {
    return res.status(403).json({ message: "Access denied" });
  }
  const newTask = new Task({ title, description, cards: [] });
  // board.tasks.push({ newTask });
  board.tasks.push(newTask);
  await board.save();

  res.status(201).json(board);
});

export const deleteList = TryCatch(async (req, res) => {
  const { boardId, listId } = req.params;

  const board = await Board.findById(boardId);
  if (!board) return res.status(404).json({ message: "Board not found" });

  if (String(board.Creater) !== String(req.user.id)) {
    return res.status(403).json({ message: "Access denied" });
  }

  board.tasks = board.tasks.filter((list) => list._id.toString() !== listId);
  await board.save();

  res.json({ message: "List deleted successfully", board });
});

export const updateList = TryCatch(async (req, res) => {
  const { boardId, listId } = req.params;
  const { title, description } = req.body;

  const board = await Board.findById(boardId);
  if (!board) return res.status(404).json({ message: "Board not found" });

  // Ensure the user is the creator of the board
  if (String(board.Creater) !== String(req.user.id)) {
    return res.status(403).json({ message: "Access denied" });
  }

  const task = board.tasks.id(listId);
  if (!task) return res.status(404).json({ message: "List not found" });

  task.title = title || task.title;
  task.description = description || task.description;

  await board.save();
  res.json(task);
});
