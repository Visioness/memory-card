import imagePlaceholder from '../assets/icons/placeholder-160x200.svg';

const cards = [];

for (let i = 0; i < 20; i++) {
  cards.push({
    id: crypto.randomUUID(),
    frontImage: imagePlaceholder,
    backImage: imagePlaceholder,
  });
}

export default cards;
