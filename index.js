/* eslint-disable no-unused-vars */
const express = require("express");
const { createServer } = require("http");
const path = require("path");
const SocketServer = require("./socketServer");

const app = express();
const httpServer = createServer(app);

const socketServer = new SocketServer(httpServer);

app.use(express.static("./public"));

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "index.html"));
});



httpServer.listen(3000, () => {
    console.log("listening on 3000");
});