import React, { Component } from "react";
import logo from './logo.svg'
// import
import { Switch, Route } from "react-router-dom";
import "./App.css";

// import bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";

import Details from "./components/Details";
import Default from "./components/Default";
import Cart from "./components/Cart";

class App extends Component {
   render() {
    return (
      <React.Fragment>
        <Navbar />
        <Switch>
          <Route exact path="/" component={ProductList} />
          <Route path="/details" component={Details} />
          <Route path="/cart" component={Cart} />

          <Route component={Default} />
        </Switch>
      </React.Fragment>
    );
  }
}

export default App;
