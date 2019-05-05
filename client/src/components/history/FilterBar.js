import React, { Component } from 'react';

import SearchBar from './SearchBar';

class FilterBar extends Component {
  state = {}

  render() {
    return (
      <>
        <form className="filter-bar">
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
          <button className="button filter-bar__button" type="submit">Search</button>
        </form>
      </>
    );
  }
}

export default FilterBar;
