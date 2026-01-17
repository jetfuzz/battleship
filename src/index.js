import Player from "./player";
import "./style.css";
import * as dom from './dom'

window.addEventListener("load", () => {
  dom.renderStartScreen();
});

document.body.addEventListener('click', (e) => {
    if (e.target.closest('#start-game-btn')) {
        dom.renderPlacementScreen();
    }
})