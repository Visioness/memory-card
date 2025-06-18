import '../styles/Card.css';

function Card({ frontImage, backImage }) {
  return (
    <div className="card">
      <div className="front">
        <img src={frontImage} alt="Front of card" />
      </div>
      <div className="back">
        <img src={backImage} alt="Back of card" />
      </div>
    </div>
  );
}

export default Card;
