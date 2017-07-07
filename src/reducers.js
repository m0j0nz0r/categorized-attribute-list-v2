import initialState from './config';
import * as actions from './actions';

export default function attributeList(state = initialState, action) {
  switch (action.type) {
    case actions.SELECT_CATEGORY:
      return Object.assign({}, state, { selectedCategoryId: action.id });
    case actions.EXPAND_ATTRIBUTE:
      return Object.assign({}, state, { currentAttributeId: action.id });
    default:
      return state;
  }
}
