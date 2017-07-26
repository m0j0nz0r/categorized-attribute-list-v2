import t from 'tcomb-form';
import setNumberValidationMessages from './getValidation';
import {
  ERROR_REQUIRED,
  ERROR_DUPLICATED,
  DEVICE_RESOURCE_TYPE_VALUE_0,
  DATA_TYPE_VALUE_0,
  DATA_TYPE_VALUE_1,
  FORMAT_VALUE_0,
  FORMAT_VALUE_1,
  FORMAT_VALUE_2,
  FORMAT_VALUE_3,
  FORMAT_VALUE_4,
  FORMAT_VALUE_5,
} from '../config/strings';
import { attributesInitialState } from '../config/config';

export default (
  attributes = attributesInitialState.attributeList,
  attribute = attributesInitialState.defaultValue,
) => {
  const name = t.refinement(
    t.String,
    n => !attributes.some(a => a.name === n && a.id !== attribute.id),
  );
  name.getValidationErrorMessage = (n) => {
    if (!n) {
      return ERROR_REQUIRED;
    }
    if (attributes.some(a => a.name === n && a.id !== attribute.id)) {
      return ERROR_DUPLICATED;
    }
    return '';
  };

  const description = t.maybe(t.String);

  const deviceResourceType = t.enums({ 0: DEVICE_RESOURCE_TYPE_VALUE_0 });

  const defaultValue = t.maybe(t.String);

  const dataType = t.enums({
    string: DATA_TYPE_VALUE_0,
    object: DATA_TYPE_VALUE_1,
  });

  const format = t.enums({
    none: FORMAT_VALUE_0,
    number: FORMAT_VALUE_1,
    boolean: FORMAT_VALUE_2,
    dateTime: FORMAT_VALUE_3,
    cdata: FORMAT_VALUE_4,
    uri: FORMAT_VALUE_5,
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
        setNumberValidationMessages(optionalFields, attribute);
        break;
      default:
        // Do nothing.
    }
  }

  return t.struct({
    name,
    description,
    deviceResourceType,
    defaultValue,
    dataType,
    format,
    ...optionalFields,
  });
};
