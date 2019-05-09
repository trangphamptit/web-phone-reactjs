import React, { Component } from "react";
/*get date create bill in link https://api-mobile-shopping.herokuapp.com/api/orders/*/
import { apiLinks } from "./ApiLink";

import Axios from "axios";

const ORDERING =
  "https://api-mobile-shopping.herokuapp.com/api/ref-order-status-list/0/";

function getBillDate() {
  return Axios.get(apiLinks.orders).then((response) => response.data.results);
}

export function getCustomerOrderItems(customer_id) {
  return Axios.get(apiLinks.orderByCustomer + customer_id).then((response) =>
    getOrderItemsOfOrder(response.data[0].id)
  );
}

export function isCustomerOrderEmpty(customer_id) {
  let isEmpty = false;
  Axios.get(apiLinks.orderByCustomer + customer_id).then((response) => {
    isEmpty = Object.keys(response.data).length === 0;
  });
  return isEmpty;
}

export function createOrder(customer) {
  let data = {
    customer_id: customer.url,
    order_status_code: ORDERING,
    order_detail: ""
  };
  let auth = {
    username: "admin",
    password: "admin"
  };
  return Axios.post(apiLinks.orders, data, { auth: auth });
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
