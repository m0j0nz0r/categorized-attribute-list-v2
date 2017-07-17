import Enumerations from '../Components/Categories/AttributeList/Attribute/Enumerations';


export const categoriesInitialState = {
  categoryList: [
    {
      id: 0,
      name: 'Category 1',
    },
    {
      id: 1,
      name: 'Category 2',
    },
    {
      id: 2,
      name: 'Category 3',
    },
  ],
  selectedCategoryId: 0,
};

export const fieldsInitialState = {
  name: {
    label: 'Name',
    attrs: {
      placeholder: 'Enter a name',
    },
  },
  description: {
    label: 'Description',
    attrs: {
      placeholder: 'Enter a description for your new attribute',
    },
  },
  deviceResourceType: {
    label: 'Device Resource Type',
    disabled: true,
  },
  defaultValue: {
    label: 'Default value',
    attrs: {
      placeholder: 'Enter a default Value',
    },
  },
  dataType: {
    label: 'Data Type',
    nullOption: false,
  },
  format: {
    label: 'Format',
    nullOption: false,
  },
  enumerations: {
    template: Enumerations,
    label: 'Enumerations',
    attrs: {
      placeholder: 'Enter value',
    },
  },
  minRange: {
    label: 'Min Range',
    attrs: {
      placeholder: 'Min range',
    },
  },
  maxRange: {
    label: 'Max Range',
    attrs: {
      placeholder: 'Max range',
    },
  },
  unitOfMeasurement: {
    label: 'Unit of Measurement',
    attrs: {
      placeholder: 'UoM (eg. mm)',
    },
  },
  precision: {
    label: 'Precision',
    attrs: {
      placeholder: 'Precision (eg. 0.5)',
    },
  },
  accuracy: {
    label: 'Accuracy',
    attrs: {
      placeholder: 'Accuracy (eg. 0.5)',
    },
  },
};

export const optionsInitialState = {
  auto: 'placeholders',
  fields: fieldsInitialState,
};
export const attributesInitialState = {
  invalid: [],
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

