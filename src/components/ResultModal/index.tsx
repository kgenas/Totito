import classNames from 'classnames';
import { useSelector, useDispatch } from 'react-redux';
import { newGame } from '../../features/game/totito';
import './ResultModal.css';
import { AppDispatch, RootState } from '../../app/store';
import { winnerCalculatorStart } from '../../features/game/result';

export const ResultModal = () =>{

    const dispatch:AppDispatch = useDispatch();
    const { winner , isGameOver } = useSelector((state: RootState) => state.result );    

    const resultMondalClasses = classNames({
        'modal-overlay': true,
        'modal-overlay--modal-open': isGameOver

    })
    const message = winner ? `Winner is ${ winner }.` :'It is a tie';

    const newGames = () =>{
        dispatch(newGame());
        dispatch(winnerCalculatorStart());
    }
    return(
        <div className= { resultMondalClasses }>
            <div className='game-result-modal'>
                <div className='result-container'>
                    <div className='winner-container'>
                        <span>{ message }</span>
                    </div>
                </div>
                <div className='new-game-container'>
                    <button
                        className='new-game-container__button'
                        onClick={ newGames }
                    >
                        Start New Game
                    </button>
                </div>
            </div>            
        </div>
    )
}