const { createNewUser, listUsers } = require('../db/user');
var express = require('express');
var router = express.Router();

router.post('/', (req, res) => {
    if (req.body.id && req.body.first_name && req.body.last_name && req.body.gender) {
        var data = { id: req.body.id, first_name: req.body.first_name, last_name: req.body.last_name, gender: req.body.gender };
        createNewUser(data).then(result => {
            res.send(result);
        }).catch(err => {
            res.status(400).send(err.code);
        })
    }
    else {
        res.status(400).send("Missing email or password in body");
    }
})

router.get('/', (req, res) => {
    listUsers().then(result => {
        res.send(result);
    }).catch(err => {
        res.status(400).send(err.code);
    })
})

module.exports = router;