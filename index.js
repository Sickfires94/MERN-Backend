const express = require('express');
const mongoose = require('mongoose');
const authRouter = require('./routes/auth');
const hotelRouter = require('./routes/hotels');
const airportRouter = require('./routes/airports');
const attractionRouter = require('./routes/attractions');
const flightRouter = require('./routes/flights');
const userRouter = require('./routes/users');
const reviewRouter = require('./routes/review')

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const dburl = process.env.MONGODB_URI || process.env.password;
const cors = require('cors')

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

async function connectToDatabase() {
    try {
        await mongoose.connect(dburl);
        console.log('Connection to the database has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
        process.exit(1);
    }
}

connectToDatabase();

app.use('/auth', authRouter);
app.use('/hotels', hotelRouter);
app.use('/airports', airportRouter);
app.use('/attractions', attractionRouter);
app.use('/flights', flightRouter);
app.use('/users', userRouter);
app.use('/reviews', reviewRouter)

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({ error: err.message });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
