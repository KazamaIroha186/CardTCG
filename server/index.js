const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const db = require('./models')

//Routes
const postRoutes = require('./routes/Posts');
app.use('/posts', postRoutes);
const cardRoutes = require('./routes/cards');
app.use('/cards', cardRoutes);
const userRoutes = require('./routes/Users');
app.use('/auth', userRoutes);

db.sequelize.sync().then(() => {
        app.listen(3001, () => {
        console.log('Server is running on port 3001');
    });
});

