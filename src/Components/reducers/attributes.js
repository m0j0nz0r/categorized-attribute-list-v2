import initialState from '../../config/config';
import options from './options';
import invalid from './invalid';
import { EXPAND_ATTRIBUTE, CREATE_ATTRIBUTE, UPDATE_ATTRIBUTE } from '../actions/actionTypes';

const attributes = (state = initialState.attributes, action) => {
  const newState = {
    ...state,
    ...{
      form: {
        options: options(state.form.options, action),
      },
    },
  };
  switch (action.type) {
    case EXPAND_ATTRIBUTE:
      newState.attributeList = state.attributeList.map(attribute =>
        (attribute.id === action.id ?
          { ...attribute, ...{ isDuplicated: !!state.nameDictionary[attribute.name] } } :
            attribute));
      newState.currentAttributeId = action.id;
      break;
    case CREATE_ATTRIBUTE:
      newState.attributeList = [...state.attributeList, ...[
        {
          id: state.nextAttributeId,
          categoryId: action.categoryId,
          deviceResourceType: 0,
        },
      ]];
      newState.nextAttributeId = state.nextAttributeId + 1;
      break;
    case UPDATE_ATTRIBUTE:
      newState.attributeList = state.attributeList.map((attribute) => {
        if (attribute.id === action.id) {
          const defaultValue = initialState.attributes.defaultValue;
          let updatedAttribute = { ...{}, ...action.attribute };

          // Duplicate name validation.
          if (attribute.name !== action.attribute.name) {
            newState.nameDictionary[attribute.name] -= 1;
            updatedAttribute.isDuplicated = !!newState.nameDictionary[action.attribute.name];
            if (newState.nameDictionary[action.attribute.name]) {
              newState.nameDictionary[action.attribute.name] += 1;
            } else {
              newState.nameDictionary[action.attribute.name] = 1;
            }
            if (newState.nameDictionary[attribute.name] === 0) {
              delete newState.nameDictionary[attribute.name];
            }
          }
          updatedAttribute.isValid = action.attribute.isValid && !updatedAttribute.isDuplicated;

          // Data Type logic.
          if (attribute.dataType !== action.attribute.dataType) {
            updatedAttribute.defaultValue = '';
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
                updatedAttribute.minRange = '';
                updatedAttribute.maxRange = '';
                updatedAttribute.unitOfMeasurement = '';
                updatedAttribute.precision = '';
                updatedAttribute.accuracy = '';
            }
          }
          updatedAttribute = { ...attribute, ...updatedAttribute };
          newState.invalid = invalid(
            newState.invalid,
            { ...action, ...{ attribute: updatedAttribute } },
          );
          return { ...attribute, ...updatedAttribute };
        }
        return attribute;
      });
      break;
    default:
      // do nothing.
  }
  return newState;
};

export default attributes;
