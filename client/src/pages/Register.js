import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";
import "../App.css";
import MainLayout from "../components/Layout/MainLayout";
import { useState } from "react";
import { postNewUser } from "../heplers/axiosHelper";
import { toast } from "react-toastify";
import { Alert } from "react-bootstrap";
const initialUser = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const Register = () => {
  const [form, setForm] = useState(initialUser);

  //Creating an object so it doesnt shows undefined while registering.
  const [resp, setResp] = useState({});

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(form);

    // Including all the properties of form expect confirmpassword by using rest operator. (Destructing)
    const { confirmPassword, ...rest } = form;
    if (confirmPassword !== rest.password) {
      return alert("Password do not match");
    }
    // toastify is for animation , we make dynamic we have use status and message as a object while calling api form axios helper
    const { status, message } = await postNewUser(rest);
    setResp({ status, message });
    toast[status](message);
    status === "success" && setForm(initialUser); //Reseting the form in the initialstate
  };
  return (
    <MainLayout>
      <div className="login-page d-flex justify-content-center mt-5">
        <div className="login-form border p-4 shadow-lg bg-light mt-3">
          <h3>Register New User </h3>
          <hr />

          <Form onSubmit={handleOnSubmit}>
            {resp.message && (
              <Alert variant={resp.status === "success" ? "success" : "danger"}>
                {resp.message}
              </Alert>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                name="firstName"
                required
                type="text"
                placeholder="First Name"
                onChange={handleOnChange}
                value={form.firstName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                name="lastName"
                required
                type="text"
                placeholder="Last Name"
                onChange={handleOnChange}
                value={form.lastName}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                required
                type="email"
                placeholder="email"
                onChange={handleOnChange}
                value={form.email}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                name="password"
                required
                type="password"
                placeholder="Password"
                onChange={handleOnChange}
                value={form.password}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                name="confirmPassword"
                required
                type="password"
                placeholder="Password"
                onChange={handleOnChange}
                value={form.confirmPassword}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
          <div className="text-end">
            Already Have Account? <Link to="/login">Login</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Register;
