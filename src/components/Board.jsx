import '../styles/Board.css';
import Card from './Card.jsx';
import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

function Board({ boardSize, cardList, setGamePhase, incrementScore }) {
  const [cardSet, setCardSet] = useState([]);
  const [allCards, setAllCards] = useState('closed');
  const boardRef = useRef(null);
  const isShuffling = useRef(false);
  const hasAnimatedInitial = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      setCardSet(getRandomSet(boardSize));
    }, 500);
  }, [boardSize]);

  function getRandomSet(size) {
    const copyCardList = [...cardList];
    const newCardSet = [];

    for (let i = 0; i < size; i++) {
      newCardSet.push(
        copyCardList.splice(Math.floor(Math.random() * copyCardList.length), 1)[0]
      );
    }

    return newCardSet;
  }

  function animateInitialDistribution() {
    if (hasAnimatedInitial.current) return;
    hasAnimatedInitial.current = true;

    const cardElements = boardRef.current.querySelectorAll('.card');
    if (cardElements.length === 0) return;

    // Get board center position
    const boardRect = boardRef.current.getBoundingClientRect();
    const centerX = boardRect.width / 2;
    const centerY = boardRect.height / 2;

    // Set initial state - all cards at center, scaled down and rotated
    // Also ensure cards are closed (rotationY: 0)
    gsap.set(cardElements, {
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
      rotation: () => gsap.utils.random(-180, 180),
      scale: 0.1,
      opacity: 0,
    });

    // Ensure all card-inner elements are closed (showing back)
    const cardInnerElements = boardRef.current.querySelectorAll('.card-inner');
    gsap.set(cardInnerElements, {
      rotationY: 0, // Closed state
    });

    // Create the distribution timeline
    const tl = gsap.timeline({
      delay: 0.3,
      onComplete: () => {
        // After distribution completes, flip cards to open
        setTimeout(() => {
          setAllCards('open');
        }, 300);
      },
    });

    // Phase 1: Fade in and grow slightly at center (keep closed)
    tl.to(cardElements, {
      duration: 0.4,
      opacity: 1,
      scale: 0.8,
      rotation: () => gsap.utils.random(-15, 15),
      ease: 'power2.out',
      stagger: {
        amount: 0.2,
        from: 'random',
      },
    })

      // Phase 2: Brief stack wiggle effect (still closed)
      .to(cardElements, {
        duration: 0.1,
        y: '-=15',
        rotation: '+=5',
        ease: 'power1.inOut',
        yoyo: true,
        repeat: 1,
        stagger: {
          amount: 0.15,
          from: 'center',
        },
      })

      // Phase 3: Distribute to final positions (still closed)
      .to(cardElements, {
        duration: 0.8,
        ease: 'back.out(1.4)',
        x: 0,
        y: 0,
        rotation: 0,
        scale: 1,
        stagger: {
          amount: 0.8,
          from: 'edges',
        },
      });

    return tl;
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
        setCardSet(shuffledCards);

        setTimeout(() => {
          setAllCards('open');
        }, 200);
      },
    });

    // Phase 1: Collect cards to center with staggered timing
    tl.to(cardElements, {
      duration: 0.6,
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

      // Phase 3: Brief pause to show the stack
      .to({}, { duration: 0.4 })

      // Phase 4: Distribute to new positions
      .to(cardElements, {
        duration: 0.6,
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

  // GSAP context for cleanup and initial animation
  useGSAP(
    () => {
      // Trigger initial distribution when cards are loaded
      if (cardSet.length > 0 && !hasAnimatedInitial.current) {
        animateInitialDistribution();
      }
    },
    { scope: boardRef, dependencies: [cardSet] }
  );

  // Reset animation flag when board size changes (new game)
  useEffect(() => {
    hasAnimatedInitial.current = false;
    setAllCards('closed'); // Reset to closed state
  }, [boardSize]);

  return (
    <div className={`board ${cardSet.length === 0 ? 'loading' : ''}`} ref={boardRef}>
      {cardSet.map((card) => (
        <Card
          key={card.id}
          id={card.id}
          frontImage={card.frontImage}
          backImage={card.backImage}
          allCards={allCards}
          setAllCards={setAllCards}
          shuffleCards={animateShuffle}
          setGamePhase={setGamePhase}
          incrementScore={incrementScore}
        />
      ))}
    </div>
  );
}

export default Board;
