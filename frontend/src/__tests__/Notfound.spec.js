import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from '../pages/notfound';
import { BrowserRouter } from 'react-router-dom';

describe('NotFound', () => {
    test('snapshot renderer not found page', () => {
        const component = renderer.create(<BrowserRouter><NotFound /></BrowserRouter>);
        let tree = component.toJSON();
        expect(tree).toMatchSnapshot();
    })
})