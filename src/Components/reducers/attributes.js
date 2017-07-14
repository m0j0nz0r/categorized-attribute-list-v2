import initialState from '../../config/config';
import options from './options';
import invalid from './invalid';
import { EXPAND_ATTRIBUTE, CREATE_ATTRIBUTE, UPDATE_ATTRIBUTE, DELETE_ATTRIBUTE } from '../actions/actionTypes';

const attributes = (state = initialState.attributes, action) => {
  const newState = {
    ...state,
    ...{
      form: {
        options: options(state.form.options, action),
      },
    },
  };
  let index;
  let name;
  let updatedAttribute;
  switch (action.type) {
    case EXPAND_ATTRIBUTE:
      newState.attributeList = state.attributeList.map(attribute =>
        (attribute.id === Number(action.id) ?
        {
          ...attribute,
          ...{
            isDuplicated: state.nameDictionary[attribute.name] > 1,
          },
        } :
        attribute));
      newState.currentAttributeId = action.id;
      break;
    case CREATE_ATTRIBUTE:
      newState.attributeList = [...state.attributeList, ...[
        {
          ...{
            id: state.nextAttributeId,
            categoryId: action.categoryId,
          },
          ...initialState.attributes.defaultValue,
        },
      ]];
      newState.currentAttributeId = state.nextAttributeId.toString();
      newState.nextAttributeId = state.nextAttributeId + 1;
      break;
    case UPDATE_ATTRIBUTE:
      newState.attributeList = state.attributeList.map((attribute) => {
        if (attribute.id === action.id) {
          const defaultValue = initialState.attributes.defaultValue;
          updatedAttribute = { ...action.attribute };

          // Duplicate name validation.
          if (attribute.name !== action.attribute.name) {
            newState.nameDictionary = { ...newState.nameDictionary };
            let sameNameIds = newState.nameDictionary[attribute.name];
            if (sameNameIds) {
              if (sameNameIds.length > 0) {
                index = sameNameIds.indexOf(attribute.id);
                if (index !== -1) {
                  sameNameIds = [
                    ...sameNameIds.slice(0, index),
                    ...sameNameIds.slice(index + 1),
                  ];
                }
              }
              if (!sameNameIds.length) {
                delete newState.nameDictionary[attribute.name];
              } else {
                newState.nameDictionary[attribute.name] = sameNameIds;
              }
            }

            sameNameIds = newState.nameDictionary[action.attribute.name];
            if (!sameNameIds) {
              newState.nameDictionary[action.attribute.name] = [action.id];
            } else {
              index = sameNameIds.indexOf(action.id);
              if (index === -1) {
                newState.nameDictionary[action.attribute.name] = [
                  ...sameNameIds,
                  ...[action.id],
                ];
              }
            }
          }

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
          return { ...attribute, ...updatedAttribute };
        }
        return attribute;
      });
      newState.attributeList = newState.attributeList.map((attribute) => {
        updatedAttribute = {
          ...attribute,
          ...{
            isDuplicated: newState.nameDictionary[attribute.name].length > 1,
          },
        };
        newState.invalid = invalid(
          newState.invalid,
          { ...action, ...{ attribute: updatedAttribute } },
        );
        return updatedAttribute;
      });
      break;
    case DELETE_ATTRIBUTE:
      index = state.attributeList.findIndex(a => a.id === Number(action.id));
      if (index !== -1) {
        name = newState.attributeList[index].name;
        newState.nameDictionary = { ...newState.nameDictionary };
        let sameNameIds = newState.nameDictionary[name];
        if (sameNameIds) {
          if (sameNameIds.length > 0) {
            index = sameNameIds.indexOf(action.id);
            if (index !== -1) {
              sameNameIds = [
                ...sameNameIds.slice(0, index),
                ...sameNameIds.slice(index + 1),
              ];
            }
          }
          if (!sameNameIds.length) {
            delete newState.nameDictionary[name];
          } else {
            newState.nameDictionary[name] = sameNameIds;
          }
        }

        newState.attributeList = [
          ...state.attributeList.slice(0, index),
          ...state.attributeList.slice(index + 1),
        ];
        index = state.invalid.indexOf(action.id);
        newState.invalid = [
          ...state.invalid.slice(0, index),
          ...state.invalid.slice(index + 1),
        ];
      }
      break;
    default:
      // do nothing.
  }
  return newState;
};

export default attributes;
