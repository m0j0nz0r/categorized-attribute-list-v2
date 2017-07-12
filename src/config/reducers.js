import { combineReducers } from 'redux';
import initialState from './config';
import * as actions from './actions';
import fields from './fieldsReducer';

const options = (state = initialState.attributes.form.options, action) => {
  const updatedState = Object.assign({}, state, { fields: fields(state.fields, action) });
  return updatedState;
};

const attributes = (state = initialState.attributes, action) => {
  const newState = Object.assign(
    {},
    state,
    {
      form: {
        options: options(state.form.options, action),
      },
    });
  switch (action.type) {
    case actions.EXPAND_ATTRIBUTE:
      newState.attributeList = state.attributeList.map(attribute =>
        (attribute.id === action.id ?
          Object.assign({}, attribute, { isDuplicated: !!state.nameDictionary[attribute.name] }) :
            attribute));
      newState.currentAttributeId = action.id;
      break;
    case actions.CREATE_ATTRIBUTE:
      newState.attributeList = state.attributeList
          .concat([{
            id: state.nextAttributeId,
            categoryId: action.categoryId,
            deviceResourceType: 0,
          }]);
      newState.nextAttributeId = state.nextAttributeId + 1;
      break;
    case actions.UPDATE_ATTRIBUTE:
    console.log(action.attribute);
      newState.attributeList = state.attributeList.map((attribute) => {
        if (attribute.id === action.id) {
          const defaultValue = initialState.attributes.defaultValue;
          const updatedAttribute = Object.assign({}, action.attribute);

          // Dupplicate name validation.
          if (attribute.name !== action.attribute.name) {
            newState.nameDictionary[attribute.name] -= 1;
            updatedAttribute.isDuplicated = !!newState.nameDictionary[action.attribute.name];
            newState.nameDictionary[action.attribute.name] += 1;
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
          return Object.assign({}, attribute, updatedAttribute);
        }
        return attribute;
      });
      break;
    default:
      // do nothing.
  }
  return newState;
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
