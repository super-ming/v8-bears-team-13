import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'; // Provide app with Store/State. Wrap around everything

// Services
import store from '../store/store';

// Components
import Landing from './landing/Landing';
import SignIn from './auth/SignIn';
import NotFound from './error/NotFound';

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
          <div className="App">
            <Switch>
              <Route exact path="/" component={Landing} />
              <Route exact path="/sign-in" component={SignIn} />
              <Route component={NotFound} />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
