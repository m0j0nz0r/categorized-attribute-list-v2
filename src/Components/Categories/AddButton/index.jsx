import React from 'react';
import { connect } from 'react-redux';
import * as actions from '../../../config/actions';

const buttonComponent = ({ onClick, selectedCategoryId }) => (
  <button onClick={onClick(selectedCategoryId)}>
    Add attribute
  </button>
);

const mapStateToProps = state => ({ selectedCategoryId: state.categories.selectedCategoryId });

const mapDispatchToProps = dispatch => ({
  onClick: selectedCategoryId => () => dispatch(actions.createAttribute(selectedCategoryId)),
});

const AddButton = connect(mapStateToProps, mapDispatchToProps)(buttonComponent);

export default AddButton;
