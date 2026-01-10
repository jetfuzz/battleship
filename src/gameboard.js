class Gameboard {
    constructor() {
        this.board = this.#createBoard();
        this.missedAttacks = [];
        this.ships = [];
    }

    #createBoard() {
        const rows = 10;
        const cols = 10;
        const array = [];

        for (let i = 0; i < rows; i++) {
            array[i] = [];
            for (let j = 0; j < cols; j++) {
                array[i][j] = null;
            }
        }
        return array;
    }

    placeShip(ship, coords, direction) {
        if (direction === 'vertical') {
            this.placeShipVertical(ship, coords);
        } else if (direction === 'horizontal') {
            this.placeShipHorizontal(ship, coords);
        }
    }

    placeShipVertical(ship, coords) {
        for (let i = 0; i < ship.length; i++) {
            this.board[coords[0] + i][coords[1]] = ship;
        }
    }

    placeShipHorizontal(ship, coords) {
        for (let i = 0; i < ship.length; i++) {
            this.board[coords[0]][coords[1] + i] = ship;
        }
    }

}

export default Gameboard