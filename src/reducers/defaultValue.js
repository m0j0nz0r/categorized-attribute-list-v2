import { fieldsInitialState } from '../config/config';
import { UPDATE_ATTRIBUTE } from '../actions/actionTypes';

const defaultFields = fieldsInitialState;

const defaultValue = (state = defaultFields.defaultValue, action) => {
  let updatedAttribute = { ...state, ...action.attribute };
  switch (action.type) {
    case UPDATE_ATTRIBUTE:
      switch (action.attribute.dataType) {
        case 'string':
        case 'object':
          updatedAttribute = { ...updatedAttribute, disabled: action.attribute.dataType === 'object' };
          break;
      }
      break;
  }
  return updatedAttribute;
};

export default defaultValue;
