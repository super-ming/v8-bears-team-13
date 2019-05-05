import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import FilterBar from './FilterBar';
import SavingsCard from './SavingsCard';
import EntryList from '../entries/EntryList';
import EditEntry from '../dashboard/EditEntry';
import Loader from '../loader/Loader';

import { editEntry } from '../../actions/dashActions';
import { getHistory, deleteEntry } from '../../actions/historyActions';

class Container extends Component {
  state = {
    resultsString: 'Showing results from...'
  };

  componentDidMount() {
    this.fetchHistory(1);
    this.updateResultsString(1);
  }

  updateResultsString = (num) => {
    const updatedText = this.calculateResultsString(num);

    this.setState({ resultsString: updatedText });
  };

  fetchHistory = async (num, transact, str) => {
    const qTransact = transact ? `&transact=${transact}` : '';
    const qStr = str ? `&str=${str}` : '';

    const url = `/api/history/month?num=${num}${qTransact}${qStr}`;

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

  calculateResultsString = (numMonths) => {
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
    if (!startDate) return 'Showing results from all time';

    const formattedStartDate = startDate.format('MMM Do, YYYY');
    return `Showing results from ${now} to ${formattedStartDate}`;
  };

  render() {
    const historyEntries = () => {
      const { entries } = this.props;

      if (this.props.loading) {
        return <Loader />;
      }

      if (entries.length === 0) {
        return <h2 className="heading history__no-entries">No entries for this time period...</h2>;
      }

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
            <FilterBar
              fetchHistory={this.fetchHistory}
              updateResultsString={this.updateResultsString}
            />
            <h2 className="heading history__subheading">{this.state.resultsString}</h2>
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
