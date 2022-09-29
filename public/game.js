class Game {
    constructor() {
        const usernamePrompt = window.prompt("Type your username");

        this.username = usernamePrompt !== null &&  !!usernamePrompt.trim() ?  usernamePrompt.trim() : "Anonymous";
        this.connection = new SocketConnection(this.username, this);
        
        this._setURLRoom(this.connection.room);

    }

    updateRooms(roomList) {
        const roomWrapper = document.getElementById("room-wrapper");
        roomWrapper.innerHTML = "";

        roomList.forEach(room => {
            const canJoinRoom = room.playerAmount !== 2 ? "" : "disabled";
            roomWrapper.innerHTML += `
            <div class="room">
                <div class="room-label">
                    <span class="room-title">Room ${room.number}</span> <span class="room-players">(${room.playerAmount}/2)</span>
                </div>
                <button class="room-join" ${canJoinRoom}>Join</button>
            </div>
            `;
        });
    }

    _setURLRoom(roomNumber) {
        
    }
}



new Game();