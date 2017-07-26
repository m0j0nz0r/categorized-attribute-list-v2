import { combineReducers } from 'redux';
import attributes from './attributes';
import categories from './categories';


export default combineReducers({
  attributes,
  categories,
});
