import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Deck.css';

function Decks() {
  const navigate = useNavigate();
  const [decks, setDecks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDecks();
  }, []);

  const fetchDecks = async () => {
    try {
      const response = await axios.get('http://localhost:8080/decks/all');
      setDecks(response.data);
    } catch (error) {
      console.error('Error fetching decks:', error);
    }
  };

  const handleNewDeck = () => {
    navigate("/newdeck");
  };

  const handleEditDeck = (id) => {
    navigate(`/deck/${id}/edit`);
  };

  const handleDeleteDeck = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/decks/${id}`);
      // Refresh decks after deletion
      fetchDecks();
    } catch (error) {
      console.error('Error deleting deck:', error);
    }
  };

  const filteredDecks = decks.filter(deck =>
    deck.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="decks-container">
      <h1>Decks</h1>
      <div className="header-controls">
        <input 
          type="text" 
          placeholder="Search..." 
          className="search-input"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
          {filteredDecks.map((deck) => (
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
