import { Board } from "../models/BoardModel.js";
import TryCatch from "../utils/TryCatch.js";

export const addCard = TryCatch(async (req, res) => {
  const { boardId, listId } = req.params;
  const { title, description } = req.body;
  const board = await Board.findById(boardId);
  if (!board) return res.status(404).json({ message: "Board not found" });

  if (String(board.Creater) !== String(req.user.id)) {
    return res.status(403).json({ message: "Access denied" });
  }

  const list = board.tasks.id(listId);
  if (!list) return res.status(404).json({ message: "List not found" });

  const newCard = { title, description };
  list.cards.push(newCard);
  await board.save();
  res.status(201).json(newCard);
});

export const deleteCard = TryCatch(async (req, res) => {
  const { boardId, listId, cardId } = req.params;

  const board = await Board.findById(boardId);
  if (!board) return res.status(404).json({ message: "Board not found" });
  if (String(board.Creater) !== String(req.user.id)) {
    return res.status(403).json({ message: "Access denied" });
  }

  const list = board.tasks.id(listId);
  if (!list) return res.status(404).json({ message: "List not found" });
  list.cards = list.cards.filter((card) => card._id.toString() !== cardId);
  await board.save();
  res.json({ message: "Card deleted successfully", board });
});

export const updateCard = TryCatch(async (req, res) => {
  const { boardId, listId, cardId } = req.params;
  const { title, description } = req.body;
  const board = await Board.findById(boardId);
  if (!board) return res.status(404).json({ message: "Board not found" });

  if (String(board.Creater) !== String(req.user.id)) {
    return res.status(403).json({ message: "Access denied" });
  }
  const list = board.tasks.id(listId);
  if (!list) return res.status(404).json({ message: "List not found" });

  const card = list.cards.id(cardId);
  if (!card) return res.status(404).json({ message: "Card not found" });

  card.title = title || card.title;
  card.description = description || card.description;

  await board.save();
  res.json(card);
});
