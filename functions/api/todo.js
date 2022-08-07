const { createNewTodoList, getTodoList, updateTodoList, listUsersTodoList } = require('../db/todo');
var express = require('express');
const todoItems = require('./todo-items');
var router = express.Router();

router.get('/', (req, res) => {
    if (req.query.userId) {
        listUsersTodoList(req.query.userId).then(result => {
            res.send(result);
        })
    }
    else {
        res.status(403).send("Missing userId params");
        // res.status(403).send("Unauthorized");
    }
})

router.get('/:id', (req, res) => {
    getTodoList(req.params.id).then(result => {
        res.send(result);
    });
})

router.post('/', (req, res) => {
    if (req.body.list) {
        createNewTodoList(req.body.list).then(result => {
            res.status(200).send(result);
        });
    }
})

router.patch('/:id', (req, res) => {
    if (req.body.list.name) {
        updateTodoList(req.params.id, req.body.list).then(result => {
            res.status(200).send(result);
        });
    }
})

router.use('/:listId/items', todoItems);

module.exports = router;