import initialState from '../../config/config';
import { UPDATE_ATTRIBUTE } from '../actions/actionTypes';

const invalid = (state = initialState.attributes.invalid, action) => {
  const index = state.indexOf(action.id);
  const hasError = action.attribute.errors.length || action.attribute.isDuplicated;
  switch (action.type) {
    case UPDATE_ATTRIBUTE:
      if (hasError && index === -1) {
        return [...state, ...[action.id]];
      } else if (!hasError && index !== -1) {
        return [...state.slice(0, index), ...state.slice(index + 1)];
      }
      return state;
    default:
      return state;
  }
};

export default invalid;
