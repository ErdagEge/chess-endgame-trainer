import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Chessboard } from "react-chessboard";

function App() {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <Chessboard />
    </div>
  );
}

export default App;
