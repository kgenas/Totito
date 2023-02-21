import './Board.css';
import { useSelector } from 'react-redux';
import { Cell } from '../Cell';
import { RootState } from '../../app/store';
export const Board = () => {
    
  const { cellValues }  = useSelector((state: RootState) => state.game );
  const { winningCombination } = useSelector((state: RootState) => state.result ); 

  const cell = cellValues.map((value:string, index:number)=>{
       
  const switchOnOff = winningCombination && winningCombination.indexOf( index ) >= 0;
    return(
        <Cell
            key = { index }
            value = { value }
            valueKey = { index }
            switchOnOff = { switchOnOff }
        />
    )
  })

  return (
    <div className='board'>
        { cell }
    </div>
  )
}
