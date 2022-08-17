const { getFirestore } = require('firebase-admin/firestore');
const db = getFirestore();

async function createNewUser(user) {
    const docRef = db.collection('users').doc(user.id);

    await docRef.set({
        first_name: user.first_name,
        last_name: user.last_name,
        gender: user.gender
    });
}

async function listUsers() {
    const docRef = db.collection('users').get();

    var docs = await (await docRef).docs;
    return docs.map(doc => {
        return { id: doc.id, ...doc.data() }    
    })
}

async function updateUserToken(userId, token) {
    const docRef = db.collection('users').doc(userId);

    await docRef.update({
        token: token
    });
    const updatedDocRef = db.collection('users').doc(userId).get();
    return { id: updatedDocRef.id, ...(await updatedDocRef).data() };
}

async function getToken(userId) {
    const docRef = db.collection('users').doc(userId).get();

    var data = (await docRef).data();
    return data?.token;
}

module.exports.createNewUser = createNewUser;
module.exports.updateUserToken = updateUserToken;
module.exports.listUsers = listUsers;
module.exports.getToken = getToken;