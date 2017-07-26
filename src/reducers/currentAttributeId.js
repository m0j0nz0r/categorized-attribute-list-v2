import { EXPAND_ATTRIBUTE, CREATE_ATTRIBUTE } from '../actions/actionTypes';

const currentAttributeId = (state = null, action) => {
  switch (action.type) {
    case EXPAND_ATTRIBUTE:
    case CREATE_ATTRIBUTE:
      return (action.id !== undefined) ? action.id.toString() : null;
    default:
      return state;
  }
};

export default currentAttributeId;
