import React, { Component } from 'react';

import SearchBar from './SearchBar';

class FilterBar extends Component {
  state = {}

  render() {
    return (
      <div className="filter-bar">
        <SearchBar />

        <select name="type" id="type" className="filter-bar__select">
          <option value="expense">Expense</option>
          <option value="income">Income</option>
        </select>

        <select name="date" id="date" className="filter-bar__select">
          <option value="this-month">This Month</option>
          <option value="three-months">Last Three Months</option>
          <option value="six-months">Last Six Months</option>
          <option value="year">Last Year</option>
          <option value="all-time">All Time</option>
        </select>
      </div>
    );
  }
}

export default FilterBar;
