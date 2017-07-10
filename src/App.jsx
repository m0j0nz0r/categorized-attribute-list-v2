import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import attributeList from './config/reducers';
import Categories from './Components/Categories';

const store = createStore(attributeList);

function App() {
  return (<Provider store={store}>
    <Categories />
  </Provider>);
}

export default App;
