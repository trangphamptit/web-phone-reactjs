import Axios from "axios";

function getAllProducts() {
  return Axios.get("https://api-mobile-shopping.herokuapp.com/api/products/");
}
function getProductTypeCode(url) {
  return Axios.get(url).then(response => response.data.product_type_code);
}

function searchProducts(query){
  return Axios.get("https://api-mobile-shopping.herokuapp.com/api/products/?q="+query).then(response => response.data.results);
}

export { getAllProducts, getProductTypeCode, searchProducts };
