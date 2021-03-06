import React, { Component } from "react";

// import
import { Switch, Route } from "react-router-dom";
import "./App.css";

// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./components/Login/Login";
import Signup from "./components/Login/Signup";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart/Cart";
import Modal from "./components/Modal";
import CurrencyFormat from "react-currency-format";
import BillForm from "./BillForm";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route path="/login" exact component={Login} />
          <Route path="/createCustomer" exact component={Signup} />
          <Route path="/billForm" exact component={BillForm} />
          <Route component={Default} />
        </Switch>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
