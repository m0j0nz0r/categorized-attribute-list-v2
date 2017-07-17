import React from 'react';
import { connect } from 'react-redux';
import { createAttribute } from '../../actions/actions';

const buttonComponent = ({ onClick, selectedCategoryId }) => (
  <button className="btn btn-primary material-icons" onClick={onClick(selectedCategoryId)}>
    add
  </button>
);

const mapStateToProps = state => ({ selectedCategoryId: state.categories.selectedCategoryId });

const mapDispatchToProps = dispatch => ({
  onClick: selectedCategoryId => () => dispatch(createAttribute(selectedCategoryId)),
});

const AddButton = connect(mapStateToProps, mapDispatchToProps)(buttonComponent);

export default AddButton;
