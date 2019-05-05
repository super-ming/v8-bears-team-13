import React, { Component } from 'react';
import classnames from 'classnames';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

class SearchBar extends Component {
  state = {
    isTyping: false,
    searchText: ''
  };

  handleChange = (evt) => {
    this.setState({
      searchText: evt.target.value
    });
  };

  handleFocus = () => {
    this.setState({ isTyping: true });
  };

  handleBlur = () => {
    this.setState({ isTyping: false });
  };

  render() {
    const searchIconClasses = classnames('search-bar__icon', {
      'search-bar__icon--hidden': this.state.isTyping || this.state.searchText
    });

    return (
      <div className="search-bar">
        <input
          type="text"
          className="search-bar__input"
          value={this.state.searchText}
          onChange={this.handleChange}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          id="search-bar__history"
        />
        <FontAwesomeIcon icon={faSearch} className={searchIconClasses} />
      </div>
    );
  }
}

export default SearchBar;
