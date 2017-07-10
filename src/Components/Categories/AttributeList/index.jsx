import React from 'react';
import Collapse from 'rc-collapse';
import { connect } from 'react-redux';
import 'rc-collapse/assets/index.css';
import * as actions from '../../../config/actions';

const getPanel = attribute => (
  <Collapse.Panel key={attribute.id} header={attribute.name || 'New attribute'}>
    Id: {attribute.id}<br />
    Name: {attribute.name}
  </Collapse.Panel>
);

const getVisibleAttributes = (attributes, categoryId) =>
  attributes.filter(attribute => attribute.categoryId === categoryId);

const mapStateToProps = state => ({
  accordion: true,
  activeKey: state.attributes.currentAttributeId,
  children: getVisibleAttributes(
    state.attributes.attributeList,
    state.categories.selectedCategoryId,
  ).map(getPanel),
});

const mapDispatchToProps = dispatch => ({
  onChange: key => dispatch(actions.expandAttribute(key)),
});

const AttributeList = connect(mapStateToProps, mapDispatchToProps)(Collapse);

export default AttributeList;
