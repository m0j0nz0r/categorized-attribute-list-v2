import { attributesInitialState } from '../../config/config';
import { UPDATE_ATTRIBUTE, DELETE_ATTRIBUTE } from '../actions/actionTypes';

const invalid = (state = attributesInitialState.invalid, action) => {
  const dictionary = {};
  const newState = [];
  let index = state.indexOf(action.id);
  let hasError;
  switch (action.type) {
    case UPDATE_ATTRIBUTE:
    case DELETE_ATTRIBUTE:
      action.list.forEach(
        (a) => {
          hasError = a.errors && a.errors.filter(e => e.message !== 'Duplicated').length;
          if (hasError && index === -1) {
            newState.push(a.id);
          } else if (!hasError && index !== -1) {
            newState.splice(index, 1);
          }
          if (dictionary[a.name]) {
            dictionary[a.name].push(a.id);
          } else {
            dictionary[a.name] = [a.id];
          }
        },
      );
      Object.keys(dictionary).forEach(
        (n) => {
          if (dictionary[n].length > 1) { // if there are any duplicates
            dictionary[n].forEach((id) => {
              index = newState.indexOf(id); // add each id to the invalid array as needed.
              if (index === -1) {
                newState.push(id);
              }
            });
          }
        },
      );
      return newState;
    default:
      return state;
  }
};

export default invalid;
