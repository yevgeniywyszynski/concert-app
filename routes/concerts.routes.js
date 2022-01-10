const express = require('express');
const {v4: uuidv4} = require('uuid');

const router = express.Router()
const db = require('../db');

router.route('/concerts').get((req, res) => {
    res.json(db.concerts);
})

router.route('/concerts/:id').get((req, res) => {
    filtered = db.concerts.filter(elem => req.params.id == elem.id)
    res.json(filtered)
})

router.route('/concerts').post((req, res) => {

    obj2 = {
        id: uuidv4(),
        ...req.body,
    }

    db.concerts.push(obj2)
    res.json({message: 'ok,ok'})
    
})

router.route('/concerts/:id').delete((req, res) => {
    let indxValue = db.concerts.find(elem => req.params.id == elem.id);
    let deletIdx = db.concerts.indexOf(indxValue);

    db.concerts.splice(deletIdx, 1);
    res.json({message:'ok', status:'deleted'}, ...indxValue)
})

router.route('/concerts/:id').put((req, res) => {
    let indxValue = db.concerts.find(elem => req.params.id == elem.id);
    let findIdx = db.concerts.indexOf(indxValue);

    const newVal = {
        ...indxValue,
        ...req.body,
    }

    db.concerts[findIdx] = newVal
    res.json({message: 'ok'})
})

module.exports = router;

//client <--> server <===> baza danych