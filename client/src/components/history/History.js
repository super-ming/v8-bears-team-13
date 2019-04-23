import React, { Component } from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class History extends Component {
  state = {
    isTyping: false,
    searchText: ''
  }

  handleSearchChange = (evt) => {
    this.setState({
      searchText: evt.target.value
    });
  }

  handleSearchFocus = () => {
    this.setState({ isTyping: true });
  }

  handleSearchBlur = () => {
    this.setState({ isTyping: false });
  }

  render() {
    const searchIconClasses = classnames('history__search-icon', {
      'history__search-icon--hidden': this.state.isTyping || this.state.searchText
    });

    return (
      <div className="content">
        <div className="history">
          <h1 className="heading-main">History</h1>
          <div className="content">
            <input
              type="text"
              className="history__search"
              value={this.state.searchText}
              onChange={this.handleSearchChange}
              onFocus={this.handleSearchFocus}
              onBlur={this.handleSearchBlur}
            />
            <FontAwesomeIcon icon={faSearch} className={searchIconClasses} />

            <select name="type" id="type" className="history__type">
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>

            <select name="date" id="date" className="history__date">
              <option value="this-month">This Month</option>
              <option value="three-months">Last Three Months</option>
              <option value="six-months">Last Six Months</option>
              <option value="year">Last Year</option>
              <option value="all-time">All Time</option>
            </select>
          </div>
        </div>
      </div>
    );
  }
}

export default History;
