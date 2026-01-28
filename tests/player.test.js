import { describe, test, expect } from '@jest/globals';
import Player from '../src/player.js';
import Gameboard from '../src/gameboard.js';

describe('Player', () => {
  test('has a gameboard', () => {
    const player = new Player('human');
    expect(player.gameboard).toBeInstanceOf(Gameboard);
  });

  test('Can make a random move', () => {
    const computer = new Player('computer');
    const gameboard = new Gameboard();

    computer.makeRandomMove(gameboard);
    const gameboardHitCount = gameboard.hitAttacks.length + gameboard.missedAttacks.length;
    expect(gameboardHitCount).toBeGreaterThan(0)
  });
});