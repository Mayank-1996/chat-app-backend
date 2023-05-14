import { Server } from "socket.io";
import { IMessage } from "./types";
import sendFCMmessage from "./helpers/sendFCMmessage";

let io: Server;

export function initializeSocket() {
  io = new Server(8800, {
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

export function messageReceived(message: IMessage) {
  io.emit("send_message", message);
}
