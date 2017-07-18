import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import 'react-tabs/style/react-tabs.css';
import AttributeList from './AttributeList';
import AddButton from './AddButton';
import { selectCategory } from '../actions/actions';
import { ERROR_NO_ATTRIBUTES } from '../../config/strings';

const SaveButton = connect(
  state => ({ disabled: state.attributes.invalid.length > 0 }),
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
    content = <AttributeList />;
  }
  return (
    <TabPanel key={`tabPanel-${tab.id}`}>
      {content}
      <AddButton />
      <SaveButton />
    </TabPanel>
  );
});
const makeTabsChildren = (categories, attributes) => [
  <TabList key="TabList">{makeTabs(categories)}</TabList>,
  makeTabPanels(categories, attributes),
];

const mapStateToProps = state => ({
  children: makeTabsChildren(state.categories.categoryList, state.attributes.attributeList),
  selectedIndex: state.categories.selectedCategoryId,
  className: 'col-6',
});
const mapDispatchToProps = dispatch => ({
  onSelect: index => dispatch(selectCategory(index)),
});

const Categories = connect(mapStateToProps, mapDispatchToProps)(Tabs);

export default Categories;
