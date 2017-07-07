import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import Categories from './Categories';

it('Renders 1 tab per category', () => {
  const div = document.createElement('div');
  const categoryList = ['cat1', 'cat2', 'cat3', 'cat4'];
  const element = ReactDOM.render(<Categories categoryList={categoryList} />, div);
  expect(ReactTestUtils.scryRenderedDOMComponentsWithClass(element, 'react-tabs__tab').length).toBe(categoryList.length);
});
