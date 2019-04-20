import React from 'react';
import DashboardSummary from './DashboardSummary';
import EntryList from '../entries/EntryList';
import Entry from '../entries/Entry';

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
          <p className="body-text">{`You've saved $${
            this.state.monthlyAmountSaved
          } so far this month.`}
          </p>
          <DashboardSummary
            income={this.state.monthlyIncome}
            expense={this.state.monthlyExpenses}
          />
          <button className="button dash__button" type="button">
            Add Entry
          </button>
          <h2 className="heading-sub">Recent Entries</h2>
          <div className="entry__container">
            <Entry
              id={1}
              amount={100.25}
              category="lucky"
              date="April 7, 2018"
              description="Won the lottery and became a millionaire"
            />
            <Entry
              id={2}
              amount={-100.25}
              category="lucky"
              date="April 5, 2018"
              description="Dinner at fancy restaurant"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;
