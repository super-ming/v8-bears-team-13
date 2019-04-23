import React, { Component } from 'react';

import FilterBar from './FilterBar';

class History extends Component {
  state = {}

  render() {
    return (
      <div className="content">
        <div className="history">
          <h1 className="heading-main">History</h1>
          <div className="content">
            <FilterBar />
          </div>
        </div>
      </div>
    );
  }
}

export default History;
