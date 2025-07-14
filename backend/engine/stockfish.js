const { spawn } = require("child_process");

function evaluateMove(fen, move) {
  return new Promise((resolve) => {
    const engine = spawn("stockfish");

    engine.stdin.write(`position fen ${fen}\n`);
    engine.stdin.write(`go depth 15\n`);

    let bestMove = "";
    engine.stdout.on("data", (data) => {
      const output = data.toString();
      if (output.includes("bestmove")) {
        bestMove = output.split("bestmove ")[1].split(" ")[0];
        resolve(bestMove);
        engine.kill();
      }
    });
  });
}

module.exports = evaluateMove;
