/* eslint-disable testing-library/no-debugging-utils */
import React from 'react';
import { screen } from '@testing-library/react';
import { setupStore } from '../app/store';
import { Cell } from '../components/Cell/index';
import { renderWithProviders } from '../utils/test-utils';
import { click } from '../features/game/totito';
import { Board } from '../components/Board';
import { winnerCalculatorValue } from '../features/game/result';
import { ResultModal } from '../components/ResultModal';

describe('Cell',() =>{

    // Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
    // unmount and cleanup DOM after the test is finished.
    //? afterEach(cleanup);
    test('Renders Cell component',() => {
        renderWithProviders(<Cell key={1} value={''} valueKey={0} switchOnOff={false} />);        
    });
    test('Matches snapshot',() => {
        
        const { baseElement } = renderWithProviders(<Cell key={2} value={''} valueKey={2} switchOnOff={false} />);
        expect( baseElement ).toMatchSnapshot();
    });

    test('Click Cell', () => {        
        const store = setupStore();
        const newCellValues:string[] = [];
        newCellValues[0] = 'X';        
        store.dispatch(click({
                    cellValues:newCellValues,
                    numberOfTurn: (9-1),
                    xIsNext: false,
        }))
        renderWithProviders(<Board/>, { store });
        const value = screen.getAllByRole('button');
        expect(value[0]).toHaveTextContent('X');        
        screen.debug();
     });
     
    test('Winner X Calculator', () => { 
        const store = setupStore();
        const newCellValues:string[] = ['X','X','X']; //* 0,1,2

        store.dispatch(winnerCalculatorValue(newCellValues,(5-1),0,));
        renderWithProviders(<ResultModal/>, { store })        
        expect(screen.getByText(/Winner is X./i)).toBeInTheDocument();
        screen.debug();
    });
});

