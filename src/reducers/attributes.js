import { combineReducers } from 'redux';
import nextAttributeId from './nextAttributeId';
import attributeList from './attributeList';
import form from './form';
import currentAttributeId from './currentAttributeId';

const attributes = combineReducers({
  nextAttributeId,
  attributeList,
  form,
  currentAttributeId,
});

export default attributes;
