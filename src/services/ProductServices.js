import Axios from "axios";

function getAllProducts(){
    return Axios.get('https://api-mobile-shopping.herokuapp.com/api/products/');
}

export default getAllProducts;