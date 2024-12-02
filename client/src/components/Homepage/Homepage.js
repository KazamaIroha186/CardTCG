import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Homepage.css';
import axios from 'axios';

function Card({ card, onCardClick, onIncrement, onDecrement }) {
  return (
    <div className="card">
      <img 
        src={`/cardimages/${card.id}.png`} 
        alt={card.cardName} 
        className="card-image" 
        onClick={() => onCardClick(card)} 
      />
      <div className="card-info">
        <h3 className="card-name">{card.cardName}</h3>
        <p className="card-rarity">Rarity: {card.cardRarity}</p>
        <p className="card-type">Type: {card.cardType}</p>
      </div>
      <div className="quantity-control">
        <button className="quantity-button" onClick={() => onDecrement(card)}>-</button>
        <span className="quantity">{card.quantity || 0}</span>
        <button className="quantity-button" onClick={() => onIncrement(card)}>+</button>
      </div>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get('https://tcg-collection.onrender.com/cards')
      .then((response) => {
        console.log(response.data);
        setCards(response.data.map(card => ({ ...card, quantity: 0 })));
      })
      .catch((error) => {
        console.error('Error fetching cards:', error);
      });
  }, []);

  useEffect(() => {
    const savedCards = localStorage.getItem('cardCollection');
    if (savedCards) {
      const parsedCards = JSON.parse(savedCards);
      setCards(prevCards => 
        prevCards.map(card => ({
          ...card,
          quantity: parsedCards.find(c => c.cardName === card.cardName)?.quantity || 0
        }))
      );
    }
  }, []);

  const handleIncrement = (card) => {

    const user = JSON.parse(localStorage.getItem('user-login'));
    
    axios.post('https://tcg-collection.onrender.com/mycollections/add', { cardID: card.id, userID: user.userID })
      .then((response) => {
        const updatedCards = cards.map((c) =>
          c.id === card.id ? { ...c, quantity: (c.quantity || 0) + 1 } : c
        );
        setCards(updatedCards);
        localStorage.setItem('cardCollection', JSON.stringify(updatedCards));
      })
      .catch((error) => {
        console.error('Error incrementing card quantity:', error);
      });
  };

  const handleDecrement = (card) => {
    const user = JSON.parse(localStorage.getItem('user-login'));
    
    axios.post('https://tcg-collection.onrender.com/mycollections/{cardID}/{userID}/delete', { cardID: card.id , userID: user.userID })
      .then((response) => {
        const updatedCards = cards.map((c) =>
          c.id === card.id && c.quantity > 0 ? { ...c, quantity: c.quantity - 1 } : c
        );
        setCards(updatedCards);
        localStorage.setItem('cardCollection', JSON.stringify(updatedCards));
      })
      .catch((error) => {
        console.error('Error decrementing card quantity:', error);
      });
  };

  const handleCardClick = (card) => {
    navigate('https://tcg-collection.onrender.com/cards/{cardID}');
  };

  const filteredCards = cards.filter((card) =>
    card.cardName.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter ? card.cardRarity === filter : true)
  );

  return (
    <div className="App">
      <div className="content">
        <main className="main-content">
          <h1>All Cards</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search cards..."
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
                  key={card.cardName} 
                  card={card} 
                  onCardClick={handleCardClick} 
                  onIncrement={handleIncrement} 
                  onDecrement={handleDecrement} 
                />
              ))
            ) : (
              <p>No cards found.</p>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage