import '../styles/App.css';
import Board from './Board.jsx';
import cards from '../data/cards.js';

function App() {
  return (
    <>
      <div className="app">
        <Board cards={cards} />
      </div>
      <div className="footer">
        <p>
          Created by <a href="https://github.com/visioness">visioness</a>
        </p>
      </div>
    </>
  );
}

export default App;
