export const initialState = {
  grid: [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ],
  currentPlayer: 'o',
  winner: ''
};

export function reducer (state=initialState, action) {
  switch (action.type) {
  default: 
    return state;
  }
}