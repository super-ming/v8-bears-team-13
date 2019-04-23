import React, { Component } from 'react';

import FilterBar from './FilterBar';
import SavingsCard from './SavingsCard';
import EntryList from '../entries/EntryList';

// Dummy Data
import entries from '../../data/entries';

class History extends Component {
  state = {}

  render() {
    return (
      <div className="content">
        <h1 className="heading-main">History</h1>
        <div className="history">
          <FilterBar />
          <h2 className="heading-sub">Showing results from...</h2>
          <SavingsCard income={1000} expenses={900} />
          <h2 className="heading-sub">Entries</h2>
          <EntryList entries={entries} />
        </div>
      </div>
    );
  }
}

export default History;
