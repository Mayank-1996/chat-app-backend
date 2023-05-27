"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const firebase_1 = require("../firebase");
const userNames = {
    1001: "Eshani",
    1002: "MOMO",
};
function getUserName(user_id) {
    if (userNames[user_id]) {
        return userNames[user_id];
    }
    return "Koi To Bhi";
}
function sendFCMmessage(token, message) {
    const notification = {
        token: token,
        data: {
            title: getUserName(message.user_id),
            body: message.text,
        },
    };
    console.log("sent");
    firebase_1.admin
        .messaging()
        .send(notification)
        .then((response) => {
        console.log("Notification sent successfully:", response);
        return "success";
    })
        .catch((error) => {
        console.log("Error sending notification:", error);
        return "failure";
    });
    console.log("Error sending notification : Cause not known");
    return "failure";
}
exports.default = sendFCMmessage;
