import Axios from "axios";
import { apiLinks } from "./ApiLink";

function getAllProducts() {
  return Axios.get(apiLinks.products);
}
function getProductTypeCode(url) {
  return Axios.get(url).then(response => response.data.product_type_code);
}
function getColors(url) {
  return Axios.get(url).then(response => response.data.color_description);
}
function searchProducts(query) {
  return Axios.get(apiLinks.searchProducts + query).then(
    response => response.data.results
  );
}

function getProductsByTypeCode(refProductId) {
  let url = apiLinks.productByType + refProductId;
  return Axios.get(url).then(response =>
    processProducts(response.data.results)
  );
}

function getAllProductTypeCode() {
  return Axios.get(apiLinks.refProduct)
    .then(response => response.data.results)
    .catch(function(error) {
      console.log("Cannot get all product type code");
    });
}

function processProducts(products) {
  return products.map(product => ({
    id: product.id,
    title: `${product.product_name}`,
    price: Number.parseInt(`${product.product_price}`),
    img: `${product.product_image}`,
    company: `${product.product_type_code}`,
    inCart: false,
    colors: `${product.product_colors}`
  }));
}

function processProductTypeCode(refProducts) {
  return refProducts.map(refProduct => ({
    id: refProduct.id,
    product_type_code: `${refProduct.product_type_code}`,
    product_type_description: `${refProduct.product_type_description}`
  }));
}

//load pagination page
function getProductsPage(url, products, resolve, reject) {
  return Axios.get(apiLinks.products)
    .then(response => {
      const retrivedProducts = products.concat(response.data.results);
      if (response.data.next != null) {
        getProductsPage(response.data.next, retrivedProducts, resolve, reject);
      } else {
        resolve(retrivedProducts);
      }
    })
    .catch(error => {
      console.log(error);
      reject("Something wrong. Please refresh the page and try again.");
    });
}

export {
  getAllProducts,
  getProductTypeCode,
  searchProducts,
  processProducts,
  getAllProductTypeCode,
  processProductTypeCode,
  getProductsByTypeCode,
  getProductsPage,
  getColors
};
