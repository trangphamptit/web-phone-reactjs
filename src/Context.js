import React, { Component } from "react";
import { detailProduct, storeProducts } from "./data";
import Axios from "axios";
import {
  getProductTypeCode,
  processProducts
} from "./services/ProductServices";
import { apiLinks } from "./services/ApiLink";

const ProductContext = React.createContext();
class ProductProvider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      detailProduct: detailProduct,
      cart: [],
      modalOpen: false,
      modalProduct: detailProduct,
      cartSubTotal: 0,
      cartTotal: 0,
      url: apiLinks.products,
      customer: {}
    };
  }

  updateCustomer = customer => {
    this.setState({ customer });
  };

  updateProducts = products => {
    this.setState({ products });
  };

  setNewUrl = url => {
    this.setState({ url });
  };

  componentDidMount() {
    Axios.get(this.state.url)
      .then(response => processProducts(response.data.results))
      .then(products => {
        products.forEach(product => {
          getProductTypeCode(product.company).then(
            company => (product.company = company)
          );
        });
        this.setState({ products });
      });
  }

  setProducts = () => {
    Axios.get(this.state.url)
      .then(response => processProducts(response.data.results))
      .then(products => {
        products.forEach(product => {
          getProductTypeCode(product.company).then(
            company => (product.company = company)
          );
        });
        this.setState({ products });
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
    let tempProducts = [...this.state.products]; //tạo mangr tạm chứa tất cả product
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
    console.log("clear");
    this.setState(
      () => {
        console.log("clear");
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

    const total = subTotal + 30;
    this.setState(() => {
      return {
        cartSubTotal: subTotal,
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
          setNewUrl: this.setNewUrl,
          updateProducts: this.updateProducts,
          clearCart: this.clearCart,
          setProducts: this.setProducts,
          updateCustomer: this.updateCustomer
        }}
      >
        {this.props.children}
      </ProductContext.Provider>
    );
  }
}
const ProductConsumer = ProductContext.Consumer;
export { ProductProvider, ProductConsumer };
