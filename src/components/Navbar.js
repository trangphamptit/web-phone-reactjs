import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
import { ProductProvider } from "../Context";

import Axios from "axios";

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      refProducts: [
        {
          product_type_code: "",
          product_type_description: ""
        }
      ]
    };

    // this.renderRefProducts = this.renderRefProducts.bind(this);
  }

  componentDidMount() {
    Axios.get("http://api-mobile-shopping.herokuapp.com/api/ref-product/")
      .then(response =>
        response.data.results.map(refProduct => ({
          product_type_code: `${refProduct.product_type_code}`,
          product_type_description: `${refProduct.product_type_description}`
        }))
      )
      .then(refProducts => this.setState({ refProducts }));
  }

  provideNewData(id) {
    return (
      <ProductProvider
        value={{
          setNewUrl:
            "http://api-mobile-shopping.herokuapp.com/api/products/ref-product/" +
            id
        }}
      />
    );
  }

  renderRefProducts() {
    if (this.state.refProducts.length > 0) {
      return this.state.refProducts.map(item => (
        <Link
          to="/"
          className="dropdown-item"
          onClick={item => this.provideNewData(item.id)}
        >
          {item.product_type_code}
        </Link>
      ));
    }
  }

  render() {
    return (
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
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item dropdown">
              <Link
                to="/cart"
                className="nav-link dropdown-toggle"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Danh mục sản phẩm
              </Link>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                {this.renderRefProducts()}
              </div>
            </li>
          </ul>
          {/* search form */}
          <form className="form-inline my-2 my-lg-0 mr-auto">
            <input
              className="form-control mr-sm-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
          {/* end search form */}

          <div className="dropdown mr-auto">
            <button
              className="btn btn-success dropdown-toggle"
              type="button"
              data-toggle="dropdown"
            >
              <i class="fa fa-user" aria-hidden="true" />
              <span className="caret" />
            </button>
            <ul className="dropdown-menu">
              <Link to="/login" className="login dropdown-item">
                đăng nhập
              </Link>
              <Link to="/login" className="sign-up dropdown-item">
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
