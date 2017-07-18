import { fieldsInitialState } from '../../config/config';
import { UPDATE_ATTRIBUTE } from '../actions/actionTypes';

const defaultFields = fieldsInitialState;

const defaultValue = (state = defaultFields.defaultValue, action) => {
  let updatedAttribute = { ...state, ...action.attribute };
  switch (action.type) {
    case UPDATE_ATTRIBUTE:
      // Data type logic.
      switch (action.attribute.dataType) {
        case 'string':
        case 'object':
          updatedAttribute = { ...updatedAttribute, disabled: action.attribute.dataType === 'object' };
          break;
        default:
          // Do nothing.
      }
      break;
    default:
      // Do nothing.
  }
  return updatedAttribute;
};

export default defaultValue;
