import React, { Component } from "react";

class BillForm extends Component {
  render() {
    return (
      <div className="container">
        <div className="card">
          <div className="card-header">
            Invoice
            <strong>01/01/01/2018</strong>
            <span className="float-right">
              {" "}
              <strong>Status:</strong> Pending
            </span>
          </div>
          <div className="card-body">
            <div className="row mb-4">
              <div className="col-sm-6">
                <h6 className="mb-3">From:</h6>
                <div>
                  <strong>Webz Poland</strong>
                </div>
                <div>Madalinskiego 8</div>
                <div>71-101 Szczecin, Poland</div>
                <div>Email: info@webz.com.pl</div>
                <div>Phone: +48 444 666 3333</div>
              </div>
              <div className="col-sm-6">
                <h6 className="mb-3">To:</h6>
                <div>
                  <strong>Bob Mart</strong>
                </div>
                <div>Attn: Daniel Marek</div>
                <div>43-190 Mikolow, Poland</div>
                <div>Email: marek@daniel.com</div>
                <div>Phone: +48 123 456 789</div>
              </div>
            </div>
            <div className="table-responsive-sm">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th className="center">#</th>
                    <th>Item</th>
                    <th>Description</th>
                    <th className="right">Unit Cost</th>
                    <th className="center">Qty</th>
                    <th className="right">Total</th>
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
                  <tr>
                    <td className="center">2</td>
                    <td className="left">Custom Services</td>
                    <td className="left">
                      Instalation and Customization (cost per hour)
                    </td>
                    <td className="right">$150,00</td>
                    <td className="center">20</td>
                    <td className="right">$3.000,00</td>
                  </tr>
                  <tr>
                    <td className="center">3</td>
                    <td className="left">Hosting</td>
                    <td className="left">1 year subcription</td>
                    <td className="right">$499,00</td>
                    <td className="center">1</td>
                    <td className="right">$499,00</td>
                  </tr>
                  <tr>
                    <td className="center">4</td>
                    <td className="left">Platinum Support</td>
                    <td className="left">1 year subcription 24/7</td>
                    <td className="right">$3.999,00</td>
                    <td className="center">1</td>
                    <td className="right">$3.999,00</td>
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
                        <strong>Subtotal</strong>
                      </td>
                      <td className="right">$8.497,00</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Discount (20%)</strong>
                      </td>
                      <td className="right">$1,699,40</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>VAT (10%)</strong>
                      </td>
                      <td className="right">$679,76</td>
                    </tr>
                    <tr>
                      <td className="left">
                        <strong>Total</strong>
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
  }
}

export default BillForm;
