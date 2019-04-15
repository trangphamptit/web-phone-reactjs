import React, { Component } from "react";
import { Link } from "react-router-dom";
import logo from "../logo.svg";
import styled from "styled-components";
import { ButtonContainer } from "./Button";
class Navbar extends Component {
  render() {
    return (
      <NavWrapper className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/">
          <img src={logo} alt="store" className="navbar-brand" />
          {/*<span>
            <i class="fas fa-home" />
          </span>*/}
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
                <Link to="/cart" className="dropdown-item">
                  Action
                </Link>
                <Link to="/default" className="dropdown-item">
                  Action
                </Link>
                <div className="dropdown-divider" />
                <Link to="/cart" className="dropdown-item">
                  Action
                </Link>
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
