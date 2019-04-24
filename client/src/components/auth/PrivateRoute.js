import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Higher-order component that checks authentication status
// If authenticated, render the private component
// If not authenticated, redirect to /login
// See: https://tylermcginnis.com/react-router-protected-routes-authentication/
const PrivateRoute = ({ component: Component, auth, ...rest }) => {
  const isAuthenticated = auth.username !== '';

  return (
    <Route
      {...rest}
      render={props => (
        isAuthenticated
          ? <Component {...props} />
          : <Redirect to="/login" />
      )}
    />
  );
};

PrivateRoute.propTypes = {
  // There's no `component` type
  component: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    username: PropTypes.string,
    expires: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
