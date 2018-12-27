import React from 'react';
import ReactDOM from 'react-dom';
import MainLayout from './containers/layout/MainLayout';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MainLayout />, div);
  ReactDOM.unmountComponentAtNode(div);
});
