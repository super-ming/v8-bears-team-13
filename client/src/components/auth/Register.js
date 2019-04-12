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
  nomatch: '',
  serverError: ''
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

    if (!this.state.username) {
      nameError = 'Name cannot be blank';
    }

    if (!this.state.email) {
      emailError = 'Email cannot be blank';
    }

    if(this.state.email.length < 4) {
      if (!this.state.email.includes('@')) {
        emailError = 'Invalid email';
      } else {
        emailError = 'Email length must be greater than 4 characters'
      }
    }
      
    if (this.state.password.length < 6) {
      passwordError = 'Length must be greater than 6 characters';
    }

    if (!this.state.password) {
      passwordError = 'Password cannot be blank';
    }

    if (!this.state.repassword) {
      repasswordError = 'Please re-enter your password';
    }

    if (this.state.repassword !== this.state.password) {
      nomatch = 'Passwords must match';
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

  handleFetchErrors = (response) => {
    if (!response.ok) {
      response.text().then((body) => { this.setState({ serverError: JSON.parse(body).error }); });
      throw Error(response.statusText);
    }
    return response;
}

  handleSubmit = (event) => {
    event.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      const url = 'http://localhost:5000/api/auth/register';
      const { username, email, password } = this.state;
      const data = JSON.stringify({ email, username, password });
      fetch(url, {
        method: 'POST',
        body: data,
        headers: {'Content-type': 'application/json'}
      })
        .then(res => this.handleFetchErrors(res))
        .then((res) => {
          this.setState(initialState);
          res.json();
        })
        .catch(err => console.log(err))
    }
  };

  render() {
    return (
      <div>
        <h1 className="heading__main">Register</h1>
        <form className="form" onSubmit={this.handleSubmit}>
          <div className="form__group">
            <label htmlFor="username">Username: </label>
            <input
              id="username"  
              className="form__input"
              type="text"
              name="username"
              placeholder="Username"
              value={this.state.username}
              onChange={this.handleChange}
            />
            <div className="error">{this.state.nameError}</div>
          </div>
          <div className="form__group">
            <label htmlFor="email">Email: </label>
            <input
              id="email"
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
            <label htmlFor="password">Password: </label>
            <input
              id="password"
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
            <label htmlFor="repasssword">Re-enter password: </label>
            <input
              id="repassword"
              className="form__input"
              type="password"
              name="repassword"
              placeholder="Re-enter password"
              value={this.state.repassword}
              onChange={this.handleChange}
            />
            <div className="error">{this.state.repasswordError}</div>
            <div className="error">{this.state.nomatch}</div>
            {
              this.state.serverError && (
                this.state.serverError.map((err, idx) => (
                  <div className="error" key={idx}>{err}</div>
                )))
            }
          </div>
          <button className="button" type="submit">Register</button>
        </form>
      </div>
    );
  }
}

export default Register;
