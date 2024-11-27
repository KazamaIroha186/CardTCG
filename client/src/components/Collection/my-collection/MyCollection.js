import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyCollection.css';

function Card({ card, onCardClick }) {
  return (
    <div className="card">
      <img 
        src={card.image} 
        alt={card.name} 
        className="card-image" 
        onClick={() => onCardClick(card)} 
      />
      <div className="card-info">
        <h3 className="card-name">{card.name}</h3>
        <p className="card-rarity">Rarity: {card.rarity}</p>
        <p className="card-type">Type: {card.type}</p>
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

  // Load cards from localStorage whenever it changes
  useEffect(() => {
    const loadCards = () => {
      const savedCards = localStorage.getItem('cardCollection');
      if (savedCards) {
        setCards(JSON.parse(savedCards));
      }
    };

    loadCards();

    // Add event listener for storage changes
    window.addEventListener('storage', loadCards);

    // Cleanup
    return () => {
      window.removeEventListener('storage', loadCards);
    };
  }, []);

  const handleCardClick = (card) => {
    navigate(`/cards/${card.name}`);
  };

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter ? card.rarity === filter : true) &&
    card.quantity > 0 // Only show cards that the user owns
  );

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
            {filteredCards.length > 0 ? (
              filteredCards.map((card, index) => (
                <Card 
                  key={index} 
                  card={card} 
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
