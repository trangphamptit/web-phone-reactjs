import React from "react";
import { Link } from "react-router-dom";
import BillForm from "../../BillForm";
export default function CartTotals({ value }) {
  const { cartSubTotal, cartTotal, clearCart } = value;

  return (
    <React.Fragment>
      <div className="container">
        <div className="row">
          <div className="col-10 mt-2 ml-sm-5 ml-md-auto col-sm-8 text-capitalize text-right" />
          <Link to="/cart">
            <button
              className="btn btn-outline-danger text-uppercase mb-3 px-5"
              type="button"
              onClick={() => clearCart()}
            >
              Xóa giỏ hàng
            </button>
          </Link>
        </div>
        <h5>
          <span className="text-title">Tổng số tiền:</span>
          <strong>{cartSubTotal} đ</strong>
        </h5>

        <h5>
          <span className="text-title">Phí vận chuyển:</span>
          <strong>30000đ</strong>
        </h5>

        <h5>
          <span className="text-title">Hóa đơn:</span>
          <strong>{cartTotal}đ</strong>
        </h5>
        <Link to="/billForm">
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
