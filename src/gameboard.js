class Gameboard {
    constructor() {
        this.board = this.#createBoard();
        this.missedAttacks = [];
        this.hitAttacks = [];
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
            this.#placeShipVertical(ship, coords);
        } else if (direction === 'horizontal') {
            this.#placeShipHorizontal(ship, coords);
            this.ships.push(ship);
        }
    }

    #placeShipVertical(ship, coords) {
        let canPlaceShip = true;
        if (ship.length + coords[0] > this.board.length) {
            throw new Error('Ship placement is out of bounds');
        }
        for (let i = 0; i < ship.length; i++) {
            if (this.board[coords[0] + i][coords[1]] !== null) {
                canPlaceShip = false;
                break;
            } 
        }

        if (canPlaceShip) {
            for (let i = 0; i < ship.length; i++) {
                this.ships.push(ship);
                this.board[coords[0] + i][coords[1]] = ship;
            }
        } else {
            throw new Error('Ship placement overlaps with another ship');
        }
    }

    #placeShipHorizontal(ship, coords) {
        let canPlaceShip = true;
        if (ship.length + coords[1] > this.board.length) {
            throw new Error('Ship placement is out of bounds');
        }
        for (let i = 0; i < ship.length; i++) {
            if (this.board[coords[0]][coords[1] + i] !== null) {
                canPlaceShip = false;
                break;
            } 
        }

        if (canPlaceShip) {
            this.ships.push(ship);
            for (let i = 0; i < ship.length; i++) {
                this.board[coords[0]][coords[1] + i] = ship;
            }
        } else {
            throw new Error('Ship placement overlaps with another ship');
        }
    }

    receiveAttack(coords) {
        const alreadyMissed = this.missedAttacks.some(a => coords.every((v, i) => v === a[i]));
        const alreadyHit = this.hitAttacks.some(a => coords.every((v, i) => v === a[i]));

        if (alreadyHit || alreadyMissed) {
            throw new Error('Cannot attack same coordinate twice');
        }

        if (this.board[coords[0]][coords[1]] !== null) {
            this.board[coords[0]][coords[1]].hit();
            this.hitAttacks.push(coords);
        } else {
            this.missedAttacks.push(coords);
        }
    }

    allShipsSunk() {
        for (let ship of this.ships) {
            if (!ship.isSunk()) {
                return false; 
            }
        }
        return true;
    }
}

export default Gameboard