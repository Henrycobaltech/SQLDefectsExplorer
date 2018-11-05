import React from 'react';
import ReactDOM from 'react-dom';
import GitHub from './GitHub';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<GitHub />, div);
  ReactDOM.unmountComponentAtNode(div);
});
