"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.messageReceived = exports.initializeSocket = void 0;
const socket_io_1 = require("socket.io");
let io;
function initializeSocket() {
    io = new socket_io_1.Server(5000, {
        cors: {
            origin: "*",
        },
    });
    io.on("connection", (socket) => {
        console.log("socket connection establised: ");
        socket.on("customEvent", (data) => {
            console.log("Received data from client:", data);
            // Send a message to the client
            io.emit("serverMessage", "This is a message from the server");
        });
    });
}
exports.initializeSocket = initializeSocket;
function messageReceived(message) {
    io.emit("send_message", message);
}
exports.messageReceived = messageReceived;
