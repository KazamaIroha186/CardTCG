import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Deck.css';


function Decks() {
  const navigate = useNavigate();
  const [decks, setDecks] = useState([
    { id: 1, name: "Deck_name", amount: 69, date: "20/10/2020" },
    { id: 2, name: "Deck_name", amount: 69, date: "20/10/2020" },
    { id: 3, name: "Deck_name", amount: 69, date: "20/10/2020" },
    { id: 4, name: "Deck_name", amount: 69, date: "20/10/2020" },
  ]);

  const handleNewDeck = () => {
    navigate("/newdeck");
  };

  const handleEditDeck = (id) => {
    console.log(`Edit deck with ID: ${id}`);
    // Add edit deck logic here
  };

  const handleDeleteDeck = (id) => {
    const updatedDecks = decks.filter((deck) => deck.id !== id);
    setDecks(updatedDecks);
  };

  return (
    <div className="decks-container">
      <h1>Decks</h1>
      <div className="header-controls">
        <input type="text" placeholder="Search..." className="search-input" />
        <button className="new-deck-button" onClick={handleNewDeck}>
          New deck
        </button>
      </div>
      <table className="deck-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Amount of card</th>
            <th>Create Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {decks.map((deck) => (
            <tr key={deck.id}>
              <td>{deck.name}</td>
              <td>{deck.amount}</td>
              <td>{deck.date}</td>
              <td>
                <button
                  className="edit-button"
                  onClick={() => handleEditDeck(deck.id)}
                >
                  <i className="fas fa-pen"></i>
                </button>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteDeck(deck.id)}
                >
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Decks;
