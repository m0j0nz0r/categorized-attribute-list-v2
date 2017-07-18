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
        (attribute) => {
          hasError = attribute.errors && attribute.errors.filter(error => error.message !== 'Duplicated').length;
          if (hasError && index === -1) {
            newState.push(attribute.id);
          } else if (!hasError && index !== -1) {
            newState.splice(index, 1);
          }
          if (dictionary[attribute.name]) {
            dictionary[attribute.name].push(attribute.id);
          } else {
            dictionary[attribute.name] = [attribute.id];
          }
        },
      );
      Object.keys(dictionary).forEach(
        (name) => {
          if (dictionary[name].length > 1) { // if there are any duplicates
            dictionary[name].forEach((id) => {
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
