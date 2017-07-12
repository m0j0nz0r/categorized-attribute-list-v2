import { combineReducers } from 'redux';
import initialState from './config';
import * as actions from './actions';

const defaultFields = initialState.attributes.form.options.fields;

const emptyReducerFactory = key => (state = defaultFields[key]) => state;
const name = emptyReducerFactory('name');
const description = emptyReducerFactory('description');
const deviceResourceType = emptyReducerFactory('deviceResourceType');
const dataType = emptyReducerFactory('dataType');

const defaultValue = (state = defaultFields.defaultValue, action) => {
  let updatedAttribute = Object.assign(state, action.attribute);
  switch (action.type) {
    case actions.UPDATE_ATTRIBUTE:
      // Data type logic.
      switch (action.attribute.dataType) {
        case 'string':
        case 'object':
          updatedAttribute = Object.assign({}, updatedAttribute, { disabled: action.attribute.dataType === 'object' });
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

const format = (state = defaultFields.format, action) => {
  switch (action.type) {
    case actions.UPDATE_ATTRIBUTE:
      // Data type logic.
      switch (action.attribute.dataType) {
        case 'string':
        case 'object':
          return Object.assign({}, state, { disabled: action.attribute.dataType === 'object' });
        default:
          return state;
      }
    default:
      return state;
  }
};

const enumerations = emptyReducerFactory('enumerations');
const minRange = emptyReducerFactory('minRange');
const maxRange = emptyReducerFactory('maxRange');
const unitOfMeasurement = emptyReducerFactory('unitOfMeasurement');
const precision = emptyReducerFactory('precision');
const accuracy = emptyReducerFactory('accuracy');

export default combineReducers({
  name,
  description,
  deviceResourceType,
  defaultValue,
  dataType,
  format,
  enumerations,
  minRange,
  maxRange,
  unitOfMeasurement,
  precision,
  accuracy,
});
