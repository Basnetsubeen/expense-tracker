import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../components/Layout/MainLayout";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginAction } from "./userState/userAction";

const Login = ({ setLogedIn }) => {
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate(); //Helps to navigate to the new page
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    //
    user._id && navigate("/dashboard");
  }, [user]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    console.log(email, password);

    // const { status, message, user } = await loginUser({ email, password });
    // toast[status](message);
    dispatch(loginAction({ email, password }));
    //Using localStorage to store the value while login and removing data once logout.
    // if (status === "success") {
    //   window.localStorage.setItem("user", JSON.stringify(user)); // (key , value)
    //   setLogedIn(true);
    //   navigate("/dashboard");
    // }
  };

  return (
    <MainLayout>
      <div className="login-page d-flex justify-content-center mt-3">
        <div className="login-form border p-4 shadow-lg bg-light mt-5">
          <h3> Welcome Back </h3>
          <hr />
          <Form onSubmit={handleOnSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                ref={emailRef}
                required
                name="userName"
                type="email"
                placeholder="Enter email"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                ref={passwordRef}
                required
                name="password"
                type="password"
                placeholder="Password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <div className="text-end">
            New Here? <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Login;
