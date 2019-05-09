import React, { Component } from "react";
import "./Login.css";
import { ProductConsumer } from "../../Context";
import { Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

import { login } from "../../services/CustomerServices";
import {
  getCustomerOrderItems,
  isCustomerOrderEmpty,
  createOrder
} from "../../services/OrderServices";
import { getProduct } from "../../services/ProductServices";

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

  goToPrevPage = () => {
    this.props.history.goBack();
  };

  async handleOrder(customer, value) {
    if (isCustomerOrderEmpty(customer.id)) {
      await createOrder(customer.url);
    }
    // add Orderd items in to cart.
    await getCustomerOrderItems(customer.id).then(response =>
      response.data.map(orderItem => {
        getProduct(orderItem.product_id).then(product => {
          value.addToCart(product.id);
        });
      })
    );
  }

  handleSubmit(event, value) {
    let email = this.state.email;
    let password = this.state.password;
    event.preventDefault();
    login(email, password)
      .then(response => {
        let customer = response.data;
        value.updateCustomer(customer);
        this.handleOrder(customer, value);
        this.goToPrevPage();
      })
      .catch(e =>
        this.setState({ error: "Tài khoản hoặc mật khẩu chưa đúng" })
      );
  }

  render() {
    return (
      <ProductConsumer>
        {value => {
          return (
            <div className="Login">
              <form onSubmit={event => this.handleSubmit(event, value)}>
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
                  className="btn btn-primary btn-lg btn-block mb-2"
                  disabled={!this.validateForm}
                >
                  Login
                </button>
                <Link to="/createCustomer">
                  Bạn chưa có tài khoản. Đăng ký?
                </Link>
              </form>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}
