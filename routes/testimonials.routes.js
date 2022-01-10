const express = require('express');
const {v4: uuidv4} = require('uuid');

const router = express.Router()
const db = require('../db');

router.route('/testimonials').get((req, res) => {
    res.json(db.testimonials);
})

router.route('/testimonials/random').get((req, res) => {
  let randomIndx = Math.floor(Math.random() * db.testimonials.length);
  res.json(db.testimonials[randomIndx]);
})

router.route('/testimonials/:id').get((req, res) => {
  filtered = db.testimonials.filter(elem => req.params.id == elem.id)
  res.json(filtered);
})

router.route('/testimonials').post((req, res) => {

  const {author, text} = req.body;
    if(author.length <= 0){
        res.status(406).json({message: "No author given"})
    }
  obj1 = {
      id: uuidv4(),
      author: author,
      text: text,
  }

  db.testimonials.push(obj1);
  res.json({message:'OK'})
})

router.route('/testimonials/:id').put((req, res) => {
  let indxPost = db.testimonials.find(elem => req.params.id == elem.id)
  let valueIndx = db.testimonials.indexOf(indxPost);
  const newVal = {
      ...indxPost,
      author: req.body.author,
      text: req.body.text,
  }
  
  db.testimonials[valueIndx] = newVal;
  res.json({message:'OK'})
})

router.route('/testimonials/:id').delete((req, res) => {
  let indxPost = db.testimonials.find(elem => req.params.id == elem.id)
  let valueIndx = db.testimonials.indexOf(indxPost);
  db.testimonials.splice(valueIndx, 1);
  res.json({message: 'ok'});
})

module.exports = router;