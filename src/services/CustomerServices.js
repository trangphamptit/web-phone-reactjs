import Axios from "axios";
import { apiLinks } from "./ApiLink"

function getAllCustomers() {
  return Axios.get(apiLinks.customers);
}

function createCustomer(customer) {
  let data = {
    gender: customer.gender,
    first_name: customer.first_name,
    last_name: customer.last_name,
    email_address: customer.email,
    login_name: customer.login_name,
    login_password: customer.password
  };
  let auth = {
    username: "admin",
    password: "admin"
  };

  Axios.post(apiLinks.customers, data, {
    auth: auth
  })
    .then(function(response) {
      console.log("Authenticated");
    })
    .catch(function(error) {
      console.log("Error on Authentication");
    });
}

function login(email, password) {
  let data = {
    email,
    password
  };
  let auth = {
    username: "admin",
    password: "admin"
  };
  Axios.post(
    apiLinks.login,
    data,
    { auth: auth }
  ).then(function(response) {
    alert(response.status);
  });
}

export { login, getAllCustomers, createCustomer };
