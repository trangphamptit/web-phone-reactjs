import React, { Component } from "react";
// import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";

import "bootstrap/dist/css/bootstrap.min.css";

import login from '../../services/CustomerServices';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    try{
        let email = this.state.email;
        let password = this.state.password;
        login(email, password);
        alert(email);
    }
    catch(e){
        alert(e.message());
    }
    event.preventDefault();
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address:</label>
            <input 
                type="email" 
                onChange={this.handleChange}
                autoFocus 
                className="form-control" 
                value={this.state.email} 
                id="email"/>
          </div>
          <div className="form-group">
              <label htmlFor="password">Password</label>
              <input 
                type="password"
                className="form-control"
                value={this.state.password}
                onChange={this.handleChange}
                id="password"/>
          </div>
          <button 
            type="submit" 
            className="btn btn-primary btn-lg btn-block" 
            disabled={!this.validateForm}>Login
          </button>
        </form>
      </div>
    );
  }
}