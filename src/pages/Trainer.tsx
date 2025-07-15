import { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';

export default function Trainer() {
  const startingFEN = '8/8/8/8/4k3/8/4P3/4K3 w - - 0 1';

  const [game, setGame] = useState<Chess | null>(null);
  const [fen, setFen] = useState(startingFEN);

  useEffect(() => {
    const initialGame = new Chess(startingFEN);
    setGame(initialGame);
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

  const SafeChessboard = Chessboard as any;

  return (
    <div style={{ padding: 32 }}>
      <h2>Endgame Trainer</h2>
      {game && (
        <SafeChessboard
          position={fen}
          onPieceDrop={({ sourceSquare, targetSquare }: { sourceSquare: string; targetSquare: string }) => {
            const moveMade = makeMove({ from: sourceSquare, to: targetSquare, promotion: 'q' });
            return moveMade !== null;
          }}
          boardWidth={400}
        />
      )}
    </div>
  );
}
