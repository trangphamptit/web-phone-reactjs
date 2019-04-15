import React from "react";
import { Link } from "react-router-dom";
export default function CartTotals({ value }) {
  const { cartSubTotal, cartTax, cartTotal, clearCart } = value;

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right" />
          <Link to="/">
            <button
              className="btn btn-outline-danger text-uppercase mb-3 px-5"
              type="button"
              onclick={() => clearCart()}
            >
              Xóa giỏ hàng
            </button>
          </Link>
        </div>
        <h5>
          <span className="text-title">Tổng số tiền:</span>
          <strong>${cartSubTotal}</strong>
        </h5>

        <h5>
          <span className="text-title">Phí vận chuyển:</span>
          <strong>$30</strong>
        </h5>

        <h5>
          <span className="text-title">Hóa đơn:</span>
          <strong>${cartTotal}</strong>
        </h5>
        <Link to="/">
          <button
            className="btn btn-outline-danger text-uppercase mb-3 px-5"
            type="button"
            onclick={() => clearCart()}
          >
            Thanh toán
          </button>
        </Link>
      </div>
    </React.Fragment>
  );
}
