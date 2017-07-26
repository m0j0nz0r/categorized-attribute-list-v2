import { combineReducers } from 'redux';
import options from './options';
import type from './type';

const form = combineReducers({
  options,
  type,
});

export default form;
