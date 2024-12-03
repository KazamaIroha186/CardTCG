import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CardDetail.css';

function CardDetail() {
  const [card, setCard] = useState(null);
  const { cardName } = useParams();

  useEffect(() => {
    const fetchCardDetails = async () => {
      try {
        const response = await axios.get(`https://tcg-collection.onrender.com/cards/{cardID}`);
        setCard(response.data); // API returns single card by ID
      } catch (error) {
        console.error('Error fetching card details:', error);
      }
    };

    if (cardName) {
      fetchCardDetails();
    }
  }, [cardName]);

  if (!card) {
    return <div>Loading...</div>;
  }

  return (
    <div className="card-detail-container">
      <div className="card-detail">
        <img 
          src={`/cardimages/${card.id}.png`}
          alt={card.cardName}
          className="card-detail-image"
        />
        <div className="card-detail-info">
          <h2 className="card-detail-name">{card.cardName}</h2>
          <p className="card-detail-rarity">Rarity: {card.cardRarity}</p>
          <p className="card-detail-type">Type: {card.cardType}</p>
          <p className="card-detail-description">{card.cardDescription}</p>
        </div>
      </div>
    </div>
  );
}

export default CardDetail;