import { combineReducers } from 'redux';
import initialState from './config';
import * as actions from './actions';

const attributes = (state = initialState.attributes, action) => {
  switch (action.type) {
    case actions.EXPAND_ATTRIBUTE:
      return Object.assign({}, state, { currentAttributeId: action.id });
    case actions.CREATE_ATTRIBUTE:
      return Object.assign({}, state, {
        attributeList: state.attributeList
          .concat([{
            id: state.nextAttributeId,
            categoryId: action.categoryId,
          }]),
        nextAttributeId: state.nextAttributeId + 1,
      });
    default:
      return state;
  }
};

const categories = (state = initialState.categories, action) => {
  switch (action.type) {
    case actions.SELECT_CATEGORY:
      return Object.assign({}, state, { selectedCategoryId: action.id });
    default:
      return state;
  }
};

export default combineReducers({
  attributes,
  categories,
});
