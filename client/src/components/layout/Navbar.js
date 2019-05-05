import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { logoutUser } from '../../actions/authActions';

class Navbar extends Component {
  state = {
    checkboxChecked: false
  };

  handleLogout = (evt) => {
    evt.preventDefault();
    this.props.logoutUser();
  };

  toggleCheckboxState = (evt) => {
    this.setState(st => ({
      checkboxChecked: !st.checkboxChecked
    }));
  };

  render() {
    const isLoggedIn = this.props.auth.username !== '';
    let dynamicNavbar;

    if (isLoggedIn) {
      dynamicNavbar = (
        <ul className="navbar__menu" id="navbar-menu" onClick={this.toggleCheckboxState}>
          <li className="navbar__item">
            <NavLink to="/" className="navbar__link" exact activeClassName="navbar__link--active">
              Landing
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              to="/dashboard"
              className="navbar__link"
              activeClassName="navbar__link--active"
            >
              Dashboard
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/history" className="navbar__link" activeClassName="navbar__link--active">
              History
            </NavLink>
          </li>
          <li className="navbar__item">
            <a href="/logout" onClick={this.handleLogout} className="navbar__link">
              Logout
            </a>
          </li>
        </ul>
      );
    } else {
      dynamicNavbar = (
        <ul className="navbar__menu" id="navbar-menu" onClick={this.toggleCheckboxState}>
          <li className="navbar__item">
            <NavLink to="/" className="navbar__link" exact activeClassName="navbar__link--active">
              Landing
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink
              to="/login"
              className="navbar__link"
              exact
              activeClassName="navbar__link--active"
            >
              Login
            </NavLink>
          </li>
          <li className="navbar__item">
            <NavLink to="/register" className="navbar__link" activeClassName="navbar__link--active">
              Register
            </NavLink>
          </li>
        </ul>
      );
    }

    return (
      <div className="navbar" id="navbar">
        <h2><NavLink to={isLoggedIn ? '/dashboard' : '/'}>KA-Chingu</NavLink></h2>
        <div id="toggle">
          <input
            className="checkbox"
            type="checkbox"
            checked={this.state.checkboxChecked}
            onClick={this.toggleCheckboxState}
          />
          <span />
          <span />
          <span />
          {dynamicNavbar}
        </div>
      </div>
    );
  }
}

Navbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.shape({
    username: PropTypes.string,
    expires: PropTypes.string
  }).isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
