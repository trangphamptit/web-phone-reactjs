import Axios from "axios";

function getAllProducts() {
  return Axios.get("https://api-mobile-shopping.herokuapp.com/api/products/");
}
function getProductTypeCode(url) {
  return Axios.get(url).then(response => response.data.product_type_code);
}

export { getAllProducts, getProductTypeCode };
