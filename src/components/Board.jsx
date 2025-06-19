import '../styles/Board.css';
import Card from './Card.jsx';
import { useState } from 'react';

function Board({ cardList }) {
  const [cardSet, setCardSets] = useState(getRandomSet());
  
  function getRandomSet(size=12) {
    const copyCardList = [...cardList];
    const newCardSet = [];
    
    for (let i = 0; i < size; i++) {
      newCardSet.push(copyCardList.splice(Math.floor(Math.random() * copyCardList.length), 1)[0]);
    }

    return newCardSet;
  }

  function shuffleCards() {
    const shuffledCards = [...cardSet];
      
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }

    setCardSets(shuffledCards);
  }

  function onAnimationEnd() {
    shuffleCards();
  }

  return (
    <div className="board">
      {cardSet.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          frontImage={card.frontImage}
          backImage={card.backImage}
          onAnimationEnd={onAnimationEnd}
        />
      ))}
    </div>
  );
}

export default Board;
