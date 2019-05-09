import Axios from "axios";
import { apiLinks } from "./ApiLink";

//lấy tất cả sản phẩm

function getAllProducts() {
  return Axios.get(apiLinks.products);
}

function getProduct(url) {
  let product = {};
  Axios.get(url).then(response => {
    product = processProduct(response.data);
  });
  return product;
}

function getProductTypeCode(url) {
  return Axios.get(url).then(response => response.data.product_type_code);
}

function getColor(url) {
  return Axios.get(url).then(response => response.data.color_description);
}

function getColorsFromListLink(listLink) {
  let colors = [];
  listLink.map(colorUrl =>
    getColor(colorUrl).then(color_description => colors.push(color_description))
  );
  return colors;
}

function getColors() {
  return Axios.get(apiLinks.colors).then(response =>
    response.data.results.map(color => color.color_description)
  );
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
  return products.map(product => processProduct(product));
}

function processProduct(product) {
  return {
    id: product.id,
    title: `${product.product_name}`,
    price: Number.parseInt(`${product.product_price}`),
    img: `${product.product_image}`,
    company: `${product.product_type_code}`,
    inCart: false,
    colors: getColorsFromListLink(product.product_colors)
  };
}

function processProductTypeCode(refProducts) {
  return refProducts.map(refProduct => ({
    id: refProduct.id,
    product_type_code: `${refProduct.product_type_code}`,
    product_type_description: `${refProduct.product_type_description}`
  }));
}

export {
  getAllProducts,
  getProductTypeCode,
  searchProducts,
  processProducts,
  getAllProductTypeCode,
  processProductTypeCode,
  getProductsByTypeCode,
  getColors
};
