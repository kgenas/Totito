import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../../app/store';

export interface InitialState {
    isGameOver: boolean;
    winner: ( string | undefined );
    winningCombination: number[];
}
const dataArray: InitialState = {
    isGameOver: false,
    winner: undefined,
    winningCombination:[],
};

export const result = createSlice({
  name: 'result',
  initialState:dataArray,  
  reducers: {
    
    winnerCalculator: (state, action: PayloadAction<InitialState>) => { 
      const { isGameOver , winner , winningCombination } = action.payload;
      return {
        ...state,
        isGameOver,
        winner,
        winningCombination
      };
    },  
    winnerCalculatorStart: (state) => {
        state.isGameOver = dataArray.isGameOver;
        state.winner = dataArray.winner;
        state.winningCombination = dataArray.winningCombination;
      },
  },
});

export const { winnerCalculator, winnerCalculatorStart } = result.actions;

  const winnningMatrix:any = {
      0:[[1,2],[3,6],[4,8]], //? example 0,1,2 o 0,3,6 o 0,4,8
      1:[[0,2],[4,7]],
      2:[[0,1],[5,8],[4,6]],
      3:[[0,6],[4,5]],
      4:[[2,6],[3,5],[1,7],[0,8]],
      5:[[3,4],[2,8]],
      6:[[7,8],[0,3],[2,4]],
      7:[[6,8],[1,4]],
      8:[[6,7],[2,5],[0,4]]
  }

  export const winnerCalculatorValue = 
  (cellValues:string[], numberOfTurn:number, cellIndex:number):AppThunk =>
  (dispatch) =>
  {

      if( numberOfTurn === 0 ){
          dispatch(winnerCalculator({
              isGameOver:true,
              winner:undefined,
              winningCombination:[]
          }));        
      };   
      const WinningOptions = winnningMatrix[cellIndex];
      for(let WinningOption of WinningOptions){
          
          const currentValue = cellValues[cellIndex];
          const firstOption =  cellValues[WinningOption[0]];
          const secondOption = cellValues[WinningOption[1]];

          if(currentValue === firstOption && firstOption === secondOption ){             
              dispatch(winnerCalculator({
                  isGameOver:true,
                  winner:currentValue,
                  winningCombination:[cellIndex,WinningOption[0],WinningOption[1]]
              }));            
          };
      };         
  }


export default result.reducer;
