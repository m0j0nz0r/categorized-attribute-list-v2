import React from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { connect } from 'react-redux';
import 'react-tabs/style/react-tabs.css';
import AttributeList from './AttributeList';
import * as actions from '../../actions';

const makeTabs = tabList => tabList.map(tab => <Tab key={`tab-${tab.id}`}>{tab.name}</Tab>);

const makeTabPanels = tabList => tabList.map(tab => (
  <TabPanel key={`tabPanel-${tab.id}`}>
    <AttributeList />
  </TabPanel>),
);

const makeTabsChildren = categories => [
  <TabList key="TabList">{makeTabs(categories)}</TabList>,
  makeTabPanels(categories),
];

const mapStateToProps = state => ({
  children: makeTabsChildren(state.categoryList),
  selectedIndex: state.selectedCategoryId,
});
const mapDispatchToProps = dispatch => ({
  onSelect: index => dispatch(actions.selectCategory(index)),
});

const Categories = connect(mapStateToProps, mapDispatchToProps)(Tabs);

export default Categories;
