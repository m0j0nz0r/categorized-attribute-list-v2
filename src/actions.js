/*
 * action types
 */

export const CREATE_ATTRIBUTE = 'ADD_ATTRIBUTE';
export const EXPAND_ATTRIBUTE = 'EXPAND_ATTRIBUTE';
export const UPDATE_ATTRIBUTE = 'UPDATE_ATTRIBUTE';
export const DELETE_ATTRIBUTE = 'DELETE_ATTRIBUTE';
export const SELECT_CATEGORY = 'SELECT_CATEGORY';


/*
 * action creators
 */

export function createAttribute() {
  return { type: CREATE_ATTRIBUTE };
}
export function expandAttribute(id) {
  return { type: EXPAND_ATTRIBUTE, id };
}
export function updateAttribute(id, attribute) {
  return { type: UPDATE_ATTRIBUTE, id, attribute };
}
export function deleteAttribute(id) {
  return { type: DELETE_ATTRIBUTE, id };
}
export function selectCategory(id) {
  return { type: SELECT_CATEGORY, id };
}
