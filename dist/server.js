"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const socket_1 = require("./socket");
const chats_model_1 = require("./models/chats.model");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const sendFCMmessage_1 = __importDefault(require("./helpers/sendFCMmessage"));
const app = (0, express_1.default)();
let tokens;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.get("/getChats", (req, res) => {
    res.status(200).json(chats_model_1.ChatModal);
});
app.post("/message/send", (req, res) => {
    try {
        console.log(req.body);
        const { message, token } = req.body;
        if (message.text) {
            (0, socket_1.messageReceived)(message);
            chats_model_1.ChatModal.push(message);
            (0, sendFCMmessage_1.default)(token, message);
            return res.status(200).send("successfully sent");
        }
        res.status(400).send("message cannot be empty");
    }
    catch (e) {
        res.status(500).json({ msg: "something went wrong", err: e });
    }
});
app.post("/registerToken", (req, res) => {
    try {
        const { token, app_id } = req.body;
        if (tokens)
            tokens[app_id] = token;
        //todo: move this to DB
        res.status(200).send("token registered on server");
    }
    catch (e) {
        res.status(500).json({ msg: "some error occured: " + e });
    }
});
app.post("/clearChat", (req, res) => {
    if (req.body.userKey === "121201") {
        (0, chats_model_1.clearChats)();
        res.status(200).send("chat cleared");
    }
    res.status(400).send("not allowed");
});
try {
    app.listen(8000, () => {
        (0, socket_1.initializeSocket)();
        console.log("App listening on port 8000");
    });
}
catch (e) {
    console.log(e);
}
