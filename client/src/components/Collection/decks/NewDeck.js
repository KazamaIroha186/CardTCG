import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './NewDeck.css';
import { useParams, useNavigate } from 'react-router-dom';

function NewDeck() {
  const navigate = useNavigate();
  const [listOfCards, setListOfCards] = useState([]);
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
      if (listOfCards.length === 0) {
        setListOfCards([{cardID: cardId, cardquantity: 1}]);
      } else {
        const existingCard = listOfCards.find(card => card.cardID === cardId);
        if (existingCard) {
          existingCard.cardquantity += 1;
          setListOfCards([...listOfCards]);
        } else {
          setListOfCards([...listOfCards, {cardID: cardId, cardquantity: 1}]);
        }
      }
      setCardCounts(prevCounts => ({
        ...prevCounts,
        [cardName]: (prevCounts[cardName] || 0) + 1
      }));
      
    } catch (error) {
      console.error('Error adding card:', error);
    }
  };

  const removeCard = async (cardId, cardName) => {
    try {
      // Find the card in listOfCards
      const existingCardIndex = listOfCards.findIndex(card => card.cardID === cardId);
      
      if (existingCardIndex !== -1) {
        const updatedCards = [...listOfCards];
        if (updatedCards[existingCardIndex].cardquantity > 1) {
          // Decrease quantity if more than 1
          updatedCards[existingCardIndex].cardquantity -= 1;
        } else {
          // Remove the card if quantity would become 0
          updatedCards.splice(existingCardIndex, 1);
        }
        setListOfCards(updatedCards);
        
        // Update the card counts display
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

  const saveDeck = async () => {
    const user = JSON.parse(localStorage.getItem('user-login'));
    const responseDeck = await axios.post('https://tcg-collection.onrender.com/decks/create', {
      deckName: deckName,
      userID: user.userID
    });
    if (responseDeck.data) {
      const deckID = responseDeck.data.id;
      const responseCards = await axios.post(`https://tcg-collection.onrender.com/decks/cards/add`, {
        deckID: deckID,
        listOfCards: listOfCards
      });
      if (responseCards.data) {
        setCardCounts({});
        navigate('/decks');
      } else {
        console.error('Failed to save deck');
      }
    } else {
      console.error('Failed to save deck');
    }
  }
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
        <button className="save-button" onClick={saveDeck}>Save</button>
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
