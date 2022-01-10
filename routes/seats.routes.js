const express = require('express');
const {v4: uuidv4} = require('uuid');
const router = express.Router()
const db = require('../db');

router.route('/seats').get((req, res) => {
    res.json(db.seats)
})

router.route('/seats/:id').get((req, res) => {
    filtered = db.seats.filter(elem => req.params.id == elem);
    res.json(filtered)
})

router.route('/seats').post((req,res) => {
    obj3 = {
        id: uuidv4(),
        ...req.body,
    }

    db.seats.push(obj3)
    res.json({message: 'ok'})
})

router.route('/seats/:id').delete((req, res) => {
    let indxValue = db.seats.find(elem => req.params.id == elem.id)
    let deletIdx = db.seats.indexOf(indxValue);

    db.seats.splice(deletIdx, 1);
    res.json({message: {ok}, status: 'deleted'}, ...indxValue)
})


router.route('/seats/:id').put((req, res) => {
    let indxValue = db.seats.find(elem => req.params.id == elem.id);
    let findIdx = db.seats.indexOf(indxValue);

    const newVal = {
        ...indxValue,
        ...req.body,
    }

    db.seats[findIdx] = newVal;
    res.json({message: 'ok'})
})

module.exports = router;