import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createAttribute } from '../../../actions/actions';

const buttonComponent = ({ onClick, selectedCategoryId, nextId, attributeList }) => (
  <button
    className="btn btn-primary material-icons"
    onClick={onClick(selectedCategoryId, nextId, attributeList)}
  >
    add
  </button>
);

buttonComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  selectedCategoryId: PropTypes.oneOfType([
    PropTypes.string.isRequired,
    PropTypes.number,
  ]).isRequired,
  nextId: PropTypes.number.isRequired,
  attributeList: PropTypes.arrayOf(PropTypes.object),
};

buttonComponent.defaultProps = {
  attributeList: [],
};

const mapStateToProps = state => ({
  selectedCategoryId: state.categories.selectedCategoryId,
  nextId: state.attributes.nextAttributeId,
  attributeList: state.attributes.attributeList,
});

const mapDispatchToProps = dispatch => ({
  onClick: (selectedCategoryId, nextId, attributeList) =>
    () => dispatch(createAttribute(selectedCategoryId, nextId, attributeList)),
});

const AddButton = connect(mapStateToProps, mapDispatchToProps)(buttonComponent);

export default AddButton;
