export const NEW_GAME = 'NEW_GAME';
export const RESET_GAME = 'RESET_GAME';
export const MAKE_MOVE = 'MAKE_MOVE';
export const CHANGE_TURNS = 'CHANGE_TURNS';
export const GAME_OVER = 'GAME_OVER';

export function newGame() {
  return {
    type: NEW_GAME
  };
}

export function resetGame() {
  return {
    type: RESET_GAME
  };
}

export function makeMove(row, column, player) {
  return {
    type: MAKE_MOVE,
    payload: {
      row,
      column,
      player
    }
  };
}
export function changeTurns(currentPlayer) {
  return {
    type: changeTurns,
    payload: { currentPlayer }
  };
}

export function gameOver(winner) {
  return {
    type: GAME_OVER,
    payload: { winner }
  };
}
