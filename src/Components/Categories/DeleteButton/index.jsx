import React from 'react';
import { connect } from 'react-redux';
import { deleteAttribute } from '../../actions/actions';

const buttonComponent = ({ onClick, attributeId }) => (
  <button className="btn btn-danger material-icons" style={{ float: 'right' }} onClick={onClick(attributeId)}>
    delete_forever
  </button>
);

const mapStateToProps = state => ({ attributeId: state.attributes.currentAttributeId });

const mapDispatchToProps = dispatch => ({
  onClick: attributeId => () => dispatch(deleteAttribute(attributeId)),
});

const DeleteButton = connect(mapStateToProps, mapDispatchToProps)(buttonComponent);

export default DeleteButton;
