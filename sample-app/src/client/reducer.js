import {
  MAKE_MOVE,
  GAME_OVER,
  NEW_GAME,
  RESET_GAME,
  CHANGE_TURNS,
} from './actions';

export const initialState = {
  grid: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  currentPlayer: 'x',
  xWinCount: 0,
  oWinCount: 0,
  currentWinner: '',
  text: 'X\'s turn'
};

export function reducer (state=initialState, action) {
  switch (action.type) {
  case NEW_GAME:
    return newGameHandler(state);
  case RESET_GAME:
    return resetGameHandler(state);
  case MAKE_MOVE:
    return makeMoveHandler(state, action.payload);
  case CHANGE_TURNS:
    return changeTurnsHandler(state, action.payload);
  case GAME_OVER:
    return gameOverHandler(state, action.payload);
  default: 
    return state;
  }
}

const resetGameHandler = (state) => {
  return Object.assign({}, state, initialState);
};

const newGameHandler = (state) => {
  let oldState = Object.assign({}, state);
  return Object.assign({}, state, {
    grid: [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ],
    currentPlayer: 'x',
    xWinCount: oldState.xWinCount,
    oWinCount: oldState.oWinCount,
    currentWinner: '',
    text: 'X\'s turn'
  });
};

const makeMoveHandler = (state, payload) => {
  let oldState = Object.assign({}, state);
  let grid = oldState.grid;
  grid[payload.row][payload.column] = payload.player;
  return Object.assign({}, state, { grid });
};

const changeTurnsHandler = (state, payload) => {
  let nextPlayer = payload.currentPlayer === 'x' ? 'o' : 'x';
  return Object.assign({}, state, { currentPlayer: nextPlayer, text: `${ nextPlayer.toUpperCase() }'s turn` });
};

const gameOverHandler = (state, payload) => {
  let oldState = Object.assign({}, state);
  let xWinCount = oldState.xWinCount;
  let oWinCount = oldState.oWinCount;
  let text = 'Tie!';

  if (payload.winner) {
    payload.winner === 'x' ? ++xWinCount : ++oWinCount;
    text = `${ payload.winner.toUpperCase() } won!`;
  }
  
  return Object.assign({}, state, {
    currentWinner: payload.winner,
    xWinCount,
    oWinCount,
    text
  });
};