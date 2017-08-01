import {
  CREATE_ATTRIBUTE,
  UPDATE_ATTRIBUTE,
} from '../actions/actionTypes';
import getType from '../helpers/getType';

const type = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ATTRIBUTE:
    case UPDATE_ATTRIBUTE:
      return getType(
        action.attributeList,
        action.attribute,
      );
    default:
      return state;
  }
};

export default type;
