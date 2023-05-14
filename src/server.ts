import express, { Express } from "express";
import { initializeSocket, messageReceived } from "./socket";
import { ChatModal, clearChats } from "./models/chats.model";
import cors from "cors";
import bodyParser from "body-parser";
import sendFCMmessage from "./helpers/sendFCMmessage";

const app: Express = express();
let tokens: { [app: string]: string };

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

app.get("/getChats", (req, res) => {
  res.status(200).json(ChatModal);
});

app.post("/message/send", (req, res) => {
  try {
    console.log(req.body);
    const { message, token } = req.body;
    if (message.text) {
      messageReceived(message);
      ChatModal.push(message);
      sendFCMmessage(token, message);
      return res.status(200).send("successfully sent");
    }
    res.status(400).send("message cannot be empty");
  } catch (e) {
    res.status(500).json({ msg: "something went wrong", err: e });
  }
});

app.post("/registerToken", (req, res) => {
  try {
    const { token, app_id } = req.body;
    if (tokens) tokens[app_id] = token;
    //todo: move this to DB
    res.status(200).send("token registered on server");
  } catch (e) {
    res.status(500).json({ msg: "some error occured: " + e });
  }
});

app.post("/clearChat", (req, res) => {
  if (req.body.userKey === "121201") {
    clearChats();
    res.status(200).send("chat cleared");
  }
  res.status(400).send("not allowed");
});

try {
  app.listen(8000, () => {
    initializeSocket();
    console.log("App listening on port 8000");
  });
} catch (e) {
  console.log(e);
}
