import '../styles/Card.css';
import { useState, useEffect } from 'react';

function Card({
  id,
  frontImage,
  backImage,
  allCards,
  setAllCards,
  shuffleCards,
  setGamePhase,
}) {
  const [cardState, setCardState] = useState('closed');
  const [isChosenBefore, setIsChosenBefore] = useState(false);

  const onClick = () => {
    if (isChosenBefore) {
      setGamePhase('Game Over');
      return;
    }

    if (cardState === 'open' && allCards === 'open') {
      setIsChosenBefore(true);
      setCardState('closed');

      setTimeout(() => {
        setAllCards('closed');
        setTimeout(() => {
          shuffleCards();
          setAllCards('open');
        }, 1000);
      }, 1000);
    }
  };

  useEffect(() => {
    setCardState(allCards);
  }, [allCards]);

  const isFlipped = cardState === 'open' && allCards === 'open';

  return (
    <div className={`card ${isFlipped ? 'flipped' : ''}`} data-id={id} onClick={onClick}>
      <div className="card-inner">
        <div className="card-front">
          <img src={frontImage} alt="Front of card" />
        </div>
        <div className="card-back">
          <img src={backImage} alt="Back of card" />
        </div>
      </div>
    </div>
  );
}

export default Card;
