const functions = require('firebase-functions');
const admin = require("firebase-admin");
var serviceAccount = require("./todo-list-b7734-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
// LIST OF API FILES
const todo = require('./api/todo');
const auth = require('./api/auth');
const user = require('./api/user');

const bodyParser = require('body-parser');
const cors = require('cors')

const express = require('express');
const app = express();
const port = 3000;

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/auth', auth);
app.use('/todo', todo);
app.use('/user', user);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
});

exports.app = functions.https.onRequest(app);