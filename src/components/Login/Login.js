import React, { Component } from "react";
import "./Login.css";
import { ProductConsumer } from "../../Context";
// import "bootstrap/dist/css/bootstrap.min.css";

import { login } from "../../services/CustomerServices";

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit(event, value) {
    let email = this.state.email;
    let password = this.state.password;
    login(email, password)
      .then(response => value.updateCustomer(response.data))
      .catch(e =>
        this.setState({ error: "Tài khoản hoặc mật khẩu chưa đúng" })
      );
    event.preventDefault();
  }

  render() {
    return (
      <ProductConsumer>
        {value => {
          return (
            <div className="Login">
              <form onSubmit={this.handleSubmit}>
                <div className="form-group">
                  <label>{this.state.error}</label>
                  <label htmlFor="email">Email address:</label>
                  <input
                    type="email"
                    onChange={this.handleChange}
                    autoFocus
                    className="form-control"
                    value={this.state.email}
                    id="email"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    value={this.state.password}
                    onChange={this.handleChange}
                    id="password"
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-lg btn-block"
                  disabled={!this.validateForm}
                >
                  Login
                </button>
              </form>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
