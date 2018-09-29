import { 
  resetGame,
  newGame,
  makeMove,
  changeTurns,
  gameOver,
} from './actions';

export class Game {
  constructor(config) {
    this.ui = config.ui;
    this.store = config.store;

    this.store.subscribe(this.update.bind(this));

    this.ui
      .querySelector('.reset-button')
      .addEventListener('click', () => {
        this.resetGame();
      });
    this.ui
      .querySelector('.new-game-button')
      .addEventListener('click', () => {
        this.newGame();
      });

    const cells = this.ui.querySelectorAll('.tic-tac-grid-cell');
    cells.forEach((cell, index) => {
      const row = Math.floor(index / 3);
      const column = index % 3;
      cell.addEventListener('click', () => {
        this.makeMove(row, column);
      });
    });
  }

  makeMove(row, column) {
    if (!this.store.getState().currentWinner) {
      const player = this.store.getState().currentPlayer;
      const grid = this.store.getState().grid;
      if (!grid[row][column]) {
        // Dispatch a MAKE_MOVE action with the current row, column and the player as payload
        this.checkGrid();
      }
    }
  }

  resetGame() {
    // Dispatch a RESET_GAME action in this function
  }

  newGame() {
    // Dispatch a NEW_GAME action in this function
  }

  checkGrid() {
    const grid = this.store.getState().grid;
    const player = this.store.getState().currentPlayer;
    if (this.checkRows(grid, player) || this.checkColumns(grid, player) || this.checkDiagonals(grid, player)) {
      const winner = this.store.getState().currentPlayer;
      // Dispatch a GAME_OVER action with the winner in the payload
    } else if (this.isTie(grid)) {
      // Dispatch a GAME_OVER action with no payload
    } else {
      // Dispatch an action that will change turns with the current player as payload
    }
  }

  //TODO refactor this
  isTie(grid) {
    const cells = grid.flat();
    for(let i = 0; i < cells.length; i++) {
      if (!cells[i]) {
        return false;
      }
    }
    return true;
  }

  checkRows(grid, player) {
    for (let i = 0; i < grid.length; i++) {
      if (grid[i].every(cell => cell === player)) {
        return true;
      }
    }
    return false;
  }

  checkColumns(grid, player) {
    for(let i = 0; i < grid.length; i++) {
      if (grid.map(row => row[i]).every(cell => cell === player)) {
        return true;
      } 
    }
    return false;
  }

  checkDiagonals(grid, player) {
    if ([grid[0][0], grid[1][1], grid[2][2]].every(cell => cell === player)) {
      return true;
    }
    if ([grid[0][2], grid[1][1], grid[2][0]].every(cell => cell === player)) {
      return true;
    }
    return false;
  }

  renderGrid() {
    const grid = this.store.getState().grid;
    let cells = this.ui.querySelectorAll('.tic-tac-grid-cell');
    cells.forEach((cell, index) => {
      const value = grid[Math.floor(index / 3)][index % 3];
      cell.classList =  ['tic-tac-grid-cell'];
      if (value) {
        value === 'x' ? cell.classList.add('tic-tac-x') : cell.classList.add('tic-tac-o');
      }
    });
  }

  setWinCounts() {
    const xWinCount = this.store.getState().xWinCount;
    const oWinCount = this.store.getState().oWinCount;
    this.ui.querySelector('.x-win-count').innerText = `X's wins: ${xWinCount}`;
    this.ui.querySelector('.o-win-count').innerText = `O's wins: ${oWinCount}`;
  }

  setTurnText() {
    const text = this.store.getState().text;
    this.ui.querySelector('.current-turn').innerText = text;
  }

  update() {
    this.renderGrid();
    this.setWinCounts();
    this.setTurnText();
  }
}