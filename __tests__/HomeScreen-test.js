/**
 * @format
 */

import 'react-native';
import React from 'react';
import HomeScreen from '../src/screen/HomeScreen';
import { StockProvider } from '../src/context/StockContext';

// Note: test renderer must be required after react-native.
import { create, act } from 'react-test-renderer';

jest.mock('react', () => {
    const ActualReact = jest.requireActual('react');
    return {
        ...ActualReact,
        useContext: () => ({ stock: {}, addStock: () => jest.fn() }),
    };
});


it('renders correctly', async () => {
    let home;
    act(() => {
        home = create(<HomeScreen />);
    });
    expect(home).toMatchSnapshot()
});

