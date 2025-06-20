import '../styles/App.css';
import Board from './Board.jsx';
import cardList from '../data/cardList.js';
import { useState, useEffect } from 'react';

function Game() {
  const [gamePhase, setGamePhase] = useState('Menu');
  const [difficulty, setDifficulty] = useState('Easy');
  const [boardSize, setBoardSize] = useState(5);
  const [score, setScore] = useState(0);

  useEffect(() => {
    if (difficulty === 'Easy') setBoardSize(5);
    else if (difficulty === 'Medium') setBoardSize(8);
    else setBoardSize(12);
  }, [difficulty]);

  useEffect(() => {
    if (gamePhase === 'Playing') setScore(0);
  }, [gamePhase]);

  return (
    <>
      <header className="header">
        <h1>Memory Game</h1>
        {gamePhase === 'Playing' && (
          <div className="score-container">
            <p>Score: {score}</p>
          </div>
        )}
      </header>

      {gamePhase === 'Menu' ? (
        <div className="menu">
          <h1>Memory Game</h1>
          <div className="difficulty-buttons">
            <button className="difficulty-button" onClick={() => setDifficulty('Easy')}>
              Easy
            </button>
            <button className="difficulty-button" onClick={() => setDifficulty('Medium')}>
              Medium
            </button>
            <button className="difficulty-button" onClick={() => setDifficulty('Hard')}>
              Hard
            </button>
          </div>
          <button className="start-button" onClick={() => setGamePhase('Playing')}>
            Start Game
          </button>
        </div>
      ) : gamePhase === 'Playing' ? (
        <div className="game">
          <Board boardSize={boardSize} cardList={cardList} setGamePhase={setGamePhase} />
        </div>
      ) : (
        <div className="game-over">
          <h1>Game Over</h1>
          <p>You scored {score} points</p>
          <button className="restart-button" onClick={() => setGamePhase('Menu')}>
            Restart
          </button>
        </div>
      )}

      <footer className="footer">
        <p>
          Created by <a href="https://github.com/visioness">Visioness</a>
        </p>
      </footer>
    </>
  );
}

export default Game;
