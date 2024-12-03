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
      const response = await axios.get('https://tcg-collection.onrender.com/decks');
      setDecks(response.data);
    } catch (error) {
      console.error('Error fetching decks:', error);
    }
  };

  const handleNewDeck = async () => {
    try {
      navigate(`/newdeck/create`);
    } catch (error) {
      console.error('Error creating new deck:', error);
    }
  };

  const handleEditDeck = async (id) => {
    try {
      const response = await axios.get(`https://tcg-collection.onrender.com/decks/${id}/edit`);
      if (response.data) {
        navigate(`/deck/${id}/edit`);
      }
    } catch (error) {
      console.error('Error accessing deck:', error);
    }
  };

  const handleDeleteDeck = async (id) => {
    try {
      await axios.delete(`https://tcg-collection.onrender.com/decks/${id}/delete`);
      // Refresh decks after deletion
      fetchDecks();
    } catch (error) {
      console.error('Error deleting deck:', error);
    }
  };

  const addCardToDeck = async (deckId, cardId) => {
    try {
      const response = await axios.post('https://tcg-collection.onrender.com/decks/cards/add', {
        deckID: deckId,
        cardID: cardId
      });
      if (response.data.success) {
        // Refresh decks to show updated card count
        fetchDecks();
      }
    } catch (error) {
      console.error('Error adding card to deck:', error);
    }
  };

  const removeCardFromDeck = async (deckId, cardId) => {
    try {
      const response = await axios.delete(`https://tcg-collection.onrender.com/decks/cards/remove`);
      if (response.data.success) {
        // Refresh decks to show updated card count
        fetchDecks();
      }
    } catch (error) {
      console.error('Error removing card from deck:', error);
    }
  };
  
  // const filteredDecks = decks.filter(deck =>
  //   deck.name.includes(searchTerm.toLowerCase())
  // );

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
          {decks.map((deck) => (
            <tr key={deck.id}>
              <td>{deck.deckName}</td>
              <td>{deck.quantity}</td>
              <td>{new Date(deck.createdAt).toLocaleDateString()}</td>
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
