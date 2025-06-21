import '../styles/Card.css';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

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
  const cardRef = useRef(null);
  const cardInnerRef = useRef(null);
  const isAnimating = useRef(false);

  const animateFlipToFront = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    gsap.to(cardInnerRef.current, {
      duration: 0.8,
      rotationY: 180,
      scale: 1.05,
      ease: 'back.inOut(2)',
      transformOrigin: 'center center',
      onComplete: () => {
        gsap.to(cardInnerRef.current, {
          scale: 1,
          duration: 0.2,
          ease: 'power1.inOut',
        });
        setCardState('open');
        isAnimating.current = false;
      },
    });
  };

  const animateFlipToBack = () => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    gsap.to(cardInnerRef.current, {
      duration: 0.8,
      rotationY: 0,
      scale: 1.05,
      ease: 'back.inOut(2)',
      transformOrigin: 'center center',
      onComplete: () => {
        gsap.to(cardInnerRef.current, {
          scale: 1,
          duration: 0.2,
          ease: 'power1.inOut',
        });
        setCardState('closed');
        isAnimating.current = false;

        if (allCards === 'open') {
          setAllCards('closed');
        } else if (allCards === 'closed') {
          shuffleCards();
        }
      },
    });
  };

  const onClick = () => {
    if (isChosenBefore) {
      setGamePhase('Game Over');
      return;
    }

    if (cardState === 'open' && allCards === 'open') {
      setIsChosenBefore(true);
      animateFlipToBack();
      incrementScore();
    }
  };

  useEffect(() => {
    if (cardState === 'closed' && allCards === 'open') {
      animateFlipToFront();
    } else if (cardState === 'open' && allCards === 'closed') {
      animateFlipToBack();
    }
  }, [allCards]);

  const isFlipped = cardState === 'open' && allCards === 'open';

  useGSAP(
    () => {
      gsap.set(cardInnerRef.current, { rotationY: 0 });
    },
    { scope: cardRef }
  );

  return (
    <div
      className={`card ${isFlipped ? 'flipped' : ''}`}
      data-id={id}
      onClick={onClick}
      ref={cardRef}
    >
      <div className="card-inner" ref={cardInnerRef}>
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
