import React, { Component } from "react";
import { apiLinks } from "./services/ApiLink";
import { ProductConsumer } from "./Context";
class BillForm extends Component {
  render() {
    return (
      <ProductConsumer>
        {value => {
          const { customer } = value;
          return (
            <div className="container">
              <div className="card">
                <div className="card-header text-capitalize">
                  Hóa đơn
                  <strong>01/01/01/2018</strong>
                  <span className="float-right">
                    {" "}
                    <strong>Trạng thái:</strong> Đang chờ xử lý
                  </span>
                </div>
                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col-sm-6">
                      <h6 className="mb-3">Từ:</h6>
                      <div>
                        <strong>PhoneWorld</strong>
                      </div>
                      <div>Địa chỉ: </div>
                      <div>
                        97 Man Thiên, phường Hiệp Phú, quận 9, Thành phố Hồ Chí
                        Minh
                      </div>
                      <div>Email: info@webz.com.pl</div>
                      <div>Phone: +48 444 666 3333</div>
                    </div>
                    <div className="col-sm-6">
                      <h6 className="mb-3">Đến:</h6>
                      {/* https://api-mobile-shopping.herokuapp.com/api/customers/ */}
                      <div>
                        <strong>{`${customer.first_name} ${
                          customer.last_name
                        }`}</strong>
                      </div>
                      <div>Địa chỉ: </div>
                      <div>43-190 Mikolow, Poland</div>
                      <div>Email: {customer.email_address}</div>
                      <div>Phone: {customer.phone}</div>
                    </div>
                  </div>
                  <div className="table-responsive-sm">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th className="center">Số thứ tự</th>
                          <th>Tên sản phẩm</th>
                          <th>Mô tả</th>
                          <th className="right">Giá tiền</th>
                          <th className="center">Số lượng</th>
                          <th className="right">Tổng tiền</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="center">1</td>
                          <td className="left strong">Origin License</td>
                          <td className="left">Extended License</td>
                          <td className="right">$999,00</td>
                          <td className="center">1</td>
                          <td className="right">$999,00</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="row">
                    <div className="col-lg-4 col-sm-5" />
                    <div className="col-lg-4 col-sm-5 ml-auto">
                      <table className="table table-clear">
                        <tbody>
                          <tr>
                            <td className="left">
                              <strong>Tổng tiền</strong>
                            </td>
                            <td className="right">$8.497,00</td>
                          </tr>

                          <tr>
                            <td className="left">
                              <strong>Phí vận chuyển</strong>
                            </td>
                            <td className="right">30.000 vnđ</td>
                          </tr>
                          <tr>
                            <td className="left">
                              <strong>Hóa đơn</strong>
                            </td>
                            <td className="right">
                              <strong>$7.477,36</strong>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        }}
      </ProductConsumer>
    );
  }
}

export default BillForm;
