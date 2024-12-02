import { Board } from "../models/BoardModel.js";
import TryCatch from "../utils/TryCatch.js";

export const createBoard = TryCatch(async (req, res) => {
  const userId = req.user.id;
  const { title } = req.body;

  const newBoard = new Board({ title, Creater: userId, tasks: [] });
  await newBoard.save();
  res.status(201).json(newBoard);
});

export const allBoards = TryCatch(async (req, res) => {
  const boards = await Board.find({ Creater: req.user.id });
  res.json(boards);
  
});

export const deleteBoard = TryCatch(async (req, res) => {
  const board = await Board.findByIdAndDelete(req.params.id);
  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }
  res.status(200).json({ message: "Board deleted successfully" });
});

export const singleBoard = TryCatch(async (req, res) => {
  const { boardId } = req.params;
  const board = await Board.findById(boardId);
  if (!board) return res.status(404).json({ message: "Board not found" });

  if (String(board.Creater) !== String(req.user.id)) {
    return res.status(403).json({ message: "Access denied" });
  }
  res.json(board);
});

export const updateBoard = TryCatch(async (req, res) => {
  const { title } = req.body;
  const board = await Board.findByIdAndUpdate(
    req.params.id,
    { title },
    { new: true }
  );

  if (!board) {
    return res.status(404).json({ error: "Board not found" });
  }

  res.status(200).json(board);
});

export const getUserTotalBoards = TryCatch(async (req, res) => {
  const total = await Board.countDocuments({ Creater: req.user._id });
  res.json({ total });
});
