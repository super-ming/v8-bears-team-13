import React, { Component } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import moment from 'moment';
import PropTypes from 'prop-types';

import { logoutUser } from '../../actions/authActions';

// Higher-order component that checks authentication status
// If authenticated, render the private component
// If not authenticated, redirect to /login
// See: https://tylermcginnis.com/react-router-protected-routes-authentication/

class PrivateRoute extends Component {
  componentDidMount() {
    if (!this.isAuthenticated()) {
      this.props.logoutUser();
    }
  }

  isAuthenticated = () => {
    const { username, expires } = this.props.auth;

    return username !== '' && moment() < moment(expires);
  }

  render() {
    const { component: ComponentToRender, ...rest } = this.props;

    return (
      <Route
        {...rest}
        render={props => (
          this.isAuthenticated()
            ? <ComponentToRender {...props} />
            : <Redirect to="/login" />
        )}
      />
    );
  }
}

PrivateRoute.propTypes = {
  // There's no `component` type
  component: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    username: PropTypes.string,
    expires: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { logoutUser })(PrivateRoute);
