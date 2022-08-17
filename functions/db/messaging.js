const { getToken } = require('../db/user');
const { admin } = require('../constant.js');

async function getUsersTokens(userList) {
    var tokens = [];
    for (let index = 0; index < userList.length; index++) {
        var userId = userList[index];

        var token = await getToken(userId);
        tokens.push(token);
    }
    return tokens;
}

async function sendNotification(message, userList) {
    message.tokens = await getUsersTokens(userList);
    if (message.tokens.length > 0) {
        return await admin.messaging().sendMulticast(message).then((response) => {
            console.log(response.successCount + ' messages were sent successfully');
        })
        .catch((error) => {
            return Promise.reject(error);
        });
    }
    else {
        return Promise.resolve("No user found to send notification");
    }
}

module.exports.sendNotification = sendNotification;