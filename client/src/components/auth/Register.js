import React from 'react';

const initialState = {
  username: '',
  email: '',
  password: '',
  repassword: '',
  nameError: '',
  emailError: '',
  passwordError: '',
  repasswordError: '',
  nomatch: ''
};

class Register extends React.Component {
  state = initialState;

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  validate = () => {
    let nameError = '';
    let emailError = '';
    let passwordError = '';
    let repasswordError = '';
    let nomatch = '';

    if (!this.state.name) {
      nameError = 'name cannot be blank';
    }

    if (!this.state.email) {
      emailError = 'email cannot be blank';
    }

    if (this.state.email.length < 5) {
      if (!this.state.email.includes('@')) {
        emailError = 'invalid email';
      } else {
        emailError = 'length must be greater than 5';
      }
    }

    if (!this.state.password) {
      passwordError = 'password cannot be blank';
    }

    if (!this.state.repassword) {
      repasswordError = 'password cannot be blank';
    }

    if (this.state.repassword !== this.state.password) {
      nomatch = 'passwords must match';
    }

    if (emailError || nameError || passwordError || repasswordError || nomatch) {
      this.setState({
        emailError,
        nameError,
        passwordError,
        repasswordError,
        nomatch
      });
      return false;
    }

    return true;
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      this.setState(initialState);
    }
  };

  render() {
    return (
      <div className="content">
        <h1 className="heading__main">Register</h1>

        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__group">
            <input
              className="form__input"
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.name}
              onChange={this.handleChange}
            />
            <div className="error">{this.state.nameError}</div>
          </div>
          <div className="form__group">
            <input
              className="form__input"
              type="email"
              name="email"
              placeholder="Email"
              value={this.state.email}
              onChange={this.handleChange}
            />
            <div className="error">{this.state.emailError}</div>
          </div>
          <div className="form__group">
            <input
              className="form__input"
              type="password"
              name="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleChange}
            />
            <div className="error">{this.state.passwordError}</div>
          </div>
          <div className="form__group">
            <input
              className="form__input"
              type="password"
              name="repassword"
              placeholder="Re-enter password"
              value={this.state.repassword}
              onChange={this.handleChange}
            />
            <div className="error">{this.state.repasswordError}</div>
            <div className="error">{this.state.nomatch}</div>
          </div>
          <button className="button" type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
