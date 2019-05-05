import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import { getHistory } from '../../actions/historyActions';

import SearchBar from './SearchBar';

class Container extends Component {
  onSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData(document.getElementById('form__filter'));
    const obj = {};

    // eslint-disable-next-line no-restricted-syntax
    for (const data of formData.entries()) {
      // data is in key-value pairs
      const key = data[0];
      const value = data[1];
      obj[key] = value;
    }
    const num = obj.date;
    const transact = obj.type;
    const str = String(document.getElementById('search-bar__history').value);

    const resultString = this.getResultString(num);

    this.props.updateResultsString(resultString);
    this.props.fetchHistory(num, transact, str);
  };

  getResultString = (numMonths) => {
    // Last 30 days
    const now = moment().format('MMM Do, YYYY');

    // Convert string to number
    const num = numMonths - 0;

    let startDate;

    if (num === 1) {
      startDate = moment().subtract('1', 'month');
    } else if (num === 3) {
      startDate = moment().subtract('3', 'month');
    } else if (num === 6) {
      startDate = moment().subtract('6', 'month');
    } else if (num === 12) {
      startDate = moment().subtract('1', 'year');
    }

    // Getting all entries
    if (!startDate) return 'Showing results from all entries';

    const formattedStartDate = startDate.format('MMM Do, YYYY');
    return `Showing results from ${now} to ${formattedStartDate}`;
  }

  render() {
    return (
      <>
        <form className="filter-bar" id="form__filter" onSubmit={this.onSubmit}>
          <SearchBar />

          <select name="type" id="type" className="filter-bar__select">
            <option value="2">All</option>
            <option value="1">Expense</option>
            <option value="0">Income</option>
          </select>

          <select name="date" id="date" className="filter-bar__select">
            <option value="1">Last 30 Days</option>
            <option value="3">Last Three Months</option>
            <option value="6">Last Six Months</option>
            <option value="12">Last Year</option>
            <option value="9999">All Time</option>
          </select>
          <button className="button filter-bar__button" type="submit">
            Search
          </button>
        </form>
      </>
    );
  }
}

Container.propTypes = {
  fetchHistory: PropTypes.func.isRequired,
  updateResultsString: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  status: state.dash.status,
  auth: state.auth,
  latestEntries: state.dash.latestEntries,
  loading: state.loading.isLoading,
  history: state.history
});

const mapDispatchToProps = dispatch => ({
  setGetHistory: (data) => {
    dispatch(getHistory(data));
  }
});

const FilterBar = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default FilterBar;
