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

  it('Should change the currnt player after CHANGE_TURNS action', () => {
    const testAction = {
      type: 'CHANGE_TURNS', 
      payload: {
        currentPlayer: 'x'
      }
    };
    let newState = reducer(testState, testAction);
    expect(newState.currentPlayer).toBe('o');
  });

  it('Should set the currentWinner on GAME_OVER action', () => {
    const testAction = {
      type: 'GAME_OVER', 
      payload: {
        winner: 'x'
      }
    };
    let newState = reducer(testState, testAction);
    expect(newState.currentWinner).toBe('x');
    expect(newState.xWinCount).toBe(2);
    expect(newState.oWinCount).toBe(0);
  });

});