import Axios from "axios";

function getAllProducts() {
  return Axios.get("https://api-mobile-shopping.herokuapp.com/api/products/");
}
function getProductTypeCode(url) {
  return Axios.get(url).then(response => response.data.product_type_code);
}

function getColors(url) {
  return Axios.get(url).then(response => response.data.color_description);
}

function searchProducts(query) {
  return Axios.get(
    "https://api-mobile-shopping.herokuapp.com/api/products/?q=" + query
  ).then(response => response.data.results);
}

function processProducts(products) {
  return products.map(product => ({
    id: `${product.id}`,
    title: `${product.product_name}`,
    price: Number.parseInt(`${product.product_price}`),
    img: `${product.product_image}`,
    company: `${product.product_type_code}`,
    inCart: false,
    colors: `${product.product_colors}`
  }));
}

export {
  getAllProducts,
  getProductTypeCode,
  searchProducts,
  processProducts,
  getColors
};
