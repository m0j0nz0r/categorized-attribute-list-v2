import initialState from '../../config/config';
import { UPDATE_ATTRIBUTE } from '../actions/actionTypes';

const defaultFields = initialState.attributes.form.options.fields;

const format = (state = defaultFields.format, action) => {
  switch (action.type) {
    case UPDATE_ATTRIBUTE:
      // Data type logic.
      switch (action.attribute.dataType) {
        case 'string':
        case 'object':
          return { ...state, ...{ disabled: action.attribute.dataType === 'object' } };
        default:
          return state;
      }
    default:
      return state;
  }
};

export default format;