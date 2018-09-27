import { 
  resetGame,
  newGame,
  makeMove,
  changeTurns,
  gameOver

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
    console.log(cells);
    cells.forEach((cell, index) => {
      const row = Math.floor(index / 3);
      const column = index % 3;
      cell.addEventListener('click', () => {
        console.log('cell clicked');
        this.makeMove(row, column);
      });
    });
  }

  resetGame() {
    this.store.dispatch(resetGame());
  }

  newGame() {
    console.log('new game call');
    this.store.dispatch(newGame());
  }

  makeMove(row, column) {
    console.log('make move call');
    const player = this.store.getState().currentPlayer;
    this.store.dispatch(makeMove(row, column, player));
    this.checkGrid();
  }

  checkGrid() {
    const grid = this.store.getState().grid;
    const player = this.store.getState().currentPlayer;
    if (this.checkRows(grid, player) || this.checkColumns(grid, player) || this.checkDiagonals(grid, player)) {
      this.gameOver();
    } else {
      this.store.dispatch(changeTurns(player));
    }
  }

  checkRows(grid, player) {

    for (let i = 0; i < grid.length; i++) {
      if (grid[i].every((cell) => cell === player)) {
        return true;
      }
    }
    return false;
  }

  checkColumns(grid, player) {
    for(let i = 0; i < grid.length; i++) {
      if (grid.map((row) => row[i]).every((cell) => cell === player)) {
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
    console.log('rendering grid');
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

  setPoints() {

  }

  update() {
    this.renderGrid();
    this.setPoints();
  }

  gameOver() {
    
  }
}