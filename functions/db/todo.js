const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

const { sendNotification } = require('./messaging.js');

async function createNewTodoList(list) {
    const docRef = db.collection('todo-list').doc();

    var data = {
        users: list.users ? list.users : [],
        name: list.name
    }
    await docRef.set(data);
    await docRef.collection("items");
    return { id: docRef.id, ...data };
}

async function updateTodoList(todoList, list) {
    const docRef = db.collection('todo-list').doc(todoList);

    var data = {
        name: list.name
    }
    if (list.users) {
        data.users = list.users;

        var message = {
            notification: {
                title: 'New Flatodo',
                body: 'You has been invited in a new flatodo'
            },
            data: { todoListId: todoList },
            tokens: [],
        };
        sendNotification(message, list.users);
    }
    await docRef.update(data);
    await docRef.collection("items");
    return { id: docRef.id, ...data };
}

async function listUsersTodoList(userId) {
    const docRef = db.collection('todo-list').where("users", "array-contains", userId).get();

    var docs = await (await docRef).docs;
    return docs.map(doc => {
        return { id: doc.id, ...doc.data() }
    })
}

async function getTodoList(todoListId) {
    const docRef = db.collection('todo-list').doc(todoListId).get();
    return (await docRef).data();
}

async function listTodoItem(listId) {
    const docRef = db.collection('todo-list').doc(listId).collection("items").get();

    var docs = await (await docRef).docs;
    return docs.map(doc => {
        return { id: doc.id, ...doc.data() }    
    })
}

async function addNewTodoItem(listId, itemData) {
    const docRef = db.collection('todo-list').doc(listId).collection("items").doc();

    await docRef.set(itemData);
    return { id: docRef.id, ...itemData };
}

async function updateTodoItem(listId, todoId, itemData) {
    const docRef = db.collection('todo-list').doc(listId).collection("items").doc(todoId);

    await docRef.update(itemData);
    return { id: docRef.id, ...(await (await (docRef.get())).data()) };
}

// TODO LIST
module.exports.createNewTodoList = createNewTodoList;
module.exports.listUsersTodoList = listUsersTodoList;
module.exports.updateTodoList = updateTodoList;
module.exports.getTodoList = getTodoList;
// TODO ITEMS
module.exports.listTodoItem = listTodoItem;
module.exports.addNewTodoItem = addNewTodoItem;
module.exports.updateTodoItem = updateTodoItem;
