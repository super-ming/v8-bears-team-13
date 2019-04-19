import React from 'react';

const initialState = {
  monthlyAmountSaved: 999.99
};

class Dashboard extends React.Component {
  state = initialState;

  render() {
    return (
      <div className="dashboard">
        <h1 className="heading-main">Dashboard</h1>
        <p>TEST</p>
        <p>{`You've saved ${this.state.monthlyAmountSaved} so far this month`}</p>
      </div>
    );
  }
}

export default Dashboard;
