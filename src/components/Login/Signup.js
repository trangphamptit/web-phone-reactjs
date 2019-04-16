import React, { Component } from "react";
import { createCustomer } from "../../services/CustomerServices";
import "./Signup.css";
import { RadioGroup, Radio } from "react-radio-group";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gender: 0,
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      login_name: "",
      login_password: ""
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
    console.log(this.state.gender);
  };

  handleSubmit = event => {
    try {
      let email = this.state.email;
      let password = this.state.password;
      createCustomer(email, password);
    } catch (e) {
      alert(e.message());
    }
    event.preventDefault();
  };
  render() {
    return (
      <div className="Sign-up">
        <form onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="first_name">Tên: </label>
            <input
              type="text"
              onChange={this.handleChange} //xử lý sự kiện onchange của các input và gán cho các biến trạng thái khi giá trị trong input thay đổi
              autoFocus
              className="form-control"
              value={this.state.first_name} //thêm các biến trạng thái vào mỗi input để đọc giá trị của input
              id="first_name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Họ: </label>
            <input
              type="text"
              onChange={this.handleChange}
              className="form-control"
              value={this.state.last_name}
              id="last_name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Giới tính: </label>
            <br />

            <RadioGroup name="gender" onChange={this.handleChange} id="gender">
              <label>
                <Radio value={0} />
                nam{" "}
              </label>
              <label>
                <Radio value={1} />
                nữ{" "}
              </label>
            </RadioGroup>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email: </label>
            <input
              type="email"
              onChange={this.handleChange}
              className="form-control"
              value={this.state.email}
              id="email"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              value={this.state.password}
              onChange={this.handleChange}
              id="password"
            />
          </div>
          <div className="form-group">
            <label htmlFor="login_name">Tên đăng nhập</label>
            <input
              type="text"
              className="form-control"
              value={this.state.login_name}
              onChange={this.handleChange}
              id="login_name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="login_password">Mật khẩu đăng nhập</label>
            <input
              type="password"
              className="form-control"
              value={this.state.login_password}
              onChange={this.handleChange}
              id="login_password"
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary btn-lg btn-block"
            disabled={!this.validateForm}
          >
            Sign-up
          </button>
        </form>
      </div>
    );
  }
}

export default Signup;
