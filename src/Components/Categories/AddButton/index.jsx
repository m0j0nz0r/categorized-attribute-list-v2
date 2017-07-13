import React from 'react';
import { connect } from 'react-redux';
import { createAttribute } from '../../actions/actions';

const buttonComponent = ({ onClick, selectedCategoryId }) => (
  <button onClick={onClick(selectedCategoryId)}>
    Add attribute
  </button>
);

const mapStateToProps = state => ({ selectedCategoryId: state.categories.selectedCategoryId });

const mapDispatchToProps = dispatch => ({
  onClick: selectedCategoryId => () => dispatch(createAttribute(selectedCategoryId)),
});

const AddButton = connect(mapStateToProps, mapDispatchToProps)(buttonComponent);

export default AddButton;
