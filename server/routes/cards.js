const express = require('express');
const router = express.Router();

const { Cards } = require('../models'); // Assuming a `Cards` model exists in `models`

// GET request - Retrieve all cards
router.get('/', async (req, res) => {
    try {
        const listOfCards = await Cards.findAll();
        res.json(listOfCards);
    } catch (error) {
        console.error('Error fetching cards:', error);
        res.status(500).json({ error: 'An error occurred while fetching cards.' });
    }
});

// POST request - Add a new card
router.post('/', async (req, res) => {
    try {
        const card = req.body;
        const newCard = await Cards.create(card);
        res.json(newCard);
    } catch (error) {
        console.error('Error creating card:', error);
        res.status(500).json({ error: 'An error occurred while creating the card.' });
    }
});

module.exports = router;
