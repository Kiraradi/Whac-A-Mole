import GameController from "../gameController";
import GamePlay from "../gamePlay";

const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector(".game-container"));
const gameController = new GameController(gamePlay);
gameController.init();
