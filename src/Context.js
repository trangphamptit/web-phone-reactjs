import React, { Component } from "react";
import { storeProducts, detailProduct } from "./data";
import Product from "./components/Product";
import Axios from "axios";
import { getProductTypeCode } from "./services/ProductServices";

// const ProductContext = React.createContext();
// //Provider
// //Consumer

// export default class ProductProvider extends Component {
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

const ProductContext = React.createContext();
class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    // cartTax: 0,
    cartTotal: 0,
    url: "http://api-mobile-shopping.herokuapp.com/api/products/",
    setNewUrl: url => {
      this.setState({ url });
    }
  };

  setNewUrl(url) {
    this.setState({ url });
  }

  componentDidMount() {
    alert(this.state.url);
    Axios.get(this.state.url)
      .then(response =>
        response.data.results.map(products => ({
          id: `${products.id}`,
          title: `${products.product_name}`,
          price: Number.parseInt(`${products.product_price}`),
          img: `${products.product_image}`,
          company: `${products.product_type_code}`,
          inCart: false
        }))
      )
      .then(products => {
        products.forEach(product => {
          getProductTypeCode(product.company).then(
            company => (product.company = company)
          );
        });
        this.setState({ products });
      });
  }

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
        this.addTotals();
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
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count + 1;
    product.total = product.count * product.price;
    this.setState(
      () => {
        return { cart: [...tempCart] };
      },
      () => {
        this.addTotals();
      }
    );
  };

  decrement = id => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count = product.count - 1;
    if (product.count === 0) {
      this.removeItem(id);
    } else {
      product.total = product.count * product.price;
      this.setState(
        () => {
          return { cart: [...tempCart] };
        },
        () => {
          this.addTotals();
        }
      );
    }
  };

  removeItem = id => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;
    this.setState(
      () => {
        return {
          cart: [...tempCart],
          products: [...tempProducts]
        };
      },
      () => {
        this.addTotals();
      }
    );
  };
  clearCart = () => {
    this.setState(
      () => {
        return { cart: [] };
      },
      () => {
        this.setProducts();
        this.addTotals();
      }
    );
  };
  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    // const tempTax = subTotal * 0.1;
    // const tax = parseFloat(tempTax.toFixed(2));

    const total = subTotal + 30;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
        // cartTax: tax,
        cartTotal: total
      };
    });
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
