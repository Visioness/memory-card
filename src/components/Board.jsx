import '../styles/Board.css';
import Card from './Card.jsx';
import { useState, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Board({ boardSize, cardList, setGamePhase, incrementScore }) {
  const [cardSet, setCardSets] = useState(getRandomSet(boardSize));
  const [allCards, setAllCards] = useState('open');
  const boardRef = useRef(null);
  const isShuffling = useRef(false);

  function getRandomSet(size = 12) {
    const copyCardList = [...cardList];
    const newCardSet = [];

    for (let i = 0; i < size; i++) {
      newCardSet.push(
        copyCardList.splice(Math.floor(Math.random() * copyCardList.length), 1)[0]
      );
    }

    return newCardSet;
  }

  function animateShuffle() {
    // Prevent multiple simultaneous shuffle animations
    if (isShuffling.current) return;
    isShuffling.current = true;

    // Get all card elements
    const cardElements = boardRef.current.querySelectorAll('.card');

    // Get board center position
    const boardRect = boardRef.current.getBoundingClientRect();
    const centerX = boardRect.width / 2;
    const centerY = boardRect.height / 2;

    // Store the shuffled order but don't apply it yet
    const shuffledCards = [...cardSet];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }

    // Create GSAP timeline for coordinated animation
    const tl = gsap.timeline({
      onComplete: () => {
        isShuffling.current = false;
        // Apply the shuffle AFTER animation completes
        setCardSets(shuffledCards);

        setTimeout(() => {
          setAllCards('open');
        }, 200);
      },
    });

    // Phase 1: Collect cards to center with staggered timing
    tl.to(cardElements, {
      duration: 0.8,
      ease: 'power2.inOut',
      x: (index, element) => {
        const rect = element.getBoundingClientRect();
        const boardRect = boardRef.current.getBoundingClientRect();
        return centerX - (rect.left - boardRect.left) - rect.width / 2;
      },
      y: (index, element) => {
        const rect = element.getBoundingClientRect();
        const boardRect = boardRef.current.getBoundingClientRect();
        return centerY - (rect.top - boardRect.top) - rect.height / 2;
      },
      rotation: () => gsap.utils.random(-15, 15),
      scale: 0.8,
      stagger: {
        amount: 0.6,
        from: 'random',
      },
    })

      // Phase 2: Stack effect - slight overlap with z-index simulation
      .to(cardElements, {
        duration: 0.1,
        ease: 'power1.inOut',
        y: '+=10',
        yoyo: true,
        repeat: 1,
        stagger: {
          amount: 0.1,
          from: 'center',
        },
      })

      // Phase 3: Brief pause to show the stack (removed shuffleCards call)
      .to({}, { duration: 0.4 })

      // Phase 4: Distribute to new positions (cards will go to their current positions)
      .to(cardElements, {
        duration: 0.8,
        ease: 'back.out(1.2)',
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        stagger: {
          amount: 0.6,
          from: 'edges',
        },
      });

    return tl;
  }

  // GSAP context for cleanup
  useGSAP(
    () => {
      // Any additional GSAP setup can go here
    },
    { scope: boardRef }
  );

  return (
    <div className="board" ref={boardRef}>
      {cardSet.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          frontImage={card.frontImage}
          backImage={card.backImage}
          allCards={allCards}
          setAllCards={setAllCards}
          shuffleCards={animateShuffle} // Pass the animation function
          setGamePhase={setGamePhase}
          incrementScore={incrementScore}
        />
      ))}
    </div>
  );
}

export default Board;
