import { optionsInitialState } from '../config/config';
import fields from './fieldsReducer';

const options = (state = optionsInitialState, action) =>
  ({ ...state, fields: fields(state.fields, action) });

export default options;
