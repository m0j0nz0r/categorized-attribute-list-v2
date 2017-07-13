import { CREATE_ATTRIBUTE, EXPAND_ATTRIBUTE, UPDATE_ATTRIBUTE, DELETE_ATTRIBUTE, SELECT_CATEGORY } from './actionTypes';

export const createAttribute = categoryId => ({ type: CREATE_ATTRIBUTE, categoryId });
export const expandAttribute = id => ({ type: EXPAND_ATTRIBUTE, id });
export const updateAttribute = (id, attribute) => ({ type: UPDATE_ATTRIBUTE, id, attribute });
export const deleteAttribute = id => ({ type: DELETE_ATTRIBUTE, id });
export const selectCategory = id => ({ type: SELECT_CATEGORY, id });
