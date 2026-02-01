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
    if (direction === "vertical") {
      this.#placeShipVertical(ship, coords);
    } else {
      this.#placeShipHorizontal(ship, coords);
    }
  }

  #placeShipVertical(ship, coords) {
    let canPlaceShip = true;
    if (ship.length + coords[0] > this.board.length) {
      throw new Error("Ship placement is out of bounds");
    }
    for (let i = 0; i < ship.length; i++) {
      if (this.board[coords[0] + i][coords[1]] !== null) {
        canPlaceShip = false;
        break;
      }
    }

    if (canPlaceShip) {
      for (let i = 0; i < ship.length; i++) {
        this.board[coords[0] + i][coords[1]] = ship;
      }
      this.ships.push(ship);
    } else {
      throw new Error("Ship placement overlaps with another ship");
    }
  }

  #placeShipHorizontal(ship, coords) {
    let canPlaceShip = true;
    if (ship.length + coords[1] > this.board.length) {
      throw new Error("Ship placement is out of bounds");
    }
    for (let i = 0; i < ship.length; i++) {
      if (this.board[coords[0]][coords[1] + i] !== null) {
        canPlaceShip = false;
        break;
      }
    }

    if (canPlaceShip) {
      for (let i = 0; i < ship.length; i++) {
        this.board[coords[0]][coords[1] + i] = ship;
      }
      this.ships.push(ship);
    } else {
      throw new Error("Ship placement overlaps with another ship");
    }
  }

  receiveAttack(coords) {
    const alreadyMissed = this.missedAttacks.some((a) =>
      coords.every((v, i) => v === a[i]),
    );
    const alreadyHit = this.hitAttacks.some((a) =>
      coords.every((v, i) => v === a[i]),
    );

    if (alreadyHit || alreadyMissed) {
      throw new Error("Cannot attack same coordinate twice");
    }

    if (this.board[coords[0]][coords[1]] !== null) {
      this.board[coords[0]][coords[1]].hit();
      this.hitAttacks.push(coords);

      if (this.board[coords[0]][coords[1]].isSunk()) {
        return "sunk a ship!";
      }
      return "hits!";
    } else {
      this.missedAttacks.push(coords);
      return "misses!";
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

  randomizePlacement(fleet) {
    fleet.forEach((ship) => {
      let shipPlaced = false;

      while (!shipPlaced) {
        let direction =
          Math.round(Math.random()) === 0 ? "vertical" : "horizontal";
        let row = Math.floor(Math.random() * 10);
        let col = Math.floor(Math.random() * 10);

        try {
          this.placeShip(ship, [row, col], direction);
          shipPlaced = true;
        } catch {
          continue;
        }
      }
    });
  }
}

export default Gameboard;
