import Player from "./player";
import Ship from "./ship";
import "./style.css";
import * as dom from './dom'

const player = new Player('human');
const computer = new Player('computer');

const carrier = new Ship(5);
const battleship = new Ship(4);
const destroyer = new Ship(3);
const submarine = new Ship(3);
const patrolBoat = new Ship(2);

const fleet = [carrier, battleship, destroyer, submarine, patrolBoat];

player.gameboard.placeShip(fleet[0], [0,1], 'horizontal');
player.gameboard.placeShip(fleet[1], [3,0], 'horizontal');
player.gameboard.placeShip(fleet[2], [1,7], 'vertical');
player.gameboard.placeShip(fleet[3], [5,5], 'horizontal');
player.gameboard.placeShip(fleet[4], [7,0], 'horizontal');


window.addEventListener("load", () => {
  dom.renderStartScreen()
});

document.body.addEventListener('click', (e) => {
    if (e.target.closest('#start-game-btn')) {
        dom.renderPlacementScreen();
        dom.renderBoard(player.gameboard, 'placement-gameboard');
    }
})