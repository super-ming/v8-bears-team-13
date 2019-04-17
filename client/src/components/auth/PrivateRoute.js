import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

// Higher-order component that checks authentication status
// If authenticated, render the private component
// If not authenticated, redirect to /login
// See: https://tylermcginnis.com/react-router-protected-routes-authentication/
const PrivateRoute = ({ component: Component, ...rest }) => {
  // const isAuthenticated = cookies.get('jwt');
  const isAuthenticated = true;

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
  component: PropTypes.func.isRequired
};

export default PrivateRoute;
