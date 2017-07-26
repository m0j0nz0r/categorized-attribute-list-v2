import React from 'react';
import PropTypes from 'prop-types';
import { Provider, connect } from 'react-redux';
import { createStore } from 'redux';
import './App.css';
import attributeList from './reducers';
import Categories from './Components/Categories';

const store = createStore(attributeList);

const JsonText = ({ src, className }) => (
  <div className={className}>
    <pre>
      {JSON.stringify(src, null, 2)}
    </pre>
  </div>
);

JsonText.propTypes = {
  src: PropTypes.arrayOf(PropTypes.shape({})),
  className: PropTypes.string,
};

JsonText.defaultProps = {
  src: {},
  className: '',
};

const Json = connect(
  state => ({ src: state.attributes.attributeList.map((a) => {
    const attribute = { ...a };
    delete attribute.errors;
    return attribute;
  }),
    className: 'col-6 react-json-view',
  }),
)(JsonText);

function App() {
  return (<Provider store={store}>
    <div className="row">
      <Categories />
      <Json />
    </div>
  </Provider>);
}

export default App;
