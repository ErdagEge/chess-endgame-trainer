# Chess Endgame Simulator & Trainer

An interactive platform designed to improve chess endgame skills using realistic game scenarios powered by Stockfish.

## Project Overview

The Chess Endgame Simulator & Trainer provides chess enthusiasts and learners with a practical, interactive environment to master essential chess endgames. Users receive immediate feedback on moves through integration with the powerful chess engine Stockfish.

## Features

* **Interactive Chessboard**: Visually appealing and intuitive chessboard for smooth interaction.
* **Realistic Endgame Scenarios**: Practice positions extracted from real games.
* **Instant Move Feedback**: Immediate validation of moves by Stockfish, highlighting optimal and suboptimal choices.
* **Progress Tracking**: Basic analytics and progress monitoring.
* **Responsive Design**: Mobile-friendly interface ensuring accessibility on all devices.

## Tech Stack

### Frontend

* React (TypeScript)
* Chessboard.js
* Tailwind CSS

### Backend

* Node.js
* Express
* Stockfish Integration
* MongoDB / PostgreSQL (optional)

## Project Structure

```
chess-endgame-trainer/
├── frontend/       # React frontend
├── backend/        # Node.js & Express backend
├── docs/           # Project documentation
└── README.md
```

## Getting Started

### Prerequisites

* Node.js & npm
* Stockfish chess engine

### Installation

```sh
# Clone repository
git clone https://github.com/yourusername/chess-endgame-trainer.git

# Frontend setup
cd frontend
npm install

# Backend setup
cd ../backend
npm install
```

### Running Locally

```sh
# Start Backend
cd backend
npm run start

# Start Frontend
cd ../frontend
npm run dev
```

## Contributing

Feel free to fork the repository, create feature branches, and submit pull requests.

## License

MIT License
