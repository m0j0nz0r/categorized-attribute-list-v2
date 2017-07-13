import initialState from '../../config/config';
import { SELECT_CATEGORY } from '../actions/actionTypes';

const categories = (state = initialState.categories, action) => {
  switch (action.type) {
    case SELECT_CATEGORY:
      return Object.assign({}, state, { selectedCategoryId: action.id });
    default:
      return state;
  }
};

export default categories;
