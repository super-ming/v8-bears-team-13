import React from "react";

const initialState = {
  username: "",
  password: "",
  nameError: "",
  passwordError: ""
};

class Login extends React.Component {
  state = initialState;

  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  validate = () => {
    let nameError = "";
    let passwordError = "";

    if (!this.state.name) {
      nameError = "name cannot be blank";
    }

    if (!this.state.password) {
      passwordError = "password cannot be blank";
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

  handleSubmit = event => {
    event.preventDefault();
    const isValid = this.validate();

    if (isValid) {
      this.setState(initialState);
    }
  };

  render() {
    return (
      <div className="content">
        <div className="form__container">
          <h1 className="heading__main">Login</h1>
          <form className="form" onSubmit={this.handleSubmit}>
            <div className="form__group">
              <label htmlFor="name" className="form__label">
                Username
              <input
                  className="form__input"
                  name="username"
                  placeholder="Username"
                  value={this.state.username}
                  onChange={this.handleChange}
                />
              </label>
              <div className="error">{this.state.nameError}</div>
            </div>
            <div className="form__group">
              <label htmlFor="password" className="form__label">
                Password
              <input
                  className="form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={this.state.password}
                  onChange={this.handleChange}
                />
              </label>
              <div className="error">{this.state.passwordError}</div>
            </div>
            <button className="button" type="submit">
              Login
          </button>
          </form>
        </div>
      </div>
    );
  }
}

export default Login;
