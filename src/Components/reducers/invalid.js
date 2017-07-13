import initialState from '../../config/config';
import { ADD_INVALID_ATTRIBUTE, REMOVE_INVALID_ATTRIBUTE } from '../actions/actionTypes';

const invalid = (state = initialState.attributes.invalid, action) => {
  let index;
  switch (action.type) {
    case ADD_INVALID_ATTRIBUTE:
      if (state.indexOf(action.id) === -1) {
        return [...state, ...[action.id]];
      }
      return state;
    case REMOVE_INVALID_ATTRIBUTE:
      index = state.indexOf(action.id);
      if (index === -1) {
        return state;
      }
      return [...state.slice(0, index), ...state.slice(index + 1)];
    default:
      return state;
  }
};

export default invalid;
