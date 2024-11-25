import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './style/HomepageUnAuth.css'

function Card({ card }) {
  return (
    <div className="card">
      <img src={card.image} alt={card.name} className="card-image" />
      <div className="card-info">
        <h3 className="card-name">{card.name}</h3>
        <p className="card-rarity">Rarity: {card.rarity}</p>
      </div>
      <button className="add-button">+</button>
    </div>
  );
}

function HomePage({ user }) {
  const navigate = useNavigate();
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCards, setFilteredCards] = useState([]);

  useEffect(() => {
    // Fetch card data from backend
    axios
      .get('http://localhost:3001/cards')
      .then((response) => {
        setCards(response.data);
        setFilteredCards(response.data); // Initialize filtered cards
      })
      .catch((error) => {
        console.error('Error fetching card data:', error);
      });
  }, []);

  // Filter cards based on search term
  useEffect(() => {
    setFilteredCards(
      cards.filter((card) =>
        card.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm, cards]);

  return (
    <div className="App">
      <header className="header">
        {user ? (
          <>
            <span className="username">{user.username}</span>
            <button className="add-card">Add card</button>
          </>
        ) : (
          <>
            <button onClick={() => navigate('/login')}>Login</button>
            <button onClick={() => navigate('/signup')}>Sign up</button>
          </>
        )}
      </header>

      <div className="content">
        <aside className="management">
          <h3 className="management-title">Management</h3>
          <div className="management-item" onClick={() => navigate('/added-cards')}>
            <span>Added card list</span>
          </div>
          <div className="management-item" onClick={() => navigate('/deck-builder')}>
            <span>Deck builder</span>
          </div>
        </aside>

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
            <button className="filter-button">Filter</button>
          </div>

          <div className="card-grid">
            {filteredCards.length > 0 ? (
              filteredCards.map((card, index) => <Card key={index} card={card} />)
            ) : (
              <p>No cards found.</p>
            )}
          </div>

          <div className="pagination">
            {[1, 2, 3, '...', 10].map((page, index) => (
              <button key={index} className="page-number">
                {page}
              </button>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}

export default HomePage;
