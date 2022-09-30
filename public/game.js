class Game {
    constructor() {
        const usernamePrompt = window.prompt("Type your username");

        this.username = usernamePrompt !== null &&  !!usernamePrompt.trim() ?  usernamePrompt.trim() : "Anonymous";
        this.connection = new SocketConnection(this.username, this);
    }

    setEventListeners() {
        Array.from(document.getElementsByClassName("room-join")).forEach((button, i) => {
            button.addEventListener("click", () => {
                const roomNumber = i + 1;

                if(this.connection.room === roomNumber) {
                    alert("You are already in the room");
                } else {
                    this.setURLRoom(roomNumber);
                    location.reload();
                }
            });
        });
    }

    updateRooms(roomList, playerRoom) {
        const roomWrapper = document.getElementById("room-wrapper");
        roomWrapper.innerHTML = "";
        roomList.forEach(room => {
            const canJoinRoom = playerRoom !== room.number && room.playerAmount !== 2 ? "" : "disabled";
            const buttonText = playerRoom === room.number ? "Joined in" : "Join";

            roomWrapper.innerHTML += `
            <div class="room">
                <div class="room-label">
                    <span class="room-title">Room ${room.number}</span> <span class="room-players">(${room.playerAmount}/2)</span>
                </div>
                <button class="room-join" ${canJoinRoom}>${buttonText}</button>
            </div>
            `;
        });

        this.setEventListeners();
    }

    setMatch(matchData) {
        const setPlayerData = (playerData, i) => {
            const { username, score } = playerData;
            document.querySelector(`#match-player-${i} .player-name`).innerText = username;
            document.querySelector(`#match-player-${i} .player-score`).innerText = score;
        };

        if(matchData.ready) {
            setPlayerData(matchData.player1, 1);
            setPlayerData(matchData.player2, 2);
            document.getElementById("match-players").classList.remove("d-none");
            document.getElementById("match-waiting-players").classList.add("d-none");
        } else {
            document.getElementById("match-players").classList.add("d-none");
            document.getElementById("match-waiting-players").classList.remove("d-none");
        }
    }

    joinRoom(roomNumber) {
        console.log(roomNumber);
    }

    setURLRoom(roomNumber) {
        window.history.replaceState("", "", `/?room=${roomNumber}`);
    }

}



new Game();