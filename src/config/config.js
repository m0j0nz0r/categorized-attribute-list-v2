import Enumerations from '../Components/Categories/AttributeList/Attribute/Enumerations';

import {
  CATEGORY_NAME_CATEGORY_1,
  CATEGORY_NAME_CATEGORY_2,
  CATEGORY_NAME_CATEGORY_3,
  NAME_FIELD_LABEL,
  NAME_FIELD_PLACEHOLDER,
  DESCRIPTION_FIELD_LABEL,
  DESCRIPTION_FIELD_PLACEHOLDER,
  DEVICE_RESOURCE_TYPE_FIELD_LABEL,
  DEFAULT_VALUE_FIELD_LABEL,
  DEFAULT_VALUE_FIELD_PLACEHOLDER,
  DATA_TYPE_FIELD_LABEL,
  FORMAT_FIELD_LABEL,
  ENUMERATIONS_FIELD_LABEL,
  ENUMERATIONS_FIELD_PLACEHOLDER,
  MIN_RANGE_FIELD_LABEL,
  MIN_RANGE_FIELD_PLACEHOLDER,
  MAX_RANGE_FIELD_LABEL,
  MAX_RANGE_FIELD_PLACEHOLDER,
  UNIT_OF_MEASUREMENT_FIELD_LABEL,
  UNIT_OF_MEASUREMENT_FIELD_PLACEHOLDER,
  PRECISION_FIELD_LABEL,
  PRECISION_FIELD_PLACEHOLDER,
  ACCURACY_FIELD_LABEL,
  ACCURACY_FIELD_PLACEHOLDER,
} from './strings';

export const categoriesInitialState = {
  categoryList: [
    {
      id: 0,
      name: CATEGORY_NAME_CATEGORY_1,
    },
    {
      id: 1,
      name: CATEGORY_NAME_CATEGORY_2,
    },
    {
      id: 2,
      name: CATEGORY_NAME_CATEGORY_3,
    },
  ],
  selectedCategoryId: 0,
};

export const fieldsInitialState = {
  name: {
    label: NAME_FIELD_LABEL,
    attrs: {
      placeholder: NAME_FIELD_PLACEHOLDER,
    },
  },
  description: {
    label: DESCRIPTION_FIELD_LABEL,
    attrs: {
      placeholder: DESCRIPTION_FIELD_PLACEHOLDER,
    },
  },
  deviceResourceType: {
    label: DEVICE_RESOURCE_TYPE_FIELD_LABEL,
    disabled: true,
  },
  defaultValue: {
    label: DEFAULT_VALUE_FIELD_LABEL,
    attrs: {
      placeholder: DEFAULT_VALUE_FIELD_PLACEHOLDER,
    },
  },
  dataType: {
    label: DATA_TYPE_FIELD_LABEL,
    nullOption: false,
  },
  format: {
    label: FORMAT_FIELD_LABEL,
    nullOption: false,
  },
  enumerations: {
    template: Enumerations,
    label: ENUMERATIONS_FIELD_LABEL,
    attrs: {
      placeholder: ENUMERATIONS_FIELD_PLACEHOLDER,
    },
  },
  minRange: {
    label: MIN_RANGE_FIELD_LABEL,
    attrs: {
      placeholder: MIN_RANGE_FIELD_PLACEHOLDER,
    },
  },
  maxRange: {
    label: MAX_RANGE_FIELD_LABEL,
    attrs: {
      placeholder: MAX_RANGE_FIELD_PLACEHOLDER,
    },
  },
  unitOfMeasurement: {
    label: UNIT_OF_MEASUREMENT_FIELD_LABEL,
    attrs: {
      placeholder: UNIT_OF_MEASUREMENT_FIELD_PLACEHOLDER,
    },
  },
  precision: {
    label: PRECISION_FIELD_LABEL,
    attrs: {
      placeholder: PRECISION_FIELD_PLACEHOLDER,
    },
  },
  accuracy: {
    label: ACCURACY_FIELD_LABEL,
    attrs: {
      placeholder: ACCURACY_FIELD_PLACEHOLDER,
    },
  },
};

export const optionsInitialState = {
  auto: 'placeholders',
  fields: fieldsInitialState,
};

export const attributesInitialState = {
  invalid: {},
  defaultValue: {
    name: '',
    description: null,
    deviceResourceType: '0',
    defaultValue: null,
    dataType: 'string',
    format: 'none',
    enumerations: [],
    minRange: '0',
    maxRange: '20',
    unitOfMeasurement: 'mm',
    precision: '1',
    accuracy: '1',
  },
  nextAttributeId: 0,
  attributeList: [],
  form: {
    options: optionsInitialState,
  },
};

export const initialState = {
  categories: categoriesInitialState,
  attributes: attributesInitialState,
};

export const settings = {
  accordion: true,
};

