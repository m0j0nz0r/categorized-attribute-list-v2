import React from 'react';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import ReactJson from 'react-json-view';
import './App.css';
import attributeList from './Components/reducers';
import Categories from './Components/Categories';

const store = createStore(attributeList);

const Json = connect(
  state => ({ src: state.attributes.attributeList.map((a) => {
    const attribute = { ...a };
    delete attribute.errors;
    return attribute;
  }),
    className: 'col-6',
  }),
)(ReactJson);

function App() {
  return (<Provider store={store}>
    <div className="row">
      <Categories />
      <Json />
    </div>
  </Provider>);
}

export default App;
