const { login, logout, signup } = require('../db/auth');
var express = require('express');
var router = express.Router();

router.post('/login', (req, res) => {
    if (req.body.email && req.body.password) {
        login(req.body.email, req.body.password).then(result => {
            res.send(result);
        }).catch(err => {
            console.log("err")
            console.log(err)
            res.status(400).send(err.code);
        })
    }
    else {
        res.status(400).send("Missing email or password in body");
        // res.status(403).send("Unauthorized");
    }
})

router.post('/signup', (req, res) => {
    if (req.body.email && req.body.password) {
        signup(req.body.email, req.body.password).then(result => {
            res.send(result);
        }).catch(err => {
            res.status(400).send(err.code);
        })
    }
    else {
        res.status(400).send("Missing email or password in body");
    }
})

router.get('/logout', (req, res) => {
    logout().then(result => {
        res.send(result);
    })
})

module.exports = router;