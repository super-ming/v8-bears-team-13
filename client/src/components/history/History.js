import React, { Component } from 'react';
import { connect } from 'react-redux';

import FilterBar from './FilterBar';
import SavingsCard from './SavingsCard';
import EntryList from '../entries/EntryList';

import formatMoney from '../../helpers/formatMoney';

// Dummy Data
import entries from '../../data/entries';



class Container extends Component {
  state = {
    history: []
  }

  componentDidMount() {
    this.fetchCurrMonth();
  }

  fetchCurrMonth = () => {
    this.props.getLatestEntries(this.props.auth.userId);
  };

  render() {
    return (
      <div className="content">
        <h1 className="heading--main">History</h1>
        <div className="history">
          <FilterBar />
          <h2 className="heading--sub">Showing results from...</h2>
          <SavingsCard income={1000} expenses={900} />
          <h2 className="heading--sub">Entries</h2>
          <EntryList entries={entries} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  loading: state.loading.isLoading
});

const mapDispatchToProps = dispatch => ({

  // getLatestEntries: (userId) => {
  //   dispatch(getLatestEntries(userId));
  // }
});

const History = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default History;
