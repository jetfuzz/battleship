import Player from '../src/player.js';
import Gameboard from '../src/gameboard.js';

describe('Player', () => {
  test('has a gameboard', () => {
    const player = new Player('human');
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });
});