export default class GameController {
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

    this.intervalId = setInterval(this.generateRandomPosition.bind(this), 1000);
  }

  generateRandomPosition() {
    const x = Math.floor(Math.random() * this.boardSize);
    const y = Math.floor(Math.random() * this.boardSize);

    if (!this.molePosition) {
      this.molePosition = { x, y };
      this.gamePlay.setMoleToThePosition(this.molePosition);
    } else {
      if (x !== this.molePosition.x && y !== this.molePosition.y) {
        this.generateRandomPosition();
      }
      this.gamePlay.removeMoleEl(this.molePosition);
      this.molePosition = { x, y };
      this.gamePlay.setMoleToThePosition(this.molePosition);
    }
  }
}
