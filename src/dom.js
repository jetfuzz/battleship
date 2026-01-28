export {
    renderStartScreen,
    renderPlacementScreen,
    renderGameScreen,
    renderBoard
}

function clearDisplay() {
    let startScreenDiv = document.getElementById('start-screen');
    let PlacementScreenDiv = document.getElementById('placement-screen');
    let GameScreenDiv = document.getElementById('game-screen');
    let EndScreenDiv = document.getElementById('end-screen');
    startScreenDiv.innerHTML = '';
    PlacementScreenDiv.innerHTML = '';
    GameScreenDiv.innerHTML = '';
    EndScreenDiv.innerHTML = '';
}

function renderStartScreen() {
    clearDisplay();
    let startScreenDiv = document.getElementById('start-screen');
    startScreenDiv.innerHTML = `
        <h1>BATTLESHIP</h1>
        <button id="start-game-btn">Start Game</button>
    `;
}

function renderPlacementScreen() {
    clearDisplay();
    let placementScreenDiv = document.getElementById('placement-screen');
    placementScreenDiv.innerHTML = `
        <div class="message">Place your fleet</div>
        <div class="placement-buttons">
            <button class="active">X Axis</button>
            <button>Y Axis</button>
        </div>
        <div class="gameboard" id="placement-gameboard"></div>
        <div class="placement-buttons">
            <button>Randomize</button>
            <button>Reset</button>
            <button id="placement-confirm-btn">Confirm</button>
        </div>
    `;
}

function renderGameScreen() {
    clearDisplay();
    let GameScreenDiv = document.getElementById('game-screen');
    GameScreenDiv.innerHTML = `
        <div class="gameboards">
            <div class="gameboard-container">
                <p class="fleet-para">Your Fleet</p>
                <div class="gameboard" id="p1-gameboard"></div>
            </div>
            <div class="gameboard-container">
                <p class="fleet-para">Enemy Fleet</p>
                <div class="gameboard enemy" id="p2-gameboard"></div>
            </div>
        </div>
        <div class="message" id="message">Your Turn</div>
    `;
}

function updateMessage() {

}

function renderEndScreen() {

}

function renderBoard(gameboard, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ``;
    for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
            let cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = i;
            cell.dataset.col = j;
            container.appendChild(cell);
            if (gameboard.board[i][j] !== null) {
                cell.classList.add('active');
            }
            if (gameboard.missedAttacks.some(a => [i,j].every((v, idx) => v === a[idx]))) {
                cell.classList.add('miss');
            }
            if (gameboard.hitAttacks.some(a => [i,j].every((v, idx) => v === a[idx]))) {
                cell.classList.add('hit');
            }
        }
    }
}