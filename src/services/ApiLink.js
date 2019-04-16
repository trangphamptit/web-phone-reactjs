import Axios from "axios";


const rootLink = "https://api-mobile-shopping.herokuapp.com/api/";
let apiLinks = {
    colors: "https://api-mobile-shopping.herokuapp.com/api/colors/",
    customers: "https://api-mobile-shopping.herokuapp.com/api/customers/",
    login: "https://api-mobile-shopping.herokuapp.com/api/customers/login/",
    orderItems: "https://api-mobile-shopping.herokuapp.com/api/order-items/",
    orderByCustomer: "https://api-mobile-shopping.herokuapp.com/api/orders/customer/",
    orders: "https://api-mobile-shopping.herokuapp.com/api/orders/",
    productByType: "https://api-mobile-shopping.herokuapp.com/api/products/ref-product/",
    products: "https://api-mobile-shopping.herokuapp.com/api/products/",
    refOrderStatusList: "https://api-mobile-shopping.herokuapp.com/api/ref-order-status-list/",
    refProduct: "https://api-mobile-shopping.herokuapp.com/api/ref-product/",
    searchProducts: "https://api-mobile-shopping.herokuapp.com/api/products/?q=",
};


// function getApiLinks(){
//     Axios.get(rootLink)
//     .then(response => {
//         apiLinks = {...response.data};
//         apiLinks.productByType = apiLinks.products + "ref-product/";
//         apiLinks.orderByCustomer = apiLinks.orders + "customer/";
//         apiLinks.login = apiLinks.customers + "login/";
//         console.log(apiLinks);
//         return apiLinks;
//     })
//     .catch(function(error) {
//         console.log("Cannot get api links");
//     })
// }

export { apiLinks } ;