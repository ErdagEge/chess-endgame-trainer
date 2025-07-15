import { useState, useEffect } from 'react';
import { Chessboard, ChessboardOptions } from 'react-chessboard';
import { Chess } from 'chess.js';
import Stockfish from 'stockfish';

export default function Trainer() {
  const startingFEN = '8/8/8/8/4k3/8/4P3/4K3 w - - 0 1';

  const [game, setGame] = useState<Chess | null>(null);
  const [fen, setFen] = useState(startingFEN);
  const [evalInfo, setEvalInfo] = useState('');
  const [engine, setEngine] = useState<Worker | null>(null);

  useEffect(() => {
    const initialGame = new Chess(startingFEN);
    setGame(initialGame);
    const sf = Stockfish();
    const handleMessage = (event: MessageEvent | string) => {
      const line = typeof event === 'string' ? event : event.data;
      if (typeof line !== 'string') return;
      const bestMatch = line.match(/^bestmove (\S+)/);
      if (bestMatch) {
        setEvalInfo((prev) => `${prev}\nBest move: ${bestMatch[1]}`);
        return;
      }
      const evalMatch = line.match(/score cp (-?\d+)/);
      if (evalMatch) {
        const score = parseInt(evalMatch[1], 10);
        setEvalInfo(`Evaluation: ${score} cp`);
      }
    };
    sf.onmessage = handleMessage;
    sf.postMessage('uci');
    setEngine(sf as unknown as Worker);
    evaluatePosition(startingFEN);
    return () => {
      (sf as any).terminate?.();
    };
  }, []);

  function makeMove(move: { from: string; to: string; promotion?: string }) {
    if (!game) return null;
    const newGame = new Chess(game.fen());
    const result = newGame.move(move);
    if (result) {
      setGame(newGame);
      setFen(newGame.fen());
      evaluatePosition(newGame.fen());
    }
    return result;
  }

  function handleDrop({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null }) {
    const moveMade = makeMove({ from: sourceSquare, to: targetSquare || '', promotion: 'q' });
    return moveMade !== null;
  }

  function evaluatePosition(currentFen: string) {
    if (!engine) return;
    setEvalInfo('Evaluating...');
    engine.postMessage(`position fen ${currentFen}`);
    engine.postMessage('go depth 12');
  }

  const boardOptions: ChessboardOptions = {
    position: fen,
    onPieceDrop: handleDrop,
    boardOrientation: 'white',
    //boardWidth: 400,
  };

  return (
    <div style={{ padding: 32 }}>
      <h2>Endgame Trainer</h2>
      {game && <Chessboard options={boardOptions} />}
      <pre>{evalInfo}</pre>
    </div>
  );
}
