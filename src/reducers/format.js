import { fieldsInitialState } from '../config/config';
import disableFieldOnDataTypeObject from './disableFieldOnDataTypeObject';

const defaultFields = fieldsInitialState;

const format = (state = defaultFields.format, action) =>
({
  ...state,
  ...disableFieldOnDataTypeObject(state, action),
});

export default format;
