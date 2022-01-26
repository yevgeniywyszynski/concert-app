const express = require('express');
const { restart } = require('nodemon');
const {v4: uuidv4} = require('uuid');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json()); // w jakim formacie dane bedziemy przyjmowac od klienta 
const db = require('./db');
app.use(cors()) // zeby ktos nie postawil strone bazujac na naszym serwerze;

const testimonials = require('./routes/testimonials.routes')
const concerts = require('./routes/concerts.routes');
const seats = require('./routes/seats.routes');
app.use(express.static(path.join(__dirname, '/client/build')));

app.use('/api', testimonials)
app.use('/api', concerts)
app.use('/api', seats)

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/client/build/index.html'));

});

app.use((req, res) => {
    res.status(404).send('404 not found...');
  })

  app.listen(process.env.PORT || 8000, () => {
    console.log('Server is running on port: 8000');
  });
