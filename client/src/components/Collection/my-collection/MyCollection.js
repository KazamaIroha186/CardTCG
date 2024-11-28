import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyCollection.css';
import axios from 'axios';

function Card({ card, onCardClick }) {
  return (
    <div className="card">
      <img 
        src={card.image} 
        alt={card.cardName} // Corrected attribute from cardName to name
        className="card-image" 
        onClick={() => onCardClick(card)} 
      />
      <div className="card-info">
        <h3 className="card-name">{card.cardName}</h3> 
        <p className="card-rarity">Rarity: {card.cardRarity}</p> 
        <p className="card-type">Type: {card.cardType}</p> 
        <p className="card-quantity">Owned: {card.quantity}</p>
      </div>
    </div>
  );
}

function MyCollection() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user-login'));
    if (user) {
      axios.get(`http://localhost:8080/mycollections/yourcards/${user.userID}`)
      .then((response) => {
        setCards(response.data.map(card => ({ ...card })));
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
      });
    }
  }, []);

  const handleCardClick = (card) => {
    navigate(`/cards/${card.card.cardName}`); // Corrected attribute from card.name to card.name
  };

  // const filteredCards = cards.filter((card) =>
  //   card.cardName.includes(searchTerm) && 
  //   (filter ? card.cardRarity === filter : true) && 
  //   card.quantity > 0 // Only show cards that the user owns
  // );

  return (
    <div className="App">
      <div className="content">
        <main className="main-content">
          <h1>My Collection</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search your cards..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-container">
            <select
              className="filter-select"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="">Filter by Rarity</option>
              <option value="Rare">Rare</option>
              <option value="Uncommon">Uncommon</option>
              <option value="Common">Common</option>
              <option value="Epic">Epic</option>
            </select>
          </div>
          <div className="card-grid">
            {cards.length > 0 ? (
              cards.map((card) => (
                <Card 
                  key={card.card} 
                  card={card.card} 
                  onCardClick={handleCardClick}
                />
              ))
            ) : (
              <p>No cards found in your collection.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default MyCollection;
