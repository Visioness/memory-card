import '../styles/Card.css';
import { useState } from 'react';

function Card({ id, frontImage, backImage, onAnimationEnd }) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const flipCard = () => {
    if (isAnimating) return;

    setIsAnimating(true);
    setIsFlipped(true);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
    onAnimationEnd();
  };

  return (
    <div className={`card ${isAnimating ? 'flipped' : ''}`} data-id={id} onClick={flipCard} onAnimationEnd={handleAnimationEnd}>
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
