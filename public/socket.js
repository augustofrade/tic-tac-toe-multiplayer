
// eslint-disable-next-line no-unused-vars
class SocketConnection {
    constructor(username, gameRef) {
        const socket = io({ autoConnect: false });
        this._room = this._getRoomNumber();
        socket.auth = { username, room: this._room };
        console.log("Connected as " + username);

        socket.connect();
        socket.on("get-room-number", number => {
            this._room = number;
            gameRef.setURLRoom(number);
        });

        socket.on("update-rooms", (rooms) => {
            gameRef.updateRooms(rooms, this._room);
        });

        socket.on("update-match-title", resp => {
            gameRef.setMatch(resp);
        });
    }

    get room() {
        return this._room;
    }

    _getRoomNumber() {
        let roomNumber = new URLSearchParams(location.search).get("room") || 0;
        roomNumber = Number(roomNumber);
        if(isNaN(roomNumber) || roomNumber < 0)
            roomNumber = 0;
        return roomNumber;
    }
}