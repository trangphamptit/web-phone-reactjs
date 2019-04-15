import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer, ProductProvider } from "../Context";
import Pagination from "./Pagination";
import { storeProducts } from "../data";
class ProductList extends Component {
  state = {
    products: storeProducts
  };
  render() {
    return (
      <React.Fragment>
        <div className="py-5">
          <div className="container">
            <Title name="tất cả sản phẩm" />
            <div className="row">
              <ProductConsumer>
                {value => {
                  return value.products.map(product => {
                    return <Product key={product.id} product={product} />;
                  });
                }}
              </ProductConsumer>
            </div>
          </div>
        </div>
      </React.Fragment>
      // <Product/>
    );
  }
}

export default ProductList;
