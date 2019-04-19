import React from 'react';

class Dashboard extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <div className="dashboard">
        <h1 className="heading-main">Dashboard</h1>
        <div className="content">
          <p className="body-text">This is what logged in users will see</p>
        </div>
      </div>
    );
  }
}

export default Dashboard;
