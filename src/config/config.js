const initialState = {
  categories: {
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
  },
  attributes: {
    defaultValue: {
      name: '',
      description: '',
      deviceResourceType: '0',
      defaultValue: '',
      dataType: 'string',
      format: 'none',
      enumerations: [],
      minRange: '0',
      maxRange: '20',
      unitOfMeasurement: 'mm',
      precision: '1',
      accuracy: '1',
    },
    nextAttributeId: 5,
    nameDictionary: {
      'Attribute 1': 1,
      'Attribute 2': 1,
      'Attribute 3': 1,
      'Attribute 4': 1,
      'Attribute 5': 1,
    },
    attributeList: [
      {
        id: 0,
        name: 'Attribute 1',
        categoryId: 0,
        deviceResourceType: 0,
        dataType: 'string',
        format: 'none',
      },
      {
        id: 1,
        name: 'Attribute 2',
        categoryId: 1,
        deviceResourceType: 0,
        dataType: 'string',
        format: 'none',
      },
      {
        id: 2,
        name: 'Attribute 3',
        categoryId: 0,
        deviceResourceType: 0,
        dataType: 'string',
        format: 'none',
      },
      {
        id: 3,
        name: 'Attribute 4',
        categoryId: 2,
        deviceResourceType: 0,
        dataType: 'string',
        format: 'none',
      },
      {
        id: 4,
        name: 'Attribute 5',
        categoryId: 1,
        deviceResourceType: 0,
        dataType: 'string',
        format: 'none',
      },
    ],
    form: {
      options: {
        auto: 'placeholders',
        fields: {
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
        },
      },
    },
  },
};

export default initialState;
