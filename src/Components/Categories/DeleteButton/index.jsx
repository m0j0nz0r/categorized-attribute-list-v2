import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteAttribute } from '../../../actions/actions';

const buttonComponent = ({ onClick, attributeId }) => (
  <button className="btn btn-danger material-icons delete-button" onClick={onClick(attributeId)}>
    delete_forever
  </button>
);

buttonComponent.propTypes = {
  onClick: PropTypes.func.isRequired,
  attributeId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
};

const mapStateToProps = (state, props) => ({ attributeId: props.id });

const mapDispatchToProps = dispatch => ({
  onClick: attributeId => () => dispatch(deleteAttribute(attributeId)),
});

const DeleteButton = connect(mapStateToProps, mapDispatchToProps)(buttonComponent);

export default DeleteButton;
