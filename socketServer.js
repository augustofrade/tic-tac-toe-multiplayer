const { Server } = require("socket.io");
const RoomManager = require("./roomManager");

class SocketServer {
    constructor(httpServer) {
        this.roomManager = new RoomManager();
        this.io = new Server(httpServer);


        this.io.on("connection", (socket) => {
            // add user to room upon connection
            const username = socket.handshake.auth.username || "Anonymous";
            let playerRoom = socket.handshake.auth.room;
            playerRoom = playerRoom > this.roomManager.rooms.length ? 0 : playerRoom;

            const room = this.addPlayerToRoom(socket, username, playerRoom);

            if(room !== undefined) { // added to room
                playerRoom = room.number;
                this.io.to(playerRoom).emit("update-match-title", this.updateMatchTitle(playerRoom));
            }
            
            
        
            // default disconnection event
            socket.on("disconnect", () => {
                this.roomManager.removePlayerFromRoom(socket.id);
                console.log(`${username} disconnected from room ${playerRoom}`);
            
                this.io.to(playerRoom).emit("update-match-title", "Waiting for another player...");
            });
        });
    }

    addPlayerToRoom(socket, username, playerRoom) {
        const room = this.roomManager.addPlayerToRoom(username, socket.id, playerRoom);
        if(room !== undefined) { // if added to room
            playerRoom = room.number;
            console.log(`${username} connected to room ${playerRoom}\n`);
            socket.join(playerRoom);
        
            // send joined room to player client
            socket.emit("get-room-number", playerRoom);
                
            // then update rooms infos to all players
            this.io.emit("update-rooms", this.roomManager.roomsInfo);
        }
        return room;
    }

    updateMatchTitle(roomNumber) {
        const room = this.roomManager.rooms[roomNumber - 1];
        if(room.players.length == 2) {
            const [ player1, player2 ] = room.players;
            return {
                ready: true,
                player1,
                player2
            };
        } else {
            return {
                ready: false,
                message: "Waiting for another player..."
            };
        }
    }
}

module.exports = SocketServer;