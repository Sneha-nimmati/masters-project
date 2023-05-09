import { Button, Form, Input } from "antd";
import React from "react";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { hideLoading, showLoading } from "../redux/alertsSlice";
import ".././styles/login.css"

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values) => {
    try {
      dispatch(showLoading());
      const response = await axios.post("/api/user/login", values);
      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
        localStorage.setItem("token", response.data.data);
        navigate("/");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="authentication">
      <div className="authentication-form card p-3">
        <div className="left-content">
          <div className="featureGridWrapper grid insulated">
            <ul className="features row">
              <li className="icon-advice col-6">
                <h2 className="header"> View Doctors</h2>
                  <span>
                      view all the doctors from different specializations
                  </span>
              </li>
              <li className="icon-advice col-6">
                <h2 className="header"> Check Availability</h2>
                  <span>
                      You can check Availability of the doctors for an appointment
                  </span>
              </li>
              <li className="icon-advice col-6">
                <h2 className="header"> Book Appointments</h2>
                  <span>
                      You can book appointment with single or multiple doctors
                  </span>
              </li>
              <li className="icon-advice col-6">
                <h2 className="header">Notifications</h2>
                  <span>
                      Get notified when doctors approve you appointments
                  </span>
              </li>
              </ul>
              
        </div>
        </div>
        <Form layout="vertical" className="login-form" onFinish={onFinish}>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input placeholder="Password" type="password" />
          </Form.Item>

          
          <Button className="primary-button my-2 full-width-button" htmlType="submit">
            LOGIN
          </Button>
          <h5>NEW USER?</h5>
          <div className="register">
          <Link to="/register" className="primary-button ant-btn full-width-button">
            REGISTER NOW
          </Link>
         </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
