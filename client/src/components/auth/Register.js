import React from 'react';
import { Redirect } from 'react-router-dom';

const initialState = {
  fields: {},
  errors: {},
  serverError: '',
  touched: {},
  nomatch: '',
  redirectToLogin: false
};

class Register extends React.Component {
  state = initialState;

  handleChange = (event) => {
    let { fields } = this.state;
    const { name, value } = event.target;
    fields[name] = value;
    this.setState({
      fields
    });
  };

  handleBlur = field => (event) => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    }, this.validate);
  }

  validate = () => {
    let { fields, touched, nomatch } = this.state;
    let errors = {};
    let formValid = true;

    if (touched['username'] && !fields['username']) {
      formValid = false;
      errors['username'] = 'Name cannot be blank';
    }

    if (touched['email'] && !fields['email']) {
      formValid = false;
      errors['email'] = 'Email cannot be blank';
    }

    if (touched['email'] && fields['email'] && fields['email'].length < 4) {
      formValid = false;
      if (!fields['email'].includes('@')) {
        errors['email'] = 'Invalid email';
      } else {
        errors['email'] = 'Email length must be greater than 4 characters'
      }
    }

    if (touched['password']) {
      if (!fields['password']) {
        formValid = false;
        errors['password'] = 'Password cannot be blank';
      }

      if (fields['password'] && fields['password'].length < 6) {
        formValid = false;
        errors['password'] = 'Password must be at least 6 characters';
      }
    }

    if (touched['repassword'] && !fields['repassword']) {
      formValid = false;
      errors['repassword'] = 'Please re-enter your password';
    }

    if (touched['repassword']) {
      if (fields['repassword'] !== fields['password']) {
        formValid = false;
        nomatch = 'Passwords must match';
      } else {
        nomatch = '';
      }
    }

    if (formValid) {
      this.setState({
        ...this.state.fields,
        errors: {},
        ...this.state.touched,
        nomatch: '',
        serverError: ''
      });
    } else {
      this.setState({
        errors,
        nomatch
      });
    }

    return formValid;
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = this.validate();

    if (!isValid) return;

    const url = 'http://localhost:5000/api/auth/register';
    const { username, email, password } = this.state.fields;
    const data = JSON.stringify({ username, email, password });

    fetch(url, {
      method: 'POST',
      body: data,
      headers: { 'Content-type': 'application/json' }
    })
      .then(fetchRes => this.handleFetchErrors(fetchRes))
      .then((res) => {
        this.setState({
          fields: {},
          errors: {},
          serverError: '',
          redirectToLogin: true
        }, () => console.log(this.state));
      })
      .catch(err => console.log('Error while fetching', err));
  };

  handleFetchErrors = async (response) => {
    if (response.ok) return response;

    if (!response.ok) {
      const errorData = await response.json();
      this.setState({ serverError: errorData.error });
      throw new Error(response.statusText);
    }
  }

  render() {
    return (
      <div className="content">
        <h1 className="heading__main">Register</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__group">
            <label htmlFor="username">Username: </label>
            <input
              required
              id="username"
              className="form__input"
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.fields.username || ''}
              onChange={this.handleChange}
              onBlur={this.handleBlur('username')}
            />
            <div className="error">{this.state.errors.username}</div>
          </div>
          <div className="form__group">
            <label htmlFor="email">Email: </label>
            <input
              required
              id="email"
              className="form__input"
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.fields.email || ''}
              onChange={this.handleChange}
              onBlur={this.handleBlur('email')}
            />
            <div className="error">{this.state.errors.email}</div>
          </div>
          <div className="form__group">
            <label htmlFor="password">Password: </label>
            <input
              required
              id="password"
              className="form__input"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.fields.password || ''}
              onChange={this.handleChange}
              onBlur={this.handleBlur('password')}
            />
            <div className="error">{this.state.errors.password}</div>
          </div>
          <div className="form__group">
            <label htmlFor="repassword">Re-enter password: </label>
            <input
              required
              id="repassword"
              className="form__input"
              type="password"
              name="repassword"
              placeholder="Re-enter password"
              value={this.state.fields.repassword || ''}
              onChange={this.handleChange}
              onBlur={this.handleBlur('repassword')}
            />
            <div className="error">{this.state.errors.repassword}</div>
            <div className="error">{this.state.nomatch}</div>
            <div className="error">{this.state.serverError}</div>
          </div>
          <button className="button" type="submit">Register</button>
        </form>
        { this.state.redirectToLogin && <Redirect to="/login" /> }
      </div>
    );
  }
}

export default Register;
