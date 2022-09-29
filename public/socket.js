
// eslint-disable-next-line no-unused-vars
class SocketConnection {
    constructor(username, gameRef) {
        const socket = io({ autoConnect: false });
        this._room = new URLSearchParams(location.search).get("room") || 0;
        socket.auth = { username, room: this._room };
        console.log("Username:  " + username);

        socket.connect();
        socket.emit("init");
        socket.on("get-room-number", number => this._room = number);

        socket.on("update-rooms", (rooms) => {
            gameRef.updateRooms(rooms);
        });
    }

    get room() {
        return this._room;
    }
}