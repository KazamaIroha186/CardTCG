import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewDeck.css';

function NewDeck() {
  const [deckName, setDeckName] = useState('Deck Name');
  const [isNamePopupVisible, setIsNamePopupVisible] = useState(false);
  const [cardCounts, setCardCounts] = useState({});
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch all available cards when component mounts
    axios.get('https://tcg-collection.onrender.com/cards')
      .then(response => {
        setCards(response.data);
      })
      .catch(error => {
        console.error('Error fetching cards:', error);
      });
  }, []);

  const handleNameChange = () => {
    const newName = prompt('Enter new deck name:', deckName);
    if (newName) setDeckName(newName);
  };

  const addCard = async (cardId, cardName) => {
    try {
      const user = JSON.parse(localStorage.getItem('user-login'));
      const response = await axios.post('https://tcg-collection.onrender.com/decks/cards/add', {
        deckID: user.deckID,
        cardID: cardId
      });

      if (response.data.success) {
        setCardCounts(prevCounts => ({
          ...prevCounts,
          [cardName]: (prevCounts[cardName] || 0) + 1
        }));
      }
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const removeCard = async (cardId, cardName) => {
    try {
      const user = JSON.parse(localStorage.getItem('user-login'));
      const response = await axios.delete(`https://tcg-collection.onrender.com/decks/${user.deckID}/cards/${cardId}`);

      if (response.data.success) {
        setCardCounts(prevCounts => {
          const newCounts = { ...prevCounts };
          if (newCounts[cardName] > 1) {
            newCounts[cardName]--;
          } else {
            delete newCounts[cardName];
          }
          return newCounts;
        });
      }
    } catch (error) {
      console.error('Error removing card:', error);
    }
  };

  const filteredCards = cards.filter(card => 
    card.cardName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="deck-builder">
      <div className="card-section">
        <h1>Deck Builder</h1>
        <input 
          type="text" 
          placeholder="Search" 
          className="search-bar"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="filter-button">Filter</button>
        <div className="card-container">
          {filteredCards.map((card) => (
            <div className="card" key={card.id}>
              <div className="card-name">{card.cardName}</div>
              <div className="card-rarity">Rarity: {card.cardRarity}</div>
              <button className="add-button" onClick={() => addCard(card.id, card.cardName)}>+</button>
            </div>
          ))}
        </div>
      </div>

      <div className="vertical-divider"></div>

      <div className="summary-section">
        <h2>Deck name: {deckName} ✏️</h2>
        <button className="change-name-button" onClick={handleNameChange}>
          Change Name
        </button>
        <button className="save-button">Save</button>
        <table>
          <thead>
            <tr>
              <th>Amount (need/have)</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(cardCounts).map(([name, count]) => (
              <tr key={name}>
                <td>{count}/0</td>
                <td>{name}</td>
                <td>
                  <button 
                    className="remove-button"
                    onClick={() => {
                      const card = cards.find(c => c.cardName === name);
                      if (card) {
                        removeCard(card.id, name);
                      }
                    }}
                  >
                    ✖️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewDeck;
