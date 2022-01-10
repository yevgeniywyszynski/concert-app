const express = require('express');
const { restart } = require('nodemon');
const {v4: uuidv4} = require('uuid');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
const db = require('./db');

const testimonials = require('./routes/testimonials.routes')
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');

app.use('/api', testimonials)
app.use('/api', concerts)
app.use('/api', seats)

app.use((req, res) => {
    res.status(404).send('404 not found...');
  })

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
