import {
  CREATE_ATTRIBUTE,
  EXPAND_ATTRIBUTE,
  UPDATE_ATTRIBUTE,
  DELETE_ATTRIBUTE,
  SELECT_CATEGORY,
} from './actionTypes';

export const createAttribute = (categoryId, nextAttributeId, attributeList) => ({
  type: CREATE_ATTRIBUTE,
  categoryId,
  id: nextAttributeId,
  attributeList,
});

export const expandAttribute = id => ({
  type: EXPAND_ATTRIBUTE,
  id,
});

export const updateAttribute = (attribute, attributeList, errors) =>
({
  type: UPDATE_ATTRIBUTE,
  attribute,
  attributeList,
  errors,
});

export const deleteAttribute = id => ({ type: DELETE_ATTRIBUTE, id });
export const selectCategory = id => ({ type: SELECT_CATEGORY, id });
