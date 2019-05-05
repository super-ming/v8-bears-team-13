import React, { Component } from 'react';
import { connect } from 'react-redux';

import SearchBar from './SearchBar';

import { getHistory } from '../../actions/historyActions';

import PropTypes from 'prop-types';

// need connect function to be able to connect to store from Provider

import {
  addEntry, editEntry, deleteEntry, dashDefault, getLatestEntries
} from '../../actions/dashActions';


class Container extends Component {
  state = {}

  onSubmit = (e) => {
    const formData = new FormData(document.getElementById('form__filter'));
    const obj = {};
    for (const data of formData.entries()) {
      // data is in key-value pairs
      const key = data[0];
      const value = data[1];
      obj[key] = value;
    }
    const num = obj.date;
    const transact = obj.type;
    const str = String(document.getElementById('search-bar__history').value);

    e.preventDefault();
    this.props.fetchHistory(num, transact, str);
  }

  render() {
    return (
      <>
        <form className="filter-bar" id="form__filter" onSubmit={this.onSubmit}>
          <SearchBar />

          <select name="type" id="type" className="filter-bar__select">
          < option value="2">All</option>
            <option value="1">Expense</option>
            <option value="0">Income</option>
          </select>

          <select name="date" id="date" className="filter-bar__select">
            <option value="1">This Month</option>
            <option value="3">Last Three Months</option>
            <option value="6">Last Six Months</option>
            <option value="12">Last Year</option>
            <option value="9999">All Time</option>
          </select>
          <button className="button filter-bar__button" type="submit">Search</button>
        </form>
      </>
    );
  }
}


const mapStateToProps = state => ({
  status: state.dash.status,
  auth: state.auth,
  latestEntries: state.dash.latestEntries,
  loading: state.loading.isLoading,
  history: state.history
});

const mapDispatchToProps = dispatch => {
  return {
    setGetHistory: (data) => {
      dispatch(getHistory(data));
    }
    // ,
    // editEntry: (entry) => {
    //   dispatch(editEntry(entry));
    // },
    // deleteEntry: (entryId) => {
    //   dispatch(deleteEntry(entryId));
    // }  
  }
};

const FilterBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default FilterBar;
