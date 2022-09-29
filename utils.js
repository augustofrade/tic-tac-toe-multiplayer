roomFactory = (number) => {
    return {
        number,
        player1: {
            score: 0,
            username: undefined,
            id: undefined
        },
        player2: {
            score: 0,
            username: undefined,
            id: undefined
        },
        grid: [ 0, 0, 0, 0, 0, 0, 0, 0, 0 ]
    }
}

module.exports = { roomFactory };