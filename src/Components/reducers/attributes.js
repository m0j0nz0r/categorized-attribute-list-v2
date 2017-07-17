import { attributesInitialState } from '../../config/config';
import options from './options';
import invalid from './invalid';
import { EXPAND_ATTRIBUTE, CREATE_ATTRIBUTE, UPDATE_ATTRIBUTE, DELETE_ATTRIBUTE } from '../actions/actionTypes';

const attributes = (state = attributesInitialState, action) => {
  const newState = {
    ...state,
    ...{
      form: {
        options: options(state.form.options, action),
      },
    },
  };
  let index;
  let updatedAttribute;
  switch (action.type) {
    case EXPAND_ATTRIBUTE:
      newState.currentAttributeId = action.id;
      break;
    case CREATE_ATTRIBUTE:
      newState.attributeList = [...state.attributeList, ...[
        {
          ...{
            id: state.nextAttributeId,
            categoryId: action.categoryId,
          },
          ...attributesInitialState.defaultValue,
        },
      ]];
      newState.currentAttributeId = state.nextAttributeId.toString();
      newState.invalid = [...newState.invalid, ...[state.nextAttributeId]];
      newState.nextAttributeId = state.nextAttributeId + 1;
      break;
    case UPDATE_ATTRIBUTE:
      newState.attributeList = state.attributeList.map((attribute) => {
        if (attribute.id === action.id) {
          const defaultValue = attributesInitialState.defaultValue;
          updatedAttribute = { ...action.attribute };

          // Data Type logic.
          if (attribute.dataType !== action.attribute.dataType) {
            updatedAttribute.defaultValue = null;
            updatedAttribute.format = 'none';
          }

          if (attribute.format !== action.attribute.format) {
            switch (action.attribute.format) {
              case 'number':
                updatedAttribute.minRange = defaultValue.minRange;
                updatedAttribute.maxRange = defaultValue.maxRange;
                updatedAttribute.unitOfMeasurement = defaultValue.unitOfMeasurement;
                updatedAttribute.precision = defaultValue.precision;
                updatedAttribute.accuracy = defaultValue.accuracy;
                break;
              default:
                updatedAttribute.enumerations = [];
                updatedAttribute.minRange = null;
                updatedAttribute.maxRange = null;
                updatedAttribute.unitOfMeasurement = null;
                updatedAttribute.precision = null;
                updatedAttribute.accuracy = null;
            }
          }
          updatedAttribute = { ...attribute, ...updatedAttribute };
          return { ...attribute, ...updatedAttribute };
        }
        return attribute;
      });
      newState.invalid = invalid(
        newState.invalid,
        { ...action, ...{ list: newState.attributeList } },
      );
      break;
    case DELETE_ATTRIBUTE:
      index = state.attributeList.findIndex(a => a.id === Number(action.id));
      if (index !== -1) {
        newState.attributeList = [
          ...state.attributeList.slice(0, index),
          ...state.attributeList.slice(index + 1),
        ];
        index = state.invalid.indexOf(action.id);
        newState.invalid = invalid(
          newState.invalid,
          { ...action, ...{ list: newState.attributeList } },
        );
      }
      break;
    default:
      // do nothing.
  }
  return newState;
};

export default attributes;
