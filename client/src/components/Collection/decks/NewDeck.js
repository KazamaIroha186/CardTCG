import React, { useState } from 'react';
import './NewDeck.css';

function NewDeck() {
  const [deckName, setDeckName] = useState('Deck Name');
  const [isNamePopupVisible, setIsNamePopupVisible] = useState(false);
  const [cardCounts, setCardCounts] = useState({ 'Blue Eyes White Dragon': 0 });

  const handleNameChange = () => {
    const newName = prompt('Enter new deck name:', deckName);
    if (newName) setDeckName(newName);
  };

  const addCard = (cardName) => {
    setCardCounts((prevCounts) => ({
      ...prevCounts,
      [cardName]: (prevCounts[cardName] || 0) + 1,
    }));
  };

  return (
    <div className="deck-builder">
      <div className="card-section">
        <h1>Deck Builder</h1>
        <input type="text" placeholder="Search" className="search-bar" />
        <button className="filter-button">Filter</button>
        <div className="card-container">
          {[...Array(6)].map((_, index) => (
            <div className="card" key={index}>
              <div className="card-name">Blue Eyes White Dragon</div>
              <div className="card-rarity">Rarity: SSR</div>
              <button className="add-button" onClick={() => addCard('Blue Eyes White Dragon')}>+</button>
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
                <td><button className="remove-button">✖️</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default NewDeck;
