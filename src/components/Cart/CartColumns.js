import React, { Component } from "react";

class CartColumns extends Component {
  render() {
    return (
      <div className="container-fluid text-center d-none d-lg-block">
        <div className="row">
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">Sản phẩm</p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">Tên sản phẩm</p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">Giá</p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">Số lượng</p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">Bỏ mua sản phẩm</p>
          </div>
          <div className="col-10 mx-auto col-lg-2">
            <p className="text-uppercase">Tổng tiền</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CartColumns;
