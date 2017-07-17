import React from 'react';
import Collapse from 'rc-collapse';
import { connect } from 'react-redux';
import 'rc-collapse/assets/index.css';
import DeleteButton from '../DeleteButton';
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
    <DeleteButton />
  </Collapse.Panel>
);

const getVisibleAttributes = (attributes, categoryId) => {
  return attributes.filter(attribute => attribute.categoryId === categoryId);
};

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

const CollapseWrapper = ({ attributeList }) => {
  if (attributeList.length) {
    const CollapseElement = connect(mapStateToProps, mapDispatchToProps)(Collapse);
    return <CollapseElement />;
  }
  return (
    <div
      className="rc-collapse"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '24px',
        color: 'gray',
      }}
    >
      No attributes in current category
    </div>
  );
};
const AttributeList = connect(
  state => ({ attributeList: getVisibleAttributes(
    state.attributes.attributeList,
    state.categories.selectedCategoryId,
  ) }),
)(CollapseWrapper);

export default AttributeList;
