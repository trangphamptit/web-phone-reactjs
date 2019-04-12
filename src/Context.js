import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
import Product from "./components/Product";

// const ProductContext = React.createContext();
// //Provider
// //Consumer

// export default class ProductProvider extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       products: [],
//       detailProduct: [],
//       isLoading: false
//     };
//   }
//   componentDidMount() {
//     this.setState({ isLoading: true });
//     var that = this;
//     fetch("https://api-mobile-shopping.herokuapp.com/api/products/")
//       .then(response => response.json())
//       .then(parsedJson =>
//         parsedJson.results.map(product => ({
//           title: `${product.product_name}`,
//           price: `${product.product_price}`,
//           img: `${product.product_image}`
//         }))
//       )
//       .then(products =>
//         that.setState({
//           products,
//           detailProduct: detailProduct,
//           isLoading: false
//         })
//       )
//       .catch(error => console.log("parsing failed", error));
//   }

//   handleDetail = () => {
//     console.log("hello from detail");
//   };
//   addToCart = () => {
//     console.log("hello from cart");
//   };
//   render() {
//     const { products, detailProduct, isLoading } = this.state;
//     if (isLoading) {
//       return <p>Loading ...</p>;
//     }
//     console.log(products);
//     return (
//       <ProductContext.Provider
//         value={{
//           products,
//           detailProduct,
//           handleDetail: this.handleDetail,
//           addToCart: this.addToCart
//         }}
//       >
//         {this.props.children}
//       </ProductContext.Provider>
//     );
//   }
// }
// const ProductConsumer = ProductContext.Consumer;
// export { ProductProvider, ProductConsumer };

const ProductContext = React.createContext();
class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: storeProducts,
    modalOpen: true,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
  };

  componentDidMount() {
    this.setProducts();
  }
  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const singleItem = { ...item };
      tempProducts = [...tempProducts, singleItem];
    });
    this.setState(() => {
      return { products: tempProducts };
    });
  };

  getItem = id => {
    const product = this.state.products.find(item => item.id === id);
    return product;
  };

  handleDetail = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });
  };
  addToCart = id => {
    let tempProducts = [...this.state.products];
    const index = tempProducts.indexOf(this.getItem(id));
    const product = tempProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState(
      () => {
        return {
          products: tempProducts,
          cart: [...this.state.cart, product]
        };
      },
      () => {
        console.log(this.state);
      }
    );
  };
  openModal = id => {
    const product = this.getItem(id);
    this.setState(() => {
      return { modalProduct: product, modalOpen: true };
    });
  };

  closeModal = () => {
    this.setState(() => {
      return { modalOpen: false };
    });
  };

  increment = id => {
    console.log("this is increment method");
  };

  decrement = id => {
    console.log("this is decrement method");
  };

  removeItem = id => {
    console.log("item removed");
  };
  clearCart = () => {
    console.log("cart was cleared");
  };
  render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          handleDetail: this.handleDetail,
          addToCart: this.addToCart,
          openModal: this.openModal,
          closeModal: this.closeModal,
          increment: this.increment,
          decrement: this.decrement,
          removeItem: this.removeItem,
          clearCart: this.clearCart
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
