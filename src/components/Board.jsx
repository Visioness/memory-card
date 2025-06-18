import '../styles/Board.css';
import Card from './Card.jsx';

function Board({ cards }) {
  return (
    <div className="board">
      {cards.map((card) => (
        <Card
          key={card.id}
          frontImage={card.frontImage}
          backImage={card.backImage}
        />
      ))}
    </div>
  );
}

export default Board;
