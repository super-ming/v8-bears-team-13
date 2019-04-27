import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// need connect function to be able to connect to store from Provider

import { addEntry, dashDefault } from '../../actions/dashActions';

import Add from './Add';
import DashboardSummary from './DashboardSummary';
import EntryList from '../entries/EntryList';

// Dummy Data
import entries from '../../data/entries';

const initialState = {
  entries,
  monthlyAmountSaved: 999.99,
  monthlyIncome: 299.0,
  monthlyExpenses: 99.99
};

class Container extends React.Component {
  constructor(props) {
    super(props);
    // this.addNewEntry = this.addNewEntry.bind(this);
    // this.setDashDefault = this.setDashDefault.bind(this);
    // this.state = {
    //   status: 'dash'
    // };
    this.state = initialState;
  }

  componentDidMount() {}

  // statusAdd = () => {
  //   this.setState({status:'add'});
  //   console.log(this.state.status);
  // }

  render() {
    const index = () => {
      const { status } = this.props;
      if (status === 'add') {
        return (
          <div>
            <Add />
          </div>
        );
      } if (status === 'dash') {
        return (
          <div>
            <div className="dash__saved">
              <p>
                You have saved{' '}
                <span className="dash__saved--big">${this.state.monthlyAmountSaved}</span> so far
                this month.
              </p>
            </div>
            <DashboardSummary
              income={this.state.monthlyIncome}
              expense={this.state.monthlyExpenses}
            />
            <button className="button dash__button" type="button" onClick={this.props.addNewEntry}>
              Add Entry
            </button>
            <h2 className="heading--sub">Recent Entries</h2>
            <EntryList entries={this.state.entries} />
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
  addNewEntry: PropTypes.func.isRequired
};

const mapStateToProps = state => state.dash;

const mapDispatchToProps = dispatch => ({
  addNewEntry: () => {
    dispatch(addEntry());
  },
  setDashDefault: () => {
    dispatch(dashDefault());
  }
});

const Dashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Container);

export default Dashboard;
