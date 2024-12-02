import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cards() {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCard, setSelectedCard] = useState(null);

  useEffect(() => {
    // Get all cards when component mounts
    getAllCards();
  }, []);

  const getAllCards = async () => {
    try {
      const response = await axios.get('https://tcg-collection.onrender.com/cards');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching cards:', error);
    }
  };

  const getCardById = async (id) => {
    try {
      const response = await axios.get(`https://tcg-collection.onrender.com/cards/{cardID}`);
      setSelectedCard(response.data);
    } catch (error) {
      console.error('Error fetching card:', error);
    }
  };

  const searchCards = async (name) => {
    try {
      const response = await axios.get(`https://tcg-collection.onrender.com/cards/search`);
      setCards(response.data);
    } catch (error) {
      console.error('Error searching cards:', error);
    }
  };

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      searchCards(term);
    } else {
      getAllCards();
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search cards..."
        value={searchTerm}
        onChange={handleSearch}
      />
      
      <div className="cards-container">
        {cards.map((card) => (
          <div key={card.id} className="card" onClick={() => getCardById(card.id)}>
            <h3>{card.cardName}</h3>
            <p>Rarity: {card.cardRarity}</p>
            <p>Type: {card.cardType}</p>
          </div>
        ))}
      </div>

      {selectedCard && (
        <div className="card-details">
          <h2>{selectedCard.cardName}</h2>
          <p>Rarity: {selectedCard.cardRarity}</p>
          <p>Type: {selectedCard.cardType}</p>
          {/* Add more card details as needed */}
        </div>
      )}
    </div>
  );
}

export default Cards;