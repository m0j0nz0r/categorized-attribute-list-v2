import React from 'react';
import PropTypes from 'prop-types';
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
  <Collapse.Panel key={attribute.id} header={getHeader(attribute)} headerClass={attribute.errors.length ? 'danger' : ''}>
    <Attribute id={attribute.id} />
    <DeleteButton id={attribute.id} />
  </Collapse.Panel>
);

const getVisibleAttributes = (
  attributes,
  categoryId,
) => attributes.filter(attribute => attribute.categoryId === categoryId);

class CollapseContainer extends React.Component {
  constructor(props) {
    super(props);
    const { attributeList, selectedCategoryId } = props;
    this.state = {
      visibleAttributes: getVisibleAttributes(attributeList, selectedCategoryId),
    };
  }

  componentWillReceiveProps(nextProps) {
    const stateChanges = {};
    const { attributeList, selectedCategoryId } = nextProps;

    stateChanges.visibleAttributes = getVisibleAttributes(attributeList, selectedCategoryId);
    this.setState(stateChanges);
  }

  render() {
    const { activeKey, onChange } = this.props;
    const panels = this.state.visibleAttributes.map(getPanel);
    return (
      <Collapse
        activeKey={activeKey}
        accordion={settings.accordion}
        onChange={onChange}
      >
        {panels}
      </Collapse>
    );
  }
}

CollapseContainer.propTypes = {
  activeKey: PropTypes.string,
  attributeList: PropTypes.arrayOf(PropTypes.object),
  selectedCategoryId: PropTypes.number,
  onChange: PropTypes.func,
};

CollapseContainer.defaultProps = {
  activeKey: null,
  attributeList: [],
  selectedCategoryId: 0,
  onChange: null,
};

const mapStateToProps = (state, props) => ({
  activeKey: state.attributes.currentAttributeId,
  attributeList: state.attributes.attributeList,
  selectedCategoryId: props.categoryId,
});

const mapDispatchToProps = dispatch => ({
  onChange: key => dispatch(expandAttribute(key)),
});

const AttributeList = connect(mapStateToProps, mapDispatchToProps)(CollapseContainer);

export default AttributeList;
