import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import 'react-tabs/style/react-tabs.css';
import AttributeList from './AttributeList';
import AddButton from './AddButton';
import { selectCategory } from '../../actions/actions';
import { ERROR_NO_ATTRIBUTES } from '../../config/strings';

const hasErrors = (attributeList) => {
  const names = {};
  if (attributeList.length === 0) {
    return true;
  }
  for (let i = 0, iLen = attributeList.length; i < iLen; i += 1) {
    const attribute = attributeList[i];
    if (attribute.errors && attribute.errors.length > 0) return true;
    if (!names[attribute.name]) names[attribute.name] = true;
    else return true;
  }
  return false;
};

const SaveButton = connect(
  state => ({ disabled: hasErrors(state.attributes.attributeList, state.attributes.invalid) }),
)(({ disabled }) => <button className={`material-icons btn ${disabled ? 'btn-default active' : 'btn-success'}`} disabled={disabled}>save</button>);

const makeTabs = tabList => tabList.map(tab => <Tab key={`tab-${tab.id}`}>{tab.name}</Tab>);

const makeTabPanels = (tabList, attributes) => tabList.map((tab) => {
  let content = (
    <div
      className="rc-collapse empty-message"
    >
      {ERROR_NO_ATTRIBUTES}
    </div>
  );
  if (attributes.filter(a => a.categoryId === tab.id).length) {
    content = <AttributeList categoryId={tab.id} />;
  }
  return (
    <TabPanel key={`tabPanel-${tab.id}`}>
      {content}
      <AddButton />
      <SaveButton />
    </TabPanel>
  );
});

const TabsContainer = ({ selectedIndex, categoryList, attributeList, onSelect }) => (
  <Tabs
    selectedIndex={selectedIndex}
    className="col-6"
    onSelect={onSelect}
  >
    <TabList>{makeTabs(categoryList)}</TabList>
    {makeTabPanels(categoryList, attributeList)}
  </Tabs>
);

TabsContainer.propTypes = {
  selectedIndex: PropTypes.number,
  categoryList: PropTypes.arrayOf(PropTypes.object),
  attributeList: PropTypes.arrayOf(PropTypes.object),
  onSelect: PropTypes.func,
};

TabsContainer.defaultProps = {
  selectedIndex: null,
  categoryList: [],
  attributeList: [],
  onSelect: null,
};

const mapStateToProps = ({ categories, attributes }) => ({
  categoryList: categories.categoryList,
  attributeList: attributes.attributeList,
  selectedIndex: categories.selectedCategoryId,
});

const mapDispatchToProps = dispatch => ({
  onSelect: index => dispatch(selectCategory(index)),
});

const Categories = connect(mapStateToProps, mapDispatchToProps)(TabsContainer);

export default Categories;
