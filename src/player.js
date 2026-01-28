import Gameboard from '../src/gameboard.js';

class Player {
  constructor(type) {
    this.type = type; 
    this.gameboard = new Gameboard();
  }

  makeRandomMove(enemyGameboard) {
    let validMove = false;
    
    while (!validMove) {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      
      const alreadyMissed = enemyGameboard.missedAttacks.some(a => [row, col].every((v, i) => v === a[i]));
      const alreadyHit = enemyGameboard.hitAttacks.some(a => [row, col].every((v, i) => v === a[i]));
      
      if (!alreadyHit && !alreadyMissed) {
        enemyGameboard.receiveAttack([row, col]);
        validMove = true;
      }
    }
  }
}

export default Player;