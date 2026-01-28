import Player from "./player";
import Ship from "./ship";
import "./style.css";
import * as dom from "./dom";

const player = new Player("human");
const computer = new Player("computer");

let currentPlayer = player;

const pCarrier = new Ship(5);
const pBattleship = new Ship(4);
const pDestroyer = new Ship(3);
const pSubmarine = new Ship(3);
const pPatrolBoat = new Ship(2);

const cCarrier = new Ship(5);
const cBattleship = new Ship(4);
const cDestroyer = new Ship(3);
const cSubmarine = new Ship(3);
const cPatrolBoat = new Ship(2);

const playerFleet = [pCarrier, pBattleship, pDestroyer, pSubmarine, pPatrolBoat];
const computerFleet = [cCarrier, cBattleship, cDestroyer, cSubmarine, cPatrolBoat];


player.gameboard.placeShip(playerFleet[0], [0, 1], "horizontal");
player.gameboard.placeShip(playerFleet[1], [3, 0], "horizontal");
player.gameboard.placeShip(playerFleet[2], [1, 7], "vertical");
player.gameboard.placeShip(playerFleet[3], [5, 5], "horizontal");
player.gameboard.placeShip(playerFleet[4], [7, 0], "horizontal");

computer.gameboard.placeShip(computerFleet[0], [1, 1], "horizontal");
computer.gameboard.placeShip(computerFleet[1], [4, 0], "horizontal");
computer.gameboard.placeShip(computerFleet[2], [1, 8], "vertical");
computer.gameboard.placeShip(computerFleet[3], [7, 6], "vertical");
computer.gameboard.placeShip(computerFleet[4], [6, 0], "vertical");

window.addEventListener("load", () => {
  dom.renderStartScreen();
});

document.body.addEventListener("click", (e) => {
  if (e.target.closest("#start-game-btn")) {
    dom.renderPlacementScreen();
    dom.renderBoard(player.gameboard, "placement-gameboard");
  }
  if (e.target.closest("#placement-confirm-btn")) {
    dom.renderGameScreen();
    dom.renderBoard(player.gameboard, "p1-gameboard");
    dom.renderBoard(computer.gameboard, "p2-gameboard");
  }
  if (currentPlayer === player) {
    if (e.target.closest(".cell")) {
      if (e.target.closest(".enemy")) {
        handleAttack(e.target);
        setTimeout(() => {
          handleComputerMove();
        }, 2000);
      }
    }
  }
});

function switchCurrentPlayer () {
  if (currentPlayer === player) {
    currentPlayer = computer;
  } else {
    currentPlayer = player;
  }
}

function handleAttack(cell) {
  let row = Number(cell.dataset.row);
  let col = Number(cell.dataset.col);

  computer.gameboard.receiveAttack([row, col]);
  dom.renderBoard(computer.gameboard, "p2-gameboard");

  if (computer.gameboard.allShipsSunk()) {
    alert("Player won, game over!");
  }
  switchCurrentPlayer();
}

function handleComputerMove() {
  computer.makeRandomMove(player.gameboard);
  dom.renderBoard(player.gameboard, "p1-gameboard");

  if (player.gameboard.allShipsSunk()) {
    alert("Computer won, game over!");
  }
  switchCurrentPlayer();
}