import { ERROR_MIN_RANGE_INVALID, ERROR_MAX_RANGE_INVALID, ERROR_DOES_NOT_DIVIDE_RANGE, ERROR_NOT_A_NUMBER } from '../../../../../config/strings';

const getFieldValidationErrorString = (field, fieldValue, attribute) => {
  switch (field) {
    case 'minRange':
      if (fieldValue > attribute.maxRange) {
        return ERROR_MIN_RANGE_INVALID;
      }
      break;
    case 'maxRange':
      if (fieldValue < attribute.minRange) {
        return ERROR_MAX_RANGE_INVALID;
      }
      break;
    case 'precision':
      if (((attribute.maxRange - attribute.minRange) % fieldValue)) {
        return ERROR_DOES_NOT_DIVIDE_RANGE;
      }
      break;
    case 'accuracy':
      if (((attribute.maxRange - attribute.minRange) % fieldValue)) {
        return ERROR_DOES_NOT_DIVIDE_RANGE;
      }
      break;
    default:
      return '';
  }
  return '';
};

const setFieldValidation = (fields, attribute, fieldName) => {
  const field = fields[fieldName];
  field.getValidationErrorMessage = (n) => {
    if (Number.isNaN(Number(n))) {
      return ERROR_NOT_A_NUMBER;
    }
    return getFieldValidationErrorString(fieldName, n, attribute);
  };
};

export default (fields, attribute) => {
  const fieldNames = Object.keys(fields);
  const fieldValidationSetter = setFieldValidation.bind(this, fields, attribute);
  for (const fieldName of fieldNames) {
    fieldValidationSetter(fieldName);
  }
};
