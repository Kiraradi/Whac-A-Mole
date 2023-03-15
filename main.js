/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/gameController.js
class GameController {
  constructor(gamePlay) {
    this.gamePlay = gamePlay;
    this.boardSize = 4;
  }
  init() {
    this.board = [];
    for (let i = 0; i < this.boardSize; i++) {
      this.board[i] = [];
      for (let j = 0; j < this.boardSize; j++) {
        this.board[i][j] = null;
      }
    }
    this.gamePlay.drawUi(this.board);
    this.gamePlay.generateRandomPosition = this.generateRandomPosition.bind(this);
    this.intervalId = setInterval(this.generateRandomPosition.bind(this), 1000);
  }
  generateRandomPosition() {
    let check = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
    if (this.intervalId && check) {
      clearInterval(this.intervalId);
      this.intervalId = setInterval(this.generateRandomPosition.bind(this), 1000);
      console.log('new Interval');
    }
    const x = Math.floor(Math.random() * this.boardSize);
    const y = Math.floor(Math.random() * this.boardSize);
    if (!this.molePosition) {
      this.molePosition = {
        x,
        y
      };
      this.gamePlay.setMoleToThePosition(this.molePosition);
    } else {
      if (x !== this.molePosition.x && y !== this.molePosition.y) {
        this.generateRandomPosition();
      }
      this.gamePlay.removeMoleEl(this.molePosition);
      this.molePosition = {
        x,
        y
      };
      this.gamePlay.setMoleToThePosition(this.molePosition);
    }
  }
}
;// CONCATENATED MODULE: ./src/gamePlay.js
class GamePlay {
  constructor() {
    this.container = null;
    this.boardEl = null;
    this.cells = [];
    this.generateRandomPosition = () => {};
  }
  bindToDOM(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("container is not HTMLElement");
    }
    this.container = container;
  }
  drawUi(board) {
    this.boardEl = this.container.querySelector(".board");
    for (let i = 0; i < board.length; i++) {
      const rowEl = document.createElement("div");
      rowEl.classList.add("row");
      for (let j = 0; j < board.length; j++) {
        const cellEl = document.createElement("div");
        cellEl.classList.add("cell");
        cellEl.setAttribute("data-row", i);
        cellEl.setAttribute("data-colomn", j);
        rowEl.appendChild(cellEl);
        this.cells.push(cellEl);
      }
      this.boardEl.appendChild(rowEl);
    }
    this.boardEl.addEventListener("click", () => {
      this.checkingCell(event.target);
    });
    const newGameButton = this.container.querySelector(".new-game-button");
    newGameButton.addEventListener("click", () => {
      this.newGame();
    });
  }
  checkingCell(cell) {
    this.hitsCountContentEl = this.container.querySelector(".hits-count-content");
    this.missCountContentEl = this.container.querySelector(".miss-count-content");
    if (cell.classList.contains("cell")) {
      let missCount = Number(this.missCountContentEl.textContent);
      missCount++;
      this.missCountContentEl.textContent = missCount;
      if (missCount >= 5) {
        alert("Проигрыш");
        this.newGame();
      }
    } else if (cell.classList.contains("target")) {
      let hitsCount = Number(this.hitsCountContentEl.textContent);
      hitsCount++;
      this.hitsCountContentEl.textContent = hitsCount;
      if (hitsCount >= 5) {
        alert("Победа");
        this.newGame();
      }
      this.generateRandomPosition(true);
    }
  }
  createMoleEl() {
    const moleEl = document.createElement("div");
    moleEl.classList.add("target");
    return moleEl;
  }
  setMoleToThePosition(position) {
    if (position) {
      const cellEl = this.cells.find(cell => {
        if (cell.dataset.row === String(position.x) && cell.dataset.colomn === String(position.y)) {
          return cell;
        }
      });
      const moleEl = this.createMoleEl();
      cellEl.appendChild(moleEl);
    }
  }
  removeMoleEl(position) {
    if (position) {
      const cellEl = this.cells.find(cell => {
        if (cell.dataset.row === String(position.x) && cell.dataset.colomn === String(position.y)) {
          return cell;
        }
      });
      const moleEl = cellEl.firstChild;
      moleEl.remove();
    }
  }
  newGame() {
    this.missCountContentEl.textContent = 0;
    this.hitsCountContentEl.textContent = 0;
  }
}
;// CONCATENATED MODULE: ./src/js/app.js


const gamePlay = new GamePlay();
gamePlay.bindToDOM(document.querySelector(".game-container"));
const gameController = new GameController(gamePlay);
gameController.init();
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;