import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';  // Import useNavigate for navigation
import './HomepageUnAuth.css';

function Card({ card, onCardClick, onIncrement, onDecrement }) {
  return (

    //card attribute: name la cardName, rarity la cardRarity, type la cardType
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
      </div>
      <div className="quantity-control">
        <button className="quantity-button" onClick={() => onDecrement(card)}>-</button>
        <span className="quantity">{card.quantity}</span>
        <button className="quantity-button" onClick={() => onIncrement(card)}>+</button>
      </div>
    </div>
  );
}

function HomePage() {
  const navigate = useNavigate();  // Hook for navigation
  const [cards, setCards] = useState([
    { name: 'Dragon Slayer', rarity: 'Rare', type: 'Monster', image: 'https://via.placeholder.com/150', quantity: 0 },
    { name: 'Healing Potion', rarity: 'Common', type: 'Spell', image: 'https://via.placeholder.com/150', quantity: 0 },
    { name: 'Fireball', rarity: 'Uncommon', type: 'Spell', image: 'https://via.placeholder.com/150', quantity: 0 },
    { name: 'Ancient Warrior', rarity: 'Epic', type: 'Monster', image: 'https://via.placeholder.com/150', quantity: 0 },
    { name: 'Shield', rarity: 'Common', type: 'Item', image: 'https://via.placeholder.com/150', quantity: 0 },
    { name: 'Thunder Strike', rarity: 'Rare', type: 'Spell', image: 'https://via.placeholder.com/150', quantity: 0 },
    { name: 'Fire Dragon', rarity: 'Epic', type: 'Monster', image: 'https://via.placeholder.com/150', quantity: 0 },
  ]);

  // const [cards,setCards] = useState([]);
  // useEffect(
  //   () => {
  //     axios.get(/*api cards*/).then((response) => {
  //       setListOfCards(response.data);
  //     });
  //   },
  // )

  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');  // For additional filters

  // Load cards from localStorage on initial render
  useEffect(() => {
    const savedCards = localStorage.getItem('cardCollection');
    if (savedCards) {
      setCards(JSON.parse(savedCards));
    }
  }, []);

  const handleIncrement = (card) => {
    const updatedCards = cards.map((c) =>
      c.name === card.name ? { ...c, quantity: c.quantity + 1 } : c
    );
    setCards(updatedCards);
    localStorage.setItem('cardCollection', JSON.stringify(updatedCards));
  };

  const handleDecrement = (card) => {
    const updatedCards = cards.map((c) =>
      c.name === card.name && c.quantity > 0 ? { ...c, quantity: c.quantity - 1 } : c
    );
    setCards(updatedCards);
    localStorage.setItem('cardCollection', JSON.stringify(updatedCards));
  };

  const handleCardClick = (card) => {
    navigate(`/cards/${card.name}`); // Navigate to the card's page when clicked
  };

  const filteredCards = cards.filter((card) =>
    card.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (filter ? card.rarity === filter : true)
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

          {/* Filter section */}
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

export default HomePage;
