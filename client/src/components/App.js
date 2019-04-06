import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'; // Provide app with Store/State. Wrap around everything

// Services
import store from '../store/store';

// Components
import Dashboard from './dashboard/Dashboard';
import Footer from './layout/Footer';
import History from './history/History';
import Landing from './landing/Landing';
import Login from './auth/Login';
import Navbar from './layout/Navbar';
import NotFound from './error/NotFound';
import Register from './auth/Register';

// CSS
import 'normalize.css';
import '../styles/styles.scss';

// Main container that holds everything else
// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app">
            <Navbar />
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/history" component={History} />
              <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
