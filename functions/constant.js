const admin = require("firebase-admin");
var serviceAccount = require("./todo-list-b7734-firebase.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.admin = admin;