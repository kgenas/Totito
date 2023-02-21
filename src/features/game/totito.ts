import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InitialState {
    cellValues: string[];
    numberOfTurn: number;
    xIsNext: boolean;
}
const initialState: InitialState = {
    cellValues: ['','','','','','','','',''],
    numberOfTurn: 9,
    xIsNext: true,
};

export const game = createSlice({
  name: 'game',
  initialState,  
  reducers: {    
    click: (state, action: PayloadAction<InitialState>) => { 
      const { cellValues , numberOfTurn , xIsNext } = action.payload;
      return {
        ...state,
        cellValues,
        numberOfTurn,
        xIsNext
      };
    },    
    newGame: (state) => {
        state.cellValues = initialState.cellValues;
        state.numberOfTurn = initialState.numberOfTurn;
        state.xIsNext = initialState.xIsNext;
      },
  },
});

export const { click, newGame } = game.actions;
export default game.reducer;
