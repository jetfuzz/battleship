import Gameboard from '../src/gameboard.js';

class Player {
  constructor(type) {
    this.type = type; 
    this.gameboard = new Gameboard();
  }
}

export default Player;