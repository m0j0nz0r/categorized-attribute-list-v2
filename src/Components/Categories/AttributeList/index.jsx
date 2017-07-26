import React from 'react';
import Collapse from 'rc-collapse';
import { connect } from 'react-redux';
import 'rc-collapse/assets/index.css';
import DeleteButton from '../DeleteButton';
import { expandAttribute } from '../../../actions/actions';
import Attribute from './Attribute';
import { NEW_ATTRIBUTE } from '../../../config/strings';
import { settings } from '../../../config/config';

const getHeader = (attribute) => {
  const { name, description } = attribute;
  if (!name) {
    return NEW_ATTRIBUTE;
  }
  if (description) {
    return `${name}: ${description}`;
  }
  return name;
};

const getPanel = attribute => (
  <Collapse.Panel key={attribute.id} header={getHeader(attribute)}>
    <Attribute id={attribute.id} />
    <DeleteButton id={attribute.id} />
  </Collapse.Panel>
);

const getVisibleAttributes = (
  attributes,
  categoryId,
) => attributes.filter(attribute => attribute.categoryId === categoryId);

const mapStateToProps = state => ({
  accordion: settings.accordion,
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
