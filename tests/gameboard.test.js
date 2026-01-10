import Gameboard from '../src/gameboard.js';
import Ship from '../src/ship.js';

describe('Gameboard', () => {
  test('Can place a ship vertically', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3)

    gameboard.placeShip(ship, [0, 0], 'vertical');
    expect(gameboard.board[1][0]).not.toBe(null);
  });

  test('Can place a ship horizontally', () => {
    const gameboard = new Gameboard();
    const ship = new Ship(3)

    gameboard.placeShip(ship, [0, 0], 'horizontal');
    expect(gameboard.board[0][1]).not.toBe(null);
  });
});