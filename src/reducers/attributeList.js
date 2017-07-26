import attribute from './attribute';
import { attributesInitialState } from '../config/config';
import { CREATE_ATTRIBUTE, UPDATE_ATTRIBUTE, DELETE_ATTRIBUTE } from '../actions/actionTypes';

const attributeList = (state = attributesInitialState.attributeList, action) => {
  const attributeIndex = state.findIndex(
    testAttribute => testAttribute.id === (
      action.attribute ? action.attribute.id : Number(action.id)
    ),
  );
  switch (action.type) {
    case CREATE_ATTRIBUTE:
      return [
        ...state,
        ...[
          {
            id: action.id,
            categoryId: action.categoryId,
            ...attributesInitialState.defaultValue,
            errors: ['New attribute'],
          },
        ],
      ];
    case UPDATE_ATTRIBUTE:
      return [
        ...state.slice(0, attributeIndex),
        attribute(state[attributeIndex], action),
        ...state.slice(attributeIndex + 1),
      ];
    case DELETE_ATTRIBUTE:
      return [
        ...state.slice(0, attributeIndex),
        ...state.slice(attributeIndex + 1),
      ];
    default:
      return state;
  }
};

export default attributeList;
