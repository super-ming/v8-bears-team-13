import React from 'react';
import DashboardSummary from './DashboardSummary';
import EntryList from '../entries/EntryList';

const initialState = {
  monthlyAmountSaved: 999.99,
  monthlyIncome: 299.0,
  monthlyExpenses: 99.99,
  entries: [{}]
};

class Dashboard extends React.Component {
  state = initialState;

  render() {
    return (
      <div className="dash">
        <h1 className="heading-main">Dashboard</h1>
        <div className="content">
          <div className="dash__saved">
            <p>
              You have saved <span className="dash__saved--big">${this.state.monthlyAmountSaved}</span> so far this month.
            </p>
          </div>
          <DashboardSummary
            income={this.state.monthlyIncome}
            expense={this.state.monthlyExpenses}
          />
          <button className="button dash__button" type="button">
            Add Entry
          </button>
          <h2 className="heading-sub">Recent Entries</h2>
          <EntryList />
        </div>
      </div>
    );
  }
}

export default Dashboard;
