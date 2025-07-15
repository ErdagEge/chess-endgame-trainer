export default function Stockfish() {
  return {
    postMessage: () => {},
    onmessage: null,
  } as unknown as Worker;
}
