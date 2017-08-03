import {
  ERROR_MIN_RANGE_INVALID,
  ERROR_MAX_RANGE_INVALID,
  ERROR_DOES_NOT_DIVIDE_RANGE,
  ERROR_NOT_A_NUMBER,
  ERROR_REQUIRED,
} from '../config/strings';
import { isRangeValid, isPrecisionValid } from './sharedValidationFunctions';

const getFieldValidationErrorString = (field, fieldValue, attribute) => {
  const { minRange, maxRange } = attribute;
  switch (field) {
    case 'minRange':
      if (isRangeValid(fieldValue, maxRange)) {
        return ERROR_MIN_RANGE_INVALID;
      }
      break;
    case 'maxRange':
      if (isRangeValid(minRange, fieldValue)) {
        return ERROR_MAX_RANGE_INVALID;
      }
      break;
    case 'precision':
      if (!isPrecisionValid(minRange, maxRange, fieldValue)) {
        return ERROR_DOES_NOT_DIVIDE_RANGE;
      }
      break;
    case 'accuracy':
      if (!isPrecisionValid(minRange, maxRange, fieldValue)) {
        return ERROR_DOES_NOT_DIVIDE_RANGE;
      }
      break;
    default:
      return '';
  }
};

const setFieldValidation = (fields, attribute, fieldName) => {
  const field = fields[fieldName];
  field.getValidationErrorMessage = (n) => {
    if (n === null) {
      return ERROR_REQUIRED;
    }
    if (Number.isNaN(Number(n))) {
      return ERROR_NOT_A_NUMBER;
    }
    return getFieldValidationErrorString(fieldName, n, attribute);
  };
};

export default (fields, attribute) => {
  const fieldNames = Object.keys(fields);
  const fieldValidationSetter = setFieldValidation.bind(this, fields, attribute);
  for (let i = 0, iLen = fieldNames.length; i < iLen; i += 1) {
    fieldValidationSetter(fieldNames[i]);
  }
};
