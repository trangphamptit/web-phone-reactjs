import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import { ProductConsumer } from "../Context";

import {
  getProductTypeCode,
  searchProducts,
  processProducts,
  getAllProductTypeCode,
  processProductTypeCode,
  getProductsByTypeCode
} from "../services/ProductServices";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refProducts: [],
      search: ""
    };
  }

  componentDidMount() {
    getAllProductTypeCode()
      .then((refProducts) => processProductTypeCode(refProducts))
      .then((refProducts) => this.setState({ refProducts }));
  }

  //
  onItemClick(value, item) {
    getProductsByTypeCode(item.id).then((products) => {
      products.forEach((product) => {
        getProductTypeCode(product.company).then(
          (company) => (product.company = company)
        );
        // getColors(product.colors)
      });
      value.updateProducts(products);
    });
  }

  renderRefProducts(value) {
    if (this.state.refProducts.length > 0) {
      return this.state.refProducts.map((item) => {
        let boundItemClick = this.onItemClick.bind(this, value, item);
        return (
          <Link to="/" className="dropdown-item" onClick={boundItemClick}>
            {item.product_type_code}
          </Link>
        );
      });
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  buttonSearch(value) {
    return (
      <button
        className="btn btn-outline-success my-2 my-sm-0"
        type="submit"
        onClick={(event) => this.handleSearchSubmit(event, value)}
      >
        Search
      </button>
    );
  }

  buttonLoginSignup(customer) {
    if (Object.keys(customer).length === 0) {
      return (
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
      );
    }
  }

  buttonLogout(value) {
    if (!(Object.keys(value.customer).length === 0)) {
      return (
        <button
          className="btn btn-outline-success my-2 my-sm-0"
          type="submit"
          onClick={(event) => this.logout(event, value)}
        >
          Logout
        </button>
      );
    }
  }

  logout(event, value) {
    value.updateCustomer({});
  }

  handleSearchSubmit(event, value) {
    try {
      let search = this.state.search;
      if (search === "" || search.trim === "") {
        event.preventDefault();
      } else {
        console.log(this.state.search);
        searchProducts(this.state.search).then((products) => {
          products = processProducts(products);
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
        {(value) => (
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
              {this.buttonLoginSignup(value.customer)}
              {this.buttonLogout(value)}
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
