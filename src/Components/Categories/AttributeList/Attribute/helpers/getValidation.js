const MIN_RANGE_INVALID = 'Min range is higher than Max Range';
const MAX_RANGE_INVALID = 'Max range is lower than Max Range';
const DOES_NOT_DIVIDE_RANGE = 'Does not divide range exactly';

const getFieldValidationErrorString = (field, fieldValue, attribute) => {
  switch (field) {
    case 'minRange':
      if (fieldValue > attribute.maxRange) {
        return MIN_RANGE_INVALID;
      }
      break;
    case 'maxRange':
      if (fieldValue < attribute.minRange) {
        return MAX_RANGE_INVALID;
      }
      break;
    case 'precision':
      if (((attribute.maxRange - attribute.minRange) % fieldValue)) {
        return DOES_NOT_DIVIDE_RANGE;
      }
      break;
    case 'accuracy':
      if (((attribute.maxRange - attribute.minRange) % fieldValue)) {
        return DOES_NOT_DIVIDE_RANGE;
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
      return 'Not a number';
    }
    return getFieldValidationErrorString(field, n, attribute);
  };
};

export default (fields, attribute) => {
  const fieldNames = Object.keys(fields);
  const fieldValidationSetter = setFieldValidation.bind(fields, attribute);
  fieldNames.forEach(fieldValidationSetter);
};
