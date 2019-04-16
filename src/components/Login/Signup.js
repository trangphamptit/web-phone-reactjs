import React, { Component } from "react";
import { createCustomer } from "../../services/CustomerServices";
import "./Signup.css";
import { RadioGroup, Radio } from "react-radio-group";
// gender: 1,
// first_name: "Hello",
// last_name: "My Friend",
// email_address: "hello@gmail.com",
// login_name: "hello",
// login_password: "123"
class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      customer: {
        gender: 0,
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        login_name: "",
        login_password: ""
      }
    };
  }

  validateForm() {
    return this.state.customer.email.length > 0 && this.state.customer.password.length > 0;
  }

  handleChange = event => {
    let tempCustomer = {...this.state.customer};
    console.log(this.state.customer);
    this.setState({
      customer: {...tempCustomer,[event.target.id]: event.target.value}
    });
  };

  handleRadio = event => {
      let tempCustomer = {...this.state.customer};
      console.log(this.state.customer);
      this.setState({
        customer: {...tempCustomer, gender: Number.parseInt(event.target.value)}
      });
  };

  handleSubmit = event => {
    try {
      createCustomer(this.state.customer);
    } catch (e) {
      alert(e.message());
    }
    event.preventDefault();
  };

  render() {
    return (
      <div className="Sign-up">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">Tên: </label>
            <input
              type="text"
              onChange={this.handleChange}
              autoFocus
              className="form-control"
              value={this.state.customer.first_name}
              id="first_name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Họ: </label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              value={this.state.customer.last_name}
              id="last_name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Giới tính: </label>
            <br />
            <label> Nam 
              <input 
                type="radio" 
                checked={this.state.customer.gender === 0}
                onChange={this.handleRadio} 
                value={0} 
                name="gender"/>
            </label>
            <label> Nữ 
              <input 
                type="radio" 
                checked={this.state.customer.gender === 1}
                onChange={this.handleRadio} 
                value={1} 
                name="gender"/>
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              onChange={this.handleChange}
              className="form-control"
              value={this.state.customer.email}
              id="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              value={this.state.customer.password}
              onChange={this.handleChange}
              id="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="login_name">Tên đăng nhập</label>
            <input
              type="text"
              className="form-control"
              value={this.state.customer.login_name}
              onChange={this.handleChange}
              id="login_name"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            disabled={!this.validateForm}
            onClick={this.handleSubmit}
          >
            Sign-up
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
