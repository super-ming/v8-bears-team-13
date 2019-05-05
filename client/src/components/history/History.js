import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import FilterBar from './FilterBar';
import SavingsCard from './SavingsCard';
import EntryList from '../entries/EntryList';
import EditEntry from '../dashboard/EditEntry';
import Loader from '../loader/Loader';

import { editEntry } from '../../actions/dashActions';
import { getHistory, deleteEntry } from '../../actions/historyActions';

class Container extends Component {
  componentDidMount() {
    this.fetchHistory(1);
  }

  fetchHistory = async (num) => {
    const url = `http://localhost:5000/api/history/month/${num}`;
    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(data => data.json())
      .then((results) => {
        this.props.setGetHistory(results);
      })
      .catch(err => console.log(err));
  };

  render() {
    const historyEntries = () => {
      const { entries } = this.props;

      if (this.props.loading) return <Loader />;
      if (entries !== undefined) {
        return (
          <EntryList
            entries={entries}
            editEntry={this.props.editEntry}
            deleteEntry={this.props.deleteEntry}
          />
        );
      }
    };

    const index = () => {
      const { status, entries } = this.props;

      let income = 0;
      let expenses = 0;

      if (entries) {
        entries.map((entry) => {
          if (!entry.transact_id) {
            income += parseFloat(entry.amount);
          }
          if (entry.transact_id) {
            expenses += parseFloat(entry.amount);
          }
        });
      }

      if (status === 'edit') {
        return <EditEntry getEntries={() => this.fetchHistory(1)} />;
      }

      if (status === 'history') {
        return (
          <>
            <h1 className="heading--main">History</h1>
            <FilterBar />
            <h2 className="heading--sub">Showing results from...</h2>
            <SavingsCard income={income} expenses={expenses} />
            <h2 className="heading--sub">Entries</h2>
            {historyEntries()}
          </>
        );
      }
    };

    return (
      <div className="content">
        <div className="history">{index()}</div>
      </div>
    );
  }
}

Container.propTypes = {
  entries: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  status: PropTypes.string.isRequired,
  deleteEntry: PropTypes.func.isRequired,
  editEntry: PropTypes.func.isRequired,
  setGetHistory: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  status: state.history.status,
  auth: state.auth,
  loading: state.loading.isLoading,
  entries: state.history.entries
});

const mapDispatchToProps = dispatch => ({
  setGetHistory: (data) => {
    dispatch(getHistory(data));
  },
  editEntry: (entry) => {
    dispatch(editEntry(entry));
  },
  deleteEntry: (entryId) => {
    dispatch(deleteEntry(entryId));
  }
});

const History = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default History;
