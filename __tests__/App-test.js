/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../src/App';
import { StockProvider } from '../src/context/StockContext';

// Note: test renderer must be required after react-native.
import { act, create } from 'react-test-renderer';

jest.mock("@react-navigation/native", () => {
  const actualNav = jest.requireActual("@react-navigation/native")
  // console.log("HERE: ", actualNav);
  return {
    ...actualNav,
    NavigationContainer: () => jest.fn()
  }
})

jest.mock("@react-navigation/native-stack", () => {
  return {
    createNativeStackNavigator: () => ({
      Navigator: () => jest.fn(),
      Screen: () => jest.fn()
    })
  }
})

it('renders correctly', () => {
  act(() => {
    const app = create(<App />);
    // console.log(app.toJSON());
    expect(app.toJSON()).toMatchSnapshot()
  });
});

