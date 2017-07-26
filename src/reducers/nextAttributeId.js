import { attributesInitialState } from '../config/config';
import { CREATE_ATTRIBUTE } from '../actions/actionTypes';

const nextAttributeId = (state = attributesInitialState.nextAttributeId, action) => {
  switch (action.type) {
    case CREATE_ATTRIBUTE:
      return state + 1;
    default:
      return state;
  }
};

export default nextAttributeId;
