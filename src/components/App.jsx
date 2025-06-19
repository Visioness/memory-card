import '../styles/App.css';
import Board from './Board.jsx';
import cardList from '../data/cardList.js';
import { useEffect } from 'react';

function App() {
  return (
    <>
      <div className="app">
        <Board cardList={cardList} />
      </div>
      <footer className="footer">
        <p>
          Created by <a href="https://github.com/visioness">Visioness</a>
        </p>
      </footer>
    </>
  );
}

export default App;
