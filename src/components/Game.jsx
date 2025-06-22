import '../styles/Game.css';
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

  useEffect(() => {
    if (score === boardSize) setGamePhase('Game Over');
  }, [score]);

  function incrementScore() {
    setScore(score + 1);
  }

  return (
    <>
      <header className="header">
        <h1>Memory Game</h1>
        {gamePhase === 'Playing' && (
          <div className="score-container">
            <p>
              Score: <span className="score">&nbsp;{score}</span> /{' '}
              <span className="board-size">&nbsp;{boardSize}</span>
            </p>
          </div>
        )}
      </header>

      {gamePhase === 'Menu' ? (
        <div className="menu">
          <div className="difficulty-container">
            <h2>Set Difficulty</h2>
            <div className="difficulty-buttons">
              <label
                className={`difficulty-option ${difficulty === 'Easy' ? 'active' : ''}`}
              >
                <input
                  type="radio"
                  name="difficulty"
                  value="Easy"
                  checked={difficulty === 'Easy'}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                <span className="radio-custom"></span>
                <span className="difficulty-text">Easy</span>
              </label>

              <label
                className={`difficulty-option ${difficulty === 'Medium' ? 'active' : ''}`}
              >
                <input
                  type="radio"
                  name="difficulty"
                  value="Medium"
                  checked={difficulty === 'Medium'}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                <span className="radio-custom"></span>
                <span className="difficulty-text">Medium</span>
              </label>

              <label
                className={`difficulty-option ${difficulty === 'Hard' ? 'active' : ''}`}
              >
                <input
                  type="radio"
                  name="difficulty"
                  value="Hard"
                  checked={difficulty === 'Hard'}
                  onChange={(e) => setDifficulty(e.target.value)}
                />
                <span className="radio-custom"></span>
                <span className="difficulty-text">Hard</span>
              </label>
            </div>
          </div>
          <button className="start-button" onClick={() => setGamePhase('Playing')}>
            Start Game
          </button>
          <div className="info">
            <h3>How to Play</h3>
            <hr />
            <ul>
              <li>
                Click a card to choose it. When you have chosen a card, the cards will be
                closed and shuffled.
              </li>
              <li>Then try to guess another card that you have not chosen yet.</li>
              <li>If you guess correctly, you get a point. If not, game is over.</li>
            </ul>
          </div>
        </div>
      ) : gamePhase === 'Playing' ? (
        <div className="game">
          <Board
            boardSize={boardSize}
            cardList={cardList}
            setGamePhase={setGamePhase}
            incrementScore={incrementScore}
          />
        </div>
      ) : (
        <div className="game-over">
          <h1 className="game-over-title">
            {score === boardSize ? 'You Won!' : 'Game Over'}
          </h1>
          <p>
            You correctly guessed <span className="score">&nbsp;{score}</span> cards out
            of <span className="board-size">&nbsp;{boardSize}</span>.
          </p>
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
