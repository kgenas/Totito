import './Cell.css';
import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { AppDispatch, RootState } from '../../app/store';
import { winnerCalculatorValue } from '../../features/game/result';
import { click } from '../../features/game/totito';

interface valueProps {    
    key: number ;
    value: string;
    valueKey: number;
    switchOnOff: boolean;
}
export const Cell = ( props: valueProps ) => {
          
    const { cellValues, numberOfTurn, xIsNext } = useSelector((state: RootState) => state.game );    
    const dispatch:AppDispatch = useDispatch();

    const isCellEmpty = ( cellIndex:number ) => cellValues[cellIndex] === '';
    const onCellClicked = () =>{ 
      
      if (isCellEmpty( props.valueKey )){
        const newCellValues = [...cellValues];
        newCellValues[props.valueKey] = xIsNext ? 'X':'O';
        dispatch(winnerCalculatorValue( newCellValues,(numberOfTurn-1),props.valueKey ));        
        dispatch(click(
            {
                cellValues: newCellValues,
                numberOfTurn: (numberOfTurn-1),
                xIsNext: !xIsNext,
            }
        ));
    }
    }
    const cellCss = classNames({
        cell: true,
        winner: props.switchOnOff
    })

    const cellContentCss = classNames({
        'cell--contet': true,
        populated: props.value 
    })

  return (
    <button
        className={ cellCss }
        onClick = { onCellClicked }
    >
        <span
            className={ cellContentCss }
        >
            { props.value }
        </span>
    </button>
  )
}
