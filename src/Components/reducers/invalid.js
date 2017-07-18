import { attributesInitialState } from '../../config/config';
import { UPDATE_ATTRIBUTE, DELETE_ATTRIBUTE } from '../actions/actionTypes';

const invalid = (state = attributesInitialState.invalid, action) => {
  const dictionary = {};
  const newState = [];
  let dictionaryKeys;
  let index = state.indexOf(action.id);
  let hasError;
  switch (action.type) {
    case UPDATE_ATTRIBUTE:
    case DELETE_ATTRIBUTE:
      for (const { errors, id, name } of action.list) {
        hasError = errors && errors.some(error => error.message !== 'Duplicated');
        if (hasError && index === -1) {
          newState.push(id);
        } else if (!hasError && index !== -1) {
          newState.splice(index, 1);
        }
        if (dictionary[name]) {
          dictionary[name].push(id);
        } else {
          dictionary[name] = [id];
        }
      }
      dictionaryKeys = Object.keys(dictionary);
      for (const name of dictionaryKeys) {
        if (dictionary[name].length > 1) { // if there are any duplicates
          for (const id of dictionary[name]) {
            index = newState.indexOf(id); // add each id to the invalid array as needed.
            if (index === -1) {
              newState.push(id);
            }
          }
        }
      }
      return newState;
    default:
      return state;
  }
};

export default invalid;
