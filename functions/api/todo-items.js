const { listTodoItem, addNewTodoItem, updateTodoItem } = require('../db/todo');
var express = require('express');
var router = express.Router({ mergeParams: true });

router.get('/', function (req, res, next) {
    if (req.params.listId) {
        listTodoItem(req.params.listId).then(result => {
            res.status(200).send(result);
        });
    }
})

router.post('/', function (req, res, next) {
    if (req.params.listId && req.body.item) {
        addNewTodoItem(req.params.listId, req.body.item).then(result => {
            res.status(200).send(result);
        });
    }
})

router.patch('/:itemId', function (req, res, next) {
    if (req.params.listId && req.params.itemId && req.body.item) {
        updateTodoItem(req.params.listId, req.params.itemId, req.body.item).then(result => {
            res.status(200).send(result);
        });
    }
})

module.exports = router;