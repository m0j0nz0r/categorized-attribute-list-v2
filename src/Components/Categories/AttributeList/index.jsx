import React from 'react';
import Collapse from 'rc-collapse';
import { connect } from 'react-redux';
import 'rc-collapse/assets/index.css';
import { expandAttribute } from '../../actions/actions';
import Attribute from './Attribute';

const getHeader = (attribute) => {
  let header = attribute.name;
  if (!header) {
    return 'New attribute';
  }
  if (attribute.description) {
    header += `: ${attribute.description}`;
  }
  return header;
};

const getPanel = attribute => (
  <Collapse.Panel key={attribute.id} header={getHeader(attribute)}>
    <Attribute id={attribute.id} />
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
  onChange: key => dispatch(expandAttribute(key)),
});

const AttributeList = connect(mapStateToProps, mapDispatchToProps)(Collapse);

export default AttributeList;
