import React from 'react';

const initialState = {
  name: '',
  email: '',
  password: '',
  repassword: '',
  nameError: '',
  emailError: '',
  passwordError: '',
  repasswordError: '',
  nomatch: ''
};

class SignUp extends React.Component {
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
      <>
        <div className="App">
          <h2>Sign Up</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <input
                name="name"
                placeholder="name"
                value={this.state.name}
                onChange={this.handleChange}
              />
              <div className="Error">{this.state.nameError}</div>
            </div>
            <div>
              <input
                name="email"
                placeholder="email"
                value={this.state.email}
                onChange={this.handleChange}
              />
              <div className="Error">{this.state.emailError}</div>
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <div className="Error">{this.state.passwordError}</div>
              <div>
                <input
                  type="password"
                  name="repassword"
                  placeholder="re-enter password"
                  value={this.state.repassword}
                  onChange={this.handleChange}
                />
                <div className="Error">{this.state.repasswordError}</div>
                <div className="Error">{this.state.nomatch}</div>
              </div>
              <button type="submit">Sign Up</button>
            </div>
          </form>
        </div>
      </>
    );
  }
}

export default SignUp;
