import React from 'react';
import getCookies from '../../utils/getCookies';

class Dashboard extends React.Component {
  componentDidMount() {
    const cookies = getCookies();
    console.log(cookies);
  }

  render() {
    return (
      <div className="dashboard">
        <h1 className="heading__main">Dashboard</h1>
        <div className="content">
          <p className="body-text">This is what logged in users will see</p>
        </div>
      </div>
    );
  }
}

export default Dashboard;
