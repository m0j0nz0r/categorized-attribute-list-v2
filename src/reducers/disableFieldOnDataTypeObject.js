import { UPDATE_ATTRIBUTE } from '../actions/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case UPDATE_ATTRIBUTE:
      switch (action.attribute.dataType) {
        case 'string':
        case 'object':
          return { ...state, disabled: action.attribute.dataType === 'object' };
        default:
          return state;
      }
    default:
      return state;
  }
};
