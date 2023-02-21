/* eslint-disable testing-library/no-unnecessary-act */
/* eslint-disable testing-library/no-debugging-utils */
import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { ResultModal } from '../components/ResultModal';
import { renderWithProviders } from '../utils/test-utils';
import { setupStore } from '../app/store';
import { click, newGame } from '../features/game/totito';
import { Board } from '../components/Board';

describe('ResultModal',() =>{
    // Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
    // unmount and cleanup DOM after the test is finished.
    //? afterEach(cleanup);
    test('Renders ResultModal component',() => {
        renderWithProviders(<ResultModal/>);
        screen.debug();
    });

    test('Renders button',() => {
        renderWithProviders(<ResultModal/>);
        const value = screen.getByText(/start new game/i);
        expect(value).toBeInTheDocument();
    });

    test('Matches snapshot', () => { 

        const { baseElement } = renderWithProviders(<ResultModal/>);
        expect( baseElement ).toMatchSnapshot();
    });

    test('New Game', () => {        
        const store = setupStore();
        const newCellValues:string[] = ['X','','X','O','','O','X','',''];
        store.dispatch(click({
                    cellValues:newCellValues,
                    numberOfTurn: (9-1),
                    xIsNext: false,
        }))        
        renderWithProviders(<Board/>, { store });        
        //* can we update Board
        act( () => {
            store.dispatch(newGame());
        });       
        renderWithProviders(<Board/>, { store });

        const value = screen.getAllByRole('button');
        expect(value[0]).toHaveTextContent('');
        screen.debug();
    });
    
});
