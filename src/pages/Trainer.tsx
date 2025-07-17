import { useState, useEffect } from 'react';
import { Chessboard, ChessboardOptions } from 'react-chessboard';
import { Chess } from 'chess.js';

export default function Trainer() {
  const startingFEN = '8/8/8/8/4k3/8/4P3/4K3 w - - 0 1';

  const [game, setGame] = useState<Chess | null>(null);
  const [fen, setFen] = useState(startingFEN);
  const [engine, setEngine] = useState<Worker | null>(null);
  const [evaluation, setEvaluation] = useState<string>('');

  useEffect(() => {
    const initialGame = new Chess(startingFEN);
    setGame(initialGame);
    if (typeof Worker !== 'undefined') {
      const worker = new Worker('stockfish.js');
      worker.onmessage = (event: MessageEvent) => {
        const line = String(event.data);
        if (line.startsWith('info')) {
          const evalString = parseEvaluation(line);
          if (evalString) setEvaluation(evalString);
        }
        if (line.startsWith('bestmove')) {
          setEvaluation((prev) => `${prev} | best ${line.split(' ')[1]}`);
        }
      };
      worker.postMessage('uci');
      worker.postMessage('isready');
      setEngine(worker);
      return () => {
        worker.terminate();
      };
    }
  }, []);

  function makeMove(move: { from: string; to: string; promotion?: string }) {
    if (!game) return null;
    const newGame = new Chess(game.fen());
    const result = newGame.move(move);
    if (result) {
      setGame(newGame);
      setFen(newGame.fen());
    }
    return result;
  }

  function handleDrop({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string | null }) {
    const moveMade = makeMove({ from: sourceSquare, to: targetSquare || '', promotion: 'q' });
    return moveMade !== null;
  }

  function parseEvaluation(line: string): string | null {
    const parts = line.split(' ');
    const mateIndex = parts.indexOf('mate');
    if (mateIndex !== -1 && parts[mateIndex + 1]) {
      return `mate ${parts[mateIndex + 1]}`;
    }
    const cpIndex = parts.indexOf('cp');
    if (cpIndex !== -1 && parts[cpIndex + 1]) {
      return `${parts[cpIndex + 1]} cp`;
    }
    return null;
  }

  const boardOptions: ChessboardOptions = {
    position: fen,
    onPieceDrop: handleDrop,
    boardOrientation: 'white',
    //boardWidth: 400,
  };

  useEffect(() => {
    if (!engine) return;
    engine.postMessage(`position fen ${fen}`);
    engine.postMessage('go depth 10');
  }, [engine, fen]);

  return (
    <div style={{ padding: 32 }}>
      <h2>Endgame Trainer</h2>
      {game && <Chessboard options={boardOptions} />}
      {evaluation && <p>Eval: {evaluation}</p>}
    </div>
  );
}