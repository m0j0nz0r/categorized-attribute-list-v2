import initialState from '../../config/config';
import { UPDATE_ATTRIBUTE } from '../actions/actionTypes';

const invalid = (state = initialState.attributes.invalid, action) => {
  let index;
  switch (action.type) {
    case UPDATE_ATTRIBUTE:
      if (!action.attribute.isValid && state.indexOf(action.id) === -1) {
        return [...state, ...[action.id]];
      } else if (action.attribute.isValid) {
        index = state.indexOf(action.id);
        if (index === -1) {
          return state;
        }
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state;
    default:
      return state;
  }
};

export default invalid;
