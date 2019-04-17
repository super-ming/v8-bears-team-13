import React from 'react';
import Cookies from 'universal-cookie';

class Dashboard extends React.Component {
  state = {
    isAuthenticated: false
  }

  componentDidMount() {
    const cookies = new Cookies();
    console.log(cookies.get('jwt'));
    console.log(cookies.getAll());
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
