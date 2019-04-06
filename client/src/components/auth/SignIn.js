import React from 'react';

const initialState = {
  name: '',
  password: '',
  nameError: '',
  passwordError: ''
};

class SignIn extends React.Component {
  state = initialState;

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  validate = () => {
    let nameError = '';
    let passwordError = '';

    if (!this.state.name) {
      nameError = 'name cannot be blank';
    }

    if (!this.state.password) {
      passwordError = 'password cannot be blank';
    }

    if (nameError || passwordError) {
      this.setState({
        nameError,
        passwordError
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
          <h2>Sign In</h2>
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
                type="password"
                name="password"
                placeholder="password"
                value={this.state.password}
                onChange={this.handleChange}
              />
              <div className="Error">{this.state.passwordError}</div>
            </div>
            <button type="submit">Sign In</button>
          </form>
        </div>
      </>
    );
  }
}

export default SignIn;
