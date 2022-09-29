playerFactory = (username, id) => {
    return {
        score: 0,
        username,
        id
    };
};

roomFactory = (number) => {
    return {
        number,
        players: [],
        grid: [ [0, 0, 0], [0, 0, 0], [0, 0, 0] ]
    };
};

class roomManager {
    constructor() {
        this._roomList = [];
        for(let i = 1; i <= 5; i++) this._roomList.push(roomFactory(i));
    }

    _setPlayerRoom(player, room) {
        const newPlayer = playerFactory(player.username, player.id);
        room.players.push(newPlayer);
        return room;
    }

    addPlayerToRoom(username, id, roomNumber) {
        // desired room
        if(roomNumber != 0 && this._roomList[roomNumber - 1].players.length < 2) {
            return this._setPlayerRoom({ username, id }, this._roomList[roomNumber - 1]);
        }

        // room with another player waiting
        const playersWaitingRooms = this._roomList.filter(room => room.players.length === 1);
        if(playersWaitingRooms.length !== 0) {
            return this._setPlayerRoom({ username, id }, playersWaitingRooms[0]);
        }

        // empty room
        const emptyRooms = this._roomList.filter(room => room.players.length === 0);
        if(emptyRooms.length !== 0) {
            return this._setPlayerRoom({ username, id }, emptyRooms[0]);
        }

        return { room: undefined };
    }

    removePlayerFromRoom(id) {
        const playerRoom = this._roomList.filter(room => room.players.some(p => p.id === id))[0];
        playerRoom.players = playerRoom.players.filter(p => p.id !== id);
    }

    get rooms() {
        return this._roomList;
    }

    get roomsInfo() {
        return this._roomList.map(room => {
            return {
                number: room.number,
                playerAmount: room.players.length
            };
        });
    }
}

module.exports = roomManager;