import imagePlaceholder from '../assets/icons/placeholder-160x200.svg';

const cardList = [];

for (let i = 0; i < 20; i++) {
  cardList.push({
    id: crypto.randomUUID(),
    frontImage: imagePlaceholder,
    backImage: imagePlaceholder,
  });
}

export default cardList;
