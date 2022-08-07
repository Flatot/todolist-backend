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

module.exports.createNewUser = createNewUser;
module.exports.listUsers = listUsers;