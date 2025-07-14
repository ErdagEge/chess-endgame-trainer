const express = require("express");
const router = express.Router();
const evaluateMove = require("../engine/stockfish");

router.post("/", async (req, res) => {
  const { fen, move } = req.body;
  const bestMove = await evaluateMove(fen, move);
  res.json({ bestMove });
});

module.exports = router;
