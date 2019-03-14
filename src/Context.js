import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";

const ProductContext = React.createContext();
//Provider
//Consumer

export default class ProductProvider extends Component {
  constructor(props){
    super(props);
    this.state = {
      products: [],
      detailProduct: [],
      isLoading: false,
    }
  }
  componentDidMount(){
    this.setState({ isLoading: true });
    var that = this;
    fetch('http://api-mobile-shopping.herokuapp.com/api/product/')
    .then(response => response.json())
    .then(parsedJson => parsedJson.map(product => ({ 
      title: `${product.product_name}`, 
      price: `${product.product_price}`, 
      img: `${product.product_image}` 
    })))
    .then(products => that.setState({ 
      products, 
      detailProduct: detailProduct,
      isLoading: false
    }))
    .catch(error => console.log('parsing failed', error))
  }
  
  handleDetail = () => {
    console.log("hello from detail");
  };
  addToCart = () => {
    console.log("hello from cart");
  };
  render() {
    const { products, detailProduct, isLoading } = this.state;
    if (isLoading) {
      return <p>Loading ...</p>;
    }
    console.log(products)
    return (
      <ProductContext.Provider
        value={{
          products,
          detailProduct,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
