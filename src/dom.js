export {
    renderStartScreen,
    renderPlacementScreen
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
    clearDisplay()
    let startScreenDiv = document.getElementById('start-screen');
    startScreenDiv.innerHTML = `
        <h1>BATTLESHIP</h1>
        <button id="start-game-btn">Start Game</button>
    `
}

function renderPlacementScreen() {
    clearDisplay()
}

function renderGameScreen() {
    
}

function renderEndScreen() {

}

function renderBoard() {
    
}