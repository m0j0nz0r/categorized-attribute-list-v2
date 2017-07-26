import { combineReducers } from 'redux';
import { fieldsInitialState } from '../config/config';

import defaultValue from './defaultValue';
import format from './format';

const defaultFields = fieldsInitialState;

const emptyReducerFactory = key => (state = defaultFields[key]) => state;

const name = emptyReducerFactory('name');
const description = emptyReducerFactory('description');
const deviceResourceType = emptyReducerFactory('deviceResourceType');
const dataType = emptyReducerFactory('dataType');
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
