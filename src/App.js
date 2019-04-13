import React, { Component } from "react";

// import
import { Switch, Route } from "react-router-dom";
import "./App.css";
import getAllProducts from './services/ProductServices';
import { getAllCustomer, createCustomer } from './services/CustomerServices';

// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import Login from './components/Login/Login';

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart/Cart";
import Modal from "./components/Modal";
class App extends Component {
  render() {
    let a = getAllProducts();
    a.then(response => console.log(response));
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />
          <Route path='/login' exact component={Login} />
          <Route component={Default} />
        </Switch>
        <Modal />
      </React.Fragment>
    );
  }
}

export default App;
