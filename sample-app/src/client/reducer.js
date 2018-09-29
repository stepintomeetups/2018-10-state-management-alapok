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

// Create a reducer that will handle the different actions within the application
export function reducer (state=initialState, action) {
  switch (action.type) {
  default: 
    return state;
  }
}
