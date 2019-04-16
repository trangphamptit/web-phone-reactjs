import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import { ProductConsumer } from "../Context";

import {
  getProductTypeCode,
  searchProducts
} from "../services/ProductServices";

import Axios from "axios";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refProducts: [],
      search: ""
    };
  }

  componentDidMount() {
    Axios.get("http://api-mobile-shopping.herokuapp.com/api/ref-product/")
      .then(response =>
        response.data.results.map(refProduct => ({
          id: refProduct.id,
          product_type_code: `${refProduct.product_type_code}`,
          product_type_description: `${refProduct.product_type_description}`
        }))
      )
      .then(refProducts => this.setState({ refProducts }));
  }

  onItemClick(value, item) {
    let url =
      "http://api-mobile-shopping.herokuapp.com/api/products/ref-product/" +
      item.id;
    value.setNewUrl(url);
    Axios.get(url)
      .then(response =>
        response.data.results.map(products => ({
          id: `${products.id}`,
          title: `${products.product_name}`,
          price: Number.parseInt(`${products.product_price}`),
          img: `${products.product_image}`,
          company: `${products.product_type_code}`,
          inCart: false
        }))
      )
      .then(products => {
        products.forEach(product => {
          getProductTypeCode(product.company).then(
            company => (product.company = company)
          );
        });
        value.updateProducts(products);
      });
  }

  renderRefProducts(value) {
    if (this.state.refProducts.length > 0) {
      return this.state.refProducts.map(item => {
        let boundItemClick = this.onItemClick.bind(this, value, item);
        return (
          <Link to="/" className="dropdown-item" onClick={boundItemClick}>
            {item.product_type_code}
          </Link>
        );
      });
    }
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  buttonSearch(value) {
    return (
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        type="submit"
        onClick={event => this.handleSubmit(event, value)}
      >
        Search
      </button>
    );
  }

  handleSubmit(event, value) {
    try {
      let search = this.state.search;
      if (search === "" || search.trim === "") {
        event.preventDefault();
      } else {
        console.log(this.state.search);
        searchProducts(this.state.search).then(products => {
          products = products.map(product => ({
            id: `${product.id}`,
            title: `${product.product_name}`,
            price: Number.parseInt(`${product.product_price}`),
            img: `${product.product_image}`,
            company: `${product.product_type_code}`,
            inCart: false
          }));
          value.updateProducts(products);
        });
      }
    } catch (e) {
      alert(e.message());
    }
    event.preventDefault();
  }

  render() {
    return (
      <ProductConsumer>
        {value => (
          <NavWrapper className="navbar navbar-expand-lg navbar-dark bg-dark">
            <Link to="/">
              <img src={logo} alt="store" className="navbar-brand" />
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <ul className="navbar-nav mr-auto">
                <li className="nav-item dropdown">
                  <Link
                    to="/"
                    className="nav-link dropdown-toggle"
                    id="navbarDropdown"
                    role="button"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Danh mục sản phẩm
                  </Link>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="navbarDropdown"
                  >
                    {this.renderRefProducts(value)}
                  </div>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0 mr-auto">
                <input
                  className="form-control mr-sm-2"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={this.handleChange}
                  id="search"
                />
                {this.buttonSearch(value)}
              </form>
              <div className="dropdown mr-auto">
                <button
                  className="btn btn-success dropdown-toggle"
                  type="button"
                  data-toggle="dropdown"
                >
                  <i className="fa fa-user" aria-hidden="true" />
                  <span className="caret" />
                </button>
                <ul className="dropdown-menu">
                  <Link to="/login" className="login dropdown-item">
                    đăng nhập
                  </Link>
                  <Link to="/createCustomer" className="sign-up dropdown-item">
                    Đăng ký
                  </Link>
                </ul>
              </div>

              <Link to="/cart" className="ml-auto">
                <ButtonContainer>
                  <span className="mr-2">
                    <i className="fas fa-cart-plus" />
                  </span>
                  Giỏ hàng
                </ButtonContainer>
              </Link>
            </div>
          </NavWrapper>
        )}
      </ProductConsumer>
    );
  }
}
const NavWrapper = styled.nav`
  background: var(--mainBlue);
  .nav-link {
    color: var(--mainWhite) !important;
    font-size: 1.3rem;
    text-transform: capitalize !important;
  }
  .login,
  .sign-up {
    color: var(--mainDark) !important;
    font-size: 1.3rem;
    text-transform: capitalize !important;
    text-decoration: none;
  }
  .dropdown-item:hover {
    background-color: var(--mainGreen) !important;
  }
`;

export default Navbar;
