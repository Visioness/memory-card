import '../styles/Board.css';
import Card from './Card.jsx';

function Board({ cards }) {
  function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }

  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          frontImage={card.frontImage}
          backImage={card.backImage}
          shuffleCards={shuffleCards}
        />
      ))}
    </div>
  );
}

export default Board;
