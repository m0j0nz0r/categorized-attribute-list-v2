import { optionsInitialState } from '../../config/config';
import fields from './fieldsReducer';

const options = (state = optionsInitialState, action) => {
  const updatedState = { ...state, fields: fields(state.fields, action) };
  return updatedState;
};

export default options;
