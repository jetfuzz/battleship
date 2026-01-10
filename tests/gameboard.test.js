import Gameboard from '../src/gameboard.js';
import Ship from '../src/ship.js';

describe('Gameboard', () => {
  let gameboard;

  beforeEach(() => {
    gameboard = new Gameboard();
  });

  describe('Ship placement', () => {
    test('Can place a ship vertically', () => {
      const ship = new Ship(3);

      gameboard.placeShip(ship, [0, 0], 'vertical');
      expect(gameboard.board[1][0]).not.toBe(null);
    });

    test('Can place a ship horizontally', () => {
      const ship = new Ship(3);

      gameboard.placeShip(ship, [0, 0], 'horizontal');
      expect(gameboard.board[0][1]).not.toBe(null);
    });

    test('Cannot place a ship outside of grid', () => {
      const ship = new Ship(5);

      expect(() => {
        gameboard.placeShip(ship, [8, 8], 'horizontal')
      }).toThrow('out of bounds');
    });

    test('Cannot place overlapping ships', () => {
      const ship1 = new Ship(4);
      const ship2 = new Ship(4);

      gameboard.placeShip(ship1, [0, 0], 'vertical');

      expect(() => {
        gameboard.placeShip(ship2, [0, 0], 'vertical');
      }).toThrow('placement overlap');
    });
  });

  describe('Received attacks', () => {
    test('Record missed attacks', () => {
      gameboard.receiveAttack([3, 3]);
      expect(gameboard.missedAttacks).toContainEqual([3, 3]);
    });

    test('Record landed attacks', () => {
      let ship = new Ship(3);

      gameboard.placeShip(ship, [2, 2], 'horizontal')
      gameboard.receiveAttack([2, 2]);

      expect(ship.hitCount).toBe(1);
    });

    test('Record when all ships are sunk', () => {
      let ship = new Ship(3);

      gameboard.placeShip(ship, [2, 2], 'horizontal')
      gameboard.receiveAttack([2, 2]);
      gameboard.receiveAttack([2, 3]);
      gameboard.receiveAttack([2, 4]);

      expect(gameboard.allShipsSunk()).toBe(true);
    });

    test('Record when not all ships are sunk', () => {
      let ship = new Ship(2);

      gameboard.placeShip(ship, [2, 2], 'horizontal')
      gameboard.receiveAttack([2, 2]);

      expect(gameboard.allShipsSunk()).toBe(false);
    });
  });
});