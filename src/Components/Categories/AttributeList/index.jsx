import React from 'react';
import Collapse from 'rc-collapse';
import { connect } from 'react-redux';
import 'rc-collapse/assets/index.css';
import * as actions from '../../../actions';

const getPanel = attribute => (
  <Collapse.Panel key={attribute.id} header={attribute.name}>
    Id: {attribute.id}
    Name: {attribute.name}
  </Collapse.Panel>
);

const getVisibleAttributes = (attributes, categoryId) =>
  attributes.filter(attribute => attribute.categoryId === categoryId);

const mapStateToProps = state => ({
  accordion: true,
  activeKey: state.currentAttributeId,
  children: getVisibleAttributes(state.attributeList, state.selectedCategoryId).map(getPanel),
});

const mapDispatchToProps = dispatch => ({
  onChange: key => dispatch(actions.expandAttribute(key)),
});

const AttributeList = connect(mapStateToProps, mapDispatchToProps)(Collapse);

export default AttributeList;
