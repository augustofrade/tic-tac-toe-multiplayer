const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const path = require("path");
const RoomManager = require("./roomManager");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer);
const roomManager = new RoomManager();

app.use(express.static("./public"));

app.get("/", (req, res) => {
    return res.sendFile(path.join(__dirname, "index.html"));
});

io.on("connection", (socket) => {
    // user info wrapped here
    const username = socket.handshake.auth.username || "Anonymous";
    let playerRoom = socket.handshake.auth.room || 0;

    
    const room = roomManager.addPlayerToRoom(username, socket.id, playerRoom);
    if(room !== undefined) {
        playerRoom = room.number;
        console.log(`${username} connected to room ${playerRoom}\n`);
        socket.join(playerRoom);
        io.emit("update-rooms", roomManager.roomsInfo);
    }
    socket.on("init", () => {
        io.emit("get-room-number", playerRoom);
    });

    // defaul disconnection event
    socket.on("disconnect", () => {
        roomManager.removePlayerFromRoom(socket.id);
        console.log(`${username} disconnected from room ${playerRoom}`);
        io.emit("user-disconnect", { userId: socket.id });
    });
});


httpServer.listen(3000, () => {
    console.log("listening on 3000");
});