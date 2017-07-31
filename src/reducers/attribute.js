import { attributesInitialState } from '../config/config';
import { UPDATE_ATTRIBUTE } from '../actions/actionTypes';

const attribute = (state = attributesInitialState.defaultValue, action) => {
  if (action.type === UPDATE_ATTRIBUTE) {
    const defaultValue = attributesInitialState.defaultValue;
    const dataTypeChanged = state.dataType !== action.attribute.dataType;
    const formatChanged = state.format !== action.attribute.format;
    const changes = {};

    if (dataTypeChanged) {
      changes.defaultValue = null;
      changes.format = 'none';
    }
    if (formatChanged || dataTypeChanged) {
      const numFields = ['minRange', 'maxRange', 'unitOfMeasurement', 'precision', 'accuracy'];

      for (let i = 0, iLen = numFields.length; i < iLen; i += 1) {
        const field = numFields[i];
        changes[field] = action.attribute.format === 'number' ? defaultValue[field] : null;
      }

      changes.enumerations = [];
    }
    return {
      ...state,
      ...action.attribute,
      ...changes,
      errors: action.errors,
    };
  }
  return state;
};

export default attribute;
