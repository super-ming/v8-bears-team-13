import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

import { loginUser } from '../../actions/authActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const initialState = {
  username: '',
  password: '',
  usernameError: '',
  passwordError: '',
  serverError: '',
  redirectToDashboard: false,
  hidden: ''
};

class Login extends React.Component {
  state = initialState;

  componentDidMount() {
    if (this.props.auth.username) {
      this.setState({ redirectToDashboard: true });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  validate = () => {
    let usernameError = '';
    let passwordError = '';

    if (!this.state.username) {
      usernameError = 'Username cannot be blank';
    }

    if (!this.state.password) {
      passwordError = 'Password cannot be blank';
    }

    if (usernameError || passwordError) {
      this.setState({
        usernameError,
        passwordError
      });
      return false;
    }

    return true;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = this.validate();

    if (!isValid) return;

    const { username, password } = this.state;
    const url = 'http://localhost:5000/api/auth/login';
    const data = JSON.stringify({ username, password });

    fetch(url, {
      method: 'POST',
      body: data,
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include'
    })
      .then(this.handleFetchErrors)
      .then(res => res.json())
      .then((userData) => {
        this.props.loginUser(userData);
        this.setState({ redirectToDashboard: true });
      })
      .catch(err => console.log(err));
  };

  handleFetchErrors = (response) => {
    if (!response.ok) {
      response.text().then((body) => { this.setState({ serverError: JSON.parse(body).error }); });
      throw Error(response.statusText);
    }
    return response;
  }

  toggleMask = () => {
    this.setState({ hidden: !this.state.hidden })
  }

  render() {
    return (
      <div className="content">
        <div className="form__container">
          <h1 className="heading--main">Login</h1>
          { this.state.redirectToDashboard && <Redirect to={`/dashboard/${this.props.auth.userId}`} />}
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form__group">
              <label htmlFor="username" className="form__label">Username:</label>
              <div className="form__input-container">
                <input
                  required
                  id="username"
                  className="form__input"
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
                <div className="error">{this.state.usernameError}</div>
              </div>
            </div>
            <div className="form__group">
              <label htmlFor="password" className="form__label">Password:</label>
              <div className="form__input-container">
                <input
                  required
                  id="password"
                  className="form__input"
                  type={this.state.hidden ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
                <button className="hidden" type="button" title="Mask/Unmask password to check content" onClick={this.toggleMask}> 
                  <FontAwesomeIcon icon={faEye} />
                </button>
                <div className="error">{this.state.passwordError}</div>
              </div>
            </div>
            <button className="button" type="submit">
              Login
            </button>
            <div className="error error--server">{this.state.serverError}</div>
          </form>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  auth: PropTypes.shape({
    username: PropTypes.string,
    userId: PropTypes.string,
    expires: PropTypes.string, 
  }).isRequired,
  loginUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps, { loginUser })(Login);
