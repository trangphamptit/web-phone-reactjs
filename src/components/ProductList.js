import React, { Component } from "react";
import Product from "./Product";
import Title from "./Title";
import { ProductConsumer, ProductProvider } from "../Context";
class ProductList extends Component {
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
