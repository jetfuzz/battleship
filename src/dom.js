export {
  renderStartScreen,
  renderPlacementScreen,
  renderGameScreen,
  updateMessage,
  renderEndScreen,
  renderBoard,
  closeModal,
};

function clearDisplay() {
  let startScreenDiv = document.getElementById("start-screen");
  let placementScreenDiv = document.getElementById("placement-screen");
  let gameScreenDiv = document.getElementById("game-screen");
  let endScreenDiv = document.getElementById("end-screen");
  startScreenDiv.innerHTML = "";
  placementScreenDiv.innerHTML = "";
  gameScreenDiv.innerHTML = "";
  endScreenDiv.innerHTML = "";
}

function renderStartScreen() {
  clearDisplay();
  let startScreenDiv = document.getElementById("start-screen");
  startScreenDiv.innerHTML = `
        <h1>BATTLESHIP</h1>
        <button id="start-game-btn">Start Game</button>
    `;
}

function renderPlacementScreen() {
  clearDisplay();
  let placementScreenDiv = document.getElementById("placement-screen");
  placementScreenDiv.innerHTML = `
        <div class="message">Place your fleet</div>
        <div class="placement-buttons">
            
        </div>
        <div class="gameboard" id="placement-gameboard"></div>
        <div class="placement-buttons">
            <button id="randomize-board-btn">Randomize</button>
            
            <button id="placement-confirm-btn">Confirm</button>
        </div>
    `;
}

function renderGameScreen() {
  clearDisplay();
  let GameScreenDiv = document.getElementById("game-screen");
  GameScreenDiv.innerHTML = `
        <div class="gameboards">
            <div class="gameboard-container">
                <p class="fleet-para">Your Fleet</p>
                <div class="gameboard" id="p1-gameboard"></div>
            </div>
            <div class="gameboard-container">
                <p class="fleet-para">Enemy Waters</p>
                <div class="gameboard enemy" id="p2-gameboard"></div>
            </div>
        </div>
        <p class="message" id="message">Your Turn</p>
    `;
}

function updateMessage(newText) {
  let message = document.getElementById("message");
  message.innerHTML = newText;
}

function renderEndScreen(winner) {
  const endGameModal = document.getElementById("end-screen");
  console.log(winner);
  let message;
  if (winner.type === "human") {
    message = "You win!";
  } else {
    message = "You lose!";
  }
  endGameModal.innerHTML = `
        <h3><i>${message}</i></h3>
        <button id="new-game-btn">New Game</button>
    `;
  endGameModal.showModal();
}

function closeModal() {
  const endGameModal = document.getElementById("end-screen");
  endGameModal.close();
}

function renderBoard(gameboard, containerId) {
  const container = document.getElementById(containerId);
  container.innerHTML = ``;
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let cell = document.createElement("div");
      cell.className = "cell";
      cell.dataset.row = i;
      cell.dataset.col = j;
      container.appendChild(cell);
      if (gameboard.board[i][j] !== null) {
        console.log();
        cell.classList.add("active");
      }

      if (
        gameboard.missedAttacks.some((a) =>
          [i, j].every((v, idx) => v === a[idx]),
        )
      ) {
        cell.classList.add("miss");
        cell.innerHTML = "&#9679;";
      }
      if (
        gameboard.hitAttacks.some((a) => [i, j].every((v, idx) => v === a[idx]))
      ) {
        cell.classList.add("hit");
        cell.innerHTML = "&#9679;";
        if (gameboard.board[i][j].isSunk()) {
          cell.innerHTML = "&#10060;&#xFE0E;";
          cell.classList.add("sunk");
        }
      }
    }
  }
}
