/* eslint-disable testing-library/no-debugging-utils */
import React from 'react';
import { screen } from '@testing-library/react';
import { Board } from '../components/Board';
import { renderWithProviders } from '../utils/test-utils';


describe('Board',() =>{
    // Note: running cleanup afterEach is done automatically for you in @testing-library/react@9.0.0 or higher
    // unmount and cleanup DOM after the test is finished.
    //? afterEach(cleanup);
    test('Renders Board component',() => {
        renderWithProviders(<Board/>);
        screen.debug(); 
    });
    
    test('Matches snapshot', () => { 
        const { baseElement } = renderWithProviders(<Board/>);
        expect( baseElement ).toMatchSnapshot();
    })    
});
