import React, { Component } from "react";
/*get date create bill in link https://api-mobile-shopping.herokuapp.com/api/orders/*/
import { apiLinks } from "./ApiLink";
import { getProduct } from "./ProductServices";
import Axios from "axios";

function getBillDate() {
  return Axios.get(apiLinks.orders).then((response) => response.data.results);
}

function getCustomerOrderItems(customer_id) {
  let cartProducts = [];
  Axios.get(apiLinks.orderByCustomer + customer_id)
    .then((response) => getOrderItemsOfOrder(response.data[0].id))
    .then((response) => {response.});
}

function getOrderItemsOfOrder(order_id) {
  return Axios.get(apiLinks.orderItemsOfOrder + order_id);
}

class OrderServices extends Component {
  render() {
    return <div />;
  }
}

export default OrderServices;
