import { fieldsInitialState } from '../config/config';
import disableFieldOnDataTypeObject from './disableFieldOnDataTypeObject';

const defaultFields = fieldsInitialState;

const defaultValue = (state = defaultFields.defaultValue, action) =>
({
  ...state,
  ...disableFieldOnDataTypeObject(state, action),
});

export default defaultValue;
