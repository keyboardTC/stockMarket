
import { TextInput } from 'react-native';
import React from 'react';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';


// Testing  Input component
it('renders the TextInput component', () => {
    const tree = renderer
        .create(<TextInput autoCorrect={false} value="apple banana kiwi" />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});
