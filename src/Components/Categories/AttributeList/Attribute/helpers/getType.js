import t from 'tcomb-form';

export default (attributes, attribute) => {
  const name = t.refinement(
    t.String,
    n => !attributes.find(a => a.name === n && a.id !== attribute.id),
    );
  name.getValidationErrorMessage = (n) => {
    if (!n) {
      return 'Required';
    }
    if (attributes.find(a => a.name === n && a.id !== attribute.id)) {
      return 'Duplicated';
    }
    return '';
  };

  const description = t.maybe(t.String);

  const deviceResourceType = t.enums({ 0: 'DefaultValue' });

  const defaultValue = t.maybe(t.String);

  const dataType = t.enums({
    string: 'String',
    object: 'Object',
  });

  const format = t.enums({
    none: 'None',
    number: 'Number',
    boolean: 'Boolean',
    dateTime: 'Date-Time',
    cdata: 'CDATA',
    uri: 'URI',
  });

  let optionalFields = {};

  if (attribute.dataType === 'string') {
    const { maxRange, minRange } = attribute;
    switch (attribute.format) {
      case 'none':
        optionalFields = {
          enumerations: t.list(t.String),
        };
        break;
      case 'number':
        optionalFields = {
          minRange: t.refinement(t.Number, n => !Number.isNaN(Number(n)) && n < maxRange),
          maxRange: t.refinement(t.Number, n => !Number.isNaN(Number(n)) && n > minRange),
          unitOfMeasurement: t.String,
          precision: t.refinement(
            t.Number,
            n => !Number.isNaN(Number(n)) && !((maxRange - minRange) % n),
          ),
          accuracy: t.refinement(
            t.Number,
            n => !Number.isNaN(Number(n)) && !((maxRange - minRange) % n),
          ),
        };
        optionalFields.minRange.getValidationErrorMessage = (n) => {
          if (Number.isNaN(Number(n))) {
            return 'Not a number';
          }
          if (n > maxRange) {
            return 'Min range is higher than Max Range';
          }
          return '';
        };
        optionalFields.maxRange.getValidationErrorMessage = (n) => {
          if (Number.isNaN(Number(n))) {
            return 'Not a number';
          }
          if (n < minRange) {
            return 'Min range is higher than Max Range';
          }
          return '';
        };
        optionalFields.precision.getValidationErrorMessage = (n) => {
          if (Number.isNaN(Number(n))) {
            return 'Not a number';
          }
          if (((maxRange - minRange) % n)) {
            return 'Does not divide range exactly';
          }
          return '';
        };
        optionalFields.accuracy.getValidationErrorMessage = (n) => {
          if (Number.isNaN(Number(n))) {
            return 'Not a number';
          }
          if (((maxRange - minRange) % n)) {
            return 'Does not divide range exactly';
          }
          return '';
        };
        break;
      default:
        // Do nothing.
    }
  }

  return t.struct({
    ...{
      name,
      description,
      deviceResourceType,
      defaultValue,
      dataType,
      format,
    },
    ...optionalFields,
  });
};
