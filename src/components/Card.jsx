import '../styles/Card.css';
import { useState, useEffect } from 'react';

function Card({
  id,
  frontImage,
  backImage,
  allCards,
  setAllCards,
  shuffleCards, // This is now the animateShuffle function from Board
  setGamePhase,
  incrementScore,
}) {
  const [cardState, setCardState] = useState('closed');
  const [isChosenBefore, setIsChosenBefore] = useState(false);
  const [animationType, setAnimationType] = useState('flip-to-front');

  const onClick = () => {
    if (isChosenBefore) {
      setGamePhase('Game Over');
      return;
    }

    if (cardState === 'open' && allCards === 'open') {
      setIsChosenBefore(true);
      setAnimationType('flip-to-back');
      incrementScore();
    }
  };

  useEffect(() => {
    if (cardState === 'closed' && allCards === 'open') {
      setAnimationType('flip-to-front');
    } else if (cardState === 'open' && allCards === 'closed') {
      setAnimationType('flip-to-back');
    }
  }, [allCards]);

  const handleAnimationEnd = (e) => {
    if (e.animationName === 'flipBack') {
      setCardState('closed');
      setAnimationType('');

      if (allCards === 'open') {
        setAllCards('closed');
      } else if (allCards === 'closed') {
        shuffleCards();
      }
    } else if (e.animationName === 'flipFront') {
      setCardState('open');
      setAnimationType('');
    }
  };

  const isFlipped = cardState === 'open' && allCards === 'open';

  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''} ${animationType}`}
      data-id={id}
      onClick={onClick}
      onAnimationEnd={handleAnimationEnd}
    >
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
