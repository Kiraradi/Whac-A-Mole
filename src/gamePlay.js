export default class GamePlay {
  constructor() {
    this.container = null;
    this.boardEl = null;
    this.cells = [];
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
    this.hitsCountContentEl = this.container.querySelector(
      ".hits-count-content"
    );
    this.missCountContentEl = this.container.querySelector(
      ".miss-count-content"
    );

    if (cell.classList.contains("cell")) {
      let missCount = Number(this.missCountContentEl.textContent);
      missCount++;
      this.missCountContentEl.textContent = missCount;
      if (missCount >= 10) {
        alert("Проигрыш");
        this.newGame();
      }
    } else if (cell.classList.contains("target")) {
      let hitsCount = Number(this.hitsCountContentEl.textContent);
      hitsCount++;
      this.hitsCountContentEl.textContent = hitsCount;
      if (hitsCount >= 10) {
        alert("Победа");
        this.newGame();
      }
    }
  }

  createMoleEl() {
    const moleEl = document.createElement("div");
    moleEl.classList.add("target");
    return moleEl;
  }

  setMoleToThePosition(position) {
    if (position) {
      /*const cellEl = document.querySelector(
                "[data-row='" + position.x + "'][data-column='" + position.y + "']"
            ); */
      const cellEl = this.cells.find((cell) => {
        if (
          cell.dataset.row === String(position.x) &&
          cell.dataset.colomn === String(position.y)
        ) {
          return cell;
        }
      });

      const moleEl = this.createMoleEl();
      cellEl.appendChild(moleEl);
    }
  }

  removeMoleEl(position) {
    if (position) {
      const cellEl = this.cells.find((cell) => {
        if (
          cell.dataset.row === String(position.x) &&
          cell.dataset.colomn === String(position.y)
        ) {
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
