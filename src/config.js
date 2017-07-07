const initialState = {
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
  attributeList: [
    {
      id: 0,
      name: 'Attribute 1',
      categoryId: 0,
    },
    {
      id: 1,
      name: 'Attribute 2',
      categoryId: 1,
    },
    {
      id: 2,
      name: 'Attribute 3',
      categoryId: 0,
    },
    {
      id: 3,
      name: 'Attribute 4',
      categoryId: 2,
    },
    {
      id: 4,
      name: 'Attribute 5',
      categoryId: 1,
    },
  ],
};

export default initialState;
