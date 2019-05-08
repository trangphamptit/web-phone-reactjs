import React, { Component } from "react";
/*get date create bill in link https://api-mobile-shopping.herokuapp.com/api/orders/*/
import { apiLinks } from "./ApiLink";
import Axios from "axios";

function getBillDate() {
  return Axios.get(apiLinks.orders).then(response => response.data.results);
  console.log(response.data.results);
}

class OrderServices extends Component {
  render() {
    return <div />;
  }
}

export default OrderServices;
