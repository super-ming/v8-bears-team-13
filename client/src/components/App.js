import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Provider } from 'react-redux'; // Provide app with Store/State. Wrap around everything

import store from '../store/store';

import 'normalize.css';
import '../styles/styles.scss';

// Main container that holds everything else
// eslint-disable-next-line react/prefer-stateless-function
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <h1>Obligatory "Hello, World!"</h1>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
