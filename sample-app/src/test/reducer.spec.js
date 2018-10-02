import { initialState, reducer } from '../client/reducer';

/*eslint-disable no-undef*/
describe('Reducer tests', () => {
  let initial = {};
  let testState = {};
  beforeEach(() => {
    initial = initialState;
    
    testState = {
      grid: [['', 'x', 'o'], ['', 'x', 'o'], ['', 'x', '']],
      currentWinner: 'x',
      currentPlayer: 'x',
      xWinCount: 1,
      oWinCount: 0,
      text: 'X won!'
    };
  });

  it('Should reset the state on RESET_STATE action', () => {
    let newState = reducer(testState, {type: 'RESET_GAME'});
    expect(newState).toEqual(initial);
  });

  it('Should keep the win counts after NEW_GAME action', () => {
    let newState =  reducer(testState, {type: 'NEW_GAME'});
    expect(newState.xWinCount).toBe(1);
    expect(newState.oWinCount).toBe(0);
  });
});