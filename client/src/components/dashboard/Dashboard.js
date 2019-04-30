import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// need connect function to be able to connect to store from Provider

import { addEntry, editEntry, dashDefault, getLatestEntries } from '../../actions/dashActions';

import Add from './Add';
import EditEntry from './EditEntry';
import DashboardSummary from './DashboardSummary';
import EntryList from '../entries/EntryList';

class Container extends React.Component {
  constructor(props) {
    super(props);
    // this.addNewEntry = this.addNewEntry.bind(this);
    // this.setDashDefault = this.setDashDefault.bind(this);
    // this.state = {
    //   status: 'dash'
    // };
  }

  componentDidMount() {
    this.fetchEntries();
  }

  fetchEntries = () => {
    this.props.getLatestEntries(this.props.auth.userId);
  }

  // statusAdd = () => {
  //   this.setState({status:'add'});
  //   console.log(this.state.status);
  // }

  render() {
    console.log(this.props);
    const index = () => {
      const { status, latestEntries } = this.props;
      let income = 0;
      let expense = 0;
      let savings = 0;
      if (latestEntries) {
        latestEntries.map((entry) => {
          if (!entry.transact_id) {
            income += parseFloat(entry.amount);
          }
          if (entry.transact_id) {
            expense += parseFloat(entry.amount);
          }
        });
        savings = income - expense;
      }
     
      if (status === 'add') {
        return (
          <div>
            <Add getLatestEntries={this.fetchEntries} />
          </div>
        );
      } if (status === 'edit') {
        return (
          <div>
            <EditEntry />
          </div>
        );
      } if (status === 'dash') {
        return (
          <div>
            <div className="dash__saved">
              <p>
                You have saved{' '}
                <span className="dash__saved--big">${savings}</span> so far
                this month.
              </p>
            </div>
            <DashboardSummary
              income={income}
              expense={expense}
            />
            <button className="button dash__button" type="button" onClick={this.props.addNewEntry}>
              Add Entry
            </button>
            <h2 className="heading--sub">Recent Entries</h2>
            { latestEntries !== undefined && (
              <EntryList entries={latestEntries} editEntry={this.props.editEntry} />
            )}
          </div>
        );
      }
    };

    return (
      <div className="content">
        <h1 className="heading--main">Dashboard</h1>
        <div className="dash">{index()}</div>
      </div>
    );
  }
}

Container.propTypes = {
  status: PropTypes.string.isRequired,
  addNewEntry: PropTypes.func.isRequired,
  editEntry: PropTypes.func.isRequired,
  getLatestEntries: PropTypes.func.isRequired,
  latestEntries: PropTypes.array,
};

const mapStateToProps = state => ({
  status: state.dash.status,
  auth: state.auth,
  latestEntries: state.dash.latestEntries
});

const mapDispatchToProps = (dispatch) => ({
  addNewEntry: () => {
    dispatch(addEntry());
  },
  editEntry: () => {
    dispatch(editEntry());
  },
  setDashDefault: () => {
    dispatch(dashDefault());
  },
  getLatestEntries: (userId) => {
    dispatch(getLatestEntries(userId));
  }
});

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default Dashboard;
